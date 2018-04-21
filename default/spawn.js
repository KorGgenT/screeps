var f_spawn = {
    defender1: function(spawn) {
        let defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
        if(defenders.length < 4) {
            let newName = 'Defender' + Game.time;
            console.log(spawn + ' spawning new defender: ' + newName);
            Game.spawns[spawn].spawnCreep([TOUGH,TOUGH,ATTACK,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'defender', home: spawn}});
        }
    },
    defender2: function(spawn) {
        let defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
        if(defenders.length < 4) {
            let newName = 'Defender' + Game.time;
            console.log(spawn + " spawning new defender: " + newName);
            Game.spawns[spawn].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
			{memory: {role: 'defender', home: spawn}});
        }
    },
    
    level1: function(spawn)  {
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let bodyparts = [WORK,CARRY,MOVE,MOVE]
    
        if(harvesters.length < 3) {
            let newName = 'Harvester' + Game.time;
            console.log(spawn + ' spawning new harvester: ' + newName);
            Game.spawns[spawn].spawnCreep(bodyparts, newName,
                {memory: {role: 'harvester', home: spawn}});
        }
        else if(builders.length < 1) {
            let newName = 'Builder' + Game.time;
            console.log(spawn + ' spawning new builder: ' + newName);
            Game.spawns[spawn].spawnCreep(bodyparts, newName,
                {memory: {role: 'builder', home: spawn}});
        }
        else if(upgraders.length < 2) {
            let newName = 'Upgrader' + Game.time;
            console.log(spawn + ' spawning new upgrader: ' + newName);
            Game.spawns[spawn].spawnCreep(bodyparts, newName,
                {memory: {role: 'upgrader', home: spawn}});
        }
    },
    
    level2: function(spawn)  {
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let bodyparts = [WORK,CARRY,WORK,CARRY,WORK,MOVE,MOVE,MOVE]
    
    
        if(harvesters.length < 3) {
            let newName = 'Harvester' + Game.time;
            console.log(spawn + ' spawning new harvester: ' + newName);
            Game.spawns[spawn].spawnCreep(bodyparts, newName,
                {memory: {role: 'harvester', home: spawn}});
        }
        else if(builders.length < 2) {
            let newName = 'Builder' + Game.time;
            console.log(spawn + ' spawning new builder: ' + newName);
            Game.spawns[spawn].spawnCreep(bodyparts, newName,
                {memory: {role: 'builder', home: spawn}});
        }
        else if(upgraders.length < 2) {
            let newName = 'Upgrader' + Game.time;
            console.log(spawn + ' spawning new upgrader: ' + newName);
            Game.spawns[spawn].spawnCreep(bodyparts, newName,
                {memory: {role: 'upgrader', home: spawn}});
        }
    }
}

module.exports = f_spawn;