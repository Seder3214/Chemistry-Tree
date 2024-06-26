addLayer("pt", {
    name: "Perodic Table", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PT", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#02C0F2",
    requires() {if (player.pt.points.gte(2)) return new Decimal(100)
        else return new Decimal(5)}, // Can be a function that takes requirement increases into account
    resource: " Explored Elements", // Name of prestige currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2.38, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "H: Reset for Hydrohen", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    clickables: {
        11: {
        title:`<br>H`,
        elid:`1`,
        tooltip() {return this.canClick()?``:"To unlock, explore 1 element"},
        canClick() {return player.pt.points.gte(1)},
        onClick() {
            player.tab="H"
        },
        style() {
            if (player.pt.points.gte(1))return {
                "width":"60px",
                "min-height":"60px",
                "margin-left":"-7px",
                "margin-right":"-7px",
            }
            else return {
                "width":"60px",
                "margin-left":"-7px",
                "margin-right":"-7px",
                "min-height":"60px",
                "background-color":"#bf8f8f",
            }
        },
        },
        12: {
            title:`<br>He`,
            elid:`2`,
            tooltip() {return this.canClick()?``:"To unlock, explore 2 elements"},
            canClick() {return player.pt.points.gte(2)},
            onClick() {
                player.tab="he"
            },
            style() {
                if (player.pt.points.gte(2))return {
                    "width":"60px",
                    "min-height":"60px",
                    "margin-left":"-7px",
                    "margin-right":"-7px",
                }
                else return {
                    "width":"60px",
                    "min-height":"60px",
                    "margin-left":"-7px",
                    "margin-right":"-7px",
                    "background-color":"#bf8f8f",
                }
            },
            },
        13: {
            title:`<br>Li`,
            elid:`3`,
            tooltip() {return this.canClick()?``:"To unlock, explore 3 elements"},
            canClick() {return player.pt.points.gte(3)},
            onClick() {
                player.tab="li"
            },
            style() {
                if (player.pt.points.gte(3))return {
                    "width":"60px",
                    "min-height":"60px",
                    "margin-left":"-7px",
                   "margin-right":"-7px",
                }
                else return {
                    "width":"60px",
                   "min-height":"60px",
                    "margin-left":"-7px",
                    "margin-right":"-7px",
                    "background-color":"#bf8f8f",
            }
            },
            },
    },
	layerShown(){return true}
}),
addLayer("H", {
    name: "Hydrogen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#02C0F2",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Hydrogen", // Name of prestige currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.515, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    canBuyMax() {return true},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
effectDescription() {return `<div style="border:2px solid white;width:200px">Produces: ${format(tmp.H.produce.base,3)} points/s per Hydrogen<br><span style="color:yellow">x${format(player.H.points,0)}</span> produces ${format(tmp.H.produce.eff,2)}</span> points/s</div>`},
    produce() {
        let x = new Decimal(0)
        let base=new Decimal(0.25)
        if (hasUpgrade("H", 11)) base = base.times(1.7);
if (hasUpgrade("H", 12)) base = base.times(1.85);
if (hasUpgrade("H", 21)) base = base.times(1.6);	
if (hasUpgrade("H", 22)) base = base.times(1.5);	
if (hasUpgrade("he", 11)) base = base.times(1.7);
    x=base.mul(player.H.points)
        return {eff:x,base:base}
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "H: Reset for Hydrohen", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
		rows: 2,
		cols: 2,
		11: {
title: "Unmetal Qualities",
description: "70% Hydrogen effective",
cost: new Decimal(4),
unlocked() { return true}, // The upgrade is only visible when this is true     
            },
			12: {
title: "Сovalent Bond",
description: "85% Hydrogen effective",
cost: new Decimal(8),
unlocked() { return (hasUpgrade("H", 11))}, // The upgrade is only visible when this is true     
            },
				21: {
title: "First Element",
description: "60% Hydrogen effective",
cost: new Decimal(10),
unlocked() { return (hasUpgrade("H", 12))}, // The upgrade is only visible when this is true
	},
	22: {
title: "New Element awaits?",
description: "50% Hydrogen effective",
cost: new Decimal(20),
unlocked() { return (hasUpgrade("H", 21))}, // The upgrade is only visible when this is true
	},
	},
	layerShown(){return false}
}),
addLayer("he", {
    name: "Helium", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "He", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    effectDescription() {return `<div style="border:2px solid white;width:200px">Produces: ${format(tmp.he.produce.base,3)} points/s per Helium<br><span style="color:yellow">x${format(player.he.points,0)}</span> produces ${format(tmp.he.produce.eff,2)}</span> points/s</div>`},
    produce() {
        let x = new Decimal(0)
        let base=new Decimal(43)
        if (hasUpgrade("he", 12)) base = base.times(1.3);
        if (hasUpgrade("he", 13)) base = base.times(2.5);
    x=base.mul(player.he.points)
        return {eff:x,base:base}
    },
    layerShown(){return false},
    canBuyMax() {return true},
    color: "#04G0B2",
    requires: new Decimal(546.73), // Can be a function that takes requirement increases into account
    resource: "Helium",
    branches: ["H"],	// Name of prestige currency
    baseResource: " Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.785, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for Helium", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades : {
		11: {
title: "Fulled First Electron Shell",
description: "70% Hydrogen effective",
cost: new Decimal(4),
unlocked() { return true}, // The upgrade is only visible when this is true     
        },
		12: {
title: "Second Element!",
description: "30% Helium effective",
cost: new Decimal(7),
unlocked() { return true}, // The upgrade is only visible when this is true     
        },
	13: {
         title: "Gaseous Element",
        description: "150% Helium effective",
        cost: new Decimal(12),
        unlocked() { return true}, // The upgrade is only visible when this is true     
    },
	},
})