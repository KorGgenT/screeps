var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.carry.energy < creep.carryCapacity) {
            if (creep.memory.roomname) {
                let position = new RoomPosition(creep.memory.x, creep.memory.y, creep.memory.roomname)
                if (creep.pos.roomName != creep.memory.roomname) {
                    creep.say("🔄")
                    creep.moveTo(position, {visualizePathStyle: {stroke: '#ffaa00'}})
                } else {
                let source = creep.pos.findClosestByPath(FIND_SOURCES);
                let temp
                    if((temp = creep.harvest(source)) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                    creep.say(temp)
                }
            } else {
                let source = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            
        }
        else {
            
            if (!creep.memory.roomname) {
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
            } else {
                let target = Game.spawns['Spawn1']
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('🏚️')
                }
            }
            
            
        }
    }
};

module.exports = roleHarvester;