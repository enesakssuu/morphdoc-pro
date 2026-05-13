lucide.createIcons();

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const actionBar = document.getElementById('actionBar');
const processBtn = document.getElementById('processBtn');
const fileCountTxt = document.getElementById('fileCount');
const emptyState = document.getElementById('emptyState');
const imgQuality = document.getElementById('imgQuality');
const qValue = document.getElementById('qValue');
const imgFormat = document.getElementById('imgFormat');

let uploadedFiles = [];

// UI Listeners
imgQuality.oninput = () => qValue.innerText = `%${imgQuality.value}`;
imgFormat.onchange = () => {
    const isPng = imgFormat.value === 'image/png';
    document.getElementById('qualityContainer').style.opacity = isPng ? "0.3" : "1";
    document.getElementById('qualityContainer').style.pointerEvents = isPng ? "none" : "auto";
};

dropZone.onclick = () => fileInput.click();
fileInput.onchange = (e) => handleFiles(e.target.files);
dropZone.ondragover = (e) => { e.preventDefault(); dropZone.classList.add('drop-zone-active'); };
dropZone.ondragleave = () => dropZone.classList.remove('drop-zone-active');
dropZone.ondrop = (e) => { e.preventDefault(); dropZone.classList.remove('drop-zone-active'); handleFiles(e.dataTransfer.files); };

function handleFiles(files) {
    const docxFiles = Array.from(files).filter(f => f.name.endsWith('.docx'));
    if (docxFiles.length === 0) return;

    uploadedFiles = [...uploadedFiles, ...docxFiles].slice(0, 20);
    renderFileList();
}

function renderFileList() {
    if (uploadedFiles.length > 0) {
        emptyState.style.display = 'none';
        actionBar.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
        fileCountTxt.innerText = `${uploadedFiles.length} / 20 DOSYA`;
    } else {
        emptyState.style.display = 'flex';
        actionBar.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
        fileCountTxt.innerText = `Dosya yok`;
    }

    fileList.innerHTML = uploadedFiles.map((file, idx) => `
        <div class="flex items-center justify-between p-5 bg-gray-50 rounded-[24px] border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300">
            <div class="flex items-center gap-4">
                <div class="p-3 bg-white rounded-2xl shadow-sm border border-gray-50">
                    <i data-lucide="file-text" class="w-6 h-6 text-blue-500"></i>
                </div>
                <div>
                    <p class="text-sm font-bold text-gray-800 truncate max-w-[280px]">${file.name}</p>
                    <p class="text-[10px] text-gray-400 font-mono italic font-medium uppercase">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
            </div>
            <div id="status-${idx}" class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm">Bekliyor</div>
        </div>
    `).join('');
    lucide.createIcons();
}

function clearAll() {
    uploadedFiles = [];
    fileInput.value = '';
    renderFileList();
    processBtn.disabled = false;
    processBtn.innerHTML = `<span>İşlemi Başlat</span> <i data-lucide="zap" class="w-4 h-4"></i>`;
    document.getElementById('totalStatus').innerText = "Hazır";
    lucide.createIcons();
}

processBtn.onclick = async () => {
    const w = parseInt(document.getElementById('targetW').value) || 1000;
    const h = parseInt(document.getElementById('targetH').value) || 450;
    const fmt = imgFormat.value;
    const q = parseInt(imgQuality.value) / 100;

    processBtn.disabled = true;
    processBtn.innerHTML = `<span class="animate-pulse">İşleniyor...</span>`;
    document.getElementById('totalStatus').innerText = "Motor Çalışıyor";

    for (let i = 0; i < uploadedFiles.length; i++) {
        const statusEl = document.getElementById(`status-${i}`);
        statusEl.innerText = "İşleniyor";
        statusEl.className = "text-[10px] font-black text-blue-500 uppercase tracking-widest px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 shadow-sm animate-pulse";

        try {
            const optimizedDocx = await processDocxFile(uploadedFiles[i], w, h, fmt, q);
            const newName = uploadedFiles[i].name.replace('.docx', '-morphdoc.docx');
            downloadBlob(optimizedDocx, newName);
            
            statusEl.innerText = "Bitti";
            statusEl.className = "text-[10px] font-black text-green-600 uppercase tracking-widest px-4 py-1.5 rounded-full border border-green-200 bg-green-50 shadow-sm";
        } catch (err) {
            statusEl.innerText = "Hata!";
            statusEl.className = "text-[10px] font-black text-red-500 uppercase tracking-widest px-4 py-1.5 rounded-full border border-red-200 bg-red-50 shadow-sm";
        }
    }

    processBtn.innerHTML = `<span>Tamamlandı</span> <i data-lucide="check-circle" class="w-4 h-4"></i>`;
    document.getElementById('totalStatus').innerText = "Tüm İşlemler Bitti";
    lucide.createIcons();
};

// DOCX PROCESSING ENGINE
async function processDocxFile(file, targetW, targetH, format, quality) {
    const zip = await JSZip.loadAsync(file);
    const mediaFolder = zip.folder("word/media");
    
    if (mediaFolder) {
        const imageFiles = [];
        mediaFolder.forEach((relativePath, file) => {
            imageFiles.push({ path: "word/media/" + relativePath, file: file });
        });

        for (const imgObj of imageFiles) {
            const originalData = await imgObj.file.async("blob");
            const optimizedData = await smartCanvasResize(originalData, targetW, targetH, format, quality);
            zip.file(imgObj.path, optimizedData);
        }
    }
    return await zip.generateAsync({ type: "blob" });
}

async function smartCanvasResize(imageBlob, targetW, targetH, format, quality) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = targetW;
            canvas.height = targetH;

            const imgRatio = img.width / img.height;
            const targetRatio = targetW / targetH;

            if (Math.abs(imgRatio - targetRatio) < 0.1) {
                const scale = Math.max(targetW / img.width, targetH / img.height);
                const w = img.width * scale;
                const h = img.height * scale;
                ctx.drawImage(img, (targetW - w) / 2, (targetH - h) / 2, w, h);
            } else if (imgRatio > targetRatio) {
                const scale = targetH / img.height;
                const w = img.width * scale;
                ctx.drawImage(img, (targetW - w) / 2, 0, w, targetH);
            } else {
                const offscreen = document.createElement('canvas');
                offscreen.width = targetW;
                offscreen.height = targetH;
                const oCtx = offscreen.getContext('2d');
                oCtx.filter = 'blur(30px) brightness(0.6)';
                oCtx.drawImage(img, -30, -30, targetW + 60, targetH + 60);
                
                const scale = targetH / img.height;
                const newW = img.width * scale;
                ctx.drawImage(offscreen, 0, 0);
                ctx.filter = 'none';
                ctx.drawImage(img, (targetW - newW) / 2, 0, newW, targetH);
            }
            canvas.toBlob((blob) => resolve(blob), format, quality);
        };
        img.src = URL.createObjectURL(imageBlob);
    });
}

function downloadBlob(blob, filename) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}
