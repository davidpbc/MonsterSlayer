new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        specialAttacks: 2,
        endGameTitle: "",
        heals: 3,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.specialAttacks = 2;
            this.endGameTitle = "";
            this.heals = 3;
            this.turns = [];
        },
        attack: function () {
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;

            this.turns.unshift({
                isPlayer: true,
                text: "Player hits monster for " + damage
            });

            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        specialAttack: function () {
            this.specialAttacks--;
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;

            this.turns.unshift({
                isPlayer: true,
                text: "Player hits monster hard for " + damage
            });

            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },
        monsterAttacks: function () {
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: "Monster hits player for " + damage
            });
            this.checkWin();            
        },
        heal: function () {
            this.heals--;
            if (this.playerHealth <= 90){
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }

            this.turns.unshift({
                isPlayer: true,
                text: "Player heals for 10"
            })
            
            this.monsterAttacks();
        },
        giveUp: function () {

            this.playerHealth = 0;
            this.monsterHealth = 100;
            this.turns.unshift({
                isPlayer: false,
                text: "Monster Devours player and fully recovers"
            })
            this.endGameTitle = "Monster has slain the Player!";
            this.gameIsRunning = false;
        },
        calculateDamage: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                this.endGameTitle = "Player has defeated the Monster!";
                this.gameIsRunning = false;
                return true;
            } else if (this.playerHealth <= 0) {
                this.playerHealth = 0;
                this.endGameTitle = "Monster has slain the Player!";
                this.gameIsRunning = false;
                return true;
            }
            return false;
        }
    }
});