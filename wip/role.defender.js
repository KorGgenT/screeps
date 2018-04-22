var roleDefender = {
    atk: function(creep) {
        let target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
        let rallypoint = creep.room.getPositionAt(33,29);
        if (target && creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else if (!(target)) {
            creep.moveTo(rallypoint)
        }
    }
    
}


module.exports = roleDefender;