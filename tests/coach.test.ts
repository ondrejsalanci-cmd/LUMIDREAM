import {describe,it,expect} from 'vitest'
import {dreamSigns,habitSummary,trainingRecommendation,prospectiveMemoryTasks} from '../src/coach'
import {initial,type State} from '../src/storage'
const sample:State={...initial,dreams:[{id:'a',date:'2026-10-16',title:'Sen',story:'Letel som',lucid:false,clarity:3,emotion:'Pokojný',tags:['lietanie','more']},{id:'b',date:'2026-10-15',title:'Sen 2',story:'Letel som znovu',lucid:true,clarity:5,emotion:'Radostný',tags:['LIETANIE']}],sleep:{'2026-10-16':2}}
describe('adaptívny tréner',()=>{
 it('normalizuje opakované motívy',()=>expect(dreamSigns(sample.dreams)[0]).toEqual({name:'lietanie',count:2}))
 it('pri zlom spánku prioritizuje odpočinok',()=>expect(trainingRecommendation(sample,12,new Date(2026,9,16)).title).toMatch(/odpočinok/))
 it('počíta len dni v intervale',()=>expect(habitSummary(sample,new Date(2026,9,16)).journalDays).toBe(2))
 it('ponúka každý deň pamäťový podnet',()=>expect(prospectiveMemoryTasks).toHaveLength(7))
})
