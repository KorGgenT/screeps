var = roleHauler {
   run: function(creep) {
	   
	   if (creep.carry.energy < creep.carryCapacity) {
           let target = creep.findClosestByPath(FIND_DROPPED_ENERGY)
    	   if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
    		   moveTo(target)
    	   }
	   } else {
	       let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ( structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                let target = creep.pos.findClosestByPath(targets)
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	   }
   }
}

module.exports = roleHauler;