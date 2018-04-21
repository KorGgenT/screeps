var roads = {
    run: function() {
        let creep = Game.creeps.John;
        console.log("boop1")
        let goals = _.map(creep.room.find(FIND_SOURCES), function(source) {
        // We can't actually walk on sources-- set `range` to 1 
        // so we path next to it.
            return { pos: source.pos, range: 1 };
        });
        /*
        for (var spawn in Game.spawns) {
            
            var currentRoom = Game.spawns[spawn].room.name;
            var origin = spawn.pos
            
            for goal in goals {
                var roadPath = PathFinder.search(origin, goal)
                for (position in roadPath.path) {
                    if(Game.rooms[currentRoom].createConstructionSite(position, STRUCTURE_ROAD) != 0) {
                        //console.log("ERROR BUILDING EXTENSION")
                    }
                    else {
                        console.log("Building Road at: " + position.x + ", " + position.y)
                    }
                }
            }
        }*/
    }
};
module.exports = roads;