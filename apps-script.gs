const SHEET_ID = 'YOUR_SHEET_ID_HERE'; // 貼到 Apps Script 時再填入你的 Sheet ID
function doGet(e){return handle(e)}
function doPost(e){return handle(e)}
function handle(e){
  const p=e.parameter;let result;
  try{
    const ss=SpreadsheetApp.openById(SHEET_ID);
    switch(p.action){
      case 'getDeals':{const r=ss.getSheetByName('deals').getDataRange().getValues();result={ok:true,data:r.slice(1)};break}
      case 'addDeal':{const id=Date.now().toString();const now=new Date().toISOString();ss.getSheetByName('deals').appendRow([id,p.company,p.contact,p.phone||'',p.email||'',p.stage,Number(p.amount)||0,Number(p.probability)||0,p.close_date||'',p.owner||'',p.industry||'',p.notes||'',now,now]);log(ss,id,'新增：'+p.company);result={ok:true,id};break}
      case 'updateDeal':{const sh=ss.getSheetByName('deals');const rows=sh.getDataRange().getValues();for(let i=1;i<rows.length;i++){if(String(rows[i][0])!==String(p.id))continue;const r=i+1;const f={2:'company',3:'contact',4:'phone',5:'email',6:'stage',7:'amount',8:'probability',9:'close_date',10:'owner',11:'industry',12:'notes'};Object.entries(f).forEach(([c,k])=>{if(p[k]!=null)sh.getRange(r,Number(c)).setValue(['amount','probability'].includes(k)?Number(p[k]):p[k])});sh.getRange(r,14).setValue(new Date().toISOString());if(p.oldStage&&p.oldStage!==p.stage)log(ss,p.id,(p.company||rows[i][1])+'從「'+p.oldStage+'」→「'+p.stage+'」');break}result={ok:true};break}
      case 'deleteDeal':{const sh=ss.getSheetByName('deals');const rows=sh.getDataRange().getValues();for(let i=1;i<rows.length;i++){if(String(rows[i][0])===String(p.id)){sh.deleteRow(i+1);break}}result={ok:true};break}
      case 'getActivities':{const r=ss.getSheetByName('activities').getDataRange().getValues();result={ok:true,data:r.slice(1).slice(-30).reverse()};break}
      default:result={ok:false,error:'未知action'}
    }
  }catch(err){result={ok:false,error:err.toString()}}
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON)
}
function log(ss,dealId,action){ss.getSheetByName('activities').appendRow([Date.now().toString(),dealId,action,new 