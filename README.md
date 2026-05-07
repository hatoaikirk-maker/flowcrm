# FlowCRM 銷售管理系統

FlowCRM 是一套輕量級 CRM 工具，只需一個 HTML 檔案加上 Google Sheets 後端即可運作，不需要任何伺服器或資料庫。支援 Kanban 看板、客戶列表、業績目標追蹤等功能，適合中小型業務團隊使用。

## 1. Google Sheets 建立

1. 開啟 [Google Sheets](https://sheets.google.com) 建立新試算表
2. 建立兩個分頁（Sheet）：
   - 分頁名稱：`deals`
   - 分頁名稱：`activities`
3. 在 `deals` 分頁第一列填入以下欄位名稱（A1 到 N1）：
   `id / company / contact / phone / email / stage / amount / probability / close_date / owner / industry / notes / created_at / updated_at`
4. 記下試算表 URL 中的 Sheet ID（網址中 `/d/` 後方到 `/edit` 前方的那段文字）

## 2. Apps Script 部署

1. 在 Google Sheets 上方選單點「擴充功能」→「Apps Script」
2. 刪除預設程式碼，貼上 `apps-script.gs` 的全部內容
3. 將第一行 `YOUR_SHEET_ID_HERE` 替換為你的 Sheet ID
4. 點「部署」→「新增部署作業」
5. 類型選「網頁應用程式」
6. 執行身分：選「我」
7. 存取權限：選「任何人」
8. 點「部署」，複製產生的網址（Web App URL）

## 3. GitHub Pages 上線（可選）

1. 在 GitHub 建立新的 repository（例如 `flowcrm`）
2. 上傳 `index.html` 到 repository
3. 進入 Settings → Pages
4. Branch 選 `main`，資料夾選 `/ (root)`
5. 儲存後等約 1 分鐘，取得 `https://你的帳號.github.io/flowcrm` 網址

## 4. 第一次使用

1. 用瀏覽器開啟 `index.html`（或 GitHub Pages 網址）
2. 點右上角 ⚙️ 設定按鈕
3. 貼入 Apps Script 部署後的 Web App URL
4. 點「儲存設定」，系統會自動連線並同步資料

## 5. 多人使用

- 每位業務員直接開啟同一個網址
- 第一次使用時各自設定一次 ⚙️（貼入同一個 Web App URL）
- 所有人的資料都會同步到同一份 Google Sheets
- 系統每 30 秒自動同步一次

## FAQ

**Q1: 可以不連 Google Sheets 直接使用嗎？**
可以。不設定 URL 的話系統會以內建的 Demo 資料運行，資料只存在瀏覽器記憶體中，關掉後不會保留。

**Q2: 多人同時編輯會衝突嗎？**
系統採用最後寫入優先（Last Write Wins）策略，每 30 秒同步一次。建議同一筆資料避免同時修改。

**Q3: 資料安全嗎？**
Web App URL 只儲存在本機瀏覽器，不會上傳至其他地方。Google Sheets 的存取權限由你的 Google 帳號控管。

**Q4: 可以修改業務員名單嗎？**
可以。點右上角 ⚙️ → 業務員名單，每行輸入一個名字，儲存即生效。

**Q5: 怎麼備份資料？**
資料本身存在 Google Sheets，直接下載該試算表即可備份。
