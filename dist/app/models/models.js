"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.Basket = exports.Product = exports.Category = exports.Company = exports.User = exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('postgres', 'danil', 'danman203', {
    host: 'localhost',
    dialect: 'postgres',
});
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
exports.User = User;
User.init({
    id: {
        type: sequelize_1.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.STRING,
        allowNull: false,
    }
}, {
    sequelize: exports.sequelize,
    modelName: 'Users',
});
var Company = /** @class */ (function (_super) {
    __extends(Company, _super);
    function Company() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Company;
}(sequelize_1.Model));
exports.Company = Company;
Company.init({
    id: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.STRING,
        allowNull: false,
        unique: true,
    },
    phone_number: {
        type: sequelize_1.STRING,
        allowNull: false,
        unique: true,
    },
    login: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.STRING,
        allowNull: false,
    }
}, {
    sequelize: exports.sequelize,
    modelName: 'Company',
});
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Category;
}(sequelize_1.Model));
exports.Category = Category;
Category.init({
    id: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: sequelize_1.STRING,
        allowNull: false,
    }
}, {
    sequelize: exports.sequelize,
    modelName: 'Categories',
    timestamps: false,
});
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Product;
}(sequelize_1.Model));
exports.Product = Product;
Product.init({
    id: {
        type: sequelize_1.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.NUMBER,
        allowNull: false,
    },
    clicks: {
        type: sequelize_1.NUMBER,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    sequelize: exports.sequelize,
    modelName: 'Products',
    timestamps: true,
});
Company.hasMany(Product, {
    onDelete: "cascade",
});
Category.hasMany(Product, {
    onDelete: "cascade"
});
var Basket = /** @class */ (function (_super) {
    __extends(Basket, _super);
    function Basket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Basket;
}(sequelize_1.Model));
exports.Basket = Basket;
Basket.init({
    id: {
        type: sequelize_1.NUMBER,
        primaryKey: true,
        autoIncrement: true,
    },
    amount: {
        type: sequelize_1.NUMBER,
        allowNull: true,
    }
}, {
    sequelize: exports.sequelize,
    modelName: 'Baskets',
    timestamps: false,
});
User.hasOne(Basket, {
    onDelete: "cascade",
});
Basket.hasMany(Product, {
    onDelete: "NO ACTION",
});
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Comment;
}(sequelize_1.Model));
exports.Comment = Comment;
Comment.init({
    id: {
        type: sequelize_1.NUMBER,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: sequelize_1.STRING,
        allowNull: true
    }
}, {
    sequelize: exports.sequelize,
    modelName: 'Comments',
    timestamps: true,
});
Comment.hasOne(User, {
    onDelete: "cascade",
});
Product.hasMany(Comment, {
    onDelete: "cascade",
});
