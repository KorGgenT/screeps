var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            let target = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (target.length) {
                target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                
            } else {
                creep.say("repairing")
                target = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure) &&
							structure.hits < structure.hitsMax;
					}
				});
				target = creep.pos.findClosestByPath(target)
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#000000'}});
                }
            }
        }
        else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;