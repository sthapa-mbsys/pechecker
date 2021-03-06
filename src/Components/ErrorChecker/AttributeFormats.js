export const AttributeFormats = function () {
    return {
        "attributeFormats": [
            {
                name: "Weight",
                space: true,
                units: ["kg", "g", "lb", "mg", "OZ"]
            },
            {
                name: "Compatible Baby Weight",
                space: true,
                units: ["kg"]
            },
            {
                name: "Capacity",
                space: true,
                units: ["kg", "oz", "ltr", "ml", "ton", "mAh"]
            },
            {
                name: "Quantity",
                space: true,
                units: ["pc", "g", "ltr", "ml", "kg", "sheets", "pair", "set", "N", "sticks", "caps", "tabs"]
            },
            {
                name: "Size",
                space: true,
                shouldHaveNumber: 'partial',
                units: ["mm", "cm", "inches", "pulls", "XS", "S", "M", "L", "XL", "2XL", "3XL", "King", "Twin", "Queen", "Free"]
            },
            {
                name: "Screen Size",
                space: true,
                units: ["inches"]
            },
            {
                name: "Volume",
                space: true,
                units: ["ml", "cc"]
            },
            {
                name: "RAM",
                space: true,
                units: ["GB"]
            },
            {
                name: "Internal Storage",
                space: true,
                units: ["GB"]
            },
            {
                name: "Storage",
                space: true,
                units: ["TB", "GB"]
            },
            {
                name: "Hard Disk Size",
                space: true,
                units: ["TB", "GB"]
            },
            {
                name: "Battery Capacity",
                space: true,
                units: ["mAh"]
            },
            {
                name: "Battery",
                space: true,
                units: ["mAh", "Ah"]
            },
            {
                name: "Resolution",
                space: false,
                units: ["p", "K"]
            }
        ]
    }
}