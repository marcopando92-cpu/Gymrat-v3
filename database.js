const DB={name:'GymLogbookDB',version:2,db:null,ready:null};
function openDB(){return new Promise((res,rej)=>{const r=indexedDB.open(DB.name,DB.version);r.onupgradeneeded=e=>{const d=e.target.result;['exercises','sessions','workouts','sets','settings'].forEach(s=>{if(!d.objectStoreNames.contains(s))d.createObjectStore(s,{keyPath:'id'})})};r.onsuccess=async()=>{DB.db=r.result;await seed();res(DB.db)};r.onerror=()=>rej(r.error)})}
function tx(store,mode='readonly'){return DB.db.transaction(store,mode).objectStore(store)}
function getAll(store){return new Promise((res,rej)=>{const r=tx(store).getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
function get(store,id){return new Promise((res,rej)=>{const r=tx(store).get(id);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
function put(store,obj){return new Promise((res,rej)=>{const r=tx(store,'readwrite').put(obj);r.onsuccess=()=>res(obj);r.onerror=()=>rej(r.error)})}
function del(store,id){return new Promise((res,rej)=>{const r=tx(store,'readwrite').delete(id);r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
async function seed(){let ex=await getAll('exercises');if(!ex.length)for(const e of DEFAULT_EXERCISES)await put('exercises',{id:e[0],name:e[1],primaryMuscle:e[2],secondaryMuscles:e[3],equipment:e[4],pattern:e[5],repMin:e[6],repMax:e[7],active:true});let se=await getAll('sessions');if(!se.length)for(const s of DEFAULT_SESSIONS)await put('sessions',s);let st=await get('settings','main');if(!st)await put('settings',structuredClone(DEFAULT_SETTINGS))}
async function clearAllData(){for(const s of ['workouts','sets','exercises','sessions','settings'])for(const x of await getAll(s))await del(s,x.id);await seed()}
DB.ready=openDB();function ensureDB(){return DB.ready}
