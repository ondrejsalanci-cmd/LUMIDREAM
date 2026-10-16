import {defaultReminders,type ReminderConfig} from './realityChecks'
export type Dream={id:string;date:string;title:string;story:string;lucid:boolean;clarity:number;emotion:string;tags:string[]}
export type State={started:string;onboarded:boolean;experience:string;goal:string;dreams:Dream[];done:number[];checks:Record<string,string[]>;sleep:Record<string,number>;notes:Record<number,string>;reminders:ReminderConfig}
export const initial:State={started:'',onboarded:false,experience:'Začiatočník',goal:'Prvý lucidný sen',dreams:[],done:[],checks:{},sleep:{},notes:{},reminders:defaultReminders}
const KEY='lumidream-data-v1'
export function load():State{try{const saved=localStorage.getItem(KEY);if(!saved)return {...initial};const v=JSON.parse(saved);return {...initial,...v,dreams:Array.isArray(v.dreams)?v.dreams:[],done:Array.isArray(v.done)?v.done:[],checks:v.checks||{},sleep:v.sleep||{},notes:v.notes||{},reminders:{...defaultReminders,...v.reminders}}}catch{return {...initial}}}
export function save(s:State){localStorage.setItem(KEY,JSON.stringify(s))}
export function dayKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
export function dayNumber(start:string,now=new Date()){if(!start)return 1;const [y,m,d]=start.split('-').map(Number);const a=Date.UTC(y,m-1,d);const b=Date.UTC(now.getFullYear(),now.getMonth(),now.getDate());return Math.max(1,Math.min(28,Math.floor((b-a)/86400000)+1))}
export function streak(dreams:Dream[]){const days=new Set(dreams.map(x=>x.date));const d=new Date();if(!days.has(dayKey(d)))d.setDate(d.getDate()-1);let n=0;while(days.has(dayKey(d))&&n<36500){n++;d.setDate(d.getDate()-1)}return n}
export function downloadJson(state:State){const blob=new Blob([JSON.stringify({format:'LUMIDREAM-v1',exported:new Date().toISOString(),data:state},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`lumidream-zaloha-${dayKey()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
export function parseImport(text:string):State{const obj=JSON.parse(text);if(obj.format!=='LUMIDREAM-v1'||!obj.data||!Array.isArray(obj.data.dreams)||!Array.isArray(obj.data.done))throw new Error('Neplatný formát zálohy');return {...initial,...obj.data,reminders:{...defaultReminders,...obj.data.reminders}}}
