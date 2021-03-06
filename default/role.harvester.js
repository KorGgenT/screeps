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
            if (!creep.memory.roomname || (creep.pos.roomName == Game.spawns[creep.memory.home].pos.roomName)) {
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
                let target = Game.spawns[creep.memory.home]
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('🏚️')
                }
            }
            
            
        }
    },
    
    dropMine: function(creep) { // definitely use this at RCL 2. switch to canMine after for carry part for occasional repairs.
        if (!(creep.memory.sourceID)) {
            /*
            find sources
            loop til you find a source that there is no harvester for
            */
        } else if (!(creep.memory.dropPos)) {
            /*
            scan the area around a source til you find an empty space you can path to, then make that your position.
            !!!!
            Maybe put both of these in the spawn program
            */
        }
        /*
        go to position
        harvest with no carry parts (forever)
        */
        
    }
};

module.exports = roleHarvester;