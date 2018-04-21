var tower = {
    run: function(room) {
        let towers = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER)
                }
        });
        for (let tower in towers)   {
            if(tower) {
                let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                if(closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
        
                let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(closestHostile) {
                    tower.attack(closestHostile);
                }
            }
        }
    }
}
module.exports = tower;