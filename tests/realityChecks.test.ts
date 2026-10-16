import {describe,it,expect} from 'vitest'
import {generateTimes,windowLength,validConfig,type ReminderConfig} from '../src/realityChecks'
const base:ReminderConfig={enabled:true,count:7,start:'09:00',end:'21:00'}
describe('reality checks',()=>{
 it('supports 5 to 12 notifications',()=>{for(let count=5;count<=12;count++)expect(generateTimes({...base,count},new Date(2026,9,16))).toHaveLength(count)})
 it('supports full 24 hours',()=>{expect(windowLength('00:00','00:00')).toBe(1440);expect(windowLength('08:00','08:00')).toBe(1440)})
 it('supports overnight windows',()=>{expect(windowLength('22:00','06:00')).toBe(480);const arr=generateTimes({...base,start:'22:00',end:'06:00'},new Date(2026,9,16));expect(arr.every(d=>d.getHours()>=22||d.getHours()<6)).toBe(true)})
 it('stays inside selected window and spreads notifications',()=>{const arr=generateTimes(base,new Date(2026,9,16));expect(arr.every(d=>d.getHours()>=9&&d.getHours()<21)).toBe(true);expect(new Set(arr.map(d=>d.getTime())).size).toBe(7)})
 it('rejects invalid count and time',()=>{expect(validConfig({...base,count:13})).toBe(false);expect(validConfig({...base,start:'25:00'})).toBe(false)})
})
