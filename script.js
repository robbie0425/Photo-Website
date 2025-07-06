document.addEventListener('DOMContentLoaded', function() {
    const ageModal = document.getElementById('ageVerification');
    const confirmBtn = document.querySelector('.age-confirm');
    const exitBtn = document.querySelector('.age-exit');
    
    // 顯示年齡驗證彈窗
    ageModal.style.display = 'flex';
    
    // 確認按鈕點擊事件
    confirmBtn.addEventListener('click', function() {
        ageModal.style.display = 'none';
    });
    
    // 退出按鈕點擊事件
    exitBtn.addEventListener('click', function() {
        window.close();
    });
    
    // 加載JSON數據
    loadJSONData();
});

// 加載JSON數據
function loadJSONData() {
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            // 渲染頁面內容
            renderData(data);
            
            // 設置事件監聽器
            setupEventListeners();
        })
        .catch(error => console.error('加載JSON數據時出錯:', error));
}

// 渲染頁面內容
function renderData(data) {
    document.querySelector('title').innerHTML = data.公司名稱;
    document.querySelector('header .logo').innerHTML = data.公司名稱;
    document.querySelector('link#logo').href = data.商標;

    document.querySelector('section#home h1').innerHTML = data.標語;
    document.querySelector('section#home p').innerHTML = data.副標語;
    document.querySelector('section#home').style.background = `linear-gradient(rgba(93, 64, 55, 0.7), rgba(93, 64, 55, 0.7)), url('${data.首頁背景圖}')`;
    
    document.querySelector('section#announcement .marquee span').innerHTML = data.跑馬燈;
    document.querySelector('section#announcement .announcement-title').innerHTML = data.公告.標題;
    document.querySelector('section#announcement .announcement-subtitle').innerHTML = data.公告.副標題;
    document.querySelector('section#announcement .number-grid').innerHTML = data.公告.人員編號.map(
        number => `<div class="number-item">${number}</div>`
    ).join('');
    document.querySelector('section#announcement .announcement-note').innerHTML = data.公告.備註.map(
        note => `<p>${note}</p>`
    ).join('');

    document.querySelector('section#line .line-booking .line-id').innerHTML = data.line.id;
    document.querySelector('section#line .line-booking a').href = data.line.網址連結;
    document.querySelector('section#line .line-booking img').src = data.line.qrCode;
    
    document.querySelector('footer #footerCompany h3').innerHTML = data.公司名稱;
    document.querySelector('footer #footerCompany p').innerHTML = data.頁尾.說明;
    document.querySelector('footer #footerCompany .social-links a#facebook').href = data.頁尾.社群連結.facebook;
    document.querySelector('footer #footerCompany .social-links a#instagram').href = data.頁尾.社群連結.instagram;
    document.querySelector('footer #footerCompany .social-links a#line').href = data.頁尾.社群連結.line;
    document.querySelector('footer #footerOpening ul').innerHTML = data.頁尾.營業時間.map(
        item => `<li>${item}</li>`
    ).join('');
    document.querySelector('footer #footerContact ul').innerHTML = data.頁尾.聯絡資訊.map(
        item => `<li>${item}</li>`
    ).join('');
    document.querySelector('footer .copyright p').innerHTML = data.頁尾.版權所有;
    
    // 渲染人員網格
    renderWorkers(data.人員);

    // 設置畫廊導航
    setupGalleryNavigation();
}

// 渲染人員網格
function renderWorkers(workers) {
    const workersGrid = document.getElementById('workersGrid');
    workers.forEach((worker, index) => {
        const card = document.createElement('div');
        card.className = 'gallery-item';
        card.dataset.index = index;
        card.innerHTML = `
            <img src="${worker.圖片}" alt="${worker.編號} 號">
            <div class="info">
                <h3>${worker.編號} 號</h3>
            </div>
        `;
        workersGrid.appendChild(card);
    });
}

// 設置畫廊導航
function setupGalleryNavigation() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const overlay = document.querySelector('.overlay');
    const enlargedImg = document.querySelector('.enlarged-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const imgDescription = document.querySelector('.img-description');
    
    let currentIndex = 0;
    const images = [];
    
    // 收集所有圖片信息
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        
        images.push({
            src: img.src,
            alt: img.alt,
            title: title,
        });
        
        // 添加點擊事件
        item.addEventListener('click', () => {
            currentIndex = parseInt(item.dataset.index);
            openImage(currentIndex);
        });
    });
    
    // 打開圖片函數
    function openImage(index) {
        const imgData = images[index];
        enlargedImg.src = imgData.src;
        enlargedImg.alt = imgData.alt;
        imgDescription.textContent = `${imgData.title}`;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // 關閉圖片
    function closeImage() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // 導航到上一張圖片
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openImage(currentIndex);
    }
    
    // 導航到下一張圖片
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        openImage(currentIndex);
    }
    
    // 事件監聽
    closeBtn.addEventListener('click', closeImage);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeImage();
        }
    });
    
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        prevImage();
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        nextImage();
    });
    
    // 鍵盤事件
    document.addEventListener('keydown', function(e) {
        if (!overlay.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
    
    // 阻止圖片點擊事件冒泡
    enlargedImg.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// 設置事件監聽器
function setupEventListeners() {
    // 導航欄滾動效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'var(--light)';
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 248, 240, 0.95)';
            header.style.boxShadow = 'var(--shadow)';
        }
    });

    // 移動端菜單切換
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 導航鏈接點擊關閉菜單
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // 頁面滾動動畫
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}