# 網站操作指南

## 網站結構說明

website/
├── index.html # 主頁面檔案
├── style.css # 樣式表
├── script.js # JavaScript 功能
├── content.json # 網站內容數據
├── img/ # 圖片資源資料夾
│ ├── background.jpg # 首頁背景圖
│ ├── qrcode.jpg # qrcode 圖片
│ ├── 12.jpg # 人員圖片

## 如何更新網站內容

### 1. 文字內容更新

打開 `content.json` 檔案，然後修改文字

### 2. 圖片更新

1. 準備新的圖片檔案
2. 替換 `img/` 資料夾中的對應檔案
3. 檔案名稱與文字檔設定需相同，確保網站能正確載入

### 3. 新增人員

在 `content.json` 的 `人員` 陣列中添加新項目：

```json格式
{
  "編號": "新編號",
  "圖片": "/img/新圖片檔名.jpg"
}
```
