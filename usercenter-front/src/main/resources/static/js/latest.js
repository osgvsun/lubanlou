!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.ArRTC = t() : e.ArRTC = t()
}(window, (function () {
    return function (e) {
        var t = {};

        function n(r) {
            if (t[r]) return t[r].exports;
            var i = t[r] = {i: r, l: !1, exports: {}};
            return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
        }

        return n.m = e, n.c = t, n.d = function (e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
        }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var i in e) n.d(r, i, function (t) {
                return e[t]
            }.bind(null, i));
            return r
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 134)
    }([function (e, t, n) {
        var r = n(1), i = n(7), o = n(15), a = n(11), s = n(18), c = function (e, t, n) {
            var u, d, f, l, p = e & c.F, h = e & c.G, v = e & c.S, _ = e & c.P, m = e & c.B,
                E = h ? r : v ? r[t] || (r[t] = {}) : (r[t] || {}).prototype, y = h ? i : i[t] || (i[t] = {}),
                S = y.prototype || (y.prototype = {});
            for (u in h && (n = t), n) f = ((d = !p && E && void 0 !== E[u]) ? E : n)[u], l = m && d ? s(f, r) : _ && "function" == typeof f ? s(Function.call, f) : f, E && a(E, u, f, e & c.U), y[u] != f && o(y, u, l), _ && S[u] != f && (S[u] = f)
        };
        r.core = i, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
    }, function (e, t) {
        var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = n)
    }, function (e, t) {
        e.exports = function (e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        }
    }, function (e, t, n) {
        var r = n(4);
        e.exports = function (e) {
            if (!r(e)) throw TypeError(e + " is not an object!");
            return e
        }
    }, function (e, t) {
        e.exports = function (e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        }
    }, function (e, t, n) {
        var r = n(52)("wks"), i = n(30), o = n(1).Symbol, a = "function" == typeof o;
        (e.exports = function (e) {
            return r[e] || (r[e] = a && o[e] || (a ? o : i)("Symbol." + e))
        }).store = r
    }, function (e, t, n) {
        var r = n(20), i = Math.min;
        e.exports = function (e) {
            return e > 0 ? i(r(e), 9007199254740991) : 0
        }
    }, function (e, t) {
        var n = e.exports = {version: "2.6.11"};
        "number" == typeof __e && (__e = n)
    }, function (e, t, n) {
        e.exports = !n(2)((function () {
            return 7 != Object.defineProperty({}, "a", {
                get: function () {
                    return 7
                }
            }).a
        }))
    }, function (e, t, n) {
        var r = n(3), i = n(92), o = n(27), a = Object.defineProperty;
        t.f = n(8) ? Object.defineProperty : function (e, t, n) {
            if (r(e), t = o(t, !0), r(n), i) try {
                return a(e, t, n)
            } catch (e) {
            }
            if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
            return "value" in n && (e[t] = n.value), e
        }
    }, function (e, t, n) {
        var r = n(25);
        e.exports = function (e) {
            return Object(r(e))
        }
    }, function (e, t, n) {
        var r = n(1), i = n(15), o = n(14), a = n(30)("src"), s = n(139), c = ("" + s).split("toString");
        n(7).inspectSource = function (e) {
            return s.call(e)
        }, (e.exports = function (e, t, n, s) {
            var u = "function" == typeof n;
            u && (o(n, "name") || i(n, "name", t)), e[t] !== n && (u && (o(n, a) || i(n, a, e[t] ? "" + e[t] : c.join(String(t)))), e === r ? e[t] = n : s ? e[t] ? e[t] = n : i(e, t, n) : (delete e[t], i(e, t, n)))
        })(Function.prototype, "toString", (function () {
            return "function" == typeof this && this[a] || s.call(this)
        }))
    }, function (e, t, n) {
        var r = n(0), i = n(2), o = n(25), a = /"/g, s = function (e, t, n, r) {
            var i = String(o(e)), s = "<" + t;
            return "" !== n && (s += " " + n + '="' + String(r).replace(a, "&quot;") + '"'), s + ">" + i + "</" + t + ">"
        };
        e.exports = function (e, t) {
            var n = {};
            n[e] = t(s), r(r.P + r.F * i((function () {
                var t = ""[e]('"');
                return t !== t.toLowerCase() || t.split('"').length > 3
            })), "String", n)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(125), i = Object.prototype.toString;

        function o(e) {
            return "[object Array]" === i.call(e)
        }

        function a(e) {
            return void 0 === e
        }

        function s(e) {
            return null !== e && "object" == typeof e
        }

        function c(e) {
            return "[object Function]" === i.call(e)
        }

        function u(e, t) {
            if (null != e) if ("object" != typeof e && (e = [e]), o(e)) for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e); else for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e)
        }

        e.exports = {
            isArray: o, isArrayBuffer: function (e) {
                return "[object ArrayBuffer]" === i.call(e)
            }, isBuffer: function (e) {
                return null !== e && !a(e) && null !== e.constructor && !a(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
            }, isFormData: function (e) {
                return "undefined" != typeof FormData && e instanceof FormData
            }, isArrayBufferView: function (e) {
                return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
            }, isString: function (e) {
                return "string" == typeof e
            }, isNumber: function (e) {
                return "number" == typeof e
            }, isObject: s, isUndefined: a, isDate: function (e) {
                return "[object Date]" === i.call(e)
            }, isFile: function (e) {
                return "[object File]" === i.call(e)
            }, isBlob: function (e) {
                return "[object Blob]" === i.call(e)
            }, isFunction: c, isStream: function (e) {
                return s(e) && c(e.pipe)
            }, isURLSearchParams: function (e) {
                return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
            }, isStandardBrowserEnv: function () {
                return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document)
            }, forEach: u, merge: function e() {
                var t = {};

                function n(n, r) {
                    "object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = n
                }

                for (var r = 0, i = arguments.length; r < i; r++) u(arguments[r], n);
                return t
            }, deepMerge: function e() {
                var t = {};

                function n(n, r) {
                    "object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = "object" == typeof n ? e({}, n) : n
                }

                for (var r = 0, i = arguments.length; r < i; r++) u(arguments[r], n);
                return t
            }, extend: function (e, t, n) {
                return u(t, (function (t, i) {
                    e[i] = n && "function" == typeof t ? r(t, n) : t
                })), e
            }, trim: function (e) {
                return e.replace(/^\s*/, "").replace(/\s*$/, "")
            }
        }
    }, function (e, t) {
        var n = {}.hasOwnProperty;
        e.exports = function (e, t) {
            return n.call(e, t)
        }
    }, function (e, t, n) {
        var r = n(9), i = n(29);
        e.exports = n(8) ? function (e, t, n) {
            return r.f(e, t, i(1, n))
        } : function (e, t, n) {
            return e[t] = n, e
        }
    }, function (e, t, n) {
        var r = n(47), i = n(25);
        e.exports = function (e) {
            return r(i(e))
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(2);
        e.exports = function (e, t) {
            return !!e && r((function () {
                t ? e.call(null, (function () {
                }), 1) : e.call(null)
            }))
        }
    }, function (e, t, n) {
        var r = n(19);
        e.exports = function (e, t, n) {
            if (r(e), void 0 === t) return e;
            switch (n) {
                case 1:
                    return function (n) {
                        return e.call(t, n)
                    };
                case 2:
                    return function (n, r) {
                        return e.call(t, n, r)
                    };
                case 3:
                    return function (n, r, i) {
                        return e.call(t, n, r, i)
                    }
            }
            return function () {
                return e.apply(t, arguments)
            }
        }
    }, function (e, t) {
        e.exports = function (e) {
            if ("function" != typeof e) throw TypeError(e + " is not a function!");
            return e
        }
    }, function (e, t) {
        var n = Math.ceil, r = Math.floor;
        e.exports = function (e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
        }
    }, function (e, t, n) {
        var r = n(48), i = n(29), o = n(16), a = n(27), s = n(14), c = n(92), u = Object.getOwnPropertyDescriptor;
        t.f = n(8) ? u : function (e, t) {
            if (e = o(e), t = a(t, !0), c) try {
                return u(e, t)
            } catch (e) {
            }
            if (s(e, t)) return i(!r.f.call(e, t), e[t])
        }
    }, function (e, t, n) {
        var r = n(0), i = n(7), o = n(2);
        e.exports = function (e, t) {
            var n = (i.Object || {})[e] || Object[e], a = {};
            a[e] = t(n), r(r.S + r.F * o((function () {
                n(1)
            })), "Object", a)
        }
    }, function (e, t, n) {
        var r = n(18), i = n(47), o = n(10), a = n(6), s = n(108);
        e.exports = function (e, t) {
            var n = 1 == e, c = 2 == e, u = 3 == e, d = 4 == e, f = 6 == e, l = 5 == e || f, p = t || s;
            return function (t, s, h) {
                for (var v, _, m = o(t), E = i(m), y = r(s, h, 3), S = a(E.length), T = 0, g = n ? p(t, S) : c ? p(t, 0) : void 0; S > T; T++) if ((l || T in E) && (_ = y(v = E[T], T, m), e)) if (n) g[T] = _; else if (_) switch (e) {
                    case 3:
                        return !0;
                    case 5:
                        return v;
                    case 6:
                        return T;
                    case 2:
                        g.push(v)
                } else if (d) return !1;
                return f ? -1 : u || d ? d : g
            }
        }
    }, function (e, t) {
        var n = {}.toString;
        e.exports = function (e) {
            return n.call(e).slice(8, -1)
        }
    }, function (e, t) {
        e.exports = function (e) {
            if (null == e) throw TypeError("Can't call method on  " + e);
            return e
        }
    }, function (e, t, n) {
        "use strict";
        if (n(8)) {
            var r = n(31), i = n(1), o = n(2), a = n(0), s = n(63), c = n(88), u = n(18), d = n(44), f = n(29),
                l = n(15), p = n(45), h = n(20), v = n(6), _ = n(119), m = n(33), E = n(27), y = n(14), S = n(49),
                T = n(4), g = n(10), C = n(80), b = n(34), R = n(36), A = n(35).f, I = n(82), O = n(30), N = n(5),
                w = n(23), D = n(53), P = n(50), k = n(84), L = n(42), M = n(56), x = n(43), U = n(83), V = n(110),
                F = n(9), j = n(21), B = F.f, W = j.f, G = i.RangeError, H = i.TypeError, K = i.Uint8Array,
                Y = Array.prototype, J = c.ArrayBuffer, z = c.DataView, X = w(0), Q = w(2), q = w(3), $ = w(4),
                Z = w(5), ee = w(6), te = D(!0), ne = D(!1), re = k.values, ie = k.keys, oe = k.entries,
                ae = Y.lastIndexOf, se = Y.reduce, ce = Y.reduceRight, ue = Y.join, de = Y.sort, fe = Y.slice,
                le = Y.toString, pe = Y.toLocaleString, he = N("iterator"), ve = N("toStringTag"),
                _e = O("typed_constructor"), me = O("def_constructor"), Ee = s.CONSTR, ye = s.TYPED, Se = s.VIEW,
                Te = w(1, (function (e, t) {
                    return Ae(P(e, e[me]), t)
                })), ge = o((function () {
                    return 1 === new K(new Uint16Array([1]).buffer)[0]
                })), Ce = !!K && !!K.prototype.set && o((function () {
                    new K(1).set({})
                })), be = function (e, t) {
                    var n = h(e);
                    if (n < 0 || n % t) throw G("Wrong offset!");
                    return n
                }, Re = function (e) {
                    if (T(e) && ye in e) return e;
                    throw H(e + " is not a typed array!")
                }, Ae = function (e, t) {
                    if (!T(e) || !(_e in e)) throw H("It is not a typed array constructor!");
                    return new e(t)
                }, Ie = function (e, t) {
                    return Oe(P(e, e[me]), t)
                }, Oe = function (e, t) {
                    for (var n = 0, r = t.length, i = Ae(e, r); r > n;) i[n] = t[n++];
                    return i
                }, Ne = function (e, t, n) {
                    B(e, t, {
                        get: function () {
                            return this._d[n]
                        }
                    })
                }, we = function (e) {
                    var t, n, r, i, o, a, s = g(e), c = arguments.length, d = c > 1 ? arguments[1] : void 0,
                        f = void 0 !== d, l = I(s);
                    if (null != l && !C(l)) {
                        for (a = l.call(s), r = [], t = 0; !(o = a.next()).done; t++) r.push(o.value);
                        s = r
                    }
                    for (f && c > 2 && (d = u(d, arguments[2], 2)), t = 0, n = v(s.length), i = Ae(this, n); n > t; t++) i[t] = f ? d(s[t], t) : s[t];
                    return i
                }, De = function () {
                    for (var e = 0, t = arguments.length, n = Ae(this, t); t > e;) n[e] = arguments[e++];
                    return n
                }, Pe = !!K && o((function () {
                    pe.call(new K(1))
                })), ke = function () {
                    return pe.apply(Pe ? fe.call(Re(this)) : Re(this), arguments)
                }, Le = {
                    copyWithin: function (e, t) {
                        return V.call(Re(this), e, t, arguments.length > 2 ? arguments[2] : void 0)
                    }, every: function (e) {
                        return $(Re(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    }, fill: function (e) {
                        return U.apply(Re(this), arguments)
                    }, filter: function (e) {
                        return Ie(this, Q(Re(this), e, arguments.length > 1 ? arguments[1] : void 0))
                    }, find: function (e) {
                        return Z(Re(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    }, findIndex: function (e) {
                        return ee(Re(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    }, forEach: function (e) {
                        X(Re(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    }, indexOf: function (e) {
                        return ne(Re(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    }, includes: function (e) {
                        return te(Re(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    }, join: function (e) {
                        return ue.apply(Re(this), arguments)
                    }, lastIndexOf: function (e) {
                        return ae.apply(Re(this), arguments)
                    }, map: function (e) {
                        return Te(Re(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    }, reduce: function (e) {
                        return se.apply(Re(this), arguments)
                    }, reduceRight: function (e) {
                        return ce.apply(Re(this), arguments)
                    }, reverse: function () {
                        for (var e, t = Re(this).length, n = Math.floor(t / 2), r = 0; r < n;) e = this[r], this[r++] = this[--t], this[t] = e;
                        return this
                    }, some: function (e) {
                        return q(Re(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    }, sort: function (e) {
                        return de.call(Re(this), e)
                    }, subarray: function (e, t) {
                        var n = Re(this), r = n.length, i = m(e, r);
                        return new (P(n, n[me]))(n.buffer, n.byteOffset + i * n.BYTES_PER_ELEMENT, v((void 0 === t ? r : m(t, r)) - i))
                    }
                }, Me = function (e, t) {
                    return Ie(this, fe.call(Re(this), e, t))
                }, xe = function (e) {
                    Re(this);
                    var t = be(arguments[1], 1), n = this.length, r = g(e), i = v(r.length), o = 0;
                    if (i + t > n) throw G("Wrong length!");
                    for (; o < i;) this[t + o] = r[o++]
                }, Ue = {
                    entries: function () {
                        return oe.call(Re(this))
                    }, keys: function () {
                        return ie.call(Re(this))
                    }, values: function () {
                        return re.call(Re(this))
                    }
                }, Ve = function (e, t) {
                    return T(e) && e[ye] && "symbol" != typeof t && t in e && String(+t) == String(t)
                }, Fe = function (e, t) {
                    return Ve(e, t = E(t, !0)) ? f(2, e[t]) : W(e, t)
                }, je = function (e, t, n) {
                    return !(Ve(e, t = E(t, !0)) && T(n) && y(n, "value")) || y(n, "get") || y(n, "set") || n.configurable || y(n, "writable") && !n.writable || y(n, "enumerable") && !n.enumerable ? B(e, t, n) : (e[t] = n.value, e)
                };
            Ee || (j.f = Fe, F.f = je), a(a.S + a.F * !Ee, "Object", {
                getOwnPropertyDescriptor: Fe,
                defineProperty: je
            }), o((function () {
                le.call({})
            })) && (le = pe = function () {
                return ue.call(this)
            });
            var Be = p({}, Le);
            p(Be, Ue), l(Be, he, Ue.values), p(Be, {
                slice: Me, set: xe, constructor: function () {
                }, toString: le, toLocaleString: ke
            }), Ne(Be, "buffer", "b"), Ne(Be, "byteOffset", "o"), Ne(Be, "byteLength", "l"), Ne(Be, "length", "e"), B(Be, ve, {
                get: function () {
                    return this[ye]
                }
            }), e.exports = function (e, t, n, c) {
                var u = e + ((c = !!c) ? "Clamped" : "") + "Array", f = "get" + e, p = "set" + e, h = i[u], m = h || {},
                    E = h && R(h), y = !h || !s.ABV, g = {}, C = h && h.prototype, I = function (e, n) {
                        B(e, n, {
                            get: function () {
                                return function (e, n) {
                                    var r = e._d;
                                    return r.v[f](n * t + r.o, ge)
                                }(this, n)
                            }, set: function (e) {
                                return function (e, n, r) {
                                    var i = e._d;
                                    c && (r = (r = Math.round(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r), i.v[p](n * t + i.o, r, ge)
                                }(this, n, e)
                            }, enumerable: !0
                        })
                    };
                y ? (h = n((function (e, n, r, i) {
                    d(e, h, u, "_d");
                    var o, a, s, c, f = 0, p = 0;
                    if (T(n)) {
                        if (!(n instanceof J || "ArrayBuffer" == (c = S(n)) || "SharedArrayBuffer" == c)) return ye in n ? Oe(h, n) : we.call(h, n);
                        o = n, p = be(r, t);
                        var m = n.byteLength;
                        if (void 0 === i) {
                            if (m % t) throw G("Wrong length!");
                            if ((a = m - p) < 0) throw G("Wrong length!")
                        } else if ((a = v(i) * t) + p > m) throw G("Wrong length!");
                        s = a / t
                    } else s = _(n), o = new J(a = s * t);
                    for (l(e, "_d", {b: o, o: p, l: a, e: s, v: new z(o)}); f < s;) I(e, f++)
                })), C = h.prototype = b(Be), l(C, "constructor", h)) : o((function () {
                    h(1)
                })) && o((function () {
                    new h(-1)
                })) && M((function (e) {
                    new h, new h(null), new h(1.5), new h(e)
                }), !0) || (h = n((function (e, n, r, i) {
                    var o;
                    return d(e, h, u), T(n) ? n instanceof J || "ArrayBuffer" == (o = S(n)) || "SharedArrayBuffer" == o ? void 0 !== i ? new m(n, be(r, t), i) : void 0 !== r ? new m(n, be(r, t)) : new m(n) : ye in n ? Oe(h, n) : we.call(h, n) : new m(_(n))
                })), X(E !== Function.prototype ? A(m).concat(A(E)) : A(m), (function (e) {
                    e in h || l(h, e, m[e])
                })), h.prototype = C, r || (C.constructor = h));
                var O = C[he], N = !!O && ("values" == O.name || null == O.name), w = Ue.values;
                l(h, _e, !0), l(C, ye, u), l(C, Se, !0), l(C, me, h), (c ? new h(1)[ve] == u : ve in C) || B(C, ve, {
                    get: function () {
                        return u
                    }
                }), g[u] = h, a(a.G + a.W + a.F * (h != m), g), a(a.S, u, {BYTES_PER_ELEMENT: t}), a(a.S + a.F * o((function () {
                    m.of.call(h, 1)
                })), u, {
                    from: we,
                    of: De
                }), "BYTES_PER_ELEMENT" in C || l(C, "BYTES_PER_ELEMENT", t), a(a.P, u, Le), x(u), a(a.P + a.F * Ce, u, {set: xe}), a(a.P + a.F * !N, u, Ue), r || C.toString == le || (C.toString = le), a(a.P + a.F * o((function () {
                    new h(1).slice()
                })), u, {slice: Me}), a(a.P + a.F * (o((function () {
                    return [1, 2].toLocaleString() != new h([1, 2]).toLocaleString()
                })) || !o((function () {
                    C.toLocaleString.call([1, 2])
                }))), u, {toLocaleString: ke}), L[u] = N ? O : w, r || N || l(C, he, w)
            }
        } else e.exports = function () {
        }
    }, function (e, t, n) {
        var r = n(4);
        e.exports = function (e, t) {
            if (!r(e)) return e;
            var n, i;
            if (t && "function" == typeof (n = e.toString) && !r(i = n.call(e))) return i;
            if ("function" == typeof (n = e.valueOf) && !r(i = n.call(e))) return i;
            if (!t && "function" == typeof (n = e.toString) && !r(i = n.call(e))) return i;
            throw TypeError("Can't convert object to primitive value")
        }
    }, function (e, t, n) {
        var r = n(30)("meta"), i = n(4), o = n(14), a = n(9).f, s = 0, c = Object.isExtensible || function () {
            return !0
        }, u = !n(2)((function () {
            return c(Object.preventExtensions({}))
        })), d = function (e) {
            a(e, r, {value: {i: "O" + ++s, w: {}}})
        }, f = e.exports = {
            KEY: r, NEED: !1, fastKey: function (e, t) {
                if (!i(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                if (!o(e, r)) {
                    if (!c(e)) return "F";
                    if (!t) return "E";
                    d(e)
                }
                return e[r].i
            }, getWeak: function (e, t) {
                if (!o(e, r)) {
                    if (!c(e)) return !0;
                    if (!t) return !1;
                    d(e)
                }
                return e[r].w
            }, onFreeze: function (e) {
                return u && f.NEED && c(e) && !o(e, r) && d(e), e
            }
        }
    }, function (e, t) {
        e.exports = function (e, t) {
            return {enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t}
        }
    }, function (e, t) {
        var n = 0, r = Math.random();
        e.exports = function (e) {
            return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
        }
    }, function (e, t) {
        e.exports = !1
    }, function (e, t, n) {
        var r = n(94), i = n(67);
        e.exports = Object.keys || function (e) {
            return r(e, i)
        }
    }, function (e, t, n) {
        var r = n(20), i = Math.max, o = Math.min;
        e.exports = function (e, t) {
            return (e = r(e)) < 0 ? i(e + t, 0) : o(e, t)
        }
    }, function (e, t, n) {
        var r = n(3), i = n(95), o = n(67), a = n(66)("IE_PROTO"), s = function () {
        }, c = function () {
            var e, t = n(64)("iframe"), r = o.length;
            for (t.style.display = "none", n(68).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; r--;) delete c.prototype[o[r]];
            return c()
        };
        e.exports = Object.create || function (e, t) {
            var n;
            return null !== e ? (s.prototype = r(e), n = new s, s.prototype = null, n[a] = e) : n = c(), void 0 === t ? n : i(n, t)
        }
    }, function (e, t, n) {
        var r = n(94), i = n(67).concat("length", "prototype");
        t.f = Object.getOwnPropertyNames || function (e) {
            return r(e, i)
        }
    }, function (e, t, n) {
        var r = n(14), i = n(10), o = n(66)("IE_PROTO"), a = Object.prototype;
        e.exports = Object.getPrototypeOf || function (e) {
            return e = i(e), r(e, o) ? e[o] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null
        }
    }, function (e, t, n) {
        var r = n(5)("unscopables"), i = Array.prototype;
        null == i[r] && n(15)(i, r, {}), e.exports = function (e) {
            i[r][e] = !0
        }
    }, function (e, t, n) {
        var r = n(4);
        e.exports = function (e, t) {
            if (!r(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");
            return e
        }
    }, function (e) {
        e.exports = JSON.parse('{"name":"ar-rtc-sdk","version":"4.1.3","description":"For publishing npm package anyrtc SDK (Web). Get more information from https://www.anyrtc.io.","main":"./release/ArRTC@latest.js","scripts":{"build":"webpack --mode=production","dev":"webpack --mode=development","doc":"tsc & api-extractor run"},"typings":"./release/ar-rtc-sdk.d.ts","author":"https://www.anyrtc.io","keywords":["web","webrtc","ArRTC"],"license":"./LICENSES","devDependencies":{"@babel/polyfill":"^7.8.7","@types/node":"^13.13.25","awesome-typescript-loader":"^5.2.1","axios":"^0.19.2","electron":"^9.1.0","typescript":"^3.7.2","webpack":"^4.41.2","webpack-cli":"^3.3.10","webpack-sources":"^1.4.3"},"dependencies":{"webrtc-adapter":"^7.5.1"}}')
    }, function (e, t, n) {
        var r = n(9).f, i = n(14), o = n(5)("toStringTag");
        e.exports = function (e, t, n) {
            e && !i(e = n ? e : e.prototype, o) && r(e, o, {configurable: !0, value: t})
        }
    }, function (e, t, n) {
        var r = n(0), i = n(25), o = n(2), a = n(70), s = "[" + a + "]", c = RegExp("^" + s + s + "*"),
            u = RegExp(s + s + "*$"), d = function (e, t, n) {
                var i = {}, s = o((function () {
                    return !!a[e]() || "鈥嬄�" != "鈥嬄�"[e]()
                })), c = i[e] = s ? t(f) : a[e];
                n && (i[n] = c), r(r.P + r.F * s, "String", i)
            }, f = d.trim = function (e, t) {
                return e = String(i(e)), 1 & t && (e = e.replace(c, "")), 2 & t && (e = e.replace(u, "")), e
            };
        e.exports = d
    }, function (e, t) {
        e.exports = {}
    }, function (e, t, n) {
        "use strict";
        var r = n(1), i = n(9), o = n(8), a = n(5)("species");
        e.exports = function (e) {
            var t = r[e];
            o && t && !t[a] && i.f(t, a, {
                configurable: !0, get: function () {
                    return this
                }
            })
        }
    }, function (e, t) {
        e.exports = function (e, t, n, r) {
            if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
            return e
        }
    }, function (e, t, n) {
        var r = n(11);
        e.exports = function (e, t, n) {
            for (var i in t) r(e, i, t[i], n);
            return e
        }
    }, function (e, t, n) {
        "use strict";
        var r = {
            generateIdentifier: function () {
                return Math.random().toString(36).substr(2, 10)
            }
        };
        r.localCName = r.generateIdentifier(), r.splitLines = function (e) {
            return e.trim().split("\n").map((function (e) {
                return e.trim()
            }))
        }, r.splitSections = function (e) {
            return e.split("\nm=").map((function (e, t) {
                return (t > 0 ? "m=" + e : e).trim() + "\r\n"
            }))
        }, r.getDescription = function (e) {
            var t = r.splitSections(e);
            return t && t[0]
        }, r.getMediaSections = function (e) {
            var t = r.splitSections(e);
            return t.shift(), t
        }, r.matchPrefix = function (e, t) {
            return r.splitLines(e).filter((function (e) {
                return 0 === e.indexOf(t)
            }))
        }, r.parseCandidate = function (e) {
            for (var t, n = {
                foundation: (t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" "))[0],
                component: parseInt(t[1], 10),
                protocol: t[2].toLowerCase(),
                priority: parseInt(t[3], 10),
                ip: t[4],
                address: t[4],
                port: parseInt(t[5], 10),
                type: t[7]
            }, r = 8; r < t.length; r += 2) switch (t[r]) {
                case"raddr":
                    n.relatedAddress = t[r + 1];
                    break;
                case"rport":
                    n.relatedPort = parseInt(t[r + 1], 10);
                    break;
                case"tcptype":
                    n.tcpType = t[r + 1];
                    break;
                case"ufrag":
                    n.ufrag = t[r + 1], n.usernameFragment = t[r + 1];
                    break;
                default:
                    n[t[r]] = t[r + 1]
            }
            return n
        }, r.writeCandidate = function (e) {
            var t = [];
            t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.address || e.ip), t.push(e.port);
            var n = e.type;
            return t.push("typ"), t.push(n), "host" !== n && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), (e.usernameFragment || e.ufrag) && (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)), "candidate:" + t.join(" ")
        }, r.parseIceOptions = function (e) {
            return e.substr(14).split(" ")
        }, r.parseRtpMap = function (e) {
            var t = e.substr(9).split(" "), n = {payloadType: parseInt(t.shift(), 10)};
            return t = t[0].split("/"), n.name = t[0], n.clockRate = parseInt(t[1], 10), n.channels = 3 === t.length ? parseInt(t[2], 10) : 1, n.numChannels = n.channels, n
        }, r.writeRtpMap = function (e) {
            var t = e.payloadType;
            void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
            var n = e.channels || e.numChannels || 1;
            return "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== n ? "/" + n : "") + "\r\n"
        }, r.parseExtmap = function (e) {
            var t = e.substr(9).split(" ");
            return {
                id: parseInt(t[0], 10),
                direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
                uri: t[1]
            }
        }, r.writeExtmap = function (e) {
            return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction : "") + " " + e.uri + "\r\n"
        }, r.parseFmtp = function (e) {
            for (var t, n = {}, r = e.substr(e.indexOf(" ") + 1).split(";"), i = 0; i < r.length; i++) n[(t = r[i].trim().split("="))[0].trim()] = t[1];
            return n
        }, r.writeFmtp = function (e) {
            var t = "", n = e.payloadType;
            if (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
                var r = [];
                Object.keys(e.parameters).forEach((function (t) {
                    e.parameters[t] ? r.push(t + "=" + e.parameters[t]) : r.push(t)
                })), t += "a=fmtp:" + n + " " + r.join(";") + "\r\n"
            }
            return t
        }, r.parseRtcpFb = function (e) {
            var t = e.substr(e.indexOf(" ") + 1).split(" ");
            return {type: t.shift(), parameter: t.join(" ")}
        }, r.writeRtcpFb = function (e) {
            var t = "", n = e.payloadType;
            return void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach((function (e) {
                t += "a=rtcp-fb:" + n + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter : "") + "\r\n"
            })), t
        }, r.parseSsrcMedia = function (e) {
            var t = e.indexOf(" "), n = {ssrc: parseInt(e.substr(7, t - 7), 10)}, r = e.indexOf(":", t);
            return r > -1 ? (n.attribute = e.substr(t + 1, r - t - 1), n.value = e.substr(r + 1)) : n.attribute = e.substr(t + 1), n
        }, r.parseSsrcGroup = function (e) {
            var t = e.substr(13).split(" ");
            return {
                semantics: t.shift(), ssrcs: t.map((function (e) {
                    return parseInt(e, 10)
                }))
            }
        }, r.getMid = function (e) {
            var t = r.matchPrefix(e, "a=mid:")[0];
            if (t) return t.substr(6)
        }, r.parseFingerprint = function (e) {
            var t = e.substr(14).split(" ");
            return {algorithm: t[0].toLowerCase(), value: t[1]}
        }, r.getDtlsParameters = function (e, t) {
            return {role: "auto", fingerprints: r.matchPrefix(e + t, "a=fingerprint:").map(r.parseFingerprint)}
        }, r.writeDtlsParameters = function (e, t) {
            var n = "a=setup:" + t + "\r\n";
            return e.fingerprints.forEach((function (e) {
                n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
            })), n
        }, r.parseCryptoLine = function (e) {
            var t = e.substr(9).split(" ");
            return {tag: parseInt(t[0], 10), cryptoSuite: t[1], keyParams: t[2], sessionParams: t.slice(3)}
        }, r.writeCryptoLine = function (e) {
            return "a=crypto:" + e.tag + " " + e.cryptoSuite + " " + ("object" == typeof e.keyParams ? r.writeCryptoKeyParams(e.keyParams) : e.keyParams) + (e.sessionParams ? " " + e.sessionParams.join(" ") : "") + "\r\n"
        }, r.parseCryptoKeyParams = function (e) {
            if (0 !== e.indexOf("inline:")) return null;
            var t = e.substr(7).split("|");
            return {
                keyMethod: "inline",
                keySalt: t[0],
                lifeTime: t[1],
                mkiValue: t[2] ? t[2].split(":")[0] : void 0,
                mkiLength: t[2] ? t[2].split(":")[1] : void 0
            }
        }, r.writeCryptoKeyParams = function (e) {
            return e.keyMethod + ":" + e.keySalt + (e.lifeTime ? "|" + e.lifeTime : "") + (e.mkiValue && e.mkiLength ? "|" + e.mkiValue + ":" + e.mkiLength : "")
        }, r.getCryptoParameters = function (e, t) {
            return r.matchPrefix(e + t, "a=crypto:").map(r.parseCryptoLine)
        }, r.getIceParameters = function (e, t) {
            var n = r.matchPrefix(e + t, "a=ice-ufrag:")[0], i = r.matchPrefix(e + t, "a=ice-pwd:")[0];
            return n && i ? {usernameFragment: n.substr(12), password: i.substr(10)} : null
        }, r.writeIceParameters = function (e) {
            return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"
        }, r.parseRtpParameters = function (e) {
            for (var t = {
                codecs: [],
                headerExtensions: [],
                fecMechanisms: [],
                rtcp: []
            }, n = r.splitLines(e)[0].split(" "), i = 3; i < n.length; i++) {
                var o = n[i], a = r.matchPrefix(e, "a=rtpmap:" + o + " ")[0];
                if (a) {
                    var s = r.parseRtpMap(a), c = r.matchPrefix(e, "a=fmtp:" + o + " ");
                    switch (s.parameters = c.length ? r.parseFmtp(c[0]) : {}, s.rtcpFeedback = r.matchPrefix(e, "a=rtcp-fb:" + o + " ").map(r.parseRtcpFb), t.codecs.push(s), s.name.toUpperCase()) {
                        case"RED":
                        case"ULPFEC":
                            t.fecMechanisms.push(s.name.toUpperCase())
                    }
                }
            }
            return r.matchPrefix(e, "a=extmap:").forEach((function (e) {
                t.headerExtensions.push(r.parseExtmap(e))
            })), t
        }, r.writeRtpDescription = function (e, t) {
            var n = "";
            n += "m=" + e + " ", n += t.codecs.length > 0 ? "9" : "0", n += " UDP/TLS/RTP/SAVPF ", n += t.codecs.map((function (e) {
                return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType
            })).join(" ") + "\r\n", n += "c=IN IP4 0.0.0.0\r\n", n += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach((function (e) {
                n += r.writeRtpMap(e), n += r.writeFmtp(e), n += r.writeRtcpFb(e)
            }));
            var i = 0;
            return t.codecs.forEach((function (e) {
                e.maxptime > i && (i = e.maxptime)
            })), i > 0 && (n += "a=maxptime:" + i + "\r\n"), n += "a=rtcp-mux\r\n", t.headerExtensions && t.headerExtensions.forEach((function (e) {
                n += r.writeExtmap(e)
            })), n
        }, r.parseRtpEncodingParameters = function (e) {
            var t, n = [], i = r.parseRtpParameters(e), o = -1 !== i.fecMechanisms.indexOf("RED"),
                a = -1 !== i.fecMechanisms.indexOf("ULPFEC"), s = r.matchPrefix(e, "a=ssrc:").map((function (e) {
                    return r.parseSsrcMedia(e)
                })).filter((function (e) {
                    return "cname" === e.attribute
                })), c = s.length > 0 && s[0].ssrc, u = r.matchPrefix(e, "a=ssrc-group:FID").map((function (e) {
                    return e.substr(17).split(" ").map((function (e) {
                        return parseInt(e, 10)
                    }))
                }));
            u.length > 0 && u[0].length > 1 && u[0][0] === c && (t = u[0][1]), i.codecs.forEach((function (e) {
                if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
                    var r = {ssrc: c, codecPayloadType: parseInt(e.parameters.apt, 10)};
                    c && t && (r.rtx = {ssrc: t}), n.push(r), o && ((r = JSON.parse(JSON.stringify(r))).fec = {
                        ssrc: c,
                        mechanism: a ? "red+ulpfec" : "red"
                    }, n.push(r))
                }
            })), 0 === n.length && c && n.push({ssrc: c});
            var d = r.matchPrefix(e, "b=");
            return d.length && (d = 0 === d[0].indexOf("b=TIAS:") ? parseInt(d[0].substr(7), 10) : 0 === d[0].indexOf("b=AS:") ? 1e3 * parseInt(d[0].substr(5), 10) * .95 - 16e3 : void 0, n.forEach((function (e) {
                e.maxBitrate = d
            }))), n
        }, r.parseRtcpParameters = function (e) {
            var t = {}, n = r.matchPrefix(e, "a=ssrc:").map((function (e) {
                return r.parseSsrcMedia(e)
            })).filter((function (e) {
                return "cname" === e.attribute
            }))[0];
            n && (t.cname = n.value, t.ssrc = n.ssrc);
            var i = r.matchPrefix(e, "a=rtcp-rsize");
            t.reducedSize = i.length > 0, t.compound = 0 === i.length;
            var o = r.matchPrefix(e, "a=rtcp-mux");
            return t.mux = o.length > 0, t
        }, r.parseMsid = function (e) {
            var t, n = r.matchPrefix(e, "a=msid:");
            if (1 === n.length) return {stream: (t = n[0].substr(7).split(" "))[0], track: t[1]};
            var i = r.matchPrefix(e, "a=ssrc:").map((function (e) {
                return r.parseSsrcMedia(e)
            })).filter((function (e) {
                return "msid" === e.attribute
            }));
            return i.length > 0 ? {stream: (t = i[0].value.split(" "))[0], track: t[1]} : void 0
        }, r.parseSctpDescription = function (e) {
            var t, n = r.parseMLine(e), i = r.matchPrefix(e, "a=max-message-size:");
            i.length > 0 && (t = parseInt(i[0].substr(19), 10)), isNaN(t) && (t = 65536);
            var o = r.matchPrefix(e, "a=sctp-port:");
            if (o.length > 0) return {port: parseInt(o[0].substr(12), 10), protocol: n.fmt, maxMessageSize: t};
            if (r.matchPrefix(e, "a=sctpmap:").length > 0) {
                var a = r.matchPrefix(e, "a=sctpmap:")[0].substr(10).split(" ");
                return {port: parseInt(a[0], 10), protocol: a[1], maxMessageSize: t}
            }
        }, r.writeSctpDescription = function (e, t) {
            var n = [];
            return n = "DTLS/SCTP" !== e.protocol ? ["m=" + e.kind + " 9 " + e.protocol + " " + t.protocol + "\r\n", "c=IN IP4 0.0.0.0\r\n", "a=sctp-port:" + t.port + "\r\n"] : ["m=" + e.kind + " 9 " + e.protocol + " " + t.port + "\r\n", "c=IN IP4 0.0.0.0\r\n", "a=sctpmap:" + t.port + " " + t.protocol + " 65535\r\n"], void 0 !== t.maxMessageSize && n.push("a=max-message-size:" + t.maxMessageSize + "\r\n"), n.join("")
        }, r.generateSessionId = function () {
            return Math.random().toString().substr(2, 21)
        }, r.writeSessionBoilerplate = function (e, t, n) {
            var i = void 0 !== t ? t : 2;
            return "v=0\r\no=" + (n || "thisisadapterortc") + " " + (e || r.generateSessionId()) + " " + i + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
        }, r.writeMediaSection = function (e, t, n, i) {
            var o = r.writeRtpDescription(e.kind, t);
            if (o += r.writeIceParameters(e.iceGatherer.getLocalParameters()), o += r.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass" : "active"), o += "a=mid:" + e.mid + "\r\n", e.direction ? o += "a=" + e.direction + "\r\n" : e.rtpSender && e.rtpReceiver ? o += "a=sendrecv\r\n" : e.rtpSender ? o += "a=sendonly\r\n" : e.rtpReceiver ? o += "a=recvonly\r\n" : o += "a=inactive\r\n", e.rtpSender) {
                var a = "msid:" + i.id + " " + e.rtpSender.track.id + "\r\n";
                o += "a=" + a, o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + a, e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + a, o += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
            }
            return o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + r.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + r.localCName + "\r\n"), o
        }, r.getDirection = function (e, t) {
            for (var n = r.splitLines(e), i = 0; i < n.length; i++) switch (n[i]) {
                case"a=sendrecv":
                case"a=sendonly":
                case"a=recvonly":
                case"a=inactive":
                    return n[i].substr(2)
            }
            return t ? r.getDirection(t) : "sendrecv"
        }, r.getKind = function (e) {
            return r.splitLines(e)[0].split(" ")[0].substr(2)
        }, r.isRejected = function (e) {
            return "0" === e.split(" ", 2)[1]
        }, r.parseMLine = function (e) {
            var t = r.splitLines(e)[0].substr(2).split(" ");
            return {kind: t[0], port: parseInt(t[1], 10), protocol: t[2], fmt: t.slice(3).join(" ")}
        }, r.parseOLine = function (e) {
            var t = r.matchPrefix(e, "o=")[0].substr(2).split(" ");
            return {
                username: t[0],
                sessionId: t[1],
                sessionVersion: parseInt(t[2], 10),
                netType: t[3],
                addressType: t[4],
                address: t[5]
            }
        }, r.isValidSDP = function (e) {
            if ("string" != typeof e || 0 === e.length) return !1;
            for (var t = r.splitLines(e), n = 0; n < t.length; n++) if (t[n].length < 2 || "=" !== t[n].charAt(1)) return !1;
            return !0
        }, e.exports = r
    }, function (e, t, n) {
        var r = n(24);
        e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
            return "String" == r(e) ? e.split("") : Object(e)
        }
    }, function (e, t) {
        t.f = {}.propertyIsEnumerable
    }, function (e, t, n) {
        var r = n(24), i = n(5)("toStringTag"), o = "Arguments" == r(function () {
            return arguments
        }());
        e.exports = function (e) {
            var t, n, a;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {
                try {
                    return e[t]
                } catch (e) {
                }
            }(t = Object(e), i)) ? n : o ? r(t) : "Object" == (a = r(t)) && "function" == typeof t.callee ? "Arguments" : a
        }
    }, function (e, t, n) {
        var r = n(3), i = n(19), o = n(5)("species");
        e.exports = function (e, t) {
            var n, a = r(e).constructor;
            return void 0 === a || null == (n = r(a)[o]) ? t : i(n)
        }
    }, function (e, t, n) {
        e.exports = n(321)
    }, function (e, t, n) {
        var r = n(7), i = n(1), o = i["__core-js_shared__"] || (i["__core-js_shared__"] = {});
        (e.exports = function (e, t) {
            return o[e] || (o[e] = void 0 !== t ? t : {})
        })("versions", []).push({
            version: r.version,
            mode: n(31) ? "pure" : "global",
            copyright: "漏 2019 Denis Pushkarev (zloirock.ru)"
        })
    }, function (e, t, n) {
        var r = n(16), i = n(6), o = n(33);
        e.exports = function (e) {
            return function (t, n, a) {
                var s, c = r(t), u = i(c.length), d = o(a, u);
                if (e && n != n) {
                    for (; u > d;) if ((s = c[d++]) != s) return !0
                } else for (; u > d; d++) if ((e || d in c) && c[d] === n) return e || d || 0;
                return !e && -1
            }
        }
    }, function (e, t) {
        t.f = Object.getOwnPropertySymbols
    }, function (e, t, n) {
        var r = n(24);
        e.exports = Array.isArray || function (e) {
            return "Array" == r(e)
        }
    }, function (e, t, n) {
        var r = n(5)("iterator"), i = !1;
        try {
            var o = [7][r]();
            o.return = function () {
                i = !0
            }, Array.from(o, (function () {
                throw 2
            }))
        } catch (e) {
        }
        e.exports = function (e, t) {
            if (!t && !i) return !1;
            var n = !1;
            try {
                var o = [7], a = o[r]();
                a.next = function () {
                    return {done: n = !0}
                }, o[r] = function () {
                    return a
                }, e(o)
            } catch (e) {
            }
            return n
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(3);
        e.exports = function () {
            var e = r(this), t = "";
            return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(49), i = RegExp.prototype.exec;
        e.exports = function (e, t) {
            var n = e.exec;
            if ("function" == typeof n) {
                var o = n.call(e, t);
                if ("object" != typeof o) throw new TypeError("RegExp exec method returned something other than an Object or null");
                return o
            }
            if ("RegExp" !== r(e)) throw new TypeError("RegExp#exec called on incompatible receiver");
            return i.call(e, t)
        }
    }, function (e, t, n) {
        "use strict";
        n(112);
        var r = n(11), i = n(15), o = n(2), a = n(25), s = n(5), c = n(85), u = s("species"), d = !o((function () {
            var e = /./;
            return e.exec = function () {
                var e = [];
                return e.groups = {a: "7"}, e
            }, "7" !== "".replace(e, "$<a>")
        })), f = function () {
            var e = /(?:)/, t = e.exec;
            e.exec = function () {
                return t.apply(this, arguments)
            };
            var n = "ab".split(e);
            return 2 === n.length && "a" === n[0] && "b" === n[1]
        }();
        e.exports = function (e, t, n) {
            var l = s(e), p = !o((function () {
                var t = {};
                return t[l] = function () {
                    return 7
                }, 7 != ""[e](t)
            })), h = p ? !o((function () {
                var t = !1, n = /a/;
                return n.exec = function () {
                    return t = !0, null
                }, "split" === e && (n.constructor = {}, n.constructor[u] = function () {
                    return n
                }), n[l](""), !t
            })) : void 0;
            if (!p || !h || "replace" === e && !d || "split" === e && !f) {
                var v = /./[l], _ = n(a, l, ""[e], (function (e, t, n, r, i) {
                    return t.exec === c ? p && !i ? {done: !0, value: v.call(t, n, r)} : {
                        done: !0,
                        value: e.call(n, t, r)
                    } : {done: !1}
                })), m = _[0], E = _[1];
                r(String.prototype, e, m), i(RegExp.prototype, l, 2 == t ? function (e, t) {
                    return E.call(e, this, t)
                } : function (e) {
                    return E.call(e, this)
                })
            }
        }
    }, function (e, t, n) {
        var r = n(18), i = n(107), o = n(80), a = n(3), s = n(6), c = n(82), u = {}, d = {};
        (t = e.exports = function (e, t, n, f, l) {
            var p, h, v, _, m = l ? function () {
                return e
            } : c(e), E = r(n, f, t ? 2 : 1), y = 0;
            if ("function" != typeof m) throw TypeError(e + " is not iterable!");
            if (o(m)) {
                for (p = s(e.length); p > y; y++) if ((_ = t ? E(a(h = e[y])[0], h[1]) : E(e[y])) === u || _ === d) return _
            } else for (v = m.call(e); !(h = v.next()).done;) if ((_ = i(v, E, h.value, t)) === u || _ === d) return _
        }).BREAK = u, t.RETURN = d
    }, function (e, t, n) {
        var r = n(1).navigator;
        e.exports = r && r.userAgent || ""
    }, function (e, t, n) {
        "use strict";
        var r = n(1), i = n(0), o = n(11), a = n(45), s = n(28), c = n(60), u = n(44), d = n(4), f = n(2), l = n(56),
            p = n(40), h = n(71);
        e.exports = function (e, t, n, v, _, m) {
            var E = r[e], y = E, S = _ ? "set" : "add", T = y && y.prototype, g = {}, C = function (e) {
                var t = T[e];
                o(T, e, "delete" == e || "has" == e ? function (e) {
                    return !(m && !d(e)) && t.call(this, 0 === e ? 0 : e)
                } : "get" == e ? function (e) {
                    return m && !d(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                } : "add" == e ? function (e) {
                    return t.call(this, 0 === e ? 0 : e), this
                } : function (e, n) {
                    return t.call(this, 0 === e ? 0 : e, n), this
                })
            };
            if ("function" == typeof y && (m || T.forEach && !f((function () {
                (new y).entries().next()
            })))) {
                var b = new y, R = b[S](m ? {} : -0, 1) != b, A = f((function () {
                    b.has(1)
                })), I = l((function (e) {
                    new y(e)
                })), O = !m && f((function () {
                    for (var e = new y, t = 5; t--;) e[S](t, t);
                    return !e.has(-0)
                }));
                I || ((y = t((function (t, n) {
                    u(t, y, e);
                    var r = h(new E, t, y);
                    return null != n && c(n, _, r[S], r), r
                }))).prototype = T, T.constructor = y), (A || O) && (C("delete"), C("has"), _ && C("get")), (O || R) && C(S), m && T.clear && delete T.clear
            } else y = v.getConstructor(t, e, _, S), a(y.prototype, n), s.NEED = !0;
            return p(y, e), g[e] = y, i(i.G + i.W + i.F * (y != E), g), m || v.setStrong(y, e, _), y
        }
    }, function (e, t, n) {
        for (var r, i = n(1), o = n(15), a = n(30), s = a("typed_array"), c = a("view"), u = !(!i.ArrayBuffer || !i.DataView), d = u, f = 0, l = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(","); f < 9;) (r = i[l[f++]]) ? (o(r.prototype, s, !0), o(r.prototype, c, !0)) : d = !1;
        e.exports = {ABV: u, CONSTR: d, TYPED: s, VIEW: c}
    }, function (e, t, n) {
        var r = n(4), i = n(1).document, o = r(i) && r(i.createElement);
        e.exports = function (e) {
            return o ? i.createElement(e) : {}
        }
    }, function (e, t, n) {
        t.f = n(5)
    }, function (e, t, n) {
        var r = n(52)("keys"), i = n(30);
        e.exports = function (e) {
            return r[e] || (r[e] = i(e))
        }
    }, function (e, t) {
        e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
    }, function (e, t, n) {
        var r = n(1).document;
        e.exports = r && r.documentElement
    }, function (e, t, n) {
        var r = n(4), i = n(3), o = function (e, t) {
            if (i(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
        e.exports = {
            set: Object.setPrototypeOf || ("__proto__" in {} ? function (e, t, r) {
                try {
                    (r = n(18)(Function.call, n(21).f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array)
                } catch (e) {
                    t = !0
                }
                return function (e, n) {
                    return o(e, n), t ? e.__proto__ = n : r(e, n), e
                }
            }({}, !1) : void 0), check: o
        }
    }, function (e, t) {
        e.exports = "\t\n\v\f\r 聽釟€釥庘€€鈥佲€傗€冣€勨€呪€嗏€団€堚€夆€娾€仧銆€\u2028\u2029\ufeff"
    }, function (e, t, n) {
        var r = n(4), i = n(69).set;
        e.exports = function (e, t, n) {
            var o, a = t.constructor;
            return a !== n && "function" == typeof a && (o = a.prototype) !== n.prototype && r(o) && i && i(e, o), e
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(20), i = n(25);
        e.exports = function (e) {
            var t = String(i(this)), n = "", o = r(e);
            if (o < 0 || o == 1 / 0) throw RangeError("Count can't be negative");
            for (; o > 0; (o >>>= 1) && (t += t)) 1 & o && (n += t);
            return n
        }
    }, function (e, t) {
        e.exports = Math.sign || function (e) {
            return 0 == (e = +e) || e != e ? e : e < 0 ? -1 : 1
        }
    }, function (e, t) {
        var n = Math.expm1;
        e.exports = !n || n(10) > 22025.465794806718 || n(10) < 22025.465794806718 || -2e-17 != n(-2e-17) ? function (e) {
            return 0 == (e = +e) ? e : e > -1e-6 && e < 1e-6 ? e + e * e / 2 : Math.exp(e) - 1
        } : n
    }, function (e, t, n) {
        var r = n(20), i = n(25);
        e.exports = function (e) {
            return function (t, n) {
                var o, a, s = String(i(t)), c = r(n), u = s.length;
                return c < 0 || c >= u ? e ? "" : void 0 : (o = s.charCodeAt(c)) < 55296 || o > 56319 || c + 1 === u || (a = s.charCodeAt(c + 1)) < 56320 || a > 57343 ? e ? s.charAt(c) : o : e ? s.slice(c, c + 2) : a - 56320 + (o - 55296 << 10) + 65536
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(31), i = n(0), o = n(11), a = n(15), s = n(42), c = n(106), u = n(40), d = n(36),
            f = n(5)("iterator"), l = !([].keys && "next" in [].keys()), p = function () {
                return this
            };
        e.exports = function (e, t, n, h, v, _, m) {
            c(n, t, h);
            var E, y, S, T = function (e) {
                    if (!l && e in R) return R[e];
                    switch (e) {
                        case"keys":
                        case"values":
                            return function () {
                                return new n(this, e)
                            }
                    }
                    return function () {
                        return new n(this, e)
                    }
                }, g = t + " Iterator", C = "values" == v, b = !1, R = e.prototype,
                A = R[f] || R["@@iterator"] || v && R[v], I = A || T(v), O = v ? C ? T("entries") : I : void 0,
                N = "Array" == t && R.entries || A;
            if (N && (S = d(N.call(new e))) !== Object.prototype && S.next && (u(S, g, !0), r || "function" == typeof S[f] || a(S, f, p)), C && A && "values" !== A.name && (b = !0, I = function () {
                return A.call(this)
            }), r && !m || !l && !b && R[f] || a(R, f, I), s[t] = I, s[g] = p, v) if (E = {
                values: C ? I : T("values"),
                keys: _ ? I : T("keys"),
                entries: O
            }, m) for (y in E) y in R || o(R, y, E[y]); else i(i.P + i.F * (l || b), t, E);
            return E
        }
    }, function (e, t, n) {
        var r = n(78), i = n(25);
        e.exports = function (e, t, n) {
            if (r(t)) throw TypeError("String#" + n + " doesn't accept regex!");
            return String(i(e))
        }
    }, function (e, t, n) {
        var r = n(4), i = n(24), o = n(5)("match");
        e.exports = function (e) {
            var t;
            return r(e) && (void 0 !== (t = e[o]) ? !!t : "RegExp" == i(e))
        }
    }, function (e, t, n) {
        var r = n(5)("match");
        e.exports = function (e) {
            var t = /./;
            try {
                "/./"[e](t)
            } catch (n) {
                try {
                    return t[r] = !1, !"/./"[e](t)
                } catch (e) {
                }
            }
            return !0
        }
    }, function (e, t, n) {
        var r = n(42), i = n(5)("iterator"), o = Array.prototype;
        e.exports = function (e) {
            return void 0 !== e && (r.Array === e || o[i] === e)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(9), i = n(29);
        e.exports = function (e, t, n) {
            t in e ? r.f(e, t, i(0, n)) : e[t] = n
        }
    }, function (e, t, n) {
        var r = n(49), i = n(5)("iterator"), o = n(42);
        e.exports = n(7).getIteratorMethod = function (e) {
            if (null != e) return e[i] || e["@@iterator"] || o[r(e)]
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(10), i = n(33), o = n(6);
        e.exports = function (e) {
            for (var t = r(this), n = o(t.length), a = arguments.length, s = i(a > 1 ? arguments[1] : void 0, n), c = a > 2 ? arguments[2] : void 0, u = void 0 === c ? n : i(c, n); u > s;) t[s++] = e;
            return t
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(37), i = n(111), o = n(42), a = n(16);
        e.exports = n(76)(Array, "Array", (function (e, t) {
            this._t = a(e), this._i = 0, this._k = t
        }), (function () {
            var e = this._t, t = this._k, n = this._i++;
            return !e || n >= e.length ? (this._t = void 0, i(1)) : i(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]])
        }), "values"), o.Arguments = o.Array, r("keys"), r("values"), r("entries")
    }, function (e, t, n) {
        "use strict";
        var r, i, o = n(57), a = RegExp.prototype.exec, s = String.prototype.replace, c = a,
            u = (r = /a/, i = /b*/g, a.call(r, "a"), a.call(i, "a"), 0 !== r.lastIndex || 0 !== i.lastIndex),
            d = void 0 !== /()??/.exec("")[1];
        (u || d) && (c = function (e) {
            var t, n, r, i, c = this;
            return d && (n = new RegExp("^" + c.source + "$(?!\\s)", o.call(c))), u && (t = c.lastIndex), r = a.call(c, e), u && r && (c.lastIndex = c.global ? r.index + r[0].length : t), d && r && r.length > 1 && s.call(r[0], n, (function () {
                for (i = 1; i < arguments.length - 2; i++) void 0 === arguments[i] && (r[i] = void 0)
            })), r
        }), e.exports = c
    }, function (e, t, n) {
        "use strict";
        var r = n(75)(!0);
        e.exports = function (e, t, n) {
            return t + (n ? r(e, t).length : 1)
        }
    }, function (e, t, n) {
        var r, i, o, a = n(18), s = n(100), c = n(68), u = n(64), d = n(1), f = d.process, l = d.setImmediate,
            p = d.clearImmediate, h = d.MessageChannel, v = d.Dispatch, _ = 0, m = {}, E = function () {
                var e = +this;
                if (m.hasOwnProperty(e)) {
                    var t = m[e];
                    delete m[e], t()
                }
            }, y = function (e) {
                E.call(e.data)
            };
        l && p || (l = function (e) {
            for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
            return m[++_] = function () {
                s("function" == typeof e ? e : Function(e), t)
            }, r(_), _
        }, p = function (e) {
            delete m[e]
        }, "process" == n(24)(f) ? r = function (e) {
            f.nextTick(a(E, e, 1))
        } : v && v.now ? r = function (e) {
            v.now(a(E, e, 1))
        } : h ? (o = (i = new h).port2, i.port1.onmessage = y, r = a(o.postMessage, o, 1)) : d.addEventListener && "function" == typeof postMessage && !d.importScripts ? (r = function (e) {
            d.postMessage(e + "", "*")
        }, d.addEventListener("message", y, !1)) : r = "onreadystatechange" in u("script") ? function (e) {
            c.appendChild(u("script")).onreadystatechange = function () {
                c.removeChild(this), E.call(e)
            }
        } : function (e) {
            setTimeout(a(E, e, 1), 0)
        }), e.exports = {set: l, clear: p}
    }, function (e, t, n) {
        "use strict";
        var r = n(1), i = n(8), o = n(31), a = n(63), s = n(15), c = n(45), u = n(2), d = n(44), f = n(20), l = n(6),
            p = n(119), h = n(35).f, v = n(9).f, _ = n(83), m = n(40), E = r.ArrayBuffer, y = r.DataView, S = r.Math,
            T = r.RangeError, g = r.Infinity, C = E, b = S.abs, R = S.pow, A = S.floor, I = S.log, O = S.LN2,
            N = i ? "_b" : "buffer", w = i ? "_l" : "byteLength", D = i ? "_o" : "byteOffset";

        function P(e, t, n) {
            var r, i, o, a = new Array(n), s = 8 * n - t - 1, c = (1 << s) - 1, u = c >> 1,
                d = 23 === t ? R(2, -24) - R(2, -77) : 0, f = 0, l = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
            for ((e = b(e)) != e || e === g ? (i = e != e ? 1 : 0, r = c) : (r = A(I(e) / O), e * (o = R(2, -r)) < 1 && (r--, o *= 2), (e += r + u >= 1 ? d / o : d * R(2, 1 - u)) * o >= 2 && (r++, o /= 2), r + u >= c ? (i = 0, r = c) : r + u >= 1 ? (i = (e * o - 1) * R(2, t), r += u) : (i = e * R(2, u - 1) * R(2, t), r = 0)); t >= 8; a[f++] = 255 & i, i /= 256, t -= 8) ;
            for (r = r << t | i, s += t; s > 0; a[f++] = 255 & r, r /= 256, s -= 8) ;
            return a[--f] |= 128 * l, a
        }

        function k(e, t, n) {
            var r, i = 8 * n - t - 1, o = (1 << i) - 1, a = o >> 1, s = i - 7, c = n - 1, u = e[c--], d = 127 & u;
            for (u >>= 7; s > 0; d = 256 * d + e[c], c--, s -= 8) ;
            for (r = d & (1 << -s) - 1, d >>= -s, s += t; s > 0; r = 256 * r + e[c], c--, s -= 8) ;
            if (0 === d) d = 1 - a; else {
                if (d === o) return r ? NaN : u ? -g : g;
                r += R(2, t), d -= a
            }
            return (u ? -1 : 1) * r * R(2, d - t)
        }

        function L(e) {
            return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0]
        }

        function M(e) {
            return [255 & e]
        }

        function x(e) {
            return [255 & e, e >> 8 & 255]
        }

        function U(e) {
            return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255]
        }

        function V(e) {
            return P(e, 52, 8)
        }

        function F(e) {
            return P(e, 23, 4)
        }

        function j(e, t, n) {
            v(e.prototype, t, {
                get: function () {
                    return this[n]
                }
            })
        }

        function B(e, t, n, r) {
            var i = p(+n);
            if (i + t > e[w]) throw T("Wrong index!");
            var o = e[N]._b, a = i + e[D], s = o.slice(a, a + t);
            return r ? s : s.reverse()
        }

        function W(e, t, n, r, i, o) {
            var a = p(+n);
            if (a + t > e[w]) throw T("Wrong index!");
            for (var s = e[N]._b, c = a + e[D], u = r(+i), d = 0; d < t; d++) s[c + d] = u[o ? d : t - d - 1]
        }

        if (a.ABV) {
            if (!u((function () {
                E(1)
            })) || !u((function () {
                new E(-1)
            })) || u((function () {
                return new E, new E(1.5), new E(NaN), "ArrayBuffer" != E.name
            }))) {
                for (var G, H = (E = function (e) {
                    return d(this, E), new C(p(e))
                }).prototype = C.prototype, K = h(C), Y = 0; K.length > Y;) (G = K[Y++]) in E || s(E, G, C[G]);
                o || (H.constructor = E)
            }
            var J = new y(new E(2)), z = y.prototype.setInt8;
            J.setInt8(0, 2147483648), J.setInt8(1, 2147483649), !J.getInt8(0) && J.getInt8(1) || c(y.prototype, {
                setInt8: function (e, t) {
                    z.call(this, e, t << 24 >> 24)
                }, setUint8: function (e, t) {
                    z.call(this, e, t << 24 >> 24)
                }
            }, !0)
        } else E = function (e) {
            d(this, E, "ArrayBuffer");
            var t = p(e);
            this._b = _.call(new Array(t), 0), this[w] = t
        }, y = function (e, t, n) {
            d(this, y, "DataView"), d(e, E, "DataView");
            var r = e[w], i = f(t);
            if (i < 0 || i > r) throw T("Wrong offset!");
            if (i + (n = void 0 === n ? r - i : l(n)) > r) throw T("Wrong length!");
            this[N] = e, this[D] = i, this[w] = n
        }, i && (j(E, "byteLength", "_l"), j(y, "buffer", "_b"), j(y, "byteLength", "_l"), j(y, "byteOffset", "_o")), c(y.prototype, {
            getInt8: function (e) {
                return B(this, 1, e)[0] << 24 >> 24
            }, getUint8: function (e) {
                return B(this, 1, e)[0]
            }, getInt16: function (e) {
                var t = B(this, 2, e, arguments[1]);
                return (t[1] << 8 | t[0]) << 16 >> 16
            }, getUint16: function (e) {
                var t = B(this, 2, e, arguments[1]);
                return t[1] << 8 | t[0]
            }, getInt32: function (e) {
                return L(B(this, 4, e, arguments[1]))
            }, getUint32: function (e) {
                return L(B(this, 4, e, arguments[1])) >>> 0
            }, getFloat32: function (e) {
                return k(B(this, 4, e, arguments[1]), 23, 4)
            }, getFloat64: function (e) {
                return k(B(this, 8, e, arguments[1]), 52, 8)
            }, setInt8: function (e, t) {
                W(this, 1, e, M, t)
            }, setUint8: function (e, t) {
                W(this, 1, e, M, t)
            }, setInt16: function (e, t) {
                W(this, 2, e, x, t, arguments[2])
            }, setUint16: function (e, t) {
                W(this, 2, e, x, t, arguments[2])
            }, setInt32: function (e, t) {
                W(this, 4, e, U, t, arguments[2])
            }, setUint32: function (e, t) {
                W(this, 4, e, U, t, arguments[2])
            }, setFloat32: function (e, t) {
                W(this, 4, e, F, t, arguments[2])
            }, setFloat64: function (e, t) {
                W(this, 8, e, V, t, arguments[2])
            }
        });
        m(E, "ArrayBuffer"), m(y, "DataView"), s(y.prototype, a.VIEW, !0), t.ArrayBuffer = E, t.DataView = y
    }, function (e, t) {
        var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = n)
    }, function (e, t) {
        e.exports = function (e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        }
    }, function (e, t, n) {
        e.exports = !n(124)((function () {
            return 7 != Object.defineProperty({}, "a", {
                get: function () {
                    return 7
                }
            }).a
        }))
    }, function (e, t, n) {
        e.exports = !n(8) && !n(2)((function () {
            return 7 != Object.defineProperty(n(64)("div"), "a", {
                get: function () {
                    return 7
                }
            }).a
        }))
    }, function (e, t, n) {
        var r = n(1), i = n(7), o = n(31), a = n(65), s = n(9).f;
        e.exports = function (e) {
            var t = i.Symbol || (i.Symbol = o ? {} : r.Symbol || {});
            "_" == e.charAt(0) || e in t || s(t, e, {value: a.f(e)})
        }
    }, function (e, t, n) {
        var r = n(14), i = n(16), o = n(53)(!1), a = n(66)("IE_PROTO");
        e.exports = function (e, t) {
            var n, s = i(e), c = 0, u = [];
            for (n in s) n != a && r(s, n) && u.push(n);
            for (; t.length > c;) r(s, n = t[c++]) && (~o(u, n) || u.push(n));
            return u
        }
    }, function (e, t, n) {
        var r = n(9), i = n(3), o = n(32);
        e.exports = n(8) ? Object.defineProperties : function (e, t) {
            i(e);
            for (var n, a = o(t), s = a.length, c = 0; s > c;) r.f(e, n = a[c++], t[n]);
            return e
        }
    }, function (e, t, n) {
        var r = n(16), i = n(35).f, o = {}.toString,
            a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
        e.exports.f = function (e) {
            return a && "[object Window]" == o.call(e) ? function (e) {
                try {
                    return i(e)
                } catch (e) {
                    return a.slice()
                }
            }(e) : i(r(e))
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(8), i = n(32), o = n(54), a = n(48), s = n(10), c = n(47), u = Object.assign;
        e.exports = !u || n(2)((function () {
            var e = {}, t = {}, n = Symbol(), r = "abcdefghijklmnopqrst";
            return e[n] = 7, r.split("").forEach((function (e) {
                t[e] = e
            })), 7 != u({}, e)[n] || Object.keys(u({}, t)).join("") != r
        })) ? function (e, t) {
            for (var n = s(e), u = arguments.length, d = 1, f = o.f, l = a.f; u > d;) for (var p, h = c(arguments[d++]), v = f ? i(h).concat(f(h)) : i(h), _ = v.length, m = 0; _ > m;) p = v[m++], r && !l.call(h, p) || (n[p] = h[p]);
            return n
        } : u
    }, function (e, t) {
        e.exports = Object.is || function (e, t) {
            return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(19), i = n(4), o = n(100), a = [].slice, s = {}, c = function (e, t, n) {
            if (!(t in s)) {
                for (var r = [], i = 0; i < t; i++) r[i] = "a[" + i + "]";
                s[t] = Function("F,a", "return new F(" + r.join(",") + ")")
            }
            return s[t](e, n)
        };
        e.exports = Function.bind || function (e) {
            var t = r(this), n = a.call(arguments, 1), s = function () {
                var r = n.concat(a.call(arguments));
                return this instanceof s ? c(t, r.length, r) : o(t, r, e)
            };
            return i(t.prototype) && (s.prototype = t.prototype), s
        }
    }, function (e, t) {
        e.exports = function (e, t, n) {
            var r = void 0 === n;
            switch (t.length) {
                case 0:
                    return r ? e() : e.call(n);
                case 1:
                    return r ? e(t[0]) : e.call(n, t[0]);
                case 2:
                    return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);
                case 3:
                    return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);
                case 4:
                    return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3])
            }
            return e.apply(n, t)
        }
    }, function (e, t, n) {
        var r = n(1).parseInt, i = n(41).trim, o = n(70), a = /^[-+]?0[xX]/;
        e.exports = 8 !== r(o + "08") || 22 !== r(o + "0x16") ? function (e, t) {
            var n = i(String(e), 3);
            return r(n, t >>> 0 || (a.test(n) ? 16 : 10))
        } : r
    }, function (e, t, n) {
        var r = n(1).parseFloat, i = n(41).trim;
        e.exports = 1 / r(n(70) + "-0") != -1 / 0 ? function (e) {
            var t = i(String(e), 3), n = r(t);
            return 0 === n && "-" == t.charAt(0) ? -0 : n
        } : r
    }, function (e, t, n) {
        var r = n(24);
        e.exports = function (e, t) {
            if ("number" != typeof e && "Number" != r(e)) throw TypeError(t);
            return +e
        }
    }, function (e, t, n) {
        var r = n(4), i = Math.floor;
        e.exports = function (e) {
            return !r(e) && isFinite(e) && i(e) === e
        }
    }, function (e, t) {
        e.exports = Math.log1p || function (e) {
            return (e = +e) > -1e-8 && e < 1e-8 ? e - e * e / 2 : Math.log(1 + e)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(34), i = n(29), o = n(40), a = {};
        n(15)(a, n(5)("iterator"), (function () {
            return this
        })), e.exports = function (e, t, n) {
            e.prototype = r(a, {next: i(1, n)}), o(e, t + " Iterator")
        }
    }, function (e, t, n) {
        var r = n(3);
        e.exports = function (e, t, n, i) {
            try {
                return i ? t(r(n)[0], n[1]) : t(n)
            } catch (t) {
                var o = e.return;
                throw void 0 !== o && r(o.call(e)), t
            }
        }
    }, function (e, t, n) {
        var r = n(229);
        e.exports = function (e, t) {
            return new (r(e))(t)
        }
    }, function (e, t, n) {
        var r = n(19), i = n(10), o = n(47), a = n(6);
        e.exports = function (e, t, n, s, c) {
            r(t);
            var u = i(e), d = o(u), f = a(u.length), l = c ? f - 1 : 0, p = c ? -1 : 1;
            if (n < 2) for (; ;) {
                if (l in d) {
                    s = d[l], l += p;
                    break
                }
                if (l += p, c ? l < 0 : f <= l) throw TypeError("Reduce of empty array with no initial value")
            }
            for (; c ? l >= 0 : f > l; l += p) l in d && (s = t(s, d[l], l, u));
            return s
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(10), i = n(33), o = n(6);
        e.exports = [].copyWithin || function (e, t) {
            var n = r(this), a = o(n.length), s = i(e, a), c = i(t, a),
                u = arguments.length > 2 ? arguments[2] : void 0, d = Math.min((void 0 === u ? a : i(u, a)) - c, a - s),
                f = 1;
            for (c < s && s < c + d && (f = -1, c += d - 1, s += d - 1); d-- > 0;) c in n ? n[s] = n[c] : delete n[s], s += f, c += f;
            return n
        }
    }, function (e, t) {
        e.exports = function (e, t) {
            return {value: t, done: !!e}
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(85);
        n(0)({target: "RegExp", proto: !0, forced: r !== /./.exec}, {exec: r})
    }, function (e, t, n) {
        n(8) && "g" != /./g.flags && n(9).f(RegExp.prototype, "flags", {configurable: !0, get: n(57)})
    }, function (e, t, n) {
        "use strict";
        var r, i, o, a, s = n(31), c = n(1), u = n(18), d = n(49), f = n(0), l = n(4), p = n(19), h = n(44), v = n(60),
            _ = n(50), m = n(87).set, E = n(249)(), y = n(115), S = n(250), T = n(61), g = n(116), C = c.TypeError,
            b = c.process, R = b && b.versions, A = R && R.v8 || "", I = c.Promise, O = "process" == d(b),
            N = function () {
            }, w = i = y.f, D = !!function () {
                try {
                    var e = I.resolve(1), t = (e.constructor = {})[n(5)("species")] = function (e) {
                        e(N, N)
                    };
                    return (O || "function" == typeof PromiseRejectionEvent) && e.then(N) instanceof t && 0 !== A.indexOf("6.6") && -1 === T.indexOf("Chrome/66")
                } catch (e) {
                }
            }(), P = function (e) {
                var t;
                return !(!l(e) || "function" != typeof (t = e.then)) && t
            }, k = function (e, t) {
                if (!e._n) {
                    e._n = !0;
                    var n = e._c;
                    E((function () {
                        for (var r = e._v, i = 1 == e._s, o = 0, a = function (t) {
                            var n, o, a, s = i ? t.ok : t.fail, c = t.resolve, u = t.reject, d = t.domain;
                            try {
                                s ? (i || (2 == e._h && x(e), e._h = 1), !0 === s ? n = r : (d && d.enter(), n = s(r), d && (d.exit(), a = !0)), n === t.promise ? u(C("Promise-chain cycle")) : (o = P(n)) ? o.call(n, c, u) : c(n)) : u(r)
                            } catch (e) {
                                d && !a && d.exit(), u(e)
                            }
                        }; n.length > o;) a(n[o++]);
                        e._c = [], e._n = !1, t && !e._h && L(e)
                    }))
                }
            }, L = function (e) {
                m.call(c, (function () {
                    var t, n, r, i = e._v, o = M(e);
                    if (o && (t = S((function () {
                        O ? b.emit("unhandledRejection", i, e) : (n = c.onunhandledrejection) ? n({
                            promise: e,
                            reason: i
                        }) : (r = c.console) && r.error && r.error("Unhandled promise rejection", i)
                    })), e._h = O || M(e) ? 2 : 1), e._a = void 0, o && t.e) throw t.v
                }))
            }, M = function (e) {
                return 1 !== e._h && 0 === (e._a || e._c).length
            }, x = function (e) {
                m.call(c, (function () {
                    var t;
                    O ? b.emit("rejectionHandled", e) : (t = c.onrejectionhandled) && t({promise: e, reason: e._v})
                }))
            }, U = function (e) {
                var t = this;
                t._d || (t._d = !0, (t = t._w || t)._v = e, t._s = 2, t._a || (t._a = t._c.slice()), k(t, !0))
            }, V = function (e) {
                var t, n = this;
                if (!n._d) {
                    n._d = !0, n = n._w || n;
                    try {
                        if (n === e) throw C("Promise can't be resolved itself");
                        (t = P(e)) ? E((function () {
                            var r = {_w: n, _d: !1};
                            try {
                                t.call(e, u(V, r, 1), u(U, r, 1))
                            } catch (e) {
                                U.call(r, e)
                            }
                        })) : (n._v = e, n._s = 1, k(n, !1))
                    } catch (e) {
                        U.call({_w: n, _d: !1}, e)
                    }
                }
            };
        D || (I = function (e) {
            h(this, I, "Promise", "_h"), p(e), r.call(this);
            try {
                e(u(V, this, 1), u(U, this, 1))
            } catch (e) {
                U.call(this, e)
            }
        }, (r = function (e) {
            this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
        }).prototype = n(45)(I.prototype, {
            then: function (e, t) {
                var n = w(_(this, I));
                return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, n.domain = O ? b.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && k(this, !1), n.promise
            }, catch: function (e) {
                return this.then(void 0, e)
            }
        }), o = function () {
            var e = new r;
            this.promise = e, this.resolve = u(V, e, 1), this.reject = u(U, e, 1)
        }, y.f = w = function (e) {
            return e === I || e === a ? new o(e) : i(e)
        }), f(f.G + f.W + f.F * !D, {Promise: I}), n(40)(I, "Promise"), n(43)("Promise"), a = n(7).Promise, f(f.S + f.F * !D, "Promise", {
            reject: function (e) {
                var t = w(this);
                return (0, t.reject)(e), t.promise
            }
        }), f(f.S + f.F * (s || !D), "Promise", {
            resolve: function (e) {
                return g(s && this === a ? I : this, e)
            }
        }), f(f.S + f.F * !(D && n(56)((function (e) {
            I.all(e).catch(N)
        }))), "Promise", {
            all: function (e) {
                var t = this, n = w(t), r = n.resolve, i = n.reject, o = S((function () {
                    var n = [], o = 0, a = 1;
                    v(e, !1, (function (e) {
                        var s = o++, c = !1;
                        n.push(void 0), a++, t.resolve(e).then((function (e) {
                            c || (c = !0, n[s] = e, --a || r(n))
                        }), i)
                    })), --a || r(n)
                }));
                return o.e && i(o.v), n.promise
            }, race: function (e) {
                var t = this, n = w(t), r = n.reject, i = S((function () {
                    v(e, !1, (function (e) {
                        t.resolve(e).then(n.resolve, r)
                    }))
                }));
                return i.e && r(i.v), n.promise
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(19);

        function i(e) {
            var t, n;
            this.promise = new e((function (e, r) {
                if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");
                t = e, n = r
            })), this.resolve = r(t), this.reject = r(n)
        }

        e.exports.f = function (e) {
            return new i(e)
        }
    }, function (e, t, n) {
        var r = n(3), i = n(4), o = n(115);
        e.exports = function (e, t) {
            if (r(e), i(t) && t.constructor === e) return t;
            var n = o.f(e);
            return (0, n.resolve)(t), n.promise
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(9).f, i = n(34), o = n(45), a = n(18), s = n(44), c = n(60), u = n(76), d = n(111), f = n(43),
            l = n(8), p = n(28).fastKey, h = n(38), v = l ? "_s" : "size", _ = function (e, t) {
                var n, r = p(t);
                if ("F" !== r) return e._i[r];
                for (n = e._f; n; n = n.n) if (n.k == t) return n
            };
        e.exports = {
            getConstructor: function (e, t, n, u) {
                var d = e((function (e, r) {
                    s(e, d, t, "_i"), e._t = t, e._i = i(null), e._f = void 0, e._l = void 0, e[v] = 0, null != r && c(r, n, e[u], e)
                }));
                return o(d.prototype, {
                    clear: function () {
                        for (var e = h(this, t), n = e._i, r = e._f; r; r = r.n) r.r = !0, r.p && (r.p = r.p.n = void 0), delete n[r.i];
                        e._f = e._l = void 0, e[v] = 0
                    }, delete: function (e) {
                        var n = h(this, t), r = _(n, e);
                        if (r) {
                            var i = r.n, o = r.p;
                            delete n._i[r.i], r.r = !0, o && (o.n = i), i && (i.p = o), n._f == r && (n._f = i), n._l == r && (n._l = o), n[v]--
                        }
                        return !!r
                    }, forEach: function (e) {
                        h(this, t);
                        for (var n, r = a(e, arguments.length > 1 ? arguments[1] : void 0, 3); n = n ? n.n : this._f;) for (r(n.v, n.k, this); n && n.r;) n = n.p
                    }, has: function (e) {
                        return !!_(h(this, t), e)
                    }
                }), l && r(d.prototype, "size", {
                    get: function () {
                        return h(this, t)[v]
                    }
                }), d
            }, def: function (e, t, n) {
                var r, i, o = _(e, t);
                return o ? o.v = n : (e._l = o = {
                    i: i = p(t, !0),
                    k: t,
                    v: n,
                    p: r = e._l,
                    n: void 0,
                    r: !1
                }, e._f || (e._f = o), r && (r.n = o), e[v]++, "F" !== i && (e._i[i] = o)), e
            }, getEntry: _, setStrong: function (e, t, n) {
                u(e, t, (function (e, n) {
                    this._t = h(e, t), this._k = n, this._l = void 0
                }), (function () {
                    for (var e = this._k, t = this._l; t && t.r;) t = t.p;
                    return this._t && (this._l = t = t ? t.n : this._t._f) ? d(0, "keys" == e ? t.k : "values" == e ? t.v : [t.k, t.v]) : (this._t = void 0, d(1))
                }), n ? "entries" : "values", !n, !0), f(t)
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(45), i = n(28).getWeak, o = n(3), a = n(4), s = n(44), c = n(60), u = n(23), d = n(14), f = n(38),
            l = u(5), p = u(6), h = 0, v = function (e) {
                return e._l || (e._l = new _)
            }, _ = function () {
                this.a = []
            }, m = function (e, t) {
                return l(e.a, (function (e) {
                    return e[0] === t
                }))
            };
        _.prototype = {
            get: function (e) {
                var t = m(this, e);
                if (t) return t[1]
            }, has: function (e) {
                return !!m(this, e)
            }, set: function (e, t) {
                var n = m(this, e);
                n ? n[1] = t : this.a.push([e, t])
            }, delete: function (e) {
                var t = p(this.a, (function (t) {
                    return t[0] === e
                }));
                return ~t && this.a.splice(t, 1), !!~t
            }
        }, e.exports = {
            getConstructor: function (e, t, n, o) {
                var u = e((function (e, r) {
                    s(e, u, t, "_i"), e._t = t, e._i = h++, e._l = void 0, null != r && c(r, n, e[o], e)
                }));
                return r(u.prototype, {
                    delete: function (e) {
                        if (!a(e)) return !1;
                        var n = i(e);
                        return !0 === n ? v(f(this, t)).delete(e) : n && d(n, this._i) && delete n[this._i]
                    }, has: function (e) {
                        if (!a(e)) return !1;
                        var n = i(e);
                        return !0 === n ? v(f(this, t)).has(e) : n && d(n, this._i)
                    }
                }), u
            }, def: function (e, t, n) {
                var r = i(o(t), !0);
                return !0 === r ? v(e).set(t, n) : r[e._i] = n, e
            }, ufstore: v
        }
    }, function (e, t, n) {
        var r = n(20), i = n(6);
        e.exports = function (e) {
            if (void 0 === e) return 0;
            var t = r(e), n = i(t);
            if (t !== n) throw RangeError("Wrong length!");
            return n
        }
    }, function (e, t, n) {
        var r = n(35), i = n(54), o = n(3), a = n(1).Reflect;
        e.exports = a && a.ownKeys || function (e) {
            var t = r.f(o(e)), n = i.f;
            return n ? t.concat(n(e)) : t
        }
    }, function (e, t, n) {
        var r = n(6), i = n(72), o = n(25);
        e.exports = function (e, t, n, a) {
            var s = String(o(e)), c = s.length, u = void 0 === n ? " " : String(n), d = r(t);
            if (d <= c || "" == u) return s;
            var f = d - c, l = i.call(u, Math.ceil(f / u.length));
            return l.length > f && (l = l.slice(0, f)), a ? l + s : s + l
        }
    }, function (e, t, n) {
        var r = n(8), i = n(32), o = n(16), a = n(48).f;
        e.exports = function (e) {
            return function (t) {
                for (var n, s = o(t), c = i(s), u = c.length, d = 0, f = []; u > d;) n = c[d++], r && !a.call(s, n) || f.push(e ? [n, s[n]] : s[n]);
                return f
            }
        }
    }, function (e, t) {
        var n = e.exports = {version: "2.6.11"};
        "number" == typeof __e && (__e = n)
    }, function (e, t) {
        e.exports = function (e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        }
    }, function (e, t, n) {
        "use strict";
        e.exports = function (e, t) {
            return function () {
                for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
                return e.apply(t, n)
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(13);

        function i(e) {
            return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
        }

        e.exports = function (e, t, n) {
            if (!t) return e;
            var o;
            if (n) o = n(t); else if (r.isURLSearchParams(t)) o = t.toString(); else {
                var a = [];
                r.forEach(t, (function (e, t) {
                    null != e && (r.isArray(e) ? t += "[]" : e = [e], r.forEach(e, (function (e) {
                        r.isDate(e) ? e = e.toISOString() : r.isObject(e) && (e = JSON.stringify(e)), a.push(i(t) + "=" + i(e))
                    })))
                })), o = a.join("&")
            }
            if (o) {
                var s = e.indexOf("#");
                -1 !== s && (e = e.slice(0, s)), e += (-1 === e.indexOf("?") ? "?" : "&") + o
            }
            return e
        }
    }, function (e, t, n) {
        "use strict";
        e.exports = function (e) {
            return !(!e || !e.__CANCEL__)
        }
    }, function (e, t, n) {
        "use strict";
        (function (t) {
            var r = n(13), i = n(327), o = {"Content-Type": "application/x-www-form-urlencoded"};

            function a(e, t) {
                !r.isUndefined(e) && r.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
            }

            var s, c = {
                adapter: (("undefined" != typeof XMLHttpRequest || void 0 !== t && "[object process]" === Object.prototype.toString.call(t)) && (s = n(129)), s),
                transformRequest: [function (e, t) {
                    return i(t, "Accept"), i(t, "Content-Type"), r.isFormData(e) || r.isArrayBuffer(e) || r.isBuffer(e) || r.isStream(e) || r.isFile(e) || r.isBlob(e) ? e : r.isArrayBufferView(e) ? e.buffer : r.isURLSearchParams(e) ? (a(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : r.isObject(e) ? (a(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e
                }],
                transformResponse: [function (e) {
                    if ("string" == typeof e) try {
                        e = JSON.parse(e)
                    } catch (e) {
                    }
                    return e
                }],
                timeout: 0,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                maxContentLength: -1,
                validateStatus: function (e) {
                    return e >= 200 && e < 300
                }
            };
            c.headers = {common: {Accept: "application/json, text/plain, */*"}}, r.forEach(["delete", "get", "head"], (function (e) {
                c.headers[e] = {}
            })), r.forEach(["post", "put", "patch"], (function (e) {
                c.headers[e] = r.merge(o)
            })), e.exports = c
        }).call(this, n(326))
    }, function (e, t, n) {
        "use strict";
        var r = n(13), i = n(328), o = n(126), a = n(330), s = n(333), c = n(334), u = n(130);
        e.exports = function (e) {
            return new Promise((function (t, d) {
                var f = e.data, l = e.headers;
                r.isFormData(f) && delete l["Content-Type"];
                var p = new XMLHttpRequest;
                if (e.auth) {
                    var h = e.auth.username || "", v = e.auth.password || "";
                    l.Authorization = "Basic " + btoa(h + ":" + v)
                }
                var _ = a(e.baseURL, e.url);
                if (p.open(e.method.toUpperCase(), o(_, e.params, e.paramsSerializer), !0), p.timeout = e.timeout, p.onreadystatechange = function () {
                    if (p && 4 === p.readyState && (0 !== p.status || p.responseURL && 0 === p.responseURL.indexOf("file:"))) {
                        var n = "getAllResponseHeaders" in p ? s(p.getAllResponseHeaders()) : null, r = {
                            data: e.responseType && "text" !== e.responseType ? p.response : p.responseText,
                            status: p.status,
                            statusText: p.statusText,
                            headers: n,
                            config: e,
                            request: p
                        };
                        i(t, d, r), p = null
                    }
                }, p.onabort = function () {
                    p && (d(u("Request aborted", e, "ECONNABORTED", p)), p = null)
                }, p.onerror = function () {
                    d(u("Network Error", e, null, p)), p = null
                }, p.ontimeout = function () {
                    var t = "timeout of " + e.timeout + "ms exceeded";
                    e.timeoutErrorMessage && (t = e.timeoutErrorMessage), d(u(t, e, "ECONNABORTED", p)), p = null
                }, r.isStandardBrowserEnv()) {
                    var m = n(335),
                        E = (e.withCredentials || c(_)) && e.xsrfCookieName ? m.read(e.xsrfCookieName) : void 0;
                    E && (l[e.xsrfHeaderName] = E)
                }
                if ("setRequestHeader" in p && r.forEach(l, (function (e, t) {
                    void 0 === f && "content-type" === t.toLowerCase() ? delete l[t] : p.setRequestHeader(t, e)
                })), r.isUndefined(e.withCredentials) || (p.withCredentials = !!e.withCredentials), e.responseType) try {
                    p.responseType = e.responseType
                } catch (t) {
                    if ("json" !== e.responseType) throw t
                }
                "function" == typeof e.onDownloadProgress && p.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && p.upload && p.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then((function (e) {
                    p && (p.abort(), d(e), p = null)
                })), void 0 === f && (f = null), p.send(f)
            }))
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(329);
        e.exports = function (e, t, n, i, o) {
            var a = new Error(e);
            return r(a, t, n, i, o)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(13);
        e.exports = function (e, t) {
            t = t || {};
            var n = {}, i = ["url", "method", "params", "data"], o = ["headers", "auth", "proxy"],
                a = ["baseURL", "url", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "maxContentLength", "validateStatus", "maxRedirects", "httpAgent", "httpsAgent", "cancelToken", "socketPath"];
            r.forEach(i, (function (e) {
                void 0 !== t[e] && (n[e] = t[e])
            })), r.forEach(o, (function (i) {
                r.isObject(t[i]) ? n[i] = r.deepMerge(e[i], t[i]) : void 0 !== t[i] ? n[i] = t[i] : r.isObject(e[i]) ? n[i] = r.deepMerge(e[i]) : void 0 !== e[i] && (n[i] = e[i])
            })), r.forEach(a, (function (r) {
                void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r])
            }));
            var s = i.concat(o).concat(a), c = Object.keys(t).filter((function (e) {
                return -1 === s.indexOf(e)
            }));
            return r.forEach(c, (function (r) {
                void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r])
            })), n
        }
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            this.message = e
        }

        r.prototype.toString = function () {
            return "Cancel" + (this.message ? ": " + this.message : "")
        }, r.prototype.__CANCEL__ = !0, e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(46);

        function i(e, t, n, i, o) {
            var a = r.writeRtpDescription(e.kind, t);
            if (a += r.writeIceParameters(e.iceGatherer.getLocalParameters()), a += r.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass" : o || "active"), a += "a=mid:" + e.mid + "\r\n", e.rtpSender && e.rtpReceiver ? a += "a=sendrecv\r\n" : e.rtpSender ? a += "a=sendonly\r\n" : e.rtpReceiver ? a += "a=recvonly\r\n" : a += "a=inactive\r\n", e.rtpSender) {
                var s = e.rtpSender._initialTrackId || e.rtpSender.track.id;
                e.rtpSender._initialTrackId = s;
                var c = "msid:" + (i ? i.id : "-") + " " + s + "\r\n";
                a += "a=" + c, a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + c, e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + c, a += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
            }
            return a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + r.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + r.localCName + "\r\n"), a
        }

        function o(e, t) {
            var n = {codecs: [], headerExtensions: [], fecMechanisms: []}, r = function (e, t) {
                e = parseInt(e, 10);
                for (var n = 0; n < t.length; n++) if (t[n].payloadType === e || t[n].preferredPayloadType === e) return t[n]
            }, i = function (e, t, n, i) {
                var o = r(e.parameters.apt, n), a = r(t.parameters.apt, i);
                return o && a && o.name.toLowerCase() === a.name.toLowerCase()
            };
            return e.codecs.forEach((function (r) {
                for (var o = 0; o < t.codecs.length; o++) {
                    var a = t.codecs[o];
                    if (r.name.toLowerCase() === a.name.toLowerCase() && r.clockRate === a.clockRate) {
                        if ("rtx" === r.name.toLowerCase() && r.parameters && a.parameters.apt && !i(r, a, e.codecs, t.codecs)) continue;
                        (a = JSON.parse(JSON.stringify(a))).numChannels = Math.min(r.numChannels, a.numChannels), n.codecs.push(a), a.rtcpFeedback = a.rtcpFeedback.filter((function (e) {
                            for (var t = 0; t < r.rtcpFeedback.length; t++) if (r.rtcpFeedback[t].type === e.type && r.rtcpFeedback[t].parameter === e.parameter) return !0;
                            return !1
                        }));
                        break
                    }
                }
            })), e.headerExtensions.forEach((function (e) {
                for (var r = 0; r < t.headerExtensions.length; r++) {
                    var i = t.headerExtensions[r];
                    if (e.uri === i.uri) {
                        n.headerExtensions.push(i);
                        break
                    }
                }
            })), n
        }

        function a(e, t, n) {
            return -1 !== {
                offer: {
                    setLocalDescription: ["stable", "have-local-offer"],
                    setRemoteDescription: ["stable", "have-remote-offer"]
                },
                answer: {
                    setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
                    setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
                }
            }[t][e].indexOf(n)
        }

        function s(e, t) {
            var n = e.getRemoteCandidates().find((function (e) {
                return t.foundation === e.foundation && t.ip === e.ip && t.port === e.port && t.priority === e.priority && t.protocol === e.protocol && t.type === e.type
            }));
            return n || e.addRemoteCandidate(t), !n
        }

        function c(e, t) {
            var n = new Error(t);
            return n.name = e, n.code = {
                NotSupportedError: 9,
                InvalidStateError: 11,
                InvalidAccessError: 15,
                TypeError: void 0,
                OperationError: void 0
            }[e], n
        }

        e.exports = function (e, t) {
            function n(t, n) {
                n.addTrack(t), n.dispatchEvent(new e.MediaStreamTrackEvent("addtrack", {track: t}))
            }

            function u(t, n, r, i) {
                var o = new Event("track");
                o.track = n, o.receiver = r, o.transceiver = {receiver: r}, o.streams = i, e.setTimeout((function () {
                    t._dispatchEvent("track", o)
                }))
            }

            var d = function (n) {
                var i = this, o = document.createDocumentFragment();
                if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach((function (e) {
                    i[e] = o[e].bind(o)
                })), this.canTrickleIceCandidates = null, this.needNegotiation = !1, this.localStreams = [], this.remoteStreams = [], this._localDescription = null, this._remoteDescription = null, this.signalingState = "stable", this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", n = JSON.parse(JSON.stringify(n || {})), this.usingBundle = "max-bundle" === n.bundlePolicy, "negotiate" === n.rtcpMuxPolicy) throw c("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
                switch (n.rtcpMuxPolicy || (n.rtcpMuxPolicy = "require"), n.iceTransportPolicy) {
                    case"all":
                    case"relay":
                        break;
                    default:
                        n.iceTransportPolicy = "all"
                }
                switch (n.bundlePolicy) {
                    case"balanced":
                    case"max-compat":
                    case"max-bundle":
                        break;
                    default:
                        n.bundlePolicy = "balanced"
                }
                if (n.iceServers = function (e, t) {
                    var n = !1;
                    return (e = JSON.parse(JSON.stringify(e))).filter((function (e) {
                        if (e && (e.urls || e.url)) {
                            var r = e.urls || e.url;
                            e.url && !e.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
                            var i = "string" == typeof r;
                            return i && (r = [r]), r = r.filter((function (e) {
                                return 0 === e.indexOf("turn:") && -1 !== e.indexOf("transport=udp") && -1 === e.indexOf("turn:[") && !n ? (n = !0, !0) : 0 === e.indexOf("stun:") && t >= 14393 && -1 === e.indexOf("?transport=udp")
                            })), delete e.url, e.urls = i ? r[0] : r, !!r.length
                        }
                    }))
                }(n.iceServers || [], t), this._iceGatherers = [], n.iceCandidatePoolSize) for (var a = n.iceCandidatePoolSize; a > 0; a--) this._iceGatherers.push(new e.RTCIceGatherer({
                    iceServers: n.iceServers,
                    gatherPolicy: n.iceTransportPolicy
                })); else n.iceCandidatePoolSize = 0;
                this._config = n, this.transceivers = [], this._sdpSessionId = r.generateSessionId(), this._sdpSessionVersion = 0, this._dtlsRole = void 0, this._isClosed = !1
            };
            Object.defineProperty(d.prototype, "localDescription", {
                configurable: !0, get: function () {
                    return this._localDescription
                }
            }), Object.defineProperty(d.prototype, "remoteDescription", {
                configurable: !0, get: function () {
                    return this._remoteDescription
                }
            }), d.prototype.onicecandidate = null, d.prototype.onaddstream = null, d.prototype.ontrack = null, d.prototype.onremovestream = null, d.prototype.onsignalingstatechange = null, d.prototype.oniceconnectionstatechange = null, d.prototype.onconnectionstatechange = null, d.prototype.onicegatheringstatechange = null, d.prototype.onnegotiationneeded = null, d.prototype.ondatachannel = null, d.prototype._dispatchEvent = function (e, t) {
                this._isClosed || (this.dispatchEvent(t), "function" == typeof this["on" + e] && this["on" + e](t))
            }, d.prototype._emitGatheringStateChange = function () {
                var e = new Event("icegatheringstatechange");
                this._dispatchEvent("icegatheringstatechange", e)
            }, d.prototype.getConfiguration = function () {
                return this._config
            }, d.prototype.getLocalStreams = function () {
                return this.localStreams
            }, d.prototype.getRemoteStreams = function () {
                return this.remoteStreams
            }, d.prototype._createTransceiver = function (e, t) {
                var n = this.transceivers.length > 0, r = {
                    track: null,
                    iceGatherer: null,
                    iceTransport: null,
                    dtlsTransport: null,
                    localCapabilities: null,
                    remoteCapabilities: null,
                    rtpSender: null,
                    rtpReceiver: null,
                    kind: e,
                    mid: null,
                    sendEncodingParameters: null,
                    recvEncodingParameters: null,
                    stream: null,
                    associatedRemoteMediaStreams: [],
                    wantReceive: !0
                };
                if (this.usingBundle && n) r.iceTransport = this.transceivers[0].iceTransport, r.dtlsTransport = this.transceivers[0].dtlsTransport; else {
                    var i = this._createIceAndDtlsTransports();
                    r.iceTransport = i.iceTransport, r.dtlsTransport = i.dtlsTransport
                }
                return t || this.transceivers.push(r), r
            }, d.prototype.addTrack = function (t, n) {
                if (this._isClosed) throw c("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
                var r;
                if (this.transceivers.find((function (e) {
                    return e.track === t
                }))) throw c("InvalidAccessError", "Track already exists.");
                for (var i = 0; i < this.transceivers.length; i++) this.transceivers[i].track || this.transceivers[i].kind !== t.kind || (r = this.transceivers[i]);
                return r || (r = this._createTransceiver(t.kind)), this._maybeFireNegotiationNeeded(), -1 === this.localStreams.indexOf(n) && this.localStreams.push(n), r.track = t, r.stream = n, r.rtpSender = new e.RTCRtpSender(t, r.dtlsTransport), r.rtpSender
            }, d.prototype.addStream = function (e) {
                var n = this;
                if (t >= 15025) e.getTracks().forEach((function (t) {
                    n.addTrack(t, e)
                })); else {
                    var r = e.clone();
                    e.getTracks().forEach((function (e, t) {
                        var n = r.getTracks()[t];
                        e.addEventListener("enabled", (function (e) {
                            n.enabled = e.enabled
                        }))
                    })), r.getTracks().forEach((function (e) {
                        n.addTrack(e, r)
                    }))
                }
            }, d.prototype.removeTrack = function (t) {
                if (this._isClosed) throw c("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
                if (!(t instanceof e.RTCRtpSender)) throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
                var n = this.transceivers.find((function (e) {
                    return e.rtpSender === t
                }));
                if (!n) throw c("InvalidAccessError", "Sender was not created by this connection.");
                var r = n.stream;
                n.rtpSender.stop(), n.rtpSender = null, n.track = null, n.stream = null, -1 === this.transceivers.map((function (e) {
                    return e.stream
                })).indexOf(r) && this.localStreams.indexOf(r) > -1 && this.localStreams.splice(this.localStreams.indexOf(r), 1), this._maybeFireNegotiationNeeded()
            }, d.prototype.removeStream = function (e) {
                var t = this;
                e.getTracks().forEach((function (e) {
                    var n = t.getSenders().find((function (t) {
                        return t.track === e
                    }));
                    n && t.removeTrack(n)
                }))
            }, d.prototype.getSenders = function () {
                return this.transceivers.filter((function (e) {
                    return !!e.rtpSender
                })).map((function (e) {
                    return e.rtpSender
                }))
            }, d.prototype.getReceivers = function () {
                return this.transceivers.filter((function (e) {
                    return !!e.rtpReceiver
                })).map((function (e) {
                    return e.rtpReceiver
                }))
            }, d.prototype._createIceGatherer = function (t, n) {
                var r = this;
                if (n && t > 0) return this.transceivers[0].iceGatherer;
                if (this._iceGatherers.length) return this._iceGatherers.shift();
                var i = new e.RTCIceGatherer({
                    iceServers: this._config.iceServers,
                    gatherPolicy: this._config.iceTransportPolicy
                });
                return Object.defineProperty(i, "state", {
                    value: "new",
                    writable: !0
                }), this.transceivers[t].bufferedCandidateEvents = [], this.transceivers[t].bufferCandidates = function (e) {
                    var n = !e.candidate || 0 === Object.keys(e.candidate).length;
                    i.state = n ? "completed" : "gathering", null !== r.transceivers[t].bufferedCandidateEvents && r.transceivers[t].bufferedCandidateEvents.push(e)
                }, i.addEventListener("localcandidate", this.transceivers[t].bufferCandidates), i
            }, d.prototype._gather = function (t, n) {
                var i = this, o = this.transceivers[n].iceGatherer;
                if (!o.onlocalcandidate) {
                    var a = this.transceivers[n].bufferedCandidateEvents;
                    this.transceivers[n].bufferedCandidateEvents = null, o.removeEventListener("localcandidate", this.transceivers[n].bufferCandidates), o.onlocalcandidate = function (e) {
                        if (!(i.usingBundle && n > 0)) {
                            var a = new Event("icecandidate");
                            a.candidate = {sdpMid: t, sdpMLineIndex: n};
                            var s = e.candidate, c = !s || 0 === Object.keys(s).length;
                            if (c) "new" !== o.state && "gathering" !== o.state || (o.state = "completed"); else {
                                "new" === o.state && (o.state = "gathering"), s.component = 1, s.ufrag = o.getLocalParameters().usernameFragment;
                                var u = r.writeCandidate(s);
                                a.candidate = Object.assign(a.candidate, r.parseCandidate(u)), a.candidate.candidate = u, a.candidate.toJSON = function () {
                                    return {
                                        candidate: a.candidate.candidate,
                                        sdpMid: a.candidate.sdpMid,
                                        sdpMLineIndex: a.candidate.sdpMLineIndex,
                                        usernameFragment: a.candidate.usernameFragment
                                    }
                                }
                            }
                            var d = r.getMediaSections(i._localDescription.sdp);
                            d[a.candidate.sdpMLineIndex] += c ? "a=end-of-candidates\r\n" : "a=" + a.candidate.candidate + "\r\n", i._localDescription.sdp = r.getDescription(i._localDescription.sdp) + d.join("");
                            var f = i.transceivers.every((function (e) {
                                return e.iceGatherer && "completed" === e.iceGatherer.state
                            }));
                            "gathering" !== i.iceGatheringState && (i.iceGatheringState = "gathering", i._emitGatheringStateChange()), c || i._dispatchEvent("icecandidate", a), f && (i._dispatchEvent("icecandidate", new Event("icecandidate")), i.iceGatheringState = "complete", i._emitGatheringStateChange())
                        }
                    }, e.setTimeout((function () {
                        a.forEach((function (e) {
                            o.onlocalcandidate(e)
                        }))
                    }), 0)
                }
            }, d.prototype._createIceAndDtlsTransports = function () {
                var t = this, n = new e.RTCIceTransport(null);
                n.onicestatechange = function () {
                    t._updateIceConnectionState(), t._updateConnectionState()
                };
                var r = new e.RTCDtlsTransport(n);
                return r.ondtlsstatechange = function () {
                    t._updateConnectionState()
                }, r.onerror = function () {
                    Object.defineProperty(r, "state", {value: "failed", writable: !0}), t._updateConnectionState()
                }, {iceTransport: n, dtlsTransport: r}
            }, d.prototype._disposeIceAndDtlsTransports = function (e) {
                var t = this.transceivers[e].iceGatherer;
                t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
                var n = this.transceivers[e].iceTransport;
                n && (delete n.onicestatechange, delete this.transceivers[e].iceTransport);
                var r = this.transceivers[e].dtlsTransport;
                r && (delete r.ondtlsstatechange, delete r.onerror, delete this.transceivers[e].dtlsTransport)
            }, d.prototype._transceive = function (e, n, i) {
                var a = o(e.localCapabilities, e.remoteCapabilities);
                n && e.rtpSender && (a.encodings = e.sendEncodingParameters, a.rtcp = {
                    cname: r.localCName,
                    compound: e.rtcpParameters.compound
                }, e.recvEncodingParameters.length && (a.rtcp.ssrc = e.recvEncodingParameters[0].ssrc), e.rtpSender.send(a)), i && e.rtpReceiver && a.codecs.length > 0 && ("video" === e.kind && e.recvEncodingParameters && t < 15019 && e.recvEncodingParameters.forEach((function (e) {
                    delete e.rtx
                })), e.recvEncodingParameters.length ? a.encodings = e.recvEncodingParameters : a.encodings = [{}], a.rtcp = {compound: e.rtcpParameters.compound}, e.rtcpParameters.cname && (a.rtcp.cname = e.rtcpParameters.cname), e.sendEncodingParameters.length && (a.rtcp.ssrc = e.sendEncodingParameters[0].ssrc), e.rtpReceiver.receive(a))
            }, d.prototype.setLocalDescription = function (e) {
                var t, n, i = this;
                if (-1 === ["offer", "answer"].indexOf(e.type)) return Promise.reject(c("TypeError", 'Unsupported type "' + e.type + '"'));
                if (!a("setLocalDescription", e.type, i.signalingState) || i._isClosed) return Promise.reject(c("InvalidStateError", "Can not set local " + e.type + " in state " + i.signalingState));
                if ("offer" === e.type) t = r.splitSections(e.sdp), n = t.shift(), t.forEach((function (e, t) {
                    var n = r.parseRtpParameters(e);
                    i.transceivers[t].localCapabilities = n
                })), i.transceivers.forEach((function (e, t) {
                    i._gather(e.mid, t)
                })); else if ("answer" === e.type) {
                    t = r.splitSections(i._remoteDescription.sdp), n = t.shift();
                    var s = r.matchPrefix(n, "a=ice-lite").length > 0;
                    t.forEach((function (e, t) {
                        var a = i.transceivers[t], c = a.iceGatherer, u = a.iceTransport, d = a.dtlsTransport,
                            f = a.localCapabilities, l = a.remoteCapabilities;
                        if (!(r.isRejected(e) && 0 === r.matchPrefix(e, "a=bundle-only").length) && !a.rejected) {
                            var p = r.getIceParameters(e, n), h = r.getDtlsParameters(e, n);
                            s && (h.role = "server"), i.usingBundle && 0 !== t || (i._gather(a.mid, t), "new" === u.state && u.start(c, p, s ? "controlling" : "controlled"), "new" === d.state && d.start(h));
                            var v = o(f, l);
                            i._transceive(a, v.codecs.length > 0, !1)
                        }
                    }))
                }
                return i._localDescription = {
                    type: e.type,
                    sdp: e.sdp
                }, "offer" === e.type ? i._updateSignalingState("have-local-offer") : i._updateSignalingState("stable"), Promise.resolve()
            }, d.prototype.setRemoteDescription = function (i) {
                var d = this;
                if (-1 === ["offer", "answer"].indexOf(i.type)) return Promise.reject(c("TypeError", 'Unsupported type "' + i.type + '"'));
                if (!a("setRemoteDescription", i.type, d.signalingState) || d._isClosed) return Promise.reject(c("InvalidStateError", "Can not set remote " + i.type + " in state " + d.signalingState));
                var f = {};
                d.remoteStreams.forEach((function (e) {
                    f[e.id] = e
                }));
                var l = [], p = r.splitSections(i.sdp), h = p.shift(), v = r.matchPrefix(h, "a=ice-lite").length > 0,
                    _ = r.matchPrefix(h, "a=group:BUNDLE ").length > 0;
                d.usingBundle = _;
                var m = r.matchPrefix(h, "a=ice-options:")[0];
                return d.canTrickleIceCandidates = !!m && m.substr(14).split(" ").indexOf("trickle") >= 0, p.forEach((function (a, c) {
                    var u = r.splitLines(a), p = r.getKind(a),
                        m = r.isRejected(a) && 0 === r.matchPrefix(a, "a=bundle-only").length,
                        E = u[0].substr(2).split(" ")[2], y = r.getDirection(a, h), S = r.parseMsid(a),
                        T = r.getMid(a) || r.generateIdentifier();
                    if (m || "application" === p && ("DTLS/SCTP" === E || "UDP/DTLS/SCTP" === E)) d.transceivers[c] = {
                        mid: T,
                        kind: p,
                        protocol: E,
                        rejected: !0
                    }; else {
                        var g, C, b, R, A, I, O, N, w;
                        !m && d.transceivers[c] && d.transceivers[c].rejected && (d.transceivers[c] = d._createTransceiver(p, !0));
                        var D, P, k = r.parseRtpParameters(a);
                        m || (D = r.getIceParameters(a, h), (P = r.getDtlsParameters(a, h)).role = "client"), O = r.parseRtpEncodingParameters(a);
                        var L = r.parseRtcpParameters(a), M = r.matchPrefix(a, "a=end-of-candidates", h).length > 0,
                            x = r.matchPrefix(a, "a=candidate:").map((function (e) {
                                return r.parseCandidate(e)
                            })).filter((function (e) {
                                return 1 === e.component
                            }));
                        if (("offer" === i.type || "answer" === i.type) && !m && _ && c > 0 && d.transceivers[c] && (d._disposeIceAndDtlsTransports(c), d.transceivers[c].iceGatherer = d.transceivers[0].iceGatherer, d.transceivers[c].iceTransport = d.transceivers[0].iceTransport, d.transceivers[c].dtlsTransport = d.transceivers[0].dtlsTransport, d.transceivers[c].rtpSender && d.transceivers[c].rtpSender.setTransport(d.transceivers[0].dtlsTransport), d.transceivers[c].rtpReceiver && d.transceivers[c].rtpReceiver.setTransport(d.transceivers[0].dtlsTransport)), "offer" !== i.type || m) {
                            if ("answer" === i.type && !m) {
                                C = (g = d.transceivers[c]).iceGatherer, b = g.iceTransport, R = g.dtlsTransport, A = g.rtpReceiver, I = g.sendEncodingParameters, N = g.localCapabilities, d.transceivers[c].recvEncodingParameters = O, d.transceivers[c].remoteCapabilities = k, d.transceivers[c].rtcpParameters = L, x.length && "new" === b.state && (!v && !M || _ && 0 !== c ? x.forEach((function (e) {
                                    s(g.iceTransport, e)
                                })) : b.setRemoteCandidates(x)), _ && 0 !== c || ("new" === b.state && b.start(C, D, "controlling"), "new" === R.state && R.start(P)), !o(g.localCapabilities, g.remoteCapabilities).codecs.filter((function (e) {
                                    return "rtx" === e.name.toLowerCase()
                                })).length && g.sendEncodingParameters[0].rtx && delete g.sendEncodingParameters[0].rtx, d._transceive(g, "sendrecv" === y || "recvonly" === y, "sendrecv" === y || "sendonly" === y), !A || "sendrecv" !== y && "sendonly" !== y ? delete g.rtpReceiver : (w = A.track, S ? (f[S.stream] || (f[S.stream] = new e.MediaStream), n(w, f[S.stream]), l.push([w, A, f[S.stream]])) : (f.default || (f.default = new e.MediaStream), n(w, f.default), l.push([w, A, f.default])))
                            }
                        } else {
                            (g = d.transceivers[c] || d._createTransceiver(p)).mid = T, g.iceGatherer || (g.iceGatherer = d._createIceGatherer(c, _)), x.length && "new" === g.iceTransport.state && (!M || _ && 0 !== c ? x.forEach((function (e) {
                                s(g.iceTransport, e)
                            })) : g.iceTransport.setRemoteCandidates(x)), N = e.RTCRtpReceiver.getCapabilities(p), t < 15019 && (N.codecs = N.codecs.filter((function (e) {
                                return "rtx" !== e.name
                            }))), I = g.sendEncodingParameters || [{ssrc: 1001 * (2 * c + 2)}];
                            var U, V = !1;
                            if ("sendrecv" === y || "sendonly" === y) {
                                if (V = !g.rtpReceiver, A = g.rtpReceiver || new e.RTCRtpReceiver(g.dtlsTransport, p), V) w = A.track, S && "-" === S.stream || (S ? (f[S.stream] || (f[S.stream] = new e.MediaStream, Object.defineProperty(f[S.stream], "id", {
                                    get: function () {
                                        return S.stream
                                    }
                                })), Object.defineProperty(w, "id", {
                                    get: function () {
                                        return S.track
                                    }
                                }), U = f[S.stream]) : (f.default || (f.default = new e.MediaStream), U = f.default)), U && (n(w, U), g.associatedRemoteMediaStreams.push(U)), l.push([w, A, U])
                            } else g.rtpReceiver && g.rtpReceiver.track && (g.associatedRemoteMediaStreams.forEach((function (t) {
                                var n = t.getTracks().find((function (e) {
                                    return e.id === g.rtpReceiver.track.id
                                }));
                                n && function (t, n) {
                                    n.removeTrack(t), n.dispatchEvent(new e.MediaStreamTrackEvent("removetrack", {track: t}))
                                }(n, t)
                            })), g.associatedRemoteMediaStreams = []);
                            g.localCapabilities = N, g.remoteCapabilities = k, g.rtpReceiver = A, g.rtcpParameters = L, g.sendEncodingParameters = I, g.recvEncodingParameters = O, d._transceive(d.transceivers[c], !1, V)
                        }
                    }
                })), void 0 === d._dtlsRole && (d._dtlsRole = "offer" === i.type ? "active" : "passive"), d._remoteDescription = {
                    type: i.type,
                    sdp: i.sdp
                }, "offer" === i.type ? d._updateSignalingState("have-remote-offer") : d._updateSignalingState("stable"), Object.keys(f).forEach((function (t) {
                    var n = f[t];
                    if (n.getTracks().length) {
                        if (-1 === d.remoteStreams.indexOf(n)) {
                            d.remoteStreams.push(n);
                            var r = new Event("addstream");
                            r.stream = n, e.setTimeout((function () {
                                d._dispatchEvent("addstream", r)
                            }))
                        }
                        l.forEach((function (e) {
                            var t = e[0], r = e[1];
                            n.id === e[2].id && u(d, t, r, [n])
                        }))
                    }
                })), l.forEach((function (e) {
                    e[2] || u(d, e[0], e[1], [])
                })), e.setTimeout((function () {
                    d && d.transceivers && d.transceivers.forEach((function (e) {
                        e.iceTransport && "new" === e.iceTransport.state && e.iceTransport.getRemoteCandidates().length > 0 && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), e.iceTransport.addRemoteCandidate({}))
                    }))
                }), 4e3), Promise.resolve()
            }, d.prototype.close = function () {
                this.transceivers.forEach((function (e) {
                    e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender && e.rtpSender.stop(), e.rtpReceiver && e.rtpReceiver.stop()
                })), this._isClosed = !0, this._updateSignalingState("closed")
            }, d.prototype._updateSignalingState = function (e) {
                this.signalingState = e;
                var t = new Event("signalingstatechange");
                this._dispatchEvent("signalingstatechange", t)
            }, d.prototype._maybeFireNegotiationNeeded = function () {
                var t = this;
                "stable" === this.signalingState && !0 !== this.needNegotiation && (this.needNegotiation = !0, e.setTimeout((function () {
                    if (t.needNegotiation) {
                        t.needNegotiation = !1;
                        var e = new Event("negotiationneeded");
                        t._dispatchEvent("negotiationneeded", e)
                    }
                }), 0))
            }, d.prototype._updateIceConnectionState = function () {
                var e, t = {new: 0, closed: 0, checking: 0, connected: 0, completed: 0, disconnected: 0, failed: 0};
                if (this.transceivers.forEach((function (e) {
                    e.iceTransport && !e.rejected && t[e.iceTransport.state]++
                })), e = "new", t.failed > 0 ? e = "failed" : t.checking > 0 ? e = "checking" : t.disconnected > 0 ? e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 ? e = "connected" : t.completed > 0 && (e = "completed"), e !== this.iceConnectionState) {
                    this.iceConnectionState = e;
                    var n = new Event("iceconnectionstatechange");
                    this._dispatchEvent("iceconnectionstatechange", n)
                }
            }, d.prototype._updateConnectionState = function () {
                var e, t = {new: 0, closed: 0, connecting: 0, connected: 0, completed: 0, disconnected: 0, failed: 0};
                if (this.transceivers.forEach((function (e) {
                    e.iceTransport && e.dtlsTransport && !e.rejected && (t[e.iceTransport.state]++, t[e.dtlsTransport.state]++)
                })), t.connected += t.completed, e = "new", t.failed > 0 ? e = "failed" : t.connecting > 0 ? e = "connecting" : t.disconnected > 0 ? e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 && (e = "connected"), e !== this.connectionState) {
                    this.connectionState = e;
                    var n = new Event("connectionstatechange");
                    this._dispatchEvent("connectionstatechange", n)
                }
            }, d.prototype.createOffer = function () {
                var n = this;
                if (n._isClosed) return Promise.reject(c("InvalidStateError", "Can not call createOffer after close"));
                var o = n.transceivers.filter((function (e) {
                    return "audio" === e.kind
                })).length, a = n.transceivers.filter((function (e) {
                    return "video" === e.kind
                })).length, s = arguments[0];
                if (s) {
                    if (s.mandatory || s.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
                    void 0 !== s.offerToReceiveAudio && (o = !0 === s.offerToReceiveAudio ? 1 : !1 === s.offerToReceiveAudio ? 0 : s.offerToReceiveAudio), void 0 !== s.offerToReceiveVideo && (a = !0 === s.offerToReceiveVideo ? 1 : !1 === s.offerToReceiveVideo ? 0 : s.offerToReceiveVideo)
                }
                for (n.transceivers.forEach((function (e) {
                    "audio" === e.kind ? --o < 0 && (e.wantReceive = !1) : "video" === e.kind && --a < 0 && (e.wantReceive = !1)
                })); o > 0 || a > 0;) o > 0 && (n._createTransceiver("audio"), o--), a > 0 && (n._createTransceiver("video"), a--);
                var u = r.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
                n.transceivers.forEach((function (i, o) {
                    var a = i.track, s = i.kind, c = i.mid || r.generateIdentifier();
                    i.mid = c, i.iceGatherer || (i.iceGatherer = n._createIceGatherer(o, n.usingBundle));
                    var u = e.RTCRtpSender.getCapabilities(s);
                    t < 15019 && (u.codecs = u.codecs.filter((function (e) {
                        return "rtx" !== e.name
                    }))), u.codecs.forEach((function (e) {
                        "H264" === e.name && void 0 === e.parameters["level-asymmetry-allowed"] && (e.parameters["level-asymmetry-allowed"] = "1"), i.remoteCapabilities && i.remoteCapabilities.codecs && i.remoteCapabilities.codecs.forEach((function (t) {
                            e.name.toLowerCase() === t.name.toLowerCase() && e.clockRate === t.clockRate && (e.preferredPayloadType = t.payloadType)
                        }))
                    })), u.headerExtensions.forEach((function (e) {
                        (i.remoteCapabilities && i.remoteCapabilities.headerExtensions || []).forEach((function (t) {
                            e.uri === t.uri && (e.id = t.id)
                        }))
                    }));
                    var d = i.sendEncodingParameters || [{ssrc: 1001 * (2 * o + 1)}];
                    a && t >= 15019 && "video" === s && !d[0].rtx && (d[0].rtx = {ssrc: d[0].ssrc + 1}), i.wantReceive && (i.rtpReceiver = new e.RTCRtpReceiver(i.dtlsTransport, s)), i.localCapabilities = u, i.sendEncodingParameters = d
                })), "max-compat" !== n._config.bundlePolicy && (u += "a=group:BUNDLE " + n.transceivers.map((function (e) {
                    return e.mid
                })).join(" ") + "\r\n"), u += "a=ice-options:trickle\r\n", n.transceivers.forEach((function (e, t) {
                    u += i(e, e.localCapabilities, "offer", e.stream, n._dtlsRole), u += "a=rtcp-rsize\r\n", !e.iceGatherer || "new" === n.iceGatheringState || 0 !== t && n.usingBundle || (e.iceGatherer.getLocalCandidates().forEach((function (e) {
                        e.component = 1, u += "a=" + r.writeCandidate(e) + "\r\n"
                    })), "completed" === e.iceGatherer.state && (u += "a=end-of-candidates\r\n"))
                }));
                var d = new e.RTCSessionDescription({type: "offer", sdp: u});
                return Promise.resolve(d)
            }, d.prototype.createAnswer = function () {
                var n = this;
                if (n._isClosed) return Promise.reject(c("InvalidStateError", "Can not call createAnswer after close"));
                if ("have-remote-offer" !== n.signalingState && "have-local-pranswer" !== n.signalingState) return Promise.reject(c("InvalidStateError", "Can not call createAnswer in signalingState " + n.signalingState));
                var a = r.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
                n.usingBundle && (a += "a=group:BUNDLE " + n.transceivers.map((function (e) {
                    return e.mid
                })).join(" ") + "\r\n"), a += "a=ice-options:trickle\r\n";
                var s = r.getMediaSections(n._remoteDescription.sdp).length;
                n.transceivers.forEach((function (e, r) {
                    if (!(r + 1 > s)) {
                        if (e.rejected) return "application" === e.kind ? "DTLS/SCTP" === e.protocol ? a += "m=application 0 DTLS/SCTP 5000\r\n" : a += "m=application 0 " + e.protocol + " webrtc-datachannel\r\n" : "audio" === e.kind ? a += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : "video" === e.kind && (a += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"), void (a += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e.mid + "\r\n");
                        var c;
                        if (e.stream) "audio" === e.kind ? c = e.stream.getAudioTracks()[0] : "video" === e.kind && (c = e.stream.getVideoTracks()[0]), c && t >= 15019 && "video" === e.kind && !e.sendEncodingParameters[0].rtx && (e.sendEncodingParameters[0].rtx = {ssrc: e.sendEncodingParameters[0].ssrc + 1});
                        var u = o(e.localCapabilities, e.remoteCapabilities);
                        !u.codecs.filter((function (e) {
                            return "rtx" === e.name.toLowerCase()
                        })).length && e.sendEncodingParameters[0].rtx && delete e.sendEncodingParameters[0].rtx, a += i(e, u, "answer", e.stream, n._dtlsRole), e.rtcpParameters && e.rtcpParameters.reducedSize && (a += "a=rtcp-rsize\r\n")
                    }
                }));
                var u = new e.RTCSessionDescription({type: "answer", sdp: a});
                return Promise.resolve(u)
            }, d.prototype.addIceCandidate = function (e) {
                var t, n = this;
                return e && void 0 === e.sdpMLineIndex && !e.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise((function (i, o) {
                    if (!n._remoteDescription) return o(c("InvalidStateError", "Can not add ICE candidate without a remote description"));
                    if (e && "" !== e.candidate) {
                        var a = e.sdpMLineIndex;
                        if (e.sdpMid) for (var u = 0; u < n.transceivers.length; u++) if (n.transceivers[u].mid === e.sdpMid) {
                            a = u;
                            break
                        }
                        var d = n.transceivers[a];
                        if (!d) return o(c("OperationError", "Can not add ICE candidate"));
                        if (d.rejected) return i();
                        var f = Object.keys(e.candidate).length > 0 ? r.parseCandidate(e.candidate) : {};
                        if ("tcp" === f.protocol && (0 === f.port || 9 === f.port)) return i();
                        if (f.component && 1 !== f.component) return i();
                        if ((0 === a || a > 0 && d.iceTransport !== n.transceivers[0].iceTransport) && !s(d.iceTransport, f)) return o(c("OperationError", "Can not add ICE candidate"));
                        var l = e.candidate.trim();
                        0 === l.indexOf("a=") && (l = l.substr(2)), (t = r.getMediaSections(n._remoteDescription.sdp))[a] += "a=" + (f.type ? l : "end-of-candidates") + "\r\n", n._remoteDescription.sdp = r.getDescription(n._remoteDescription.sdp) + t.join("")
                    } else for (var p = 0; p < n.transceivers.length && (n.transceivers[p].rejected || (n.transceivers[p].iceTransport.addRemoteCandidate({}), (t = r.getMediaSections(n._remoteDescription.sdp))[p] += "a=end-of-candidates\r\n", n._remoteDescription.sdp = r.getDescription(n._remoteDescription.sdp) + t.join(""), !n.usingBundle)); p++) ;
                    i()
                }))
            }, d.prototype.getStats = function (t) {
                if (t && t instanceof e.MediaStreamTrack) {
                    var n = null;
                    if (this.transceivers.forEach((function (e) {
                        e.rtpSender && e.rtpSender.track === t ? n = e.rtpSender : e.rtpReceiver && e.rtpReceiver.track === t && (n = e.rtpReceiver)
                    })), !n) throw c("InvalidAccessError", "Invalid selector.");
                    return n.getStats()
                }
                var r = [];
                return this.transceivers.forEach((function (e) {
                    ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach((function (t) {
                        e[t] && r.push(e[t].getStats())
                    }))
                })), Promise.all(r).then((function (e) {
                    var t = new Map;
                    return e.forEach((function (e) {
                        e.forEach((function (e) {
                            t.set(e.id, e)
                        }))
                    })), t
                }))
            };
            ["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach((function (t) {
                var n = e[t];
                if (n && n.prototype && n.prototype.getStats) {
                    var r = n.prototype.getStats;
                    n.prototype.getStats = function () {
                        return r.apply(this).then((function (e) {
                            var t = new Map;
                            return Object.keys(e).forEach((function (n) {
                                var r;
                                e[n].type = {
                                    inboundrtp: "inbound-rtp",
                                    outboundrtp: "outbound-rtp",
                                    candidatepair: "candidate-pair",
                                    localcandidate: "local-candidate",
                                    remotecandidate: "remote-candidate"
                                }[(r = e[n]).type] || r.type, t.set(n, e[n])
                            })), t
                        }))
                    }
                }
            }));
            var f = ["createOffer", "createAnswer"];
            return f.forEach((function (e) {
                var t = d.prototype[e];
                d.prototype[e] = function () {
                    var e = arguments;
                    return "function" == typeof e[0] || "function" == typeof e[1] ? t.apply(this, [arguments[2]]).then((function (t) {
                        "function" == typeof e[0] && e[0].apply(null, [t])
                    }), (function (t) {
                        "function" == typeof e[1] && e[1].apply(null, [t])
                    })) : t.apply(this, arguments)
                }
            })), (f = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).forEach((function (e) {
                var t = d.prototype[e];
                d.prototype[e] = function () {
                    var e = arguments;
                    return "function" == typeof e[1] || "function" == typeof e[2] ? t.apply(this, arguments).then((function () {
                        "function" == typeof e[1] && e[1].apply(null)
                    }), (function (t) {
                        "function" == typeof e[2] && e[2].apply(null, [t])
                    })) : t.apply(this, arguments)
                }
            })), ["getStats"].forEach((function (e) {
                var t = d.prototype[e];
                d.prototype[e] = function () {
                    var e = arguments;
                    return "function" == typeof e[1] ? t.apply(this, arguments).then((function () {
                        "function" == typeof e[1] && e[1].apply(null)
                    })) : t.apply(this, arguments)
                }
            })), d
        }
    }, function (e, t, n) {
        n(135), e.exports = n(338)
    }, function (e, t, n) {
        "use strict";
        n(136);
        var r, i = (r = n(308)) && r.__esModule ? r : {default: r};
        i.default._babelPolyfill && "undefined" != typeof console && console.warn && console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended and may have consequences if different versions of the polyfills are applied sequentially. If you do need to load the polyfill more than once, use @babel/polyfill/noConflict instead to bypass the warning."), i.default._babelPolyfill = !0
    }, function (e, t, n) {
        "use strict";
        n(137), n(280), n(282), n(285), n(287), n(289), n(291), n(293), n(295), n(297), n(299), n(301), n(303), n(307)
    }, function (e, t, n) {
        n(138), n(141), n(142), n(143), n(144), n(145), n(146), n(147), n(148), n(149), n(150), n(151), n(152), n(153), n(154), n(155), n(156), n(157), n(158), n(159), n(160), n(161), n(162), n(163), n(164), n(165), n(166), n(167), n(168), n(169), n(170), n(171), n(172), n(173), n(174), n(175), n(176), n(177), n(178), n(179), n(180), n(181), n(182), n(184), n(185), n(186), n(187), n(188), n(189), n(190), n(191), n(192), n(193), n(194), n(195), n(196), n(197), n(198), n(199), n(200), n(201), n(202), n(203), n(204), n(205), n(206), n(207), n(208), n(209), n(210), n(211), n(212), n(213), n(214), n(215), n(216), n(217), n(219), n(220), n(222), n(223), n(224), n(225), n(226), n(227), n(228), n(230), n(231), n(232), n(233), n(234), n(235), n(236), n(237), n(238), n(239), n(240), n(241), n(242), n(84), n(243),n(112),n(244),n(113),n(245),n(246),n(247),n(248),n(114),n(251),n(252),n(253),n(254),n(255),n(256),n(257),n(258),n(259),n(260),n(261),n(262),n(263),n(264),n(265),n(266),n(267),n(268),n(269),n(270),n(271),n(272),n(273),n(274),n(275),n(276),n(277),n(278),n(279),e.exports = n(7)
    }, function (e, t, n) {
        "use strict";
        var r = n(1), i = n(14), o = n(8), a = n(0), s = n(11), c = n(28).KEY, u = n(2), d = n(52), f = n(40),
            l = n(30), p = n(5), h = n(65), v = n(93), _ = n(140), m = n(55), E = n(3), y = n(4), S = n(10), T = n(16),
            g = n(27), C = n(29), b = n(34), R = n(96), A = n(21), I = n(54), O = n(9), N = n(32), w = A.f, D = O.f,
            P = R.f, k = r.Symbol, L = r.JSON, M = L && L.stringify, x = p("_hidden"), U = p("toPrimitive"),
            V = {}.propertyIsEnumerable, F = d("symbol-registry"), j = d("symbols"), B = d("op-symbols"),
            W = Object.prototype, G = "function" == typeof k && !!I.f, H = r.QObject,
            K = !H || !H.prototype || !H.prototype.findChild, Y = o && u((function () {
                return 7 != b(D({}, "a", {
                    get: function () {
                        return D(this, "a", {value: 7}).a
                    }
                })).a
            })) ? function (e, t, n) {
                var r = w(W, t);
                r && delete W[t], D(e, t, n), r && e !== W && D(W, t, r)
            } : D, J = function (e) {
                var t = j[e] = b(k.prototype);
                return t._k = e, t
            }, z = G && "symbol" == typeof k.iterator ? function (e) {
                return "symbol" == typeof e
            } : function (e) {
                return e instanceof k
            }, X = function (e, t, n) {
                return e === W && X(B, t, n), E(e), t = g(t, !0), E(n), i(j, t) ? (n.enumerable ? (i(e, x) && e[x][t] && (e[x][t] = !1), n = b(n, {enumerable: C(0, !1)})) : (i(e, x) || D(e, x, C(1, {})), e[x][t] = !0), Y(e, t, n)) : D(e, t, n)
            }, Q = function (e, t) {
                E(e);
                for (var n, r = _(t = T(t)), i = 0, o = r.length; o > i;) X(e, n = r[i++], t[n]);
                return e
            }, q = function (e) {
                var t = V.call(this, e = g(e, !0));
                return !(this === W && i(j, e) && !i(B, e)) && (!(t || !i(this, e) || !i(j, e) || i(this, x) && this[x][e]) || t)
            }, $ = function (e, t) {
                if (e = T(e), t = g(t, !0), e !== W || !i(j, t) || i(B, t)) {
                    var n = w(e, t);
                    return !n || !i(j, t) || i(e, x) && e[x][t] || (n.enumerable = !0), n
                }
            }, Z = function (e) {
                for (var t, n = P(T(e)), r = [], o = 0; n.length > o;) i(j, t = n[o++]) || t == x || t == c || r.push(t);
                return r
            }, ee = function (e) {
                for (var t, n = e === W, r = P(n ? B : T(e)), o = [], a = 0; r.length > a;) !i(j, t = r[a++]) || n && !i(W, t) || o.push(j[t]);
                return o
            };
        G || (s((k = function () {
            if (this instanceof k) throw TypeError("Symbol is not a constructor!");
            var e = l(arguments.length > 0 ? arguments[0] : void 0), t = function (n) {
                this === W && t.call(B, n), i(this, x) && i(this[x], e) && (this[x][e] = !1), Y(this, e, C(1, n))
            };
            return o && K && Y(W, e, {configurable: !0, set: t}), J(e)
        }).prototype, "toString", (function () {
            return this._k
        })), A.f = $, O.f = X, n(35).f = R.f = Z, n(48).f = q, I.f = ee, o && !n(31) && s(W, "propertyIsEnumerable", q, !0), h.f = function (e) {
            return J(p(e))
        }), a(a.G + a.W + a.F * !G, {Symbol: k});
        for (var te = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ne = 0; te.length > ne;) p(te[ne++]);
        for (var re = N(p.store), ie = 0; re.length > ie;) v(re[ie++]);
        a(a.S + a.F * !G, "Symbol", {
            for: function (e) {
                return i(F, e += "") ? F[e] : F[e] = k(e)
            }, keyFor: function (e) {
                if (!z(e)) throw TypeError(e + " is not a symbol!");
                for (var t in F) if (F[t] === e) return t
            }, useSetter: function () {
                K = !0
            }, useSimple: function () {
                K = !1
            }
        }), a(a.S + a.F * !G, "Object", {
            create: function (e, t) {
                return void 0 === t ? b(e) : Q(b(e), t)
            },
            defineProperty: X,
            defineProperties: Q,
            getOwnPropertyDescriptor: $,
            getOwnPropertyNames: Z,
            getOwnPropertySymbols: ee
        });
        var oe = u((function () {
            I.f(1)
        }));
        a(a.S + a.F * oe, "Object", {
            getOwnPropertySymbols: function (e) {
                return I.f(S(e))
            }
        }), L && a(a.S + a.F * (!G || u((function () {
            var e = k();
            return "[null]" != M([e]) || "{}" != M({a: e}) || "{}" != M(Object(e))
        }))), "JSON", {
            stringify: function (e) {
                for (var t, n, r = [e], i = 1; arguments.length > i;) r.push(arguments[i++]);
                if (n = t = r[1], (y(t) || void 0 !== e) && !z(e)) return m(t) || (t = function (e, t) {
                    if ("function" == typeof n && (t = n.call(this, e, t)), !z(t)) return t
                }), r[1] = t, M.apply(L, r)
            }
        }), k.prototype[U] || n(15)(k.prototype, U, k.prototype.valueOf), f(k, "Symbol"), f(Math, "Math", !0), f(r.JSON, "JSON", !0)
    }, function (e, t, n) {
        e.exports = n(52)("native-function-to-string", Function.toString)
    }, function (e, t, n) {
        var r = n(32), i = n(54), o = n(48);
        e.exports = function (e) {
            var t = r(e), n = i.f;
            if (n) for (var a, s = n(e), c = o.f, u = 0; s.length > u;) c.call(e, a = s[u++]) && t.push(a);
            return t
        }
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Object", {create: n(34)})
    }, function (e, t, n) {
        var r = n(0);
        r(r.S + r.F * !n(8), "Object", {defineProperty: n(9).f})
    }, function (e, t, n) {
        var r = n(0);
        r(r.S + r.F * !n(8), "Object", {defineProperties: n(95)})
    }, function (e, t, n) {
        var r = n(16), i = n(21).f;
        n(22)("getOwnPropertyDescriptor", (function () {
            return function (e, t) {
                return i(r(e), t)
            }
        }))
    }, function (e, t, n) {
        var r = n(10), i = n(36);
        n(22)("getPrototypeOf", (function () {
            return function (e) {
                return i(r(e))
            }
        }))
    }, function (e, t, n) {
        var r = n(10), i = n(32);
        n(22)("keys", (function () {
            return function (e) {
                return i(r(e))
            }
        }))
    }, function (e, t, n) {
        n(22)("getOwnPropertyNames", (function () {
            return n(96).f
        }))
    }, function (e, t, n) {
        var r = n(4), i = n(28).onFreeze;
        n(22)("freeze", (function (e) {
            return function (t) {
                return e && r(t) ? e(i(t)) : t
            }
        }))
    }, function (e, t, n) {
        var r = n(4), i = n(28).onFreeze;
        n(22)("seal", (function (e) {
            return function (t) {
                return e && r(t) ? e(i(t)) : t
            }
        }))
    }, function (e, t, n) {
        var r = n(4), i = n(28).onFreeze;
        n(22)("preventExtensions", (function (e) {
            return function (t) {
                return e && r(t) ? e(i(t)) : t
            }
        }))
    }, function (e, t, n) {
        var r = n(4);
        n(22)("isFrozen", (function (e) {
            return function (t) {
                return !r(t) || !!e && e(t)
            }
        }))
    }, function (e, t, n) {
        var r = n(4);
        n(22)("isSealed", (function (e) {
            return function (t) {
                return !r(t) || !!e && e(t)
            }
        }))
    }, function (e, t, n) {
        var r = n(4);
        n(22)("isExtensible", (function (e) {
            return function (t) {
                return !!r(t) && (!e || e(t))
            }
        }))
    }, function (e, t, n) {
        var r = n(0);
        r(r.S + r.F, "Object", {assign: n(97)})
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Object", {is: n(98)})
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Object", {setPrototypeOf: n(69).set})
    }, function (e, t, n) {
        "use strict";
        var r = n(49), i = {};
        i[n(5)("toStringTag")] = "z", i + "" != "[object z]" && n(11)(Object.prototype, "toString", (function () {
            return "[object " + r(this) + "]"
        }), !0)
    }, function (e, t, n) {
        var r = n(0);
        r(r.P, "Function", {bind: n(99)})
    }, function (e, t, n) {
        var r = n(9).f, i = Function.prototype, o = /^\s*function ([^ (]*)/;
        "name" in i || n(8) && r(i, "name", {
            configurable: !0, get: function () {
                try {
                    return ("" + this).match(o)[1]
                } catch (e) {
                    return ""
                }
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(4), i = n(36), o = n(5)("hasInstance"), a = Function.prototype;
        o in a || n(9).f(a, o, {
            value: function (e) {
                if ("function" != typeof this || !r(e)) return !1;
                if (!r(this.prototype)) return e instanceof this;
                for (; e = i(e);) if (this.prototype === e) return !0;
                return !1
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = n(101);
        r(r.G + r.F * (parseInt != i), {parseInt: i})
    }, function (e, t, n) {
        var r = n(0), i = n(102);
        r(r.G + r.F * (parseFloat != i), {parseFloat: i})
    }, function (e, t, n) {
        "use strict";
        var r = n(1), i = n(14), o = n(24), a = n(71), s = n(27), c = n(2), u = n(35).f, d = n(21).f, f = n(9).f,
            l = n(41).trim, p = r.Number, h = p, v = p.prototype, _ = "Number" == o(n(34)(v)),
            m = "trim" in String.prototype, E = function (e) {
                var t = s(e, !1);
                if ("string" == typeof t && t.length > 2) {
                    var n, r, i, o = (t = m ? t.trim() : l(t, 3)).charCodeAt(0);
                    if (43 === o || 45 === o) {
                        if (88 === (n = t.charCodeAt(2)) || 120 === n) return NaN
                    } else if (48 === o) {
                        switch (t.charCodeAt(1)) {
                            case 66:
                            case 98:
                                r = 2, i = 49;
                                break;
                            case 79:
                            case 111:
                                r = 8, i = 55;
                                break;
                            default:
                                return +t
                        }
                        for (var a, c = t.slice(2), u = 0, d = c.length; u < d; u++) if ((a = c.charCodeAt(u)) < 48 || a > i) return NaN;
                        return parseInt(c, r)
                    }
                }
                return +t
            };
        if (!p(" 0o1") || !p("0b1") || p("+0x1")) {
            p = function (e) {
                var t = arguments.length < 1 ? 0 : e, n = this;
                return n instanceof p && (_ ? c((function () {
                    v.valueOf.call(n)
                })) : "Number" != o(n)) ? a(new h(E(t)), n, p) : E(t)
            };
            for (var y, S = n(8) ? u(h) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), T = 0; S.length > T; T++) i(h, y = S[T]) && !i(p, y) && f(p, y, d(h, y));
            p.prototype = v, v.constructor = p, n(11)(r, "Number", p)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(20), o = n(103), a = n(72), s = 1..toFixed, c = Math.floor, u = [0, 0, 0, 0, 0, 0],
            d = "Number.toFixed: incorrect invocation!", f = function (e, t) {
                for (var n = -1, r = t; ++n < 6;) r += e * u[n], u[n] = r % 1e7, r = c(r / 1e7)
            }, l = function (e) {
                for (var t = 6, n = 0; --t >= 0;) n += u[t], u[t] = c(n / e), n = n % e * 1e7
            }, p = function () {
                for (var e = 6, t = ""; --e >= 0;) if ("" !== t || 0 === e || 0 !== u[e]) {
                    var n = String(u[e]);
                    t = "" === t ? n : t + a.call("0", 7 - n.length) + n
                }
                return t
            }, h = function (e, t, n) {
                return 0 === t ? n : t % 2 == 1 ? h(e, t - 1, n * e) : h(e * e, t / 2, n)
            };
        r(r.P + r.F * (!!s && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !n(2)((function () {
            s.call({})
        }))), "Number", {
            toFixed: function (e) {
                var t, n, r, s, c = o(this, d), u = i(e), v = "", _ = "0";
                if (u < 0 || u > 20) throw RangeError(d);
                if (c != c) return "NaN";
                if (c <= -1e21 || c >= 1e21) return String(c);
                if (c < 0 && (v = "-", c = -c), c > 1e-21) if (n = (t = function (e) {
                    for (var t = 0, n = e; n >= 4096;) t += 12, n /= 4096;
                    for (; n >= 2;) t += 1, n /= 2;
                    return t
                }(c * h(2, 69, 1)) - 69) < 0 ? c * h(2, -t, 1) : c / h(2, t, 1), n *= 4503599627370496, (t = 52 - t) > 0) {
                    for (f(0, n), r = u; r >= 7;) f(1e7, 0), r -= 7;
                    for (f(h(10, r, 1), 0), r = t - 1; r >= 23;) l(1 << 23), r -= 23;
                    l(1 << r), f(1, 1), l(2), _ = p()
                } else f(0, n), f(1 << -t, 0), _ = p() + a.call("0", u);
                return _ = u > 0 ? v + ((s = _.length) <= u ? "0." + a.call("0", u - s) + _ : _.slice(0, s - u) + "." + _.slice(s - u)) : v + _
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(2), o = n(103), a = 1..toPrecision;
        r(r.P + r.F * (i((function () {
            return "1" !== a.call(1, void 0)
        })) || !i((function () {
            a.call({})
        }))), "Number", {
            toPrecision: function (e) {
                var t = o(this, "Number#toPrecision: incorrect invocation!");
                return void 0 === e ? a.call(t) : a.call(t, e)
            }
        })
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Number", {EPSILON: Math.pow(2, -52)})
    }, function (e, t, n) {
        var r = n(0), i = n(1).isFinite;
        r(r.S, "Number", {
            isFinite: function (e) {
                return "number" == typeof e && i(e)
            }
        })
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Number", {isInteger: n(104)})
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Number", {
            isNaN: function (e) {
                return e != e
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = n(104), o = Math.abs;
        r(r.S, "Number", {
            isSafeInteger: function (e) {
                return i(e) && o(e) <= 9007199254740991
            }
        })
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Number", {MAX_SAFE_INTEGER: 9007199254740991})
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Number", {MIN_SAFE_INTEGER: -9007199254740991})
    }, function (e, t, n) {
        var r = n(0), i = n(102);
        r(r.S + r.F * (Number.parseFloat != i), "Number", {parseFloat: i})
    }, function (e, t, n) {
        var r = n(0), i = n(101);
        r(r.S + r.F * (Number.parseInt != i), "Number", {parseInt: i})
    }, function (e, t, n) {
        var r = n(0), i = n(105), o = Math.sqrt, a = Math.acosh;
        r(r.S + r.F * !(a && 710 == Math.floor(a(Number.MAX_VALUE)) && a(1 / 0) == 1 / 0), "Math", {
            acosh: function (e) {
                return (e = +e) < 1 ? NaN : e > 94906265.62425156 ? Math.log(e) + Math.LN2 : i(e - 1 + o(e - 1) * o(e + 1))
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = Math.asinh;
        r(r.S + r.F * !(i && 1 / i(0) > 0), "Math", {
            asinh: function e(t) {
                return isFinite(t = +t) && 0 != t ? t < 0 ? -e(-t) : Math.log(t + Math.sqrt(t * t + 1)) : t
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = Math.atanh;
        r(r.S + r.F * !(i && 1 / i(-0) < 0), "Math", {
            atanh: function (e) {
                return 0 == (e = +e) ? e : Math.log((1 + e) / (1 - e)) / 2
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = n(73);
        r(r.S, "Math", {
            cbrt: function (e) {
                return i(e = +e) * Math.pow(Math.abs(e), 1 / 3)
            }
        })
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Math", {
            clz32: function (e) {
                return (e >>>= 0) ? 31 - Math.floor(Math.log(e + .5) * Math.LOG2E) : 32
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = Math.exp;
        r(r.S, "Math", {
            cosh: function (e) {
                return (i(e = +e) + i(-e)) / 2
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = n(74);
        r(r.S + r.F * (i != Math.expm1), "Math", {expm1: i})
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Math", {fround: n(183)})
    }, function (e, t, n) {
        var r = n(73), i = Math.pow, o = i(2, -52), a = i(2, -23), s = i(2, 127) * (2 - a), c = i(2, -126);
        e.exports = Math.fround || function (e) {
            var t, n, i = Math.abs(e), u = r(e);
            return i < c ? u * (i / c / a + 1 / o - 1 / o) * c * a : (n = (t = (1 + a / o) * i) - (t - i)) > s || n != n ? u * (1 / 0) : u * n
        }
    }, function (e, t, n) {
        var r = n(0), i = Math.abs;
        r(r.S, "Math", {
            hypot: function (e, t) {
                for (var n, r, o = 0, a = 0, s = arguments.length, c = 0; a < s;) c < (n = i(arguments[a++])) ? (o = o * (r = c / n) * r + 1, c = n) : o += n > 0 ? (r = n / c) * r : n;
                return c === 1 / 0 ? 1 / 0 : c * Math.sqrt(o)
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = Math.imul;
        r(r.S + r.F * n(2)((function () {
            return -5 != i(4294967295, 5) || 2 != i.length
        })), "Math", {
            imul: function (e, t) {
                var n = +e, r = +t, i = 65535 & n, o = 65535 & r;
                return 0 | i * o + ((65535 & n >>> 16) * o + i * (65535 & r >>> 16) << 16 >>> 0)
            }
        })
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Math", {
            log10: function (e) {
                return Math.log(e) * Math.LOG10E
            }
        })
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Math", {log1p: n(105)})
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Math", {
            log2: function (e) {
                return Math.log(e) / Math.LN2
            }
        })
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Math", {sign: n(73)})
    }, function (e, t, n) {
        var r = n(0), i = n(74), o = Math.exp;
        r(r.S + r.F * n(2)((function () {
            return -2e-17 != !Math.sinh(-2e-17)
        })), "Math", {
            sinh: function (e) {
                return Math.abs(e = +e) < 1 ? (i(e) - i(-e)) / 2 : (o(e - 1) - o(-e - 1)) * (Math.E / 2)
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = n(74), o = Math.exp;
        r(r.S, "Math", {
            tanh: function (e) {
                var t = i(e = +e), n = i(-e);
                return t == 1 / 0 ? 1 : n == 1 / 0 ? -1 : (t - n) / (o(e) + o(-e))
            }
        })
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Math", {
            trunc: function (e) {
                return (e > 0 ? Math.floor : Math.ceil)(e)
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = n(33), o = String.fromCharCode, a = String.fromCodePoint;
        r(r.S + r.F * (!!a && 1 != a.length), "String", {
            fromCodePoint: function (e) {
                for (var t, n = [], r = arguments.length, a = 0; r > a;) {
                    if (t = +arguments[a++], i(t, 1114111) !== t) throw RangeError(t + " is not a valid code point");
                    n.push(t < 65536 ? o(t) : o(55296 + ((t -= 65536) >> 10), t % 1024 + 56320))
                }
                return n.join("")
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = n(16), o = n(6);
        r(r.S, "String", {
            raw: function (e) {
                for (var t = i(e.raw), n = o(t.length), r = arguments.length, a = [], s = 0; n > s;) a.push(String(t[s++])), s < r && a.push(String(arguments[s]));
                return a.join("")
            }
        })
    }, function (e, t, n) {
        "use strict";
        n(41)("trim", (function (e) {
            return function () {
                return e(this, 3)
            }
        }))
    }, function (e, t, n) {
        "use strict";
        var r = n(75)(!0);
        n(76)(String, "String", (function (e) {
            this._t = String(e), this._i = 0
        }), (function () {
            var e, t = this._t, n = this._i;
            return n >= t.length ? {value: void 0, done: !0} : (e = r(t, n), this._i += e.length, {value: e, done: !1})
        }))
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(75)(!1);
        r(r.P, "String", {
            codePointAt: function (e) {
                return i(this, e)
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(6), o = n(77), a = "".endsWith;
        r(r.P + r.F * n(79)("endsWith"), "String", {
            endsWith: function (e) {
                var t = o(this, e, "endsWith"), n = arguments.length > 1 ? arguments[1] : void 0, r = i(t.length),
                    s = void 0 === n ? r : Math.min(i(n), r), c = String(e);
                return a ? a.call(t, c, s) : t.slice(s - c.length, s) === c
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(77);
        r(r.P + r.F * n(79)("includes"), "String", {
            includes: function (e) {
                return !!~i(this, e, "includes").indexOf(e, arguments.length > 1 ? arguments[1] : void 0)
            }
        })
    }, function (e, t, n) {
        var r = n(0);
        r(r.P, "String", {repeat: n(72)})
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(6), o = n(77), a = "".startsWith;
        r(r.P + r.F * n(79)("startsWith"), "String", {
            startsWith: function (e) {
                var t = o(this, e, "startsWith"),
                    n = i(Math.min(arguments.length > 1 ? arguments[1] : void 0, t.length)), r = String(e);
                return a ? a.call(t, r, n) : t.slice(n, n + r.length) === r
            }
        })
    }, function (e, t, n) {
        "use strict";
        n(12)("anchor", (function (e) {
            return function (t) {
                return e(this, "a", "name", t)
            }
        }))
    }, function (e, t, n) {
        "use strict";
        n(12)("big", (function (e) {
            return function () {
                return e(this, "big", "", "")
            }
        }))
    }, function (e, t, n) {
        "use strict";
        n(12)("blink", (function (e) {
            return function () {
                return e(this, "blink", "", "")
            }
        }))
    }, function (e, t, n) {
        "use strict";
        n(12)("bold", (function (e) {
            return function () {
                return e(this, "b", "", "")
            }
        }))
    }, function (e, t, n) {
        "use strict";
        n(12)("fixed", (function (e) {
            return function () {
                return e(this, "tt", "", "")
            }
        }))
    }, function (e, t, n) {
        "use strict";
        n(12)("fontcolor", (function (e) {
            return function (t) {
                return e(this, "font", "color", t)
            }
        }))
    }, function (e, t, n) {
        "use strict";
        n(12)("fontsize", (function (e) {
            return function (t) {
                return e(this, "font", "size", t)
            }
        }))
    }, function (e, t, n) {
        "use strict";
        n(12)("italics", (function (e) {
            return function () {
                return e(this, "i", "", "")
            }
        }))
    }, function (e, t, n) {
        "use strict";
        n(12)("link", (function (e) {
            return function (t) {
                return e(this, "a", "href", t)
            }
        }))
    }, function (e, t, n) {
        "use strict";
        n(12)("small", (function (e) {
            return function () {
                return e(this, "small", "", "")
            }
        }))
    }, function (e, t, n) {
        "use strict";
        n(12)("strike", (function (e) {
            return function () {
                return e(this, "strike", "", "")
            }
        }))
    }, function (e, t, n) {
        "use strict";
        n(12)("sub", (function (e) {
            return function () {
                return e(this, "sub", "", "")
            }
        }))
    }, function (e, t, n) {
        "use strict";
        n(12)("sup", (function (e) {
            return function () {
                return e(this, "sup", "", "")
            }
        }))
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Date", {
            now: function () {
                return (new Date).getTime()
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(10), o = n(27);
        r(r.P + r.F * n(2)((function () {
            return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({
                toISOString: function () {
                    return 1
                }
            })
        })), "Date", {
            toJSON: function (e) {
                var t = i(this), n = o(t);
                return "number" != typeof n || isFinite(n) ? t.toISOString() : null
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = n(218);
        r(r.P + r.F * (Date.prototype.toISOString !== i), "Date", {toISOString: i})
    }, function (e, t, n) {
        "use strict";
        var r = n(2), i = Date.prototype.getTime, o = Date.prototype.toISOString, a = function (e) {
            return e > 9 ? e : "0" + e
        };
        e.exports = r((function () {
            return "0385-07-25T07:06:39.999Z" != o.call(new Date(-50000000000001))
        })) || !r((function () {
            o.call(new Date(NaN))
        })) ? function () {
            if (!isFinite(i.call(this))) throw RangeError("Invalid time value");
            var e = this, t = e.getUTCFullYear(), n = e.getUTCMilliseconds(), r = t < 0 ? "-" : t > 9999 ? "+" : "";
            return r + ("00000" + Math.abs(t)).slice(r ? -6 : -4) + "-" + a(e.getUTCMonth() + 1) + "-" + a(e.getUTCDate()) + "T" + a(e.getUTCHours()) + ":" + a(e.getUTCMinutes()) + ":" + a(e.getUTCSeconds()) + "." + (n > 99 ? n : "0" + a(n)) + "Z"
        } : o
    }, function (e, t, n) {
        var r = Date.prototype, i = r.toString, o = r.getTime;
        new Date(NaN) + "" != "Invalid Date" && n(11)(r, "toString", (function () {
            var e = o.call(this);
            return e == e ? i.call(this) : "Invalid Date"
        }))
    }, function (e, t, n) {
        var r = n(5)("toPrimitive"), i = Date.prototype;
        r in i || n(15)(i, r, n(221))
    }, function (e, t, n) {
        "use strict";
        var r = n(3), i = n(27);
        e.exports = function (e) {
            if ("string" !== e && "number" !== e && "default" !== e) throw TypeError("Incorrect hint");
            return i(r(this), "number" != e)
        }
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Array", {isArray: n(55)})
    }, function (e, t, n) {
        "use strict";
        var r = n(18), i = n(0), o = n(10), a = n(107), s = n(80), c = n(6), u = n(81), d = n(82);
        i(i.S + i.F * !n(56)((function (e) {
            Array.from(e)
        })), "Array", {
            from: function (e) {
                var t, n, i, f, l = o(e), p = "function" == typeof this ? this : Array, h = arguments.length,
                    v = h > 1 ? arguments[1] : void 0, _ = void 0 !== v, m = 0, E = d(l);
                if (_ && (v = r(v, h > 2 ? arguments[2] : void 0, 2)), null == E || p == Array && s(E)) for (n = new p(t = c(l.length)); t > m; m++) u(n, m, _ ? v(l[m], m) : l[m]); else for (f = E.call(l), n = new p; !(i = f.next()).done; m++) u(n, m, _ ? a(f, v, [i.value, m], !0) : i.value);
                return n.length = m, n
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(81);
        r(r.S + r.F * n(2)((function () {
            function e() {
            }

            return !(Array.of.call(e) instanceof e)
        })), "Array", {
            of: function () {
                for (var e = 0, t = arguments.length, n = new ("function" == typeof this ? this : Array)(t); t > e;) i(n, e, arguments[e++]);
                return n.length = t, n
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(16), o = [].join;
        r(r.P + r.F * (n(47) != Object || !n(17)(o)), "Array", {
            join: function (e) {
                return o.call(i(this), void 0 === e ? "," : e)
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(68), o = n(24), a = n(33), s = n(6), c = [].slice;
        r(r.P + r.F * n(2)((function () {
            i && c.call(i)
        })), "Array", {
            slice: function (e, t) {
                var n = s(this.length), r = o(this);
                if (t = void 0 === t ? n : t, "Array" == r) return c.call(this, e, t);
                for (var i = a(e, n), u = a(t, n), d = s(u - i), f = new Array(d), l = 0; l < d; l++) f[l] = "String" == r ? this.charAt(i + l) : this[i + l];
                return f
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(19), o = n(10), a = n(2), s = [].sort, c = [1, 2, 3];
        r(r.P + r.F * (a((function () {
            c.sort(void 0)
        })) || !a((function () {
            c.sort(null)
        })) || !n(17)(s)), "Array", {
            sort: function (e) {
                return void 0 === e ? s.call(o(this)) : s.call(o(this), i(e))
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(23)(0), o = n(17)([].forEach, !0);
        r(r.P + r.F * !o, "Array", {
            forEach: function (e) {
                return i(this, e, arguments[1])
            }
        })
    }, function (e, t, n) {
        var r = n(4), i = n(55), o = n(5)("species");
        e.exports = function (e) {
            var t;
            return i(e) && ("function" != typeof (t = e.constructor) || t !== Array && !i(t.prototype) || (t = void 0), r(t) && null === (t = t[o]) && (t = void 0)), void 0 === t ? Array : t
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(23)(1);
        r(r.P + r.F * !n(17)([].map, !0), "Array", {
            map: function (e) {
                return i(this, e, arguments[1])
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(23)(2);
        r(r.P + r.F * !n(17)([].filter, !0), "Array", {
            filter: function (e) {
                return i(this, e, arguments[1])
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(23)(3);
        r(r.P + r.F * !n(17)([].some, !0), "Array", {
            some: function (e) {
                return i(this, e, arguments[1])
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(23)(4);
        r(r.P + r.F * !n(17)([].every, !0), "Array", {
            every: function (e) {
                return i(this, e, arguments[1])
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(109);
        r(r.P + r.F * !n(17)([].reduce, !0), "Array", {
            reduce: function (e) {
                return i(this, e, arguments.length, arguments[1], !1)
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(109);
        r(r.P + r.F * !n(17)([].reduceRight, !0), "Array", {
            reduceRight: function (e) {
                return i(this, e, arguments.length, arguments[1], !0)
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(53)(!1), o = [].indexOf, a = !!o && 1 / [1].indexOf(1, -0) < 0;
        r(r.P + r.F * (a || !n(17)(o)), "Array", {
            indexOf: function (e) {
                return a ? o.apply(this, arguments) || 0 : i(this, e, arguments[1])
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(16), o = n(20), a = n(6), s = [].lastIndexOf, c = !!s && 1 / [1].lastIndexOf(1, -0) < 0;
        r(r.P + r.F * (c || !n(17)(s)), "Array", {
            lastIndexOf: function (e) {
                if (c) return s.apply(this, arguments) || 0;
                var t = i(this), n = a(t.length), r = n - 1;
                for (arguments.length > 1 && (r = Math.min(r, o(arguments[1]))), r < 0 && (r = n + r); r >= 0; r--) if (r in t && t[r] === e) return r || 0;
                return -1
            }
        })
    }, function (e, t, n) {
        var r = n(0);
        r(r.P, "Array", {copyWithin: n(110)}), n(37)("copyWithin")
    }, function (e, t, n) {
        var r = n(0);
        r(r.P, "Array", {fill: n(83)}), n(37)("fill")
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(23)(5), o = !0;
        "find" in [] && Array(1).find((function () {
            o = !1
        })), r(r.P + r.F * o, "Array", {
            find: function (e) {
                return i(this, e, arguments.length > 1 ? arguments[1] : void 0)
            }
        }), n(37)("find")
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(23)(6), o = "findIndex", a = !0;
        o in [] && Array(1)[o]((function () {
            a = !1
        })), r(r.P + r.F * a, "Array", {
            findIndex: function (e) {
                return i(this, e, arguments.length > 1 ? arguments[1] : void 0)
            }
        }), n(37)(o)
    }, function (e, t, n) {
        n(43)("Array")
    }, function (e, t, n) {
        var r = n(1), i = n(71), o = n(9).f, a = n(35).f, s = n(78), c = n(57), u = r.RegExp, d = u, f = u.prototype,
            l = /a/g, p = /a/g, h = new u(l) !== l;
        if (n(8) && (!h || n(2)((function () {
            return p[n(5)("match")] = !1, u(l) != l || u(p) == p || "/a/i" != u(l, "i")
        })))) {
            u = function (e, t) {
                var n = this instanceof u, r = s(e), o = void 0 === t;
                return !n && r && e.constructor === u && o ? e : i(h ? new d(r && !o ? e.source : e, t) : d((r = e instanceof u) ? e.source : e, r && o ? c.call(e) : t), n ? this : f, u)
            };
            for (var v = function (e) {
                e in u || o(u, e, {
                    configurable: !0, get: function () {
                        return d[e]
                    }, set: function (t) {
                        d[e] = t
                    }
                })
            }, _ = a(d), m = 0; _.length > m;) v(_[m++]);
            f.constructor = u, u.prototype = f, n(11)(r, "RegExp", u)
        }
        n(43)("RegExp")
    }, function (e, t, n) {
        "use strict";
        n(113);
        var r = n(3), i = n(57), o = n(8), a = /./.toString, s = function (e) {
            n(11)(RegExp.prototype, "toString", e, !0)
        };
        n(2)((function () {
            return "/a/b" != a.call({source: "a", flags: "b"})
        })) ? s((function () {
            var e = r(this);
            return "/".concat(e.source, "/", "flags" in e ? e.flags : !o && e instanceof RegExp ? i.call(e) : void 0)
        })) : "toString" != a.name && s((function () {
            return a.call(this)
        }))
    }, function (e, t, n) {
        "use strict";
        var r = n(3), i = n(6), o = n(86), a = n(58);
        n(59)("match", 1, (function (e, t, n, s) {
            return [function (n) {
                var r = e(this), i = null == n ? void 0 : n[t];
                return void 0 !== i ? i.call(n, r) : new RegExp(n)[t](String(r))
            }, function (e) {
                var t = s(n, e, this);
                if (t.done) return t.value;
                var c = r(e), u = String(this);
                if (!c.global) return a(c, u);
                var d = c.unicode;
                c.lastIndex = 0;
                for (var f, l = [], p = 0; null !== (f = a(c, u));) {
                    var h = String(f[0]);
                    l[p] = h, "" === h && (c.lastIndex = o(u, i(c.lastIndex), d)), p++
                }
                return 0 === p ? null : l
            }]
        }))
    }, function (e, t, n) {
        "use strict";
        var r = n(3), i = n(10), o = n(6), a = n(20), s = n(86), c = n(58), u = Math.max, d = Math.min, f = Math.floor,
            l = /\$([$&`']|\d\d?|<[^>]*>)/g, p = /\$([$&`']|\d\d?)/g;
        n(59)("replace", 2, (function (e, t, n, h) {
            return [function (r, i) {
                var o = e(this), a = null == r ? void 0 : r[t];
                return void 0 !== a ? a.call(r, o, i) : n.call(String(o), r, i)
            }, function (e, t) {
                var i = h(n, e, this, t);
                if (i.done) return i.value;
                var f = r(e), l = String(this), p = "function" == typeof t;
                p || (t = String(t));
                var _ = f.global;
                if (_) {
                    var m = f.unicode;
                    f.lastIndex = 0
                }
                for (var E = []; ;) {
                    var y = c(f, l);
                    if (null === y) break;
                    if (E.push(y), !_) break;
                    "" === String(y[0]) && (f.lastIndex = s(l, o(f.lastIndex), m))
                }
                for (var S, T = "", g = 0, C = 0; C < E.length; C++) {
                    y = E[C];
                    for (var b = String(y[0]), R = u(d(a(y.index), l.length), 0), A = [], I = 1; I < y.length; I++) A.push(void 0 === (S = y[I]) ? S : String(S));
                    var O = y.groups;
                    if (p) {
                        var N = [b].concat(A, R, l);
                        void 0 !== O && N.push(O);
                        var w = String(t.apply(void 0, N))
                    } else w = v(b, l, R, A, O, t);
                    R >= g && (T += l.slice(g, R) + w, g = R + b.length)
                }
                return T + l.slice(g)
            }];

            function v(e, t, r, o, a, s) {
                var c = r + e.length, u = o.length, d = p;
                return void 0 !== a && (a = i(a), d = l), n.call(s, d, (function (n, i) {
                    var s;
                    switch (i.charAt(0)) {
                        case"$":
                            return "$";
                        case"&":
                            return e;
                        case"`":
                            return t.slice(0, r);
                        case"'":
                            return t.slice(c);
                        case"<":
                            s = a[i.slice(1, -1)];
                            break;
                        default:
                            var d = +i;
                            if (0 === d) return n;
                            if (d > u) {
                                var l = f(d / 10);
                                return 0 === l ? n : l <= u ? void 0 === o[l - 1] ? i.charAt(1) : o[l - 1] + i.charAt(1) : n
                            }
                            s = o[d - 1]
                    }
                    return void 0 === s ? "" : s
                }))
            }
        }))
    }, function (e, t, n) {
        "use strict";
        var r = n(3), i = n(98), o = n(58);
        n(59)("search", 1, (function (e, t, n, a) {
            return [function (n) {
                var r = e(this), i = null == n ? void 0 : n[t];
                return void 0 !== i ? i.call(n, r) : new RegExp(n)[t](String(r))
            }, function (e) {
                var t = a(n, e, this);
                if (t.done) return t.value;
                var s = r(e), c = String(this), u = s.lastIndex;
                i(u, 0) || (s.lastIndex = 0);
                var d = o(s, c);
                return i(s.lastIndex, u) || (s.lastIndex = u), null === d ? -1 : d.index
            }]
        }))
    }, function (e, t, n) {
        "use strict";
        var r = n(78), i = n(3), o = n(50), a = n(86), s = n(6), c = n(58), u = n(85), d = n(2), f = Math.min,
            l = [].push, p = "length", h = !d((function () {
                RegExp(4294967295, "y")
            }));
        n(59)("split", 2, (function (e, t, n, d) {
            var v;
            return v = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1)[p] || 2 != "ab".split(/(?:ab)*/)[p] || 4 != ".".split(/(.?)(.?)/)[p] || ".".split(/()()/)[p] > 1 || "".split(/.?/)[p] ? function (e, t) {
                var i = String(this);
                if (void 0 === e && 0 === t) return [];
                if (!r(e)) return n.call(i, e, t);
                for (var o, a, s, c = [], d = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), f = 0, h = void 0 === t ? 4294967295 : t >>> 0, v = new RegExp(e.source, d + "g"); (o = u.call(v, i)) && !((a = v.lastIndex) > f && (c.push(i.slice(f, o.index)), o[p] > 1 && o.index < i[p] && l.apply(c, o.slice(1)), s = o[0][p], f = a, c[p] >= h));) v.lastIndex === o.index && v.lastIndex++;
                return f === i[p] ? !s && v.test("") || c.push("") : c.push(i.slice(f)), c[p] > h ? c.slice(0, h) : c
            } : "0".split(void 0, 0)[p] ? function (e, t) {
                return void 0 === e && 0 === t ? [] : n.call(this, e, t)
            } : n, [function (n, r) {
                var i = e(this), o = null == n ? void 0 : n[t];
                return void 0 !== o ? o.call(n, i, r) : v.call(String(i), n, r)
            }, function (e, t) {
                var r = d(v, e, this, t, v !== n);
                if (r.done) return r.value;
                var u = i(e), l = String(this), p = o(u, RegExp), _ = u.unicode,
                    m = (u.ignoreCase ? "i" : "") + (u.multiline ? "m" : "") + (u.unicode ? "u" : "") + (h ? "y" : "g"),
                    E = new p(h ? u : "^(?:" + u.source + ")", m), y = void 0 === t ? 4294967295 : t >>> 0;
                if (0 === y) return [];
                if (0 === l.length) return null === c(E, l) ? [l] : [];
                for (var S = 0, T = 0, g = []; T < l.length;) {
                    E.lastIndex = h ? T : 0;
                    var C, b = c(E, h ? l : l.slice(T));
                    if (null === b || (C = f(s(E.lastIndex + (h ? 0 : T)), l.length)) === S) T = a(l, T, _); else {
                        if (g.push(l.slice(S, T)), g.length === y) return g;
                        for (var R = 1; R <= b.length - 1; R++) if (g.push(b[R]), g.length === y) return g;
                        T = S = C
                    }
                }
                return g.push(l.slice(S)), g
            }]
        }))
    }, function (e, t, n) {
        var r = n(1), i = n(87).set, o = r.MutationObserver || r.WebKitMutationObserver, a = r.process, s = r.Promise,
            c = "process" == n(24)(a);
        e.exports = function () {
            var e, t, n, u = function () {
                var r, i;
                for (c && (r = a.domain) && r.exit(); e;) {
                    i = e.fn, e = e.next;
                    try {
                        i()
                    } catch (r) {
                        throw e ? n() : t = void 0, r
                    }
                }
                t = void 0, r && r.enter()
            };
            if (c) n = function () {
                a.nextTick(u)
            }; else if (!o || r.navigator && r.navigator.standalone) if (s && s.resolve) {
                var d = s.resolve(void 0);
                n = function () {
                    d.then(u)
                }
            } else n = function () {
                i.call(r, u)
            }; else {
                var f = !0, l = document.createTextNode("");
                new o(u).observe(l, {characterData: !0}), n = function () {
                    l.data = f = !f
                }
            }
            return function (r) {
                var i = {fn: r, next: void 0};
                t && (t.next = i), e || (e = i, n()), t = i
            }
        }
    }, function (e, t) {
        e.exports = function (e) {
            try {
                return {e: !1, v: e()}
            } catch (e) {
                return {e: !0, v: e}
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(117), i = n(38);
        e.exports = n(62)("Map", (function (e) {
            return function () {
                return e(this, arguments.length > 0 ? arguments[0] : void 0)
            }
        }), {
            get: function (e) {
                var t = r.getEntry(i(this, "Map"), e);
                return t && t.v
            }, set: function (e, t) {
                return r.def(i(this, "Map"), 0 === e ? 0 : e, t)
            }
        }, r, !0)
    }, function (e, t, n) {
        "use strict";
        var r = n(117), i = n(38);
        e.exports = n(62)("Set", (function (e) {
            return function () {
                return e(this, arguments.length > 0 ? arguments[0] : void 0)
            }
        }), {
            add: function (e) {
                return r.def(i(this, "Set"), e = 0 === e ? 0 : e, e)
            }
        }, r)
    }, function (e, t, n) {
        "use strict";
        var r, i = n(1), o = n(23)(0), a = n(11), s = n(28), c = n(97), u = n(118), d = n(4), f = n(38), l = n(38),
            p = !i.ActiveXObject && "ActiveXObject" in i, h = s.getWeak, v = Object.isExtensible, _ = u.ufstore,
            m = function (e) {
                return function () {
                    return e(this, arguments.length > 0 ? arguments[0] : void 0)
                }
            }, E = {
                get: function (e) {
                    if (d(e)) {
                        var t = h(e);
                        return !0 === t ? _(f(this, "WeakMap")).get(e) : t ? t[this._i] : void 0
                    }
                }, set: function (e, t) {
                    return u.def(f(this, "WeakMap"), e, t)
                }
            }, y = e.exports = n(62)("WeakMap", m, E, u, !0, !0);
        l && p && (c((r = u.getConstructor(m, "WeakMap")).prototype, E), s.NEED = !0, o(["delete", "has", "get", "set"], (function (e) {
            var t = y.prototype, n = t[e];
            a(t, e, (function (t, i) {
                if (d(t) && !v(t)) {
                    this._f || (this._f = new r);
                    var o = this._f[e](t, i);
                    return "set" == e ? this : o
                }
                return n.call(this, t, i)
            }))
        })))
    }, function (e, t, n) {
        "use strict";
        var r = n(118), i = n(38);
        n(62)("WeakSet", (function (e) {
            return function () {
                return e(this, arguments.length > 0 ? arguments[0] : void 0)
            }
        }), {
            add: function (e) {
                return r.def(i(this, "WeakSet"), e, !0)
            }
        }, r, !1, !0)
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(63), o = n(88), a = n(3), s = n(33), c = n(6), u = n(4), d = n(1).ArrayBuffer, f = n(50),
            l = o.ArrayBuffer, p = o.DataView, h = i.ABV && d.isView, v = l.prototype.slice, _ = i.VIEW;
        r(r.G + r.W + r.F * (d !== l), {ArrayBuffer: l}), r(r.S + r.F * !i.CONSTR, "ArrayBuffer", {
            isView: function (e) {
                return h && h(e) || u(e) && _ in e
            }
        }), r(r.P + r.U + r.F * n(2)((function () {
            return !new l(2).slice(1, void 0).byteLength
        })), "ArrayBuffer", {
            slice: function (e, t) {
                if (void 0 !== v && void 0 === t) return v.call(a(this), e);
                for (var n = a(this).byteLength, r = s(e, n), i = s(void 0 === t ? n : t, n), o = new (f(this, l))(c(i - r)), u = new p(this), d = new p(o), h = 0; r < i;) d.setUint8(h++, u.getUint8(r++));
                return o
            }
        }), n(43)("ArrayBuffer")
    }, function (e, t, n) {
        var r = n(0);
        r(r.G + r.W + r.F * !n(63).ABV, {DataView: n(88).DataView})
    }, function (e, t, n) {
        n(26)("Int8", 1, (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }))
    }, function (e, t, n) {
        n(26)("Uint8", 1, (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }))
    }, function (e, t, n) {
        n(26)("Uint8", 1, (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }), !0)
    }, function (e, t, n) {
        n(26)("Int16", 2, (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }))
    }, function (e, t, n) {
        n(26)("Uint16", 2, (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }))
    }, function (e, t, n) {
        n(26)("Int32", 4, (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }))
    }, function (e, t, n) {
        n(26)("Uint32", 4, (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }))
    }, function (e, t, n) {
        n(26)("Float32", 4, (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }))
    }, function (e, t, n) {
        n(26)("Float64", 8, (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }))
    }, function (e, t, n) {
        var r = n(0), i = n(19), o = n(3), a = (n(1).Reflect || {}).apply, s = Function.apply;
        r(r.S + r.F * !n(2)((function () {
            a((function () {
            }))
        })), "Reflect", {
            apply: function (e, t, n) {
                var r = i(e), c = o(n);
                return a ? a(r, t, c) : s.call(r, t, c)
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = n(34), o = n(19), a = n(3), s = n(4), c = n(2), u = n(99), d = (n(1).Reflect || {}).construct,
            f = c((function () {
                function e() {
                }

                return !(d((function () {
                }), [], e) instanceof e)
            })), l = !c((function () {
                d((function () {
                }))
            }));
        r(r.S + r.F * (f || l), "Reflect", {
            construct: function (e, t) {
                o(e), a(t);
                var n = arguments.length < 3 ? e : o(arguments[2]);
                if (l && !f) return d(e, t, n);
                if (e == n) {
                    switch (t.length) {
                        case 0:
                            return new e;
                        case 1:
                            return new e(t[0]);
                        case 2:
                            return new e(t[0], t[1]);
                        case 3:
                            return new e(t[0], t[1], t[2]);
                        case 4:
                            return new e(t[0], t[1], t[2], t[3])
                    }
                    var r = [null];
                    return r.push.apply(r, t), new (u.apply(e, r))
                }
                var c = n.prototype, p = i(s(c) ? c : Object.prototype), h = Function.apply.call(e, p, t);
                return s(h) ? h : p
            }
        })
    }, function (e, t, n) {
        var r = n(9), i = n(0), o = n(3), a = n(27);
        i(i.S + i.F * n(2)((function () {
            Reflect.defineProperty(r.f({}, 1, {value: 1}), 1, {value: 2})
        })), "Reflect", {
            defineProperty: function (e, t, n) {
                o(e), t = a(t, !0), o(n);
                try {
                    return r.f(e, t, n), !0
                } catch (e) {
                    return !1
                }
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = n(21).f, o = n(3);
        r(r.S, "Reflect", {
            deleteProperty: function (e, t) {
                var n = i(o(e), t);
                return !(n && !n.configurable) && delete e[t]
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(3), o = function (e) {
            this._t = i(e), this._i = 0;
            var t, n = this._k = [];
            for (t in e) n.push(t)
        };
        n(106)(o, "Object", (function () {
            var e, t = this._k;
            do {
                if (this._i >= t.length) return {value: void 0, done: !0}
            } while (!((e = t[this._i++]) in this._t));
            return {value: e, done: !1}
        })), r(r.S, "Reflect", {
            enumerate: function (e) {
                return new o(e)
            }
        })
    }, function (e, t, n) {
        var r = n(21), i = n(36), o = n(14), a = n(0), s = n(4), c = n(3);
        a(a.S, "Reflect", {
            get: function e(t, n) {
                var a, u, d = arguments.length < 3 ? t : arguments[2];
                return c(t) === d ? t[n] : (a = r.f(t, n)) ? o(a, "value") ? a.value : void 0 !== a.get ? a.get.call(d) : void 0 : s(u = i(t)) ? e(u, n, d) : void 0
            }
        })
    }, function (e, t, n) {
        var r = n(21), i = n(0), o = n(3);
        i(i.S, "Reflect", {
            getOwnPropertyDescriptor: function (e, t) {
                return r.f(o(e), t)
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = n(36), o = n(3);
        r(r.S, "Reflect", {
            getPrototypeOf: function (e) {
                return i(o(e))
            }
        })
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Reflect", {
            has: function (e, t) {
                return t in e
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = n(3), o = Object.isExtensible;
        r(r.S, "Reflect", {
            isExtensible: function (e) {
                return i(e), !o || o(e)
            }
        })
    }, function (e, t, n) {
        var r = n(0);
        r(r.S, "Reflect", {ownKeys: n(120)})
    }, function (e, t, n) {
        var r = n(0), i = n(3), o = Object.preventExtensions;
        r(r.S, "Reflect", {
            preventExtensions: function (e) {
                i(e);
                try {
                    return o && o(e), !0
                } catch (e) {
                    return !1
                }
            }
        })
    }, function (e, t, n) {
        var r = n(9), i = n(21), o = n(36), a = n(14), s = n(0), c = n(29), u = n(3), d = n(4);
        s(s.S, "Reflect", {
            set: function e(t, n, s) {
                var f, l, p = arguments.length < 4 ? t : arguments[3], h = i.f(u(t), n);
                if (!h) {
                    if (d(l = o(t))) return e(l, n, s, p);
                    h = c(0)
                }
                if (a(h, "value")) {
                    if (!1 === h.writable || !d(p)) return !1;
                    if (f = i.f(p, n)) {
                        if (f.get || f.set || !1 === f.writable) return !1;
                        f.value = s, r.f(p, n, f)
                    } else r.f(p, n, c(0, s));
                    return !0
                }
                return void 0 !== h.set && (h.set.call(p, s), !0)
            }
        })
    }, function (e, t, n) {
        var r = n(0), i = n(69);
        i && r(r.S, "Reflect", {
            setPrototypeOf: function (e, t) {
                i.check(e, t);
                try {
                    return i.set(e, t), !0
                } catch (e) {
                    return !1
                }
            }
        })
    }, function (e, t, n) {
        n(281), e.exports = n(7).Array.includes
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(53)(!0);
        r(r.P, "Array", {
            includes: function (e) {
                return i(this, e, arguments.length > 1 ? arguments[1] : void 0)
            }
        }), n(37)("includes")
    }, function (e, t, n) {
        n(283), e.exports = n(7).Array.flatMap
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(284), o = n(10), a = n(6), s = n(19), c = n(108);
        r(r.P, "Array", {
            flatMap: function (e) {
                var t, n, r = o(this);
                return s(e), t = a(r.length), n = c(r, 0), i(n, r, r, t, 0, 1, e, arguments[1]), n
            }
        }), n(37)("flatMap")
    }, function (e, t, n) {
        "use strict";
        var r = n(55), i = n(4), o = n(6), a = n(18), s = n(5)("isConcatSpreadable");
        e.exports = function e(t, n, c, u, d, f, l, p) {
            for (var h, v, _ = d, m = 0, E = !!l && a(l, p, 3); m < u;) {
                if (m in c) {
                    if (h = E ? E(c[m], m, n) : c[m], v = !1, i(h) && (v = void 0 !== (v = h[s]) ? !!v : r(h)), v && f > 0) _ = e(t, n, h, o(h.length), _, f - 1) - 1; else {
                        if (_ >= 9007199254740991) throw TypeError();
                        t[_] = h
                    }
                    _++
                }
                m++
            }
            return _
        }
    }, function (e, t, n) {
        n(286), e.exports = n(7).String.padStart
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(121), o = n(61), a = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);
        r(r.P + r.F * a, "String", {
            padStart: function (e) {
                return i(this, e, arguments.length > 1 ? arguments[1] : void 0, !0)
            }
        })
    }, function (e, t, n) {
        n(288), e.exports = n(7).String.padEnd
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(121), o = n(61), a = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);
        r(r.P + r.F * a, "String", {
            padEnd: function (e) {
                return i(this, e, arguments.length > 1 ? arguments[1] : void 0, !1)
            }
        })
    }, function (e, t, n) {
        n(290), e.exports = n(7).String.trimLeft
    }, function (e, t, n) {
        "use strict";
        n(41)("trimLeft", (function (e) {
            return function () {
                return e(this, 1)
            }
        }), "trimStart")
    }, function (e, t, n) {
        n(292), e.exports = n(7).String.trimRight
    }, function (e, t, n) {
        "use strict";
        n(41)("trimRight", (function (e) {
            return function () {
                return e(this, 2)
            }
        }), "trimEnd")
    }, function (e, t, n) {
        n(294), e.exports = n(65).f("asyncIterator")
    }, function (e, t, n) {
        n(93)("asyncIterator")
    }, function (e, t, n) {
        n(296), e.exports = n(7).Object.getOwnPropertyDescriptors
    }, function (e, t, n) {
        var r = n(0), i = n(120), o = n(16), a = n(21), s = n(81);
        r(r.S, "Object", {
            getOwnPropertyDescriptors: function (e) {
                for (var t, n, r = o(e), c = a.f, u = i(r), d = {}, f = 0; u.length > f;) void 0 !== (n = c(r, t = u[f++])) && s(d, t, n);
                return d
            }
        })
    }, function (e, t, n) {
        n(298), e.exports = n(7).Object.values
    }, function (e, t, n) {
        var r = n(0), i = n(122)(!1);
        r(r.S, "Object", {
            values: function (e) {
                return i(e)
            }
        })
    }, function (e, t, n) {
        n(300), e.exports = n(7).Object.entries
    }, function (e, t, n) {
        var r = n(0), i = n(122)(!0);
        r(r.S, "Object", {
            entries: function (e) {
                return i(e)
            }
        })
    }, function (e, t, n) {
        "use strict";
        n(114), n(302), e.exports = n(7).Promise.finally
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = n(7), o = n(1), a = n(50), s = n(116);
        r(r.P + r.R, "Promise", {
            finally: function (e) {
                var t = a(this, i.Promise || o.Promise), n = "function" == typeof e;
                return this.then(n ? function (n) {
                    return s(t, e()).then((function () {
                        return n
                    }))
                } : e, n ? function (n) {
                    return s(t, e()).then((function () {
                        throw n
                    }))
                } : e)
            }
        })
    }, function (e, t, n) {
        n(304), n(305), n(306), e.exports = n(7)
    }, function (e, t, n) {
        var r = n(1), i = n(0), o = n(61), a = [].slice, s = /MSIE .\./.test(o), c = function (e) {
            return function (t, n) {
                var r = arguments.length > 2, i = !!r && a.call(arguments, 2);
                return e(r ? function () {
                    ("function" == typeof t ? t : Function(t)).apply(this, i)
                } : t, n)
            }
        };
        i(i.G + i.B + i.F * s, {setTimeout: c(r.setTimeout), setInterval: c(r.setInterval)})
    }, function (e, t, n) {
        var r = n(0), i = n(87);
        r(r.G + r.B, {setImmediate: i.set, clearImmediate: i.clear})
    }, function (e, t, n) {
        for (var r = n(84), i = n(32), o = n(11), a = n(1), s = n(15), c = n(42), u = n(5), d = u("iterator"), f = u("toStringTag"), l = c.Array, p = {
            CSSRuleList: !0,
            CSSStyleDeclaration: !1,
            CSSValueList: !1,
            ClientRectList: !1,
            DOMRectList: !1,
            DOMStringList: !1,
            DOMTokenList: !0,
            DataTransferItemList: !1,
            FileList: !1,
            HTMLAllCollection: !1,
            HTMLCollection: !1,
            HTMLFormElement: !1,
            HTMLSelectElement: !1,
            MediaList: !0,
            MimeTypeArray: !1,
            NamedNodeMap: !1,
            NodeList: !0,
            PaintRequestList: !1,
            Plugin: !1,
            PluginArray: !1,
            SVGLengthList: !1,
            SVGNumberList: !1,
            SVGPathSegList: !1,
            SVGPointList: !1,
            SVGStringList: !1,
            SVGTransformList: !1,
            SourceBufferList: !1,
            StyleSheetList: !0,
            TextTrackCueList: !1,
            TextTrackList: !1,
            TouchList: !1
        }, h = i(p), v = 0; v < h.length; v++) {
            var _, m = h[v], E = p[m], y = a[m], S = y && y.prototype;
            if (S && (S[d] || s(S, d, l), S[f] || s(S, f, m), c[m] = l, E)) for (_ in r) S[_] || o(S, _, r[_], !0)
        }
    }, function (e, t, n) {
        var r = function (e) {
            "use strict";
            var t = Object.prototype, n = t.hasOwnProperty, r = "function" == typeof Symbol ? Symbol : {},
                i = r.iterator || "@@iterator", o = r.asyncIterator || "@@asyncIterator",
                a = r.toStringTag || "@@toStringTag";

            function s(e, t, n) {
                return Object.defineProperty(e, t, {value: n, enumerable: !0, configurable: !0, writable: !0}), e[t]
            }

            try {
                s({}, "")
            } catch (e) {
                s = function (e, t, n) {
                    return e[t] = n
                }
            }

            function c(e, t, n, r) {
                var i = t && t.prototype instanceof f ? t : f, o = Object.create(i.prototype), a = new C(r || []);
                return o._invoke = function (e, t, n) {
                    var r = "suspendedStart";
                    return function (i, o) {
                        if ("executing" === r) throw new Error("Generator is already running");
                        if ("completed" === r) {
                            if ("throw" === i) throw o;
                            return R()
                        }
                        for (n.method = i, n.arg = o; ;) {
                            var a = n.delegate;
                            if (a) {
                                var s = S(a, n);
                                if (s) {
                                    if (s === d) continue;
                                    return s
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                                if ("suspendedStart" === r) throw r = "completed", n.arg;
                                n.dispatchException(n.arg)
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            r = "executing";
                            var c = u(e, t, n);
                            if ("normal" === c.type) {
                                if (r = n.done ? "completed" : "suspendedYield", c.arg === d) continue;
                                return {value: c.arg, done: n.done}
                            }
                            "throw" === c.type && (r = "completed", n.method = "throw", n.arg = c.arg)
                        }
                    }
                }(e, n, a), o
            }

            function u(e, t, n) {
                try {
                    return {type: "normal", arg: e.call(t, n)}
                } catch (e) {
                    return {type: "throw", arg: e}
                }
            }

            e.wrap = c;
            var d = {};

            function f() {
            }

            function l() {
            }

            function p() {
            }

            var h = {};
            h[i] = function () {
                return this
            };
            var v = Object.getPrototypeOf, _ = v && v(v(b([])));
            _ && _ !== t && n.call(_, i) && (h = _);
            var m = p.prototype = f.prototype = Object.create(h);

            function E(e) {
                ["next", "throw", "return"].forEach((function (t) {
                    s(e, t, (function (e) {
                        return this._invoke(t, e)
                    }))
                }))
            }

            function y(e, t) {
                var r;
                this._invoke = function (i, o) {
                    function a() {
                        return new t((function (r, a) {
                            !function r(i, o, a, s) {
                                var c = u(e[i], e, o);
                                if ("throw" !== c.type) {
                                    var d = c.arg, f = d.value;
                                    return f && "object" == typeof f && n.call(f, "__await") ? t.resolve(f.__await).then((function (e) {
                                        r("next", e, a, s)
                                    }), (function (e) {
                                        r("throw", e, a, s)
                                    })) : t.resolve(f).then((function (e) {
                                        d.value = e, a(d)
                                    }), (function (e) {
                                        return r("throw", e, a, s)
                                    }))
                                }
                                s(c.arg)
                            }(i, o, r, a)
                        }))
                    }

                    return r = r ? r.then(a, a) : a()
                }
            }

            function S(e, t) {
                var n = e.iterator[t.method];
                if (void 0 === n) {
                    if (t.delegate = null, "throw" === t.method) {
                        if (e.iterator.return && (t.method = "return", t.arg = void 0, S(e, t), "throw" === t.method)) return d;
                        t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method")
                    }
                    return d
                }
                var r = u(n, e.iterator, t.arg);
                if ("throw" === r.type) return t.method = "throw", t.arg = r.arg, t.delegate = null, d;
                var i = r.arg;
                return i ? i.done ? (t[e.resultName] = i.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, d) : i : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, d)
            }

            function T(e) {
                var t = {tryLoc: e[0]};
                1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
            }

            function g(e) {
                var t = e.completion || {};
                t.type = "normal", delete t.arg, e.completion = t
            }

            function C(e) {
                this.tryEntries = [{tryLoc: "root"}], e.forEach(T, this), this.reset(!0)
            }

            function b(e) {
                if (e) {
                    var t = e[i];
                    if (t) return t.call(e);
                    if ("function" == typeof e.next) return e;
                    if (!isNaN(e.length)) {
                        var r = -1, o = function t() {
                            for (; ++r < e.length;) if (n.call(e, r)) return t.value = e[r], t.done = !1, t;
                            return t.value = void 0, t.done = !0, t
                        };
                        return o.next = o
                    }
                }
                return {next: R}
            }

            function R() {
                return {value: void 0, done: !0}
            }

            return l.prototype = m.constructor = p, p.constructor = l, l.displayName = s(p, a, "GeneratorFunction"), e.isGeneratorFunction = function (e) {
                var t = "function" == typeof e && e.constructor;
                return !!t && (t === l || "GeneratorFunction" === (t.displayName || t.name))
            }, e.mark = function (e) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(e, p) : (e.__proto__ = p, s(e, a, "GeneratorFunction")), e.prototype = Object.create(m), e
            }, e.awrap = function (e) {
                return {__await: e}
            }, E(y.prototype), y.prototype[o] = function () {
                return this
            }, e.AsyncIterator = y, e.async = function (t, n, r, i, o) {
                void 0 === o && (o = Promise);
                var a = new y(c(t, n, r, i), o);
                return e.isGeneratorFunction(n) ? a : a.next().then((function (e) {
                    return e.done ? e.value : a.next()
                }))
            }, E(m), s(m, a, "Generator"), m[i] = function () {
                return this
            }, m.toString = function () {
                return "[object Generator]"
            }, e.keys = function (e) {
                var t = [];
                for (var n in e) t.push(n);
                return t.reverse(), function n() {
                    for (; t.length;) {
                        var r = t.pop();
                        if (r in e) return n.value = r, n.done = !1, n
                    }
                    return n.done = !0, n
                }
            }, e.values = b, C.prototype = {
                constructor: C, reset: function (e) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(g), !e) for (var t in this) "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0)
                }, stop: function () {
                    this.done = !0;
                    var e = this.tryEntries[0].completion;
                    if ("throw" === e.type) throw e.arg;
                    return this.rval
                }, dispatchException: function (e) {
                    if (this.done) throw e;
                    var t = this;

                    function r(n, r) {
                        return a.type = "throw", a.arg = e, t.next = n, r && (t.method = "next", t.arg = void 0), !!r
                    }

                    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                        var o = this.tryEntries[i], a = o.completion;
                        if ("root" === o.tryLoc) return r("end");
                        if (o.tryLoc <= this.prev) {
                            var s = n.call(o, "catchLoc"), c = n.call(o, "finallyLoc");
                            if (s && c) {
                                if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                                if (this.prev < o.finallyLoc) return r(o.finallyLoc)
                            } else if (s) {
                                if (this.prev < o.catchLoc) return r(o.catchLoc, !0)
                            } else {
                                if (!c) throw new Error("try statement without catch or finally");
                                if (this.prev < o.finallyLoc) return r(o.finallyLoc)
                            }
                        }
                    }
                }, abrupt: function (e, t) {
                    for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                        var i = this.tryEntries[r];
                        if (i.tryLoc <= this.prev && n.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
                            var o = i;
                            break
                        }
                    }
                    o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
                    var a = o ? o.completion : {};
                    return a.type = e, a.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, d) : this.complete(a)
                }, complete: function (e, t) {
                    if ("throw" === e.type) throw e.arg;
                    return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), d
                }, finish: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var n = this.tryEntries[t];
                        if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), g(n), d
                    }
                }, catch: function (e) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var n = this.tryEntries[t];
                        if (n.tryLoc === e) {
                            var r = n.completion;
                            if ("throw" === r.type) {
                                var i = r.arg;
                                g(n)
                            }
                            return i
                        }
                    }
                    throw new Error("illegal catch attempt")
                }, delegateYield: function (e, t, n) {
                    return this.delegate = {
                        iterator: b(e),
                        resultName: t,
                        nextLoc: n
                    }, "next" === this.method && (this.arg = void 0), d
                }
            }, e
        }(e.exports);
        try {
            regeneratorRuntime = r
        } catch (e) {
            Function("r", "regeneratorRuntime = r")(r)
        }
    }, function (e, t, n) {
        n(309), e.exports = n(123).global
    }, function (e, t, n) {
        var r = n(310);
        r(r.G, {global: n(89)})
    }, function (e, t, n) {
        var r = n(89), i = n(123), o = n(311), a = n(313), s = n(320), c = function (e, t, n) {
            var u, d, f, l = e & c.F, p = e & c.G, h = e & c.S, v = e & c.P, _ = e & c.B, m = e & c.W,
                E = p ? i : i[t] || (i[t] = {}), y = E.prototype, S = p ? r : h ? r[t] : (r[t] || {}).prototype;
            for (u in p && (n = t), n) (d = !l && S && void 0 !== S[u]) && s(E, u) || (f = d ? S[u] : n[u], E[u] = p && "function" != typeof S[u] ? n[u] : _ && d ? o(f, r) : m && S[u] == f ? function (e) {
                var t = function (t, n, r) {
                    if (this instanceof e) {
                        switch (arguments.length) {
                            case 0:
                                return new e;
                            case 1:
                                return new e(t);
                            case 2:
                                return new e(t, n)
                        }
                        return new e(t, n, r)
                    }
                    return e.apply(this, arguments)
                };
                return t.prototype = e.prototype, t
            }(f) : v && "function" == typeof f ? o(Function.call, f) : f, v && ((E.virtual || (E.virtual = {}))[u] = f, e & c.R && y && !y[u] && a(y, u, f)))
        };
        c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
    }, function (e, t, n) {
        var r = n(312);
        e.exports = function (e, t, n) {
            if (r(e), void 0 === t) return e;
            switch (n) {
                case 1:
                    return function (n) {
                        return e.call(t, n)
                    };
                case 2:
                    return function (n, r) {
                        return e.call(t, n, r)
                    };
                case 3:
                    return function (n, r, i) {
                        return e.call(t, n, r, i)
                    }
            }
            return function () {
                return e.apply(t, arguments)
            }
        }
    }, function (e, t) {
        e.exports = function (e) {
            if ("function" != typeof e) throw TypeError(e + " is not a function!");
            return e
        }
    }, function (e, t, n) {
        var r = n(314), i = n(319);
        e.exports = n(91) ? function (e, t, n) {
            return r.f(e, t, i(1, n))
        } : function (e, t, n) {
            return e[t] = n, e
        }
    }, function (e, t, n) {
        var r = n(315), i = n(316), o = n(318), a = Object.defineProperty;
        t.f = n(91) ? Object.defineProperty : function (e, t, n) {
            if (r(e), t = o(t, !0), r(n), i) try {
                return a(e, t, n)
            } catch (e) {
            }
            if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
            return "value" in n && (e[t] = n.value), e
        }
    }, function (e, t, n) {
        var r = n(90);
        e.exports = function (e) {
            if (!r(e)) throw TypeError(e + " is not an object!");
            return e
        }
    }, function (e, t, n) {
        e.exports = !n(91) && !n(124)((function () {
            return 7 != Object.defineProperty(n(317)("div"), "a", {
                get: function () {
                    return 7
                }
            }).a
        }))
    }, function (e, t, n) {
        var r = n(90), i = n(89).document, o = r(i) && r(i.createElement);
        e.exports = function (e) {
            return o ? i.createElement(e) : {}
        }
    }, function (e, t, n) {
        var r = n(90);
        e.exports = function (e, t) {
            if (!r(e)) return e;
            var n, i;
            if (t && "function" == typeof (n = e.toString) && !r(i = n.call(e))) return i;
            if ("function" == typeof (n = e.valueOf) && !r(i = n.call(e))) return i;
            if (!t && "function" == typeof (n = e.toString) && !r(i = n.call(e))) return i;
            throw TypeError("Can't convert object to primitive value")
        }
    }, function (e, t) {
        e.exports = function (e, t) {
            return {enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t}
        }
    }, function (e, t) {
        var n = {}.hasOwnProperty;
        e.exports = function (e, t) {
            return n.call(e, t)
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(13), i = n(125), o = n(322), a = n(131);

        function s(e) {
            var t = new o(e), n = i(o.prototype.request, t);
            return r.extend(n, o.prototype, t), r.extend(n, t), n
        }

        var c = s(n(128));
        c.Axios = o, c.create = function (e) {
            return s(a(c.defaults, e))
        }, c.Cancel = n(132), c.CancelToken = n(336), c.isCancel = n(127), c.all = function (e) {
            return Promise.all(e)
        }, c.spread = n(337), e.exports = c, e.exports.default = c
    }, function (e, t, n) {
        "use strict";
        var r = n(13), i = n(126), o = n(323), a = n(324), s = n(131);

        function c(e) {
            this.defaults = e, this.interceptors = {request: new o, response: new o}
        }

        c.prototype.request = function (e) {
            "string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = s(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";
            var t = [a, void 0], n = Promise.resolve(e);
            for (this.interceptors.request.forEach((function (e) {
                t.unshift(e.fulfilled, e.rejected)
            })), this.interceptors.response.forEach((function (e) {
                t.push(e.fulfilled, e.rejected)
            })); t.length;) n = n.then(t.shift(), t.shift());
            return n
        }, c.prototype.getUri = function (e) {
            return e = s(this.defaults, e), i(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
        }, r.forEach(["delete", "get", "head", "options"], (function (e) {
            c.prototype[e] = function (t, n) {
                return this.request(r.merge(n || {}, {method: e, url: t}))
            }
        })), r.forEach(["post", "put", "patch"], (function (e) {
            c.prototype[e] = function (t, n, i) {
                return this.request(r.merge(i || {}, {method: e, url: t, data: n}))
            }
        })), e.exports = c
    }, function (e, t, n) {
        "use strict";
        var r = n(13);

        function i() {
            this.handlers = []
        }

        i.prototype.use = function (e, t) {
            return this.handlers.push({fulfilled: e, rejected: t}), this.handlers.length - 1
        }, i.prototype.eject = function (e) {
            this.handlers[e] && (this.handlers[e] = null)
        }, i.prototype.forEach = function (e) {
            r.forEach(this.handlers, (function (t) {
                null !== t && e(t)
            }))
        }, e.exports = i
    }, function (e, t, n) {
        "use strict";
        var r = n(13), i = n(325), o = n(127), a = n(128);

        function s(e) {
            e.cancelToken && e.cancelToken.throwIfRequested()
        }

        e.exports = function (e) {
            return s(e), e.headers = e.headers || {}, e.data = i(e.data, e.headers, e.transformRequest), e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function (t) {
                delete e.headers[t]
            })), (e.adapter || a.adapter)(e).then((function (t) {
                return s(e), t.data = i(t.data, t.headers, e.transformResponse), t
            }), (function (t) {
                return o(t) || (s(e), t && t.response && (t.response.data = i(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t)
            }))
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(13);
        e.exports = function (e, t, n) {
            return r.forEach(n, (function (n) {
                e = n(e, t)
            })), e
        }
    }, function (e, t) {
        var n, r, i = e.exports = {};

        function o() {
            throw new Error("setTimeout has not been defined")
        }

        function a() {
            throw new Error("clearTimeout has not been defined")
        }

        function s(e) {
            if (n === setTimeout) return setTimeout(e, 0);
            if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
            try {
                return n(e, 0)
            } catch (t) {
                try {
                    return n.call(null, e, 0)
                } catch (t) {
                    return n.call(this, e, 0)
                }
            }
        }

        !function () {
            try {
                n = "function" == typeof setTimeout ? setTimeout : o
            } catch (e) {
                n = o
            }
            try {
                r = "function" == typeof clearTimeout ? clearTimeout : a
            } catch (e) {
                r = a
            }
        }();
        var c, u = [], d = !1, f = -1;

        function l() {
            d && c && (d = !1, c.length ? u = c.concat(u) : f = -1, u.length && p())
        }

        function p() {
            if (!d) {
                var e = s(l);
                d = !0;
                for (var t = u.length; t;) {
                    for (c = u, u = []; ++f < t;) c && c[f].run();
                    f = -1, t = u.length
                }
                c = null, d = !1, function (e) {
                    if (r === clearTimeout) return clearTimeout(e);
                    if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
                    try {
                        r(e)
                    } catch (t) {
                        try {
                            return r.call(null, e)
                        } catch (t) {
                            return r.call(this, e)
                        }
                    }
                }(e)
            }
        }

        function h(e, t) {
            this.fun = e, this.array = t
        }

        function v() {
        }

        i.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            u.push(new h(e, t)), 1 !== u.length || d || s(p)
        }, h.prototype.run = function () {
            this.fun.apply(null, this.array)
        }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = v, i.addListener = v, i.once = v, i.off = v, i.removeListener = v, i.removeAllListeners = v, i.emit = v, i.prependListener = v, i.prependOnceListener = v, i.listeners = function (e) {
            return []
        }, i.binding = function (e) {
            throw new Error("process.binding is not supported")
        }, i.cwd = function () {
            return "/"
        }, i.chdir = function (e) {
            throw new Error("process.chdir is not supported")
        }, i.umask = function () {
            return 0
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(13);
        e.exports = function (e, t) {
            r.forEach(e, (function (n, r) {
                r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r])
            }))
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(130);
        e.exports = function (e, t, n) {
            var i = n.config.validateStatus;
            !i || i(n.status) ? e(n) : t(r("Request failed with status code " + n.status, n.config, null, n.request, n))
        }
    }, function (e, t, n) {
        "use strict";
        e.exports = function (e, t, n, r, i) {
            return e.config = t, n && (e.code = n), e.request = r, e.response = i, e.isAxiosError = !0, e.toJSON = function () {
                return {
                    message: this.message,
                    name: this.name,
                    description: this.description,
                    number: this.number,
                    fileName: this.fileName,
                    lineNumber: this.lineNumber,
                    columnNumber: this.columnNumber,
                    stack: this.stack,
                    config: this.config,
                    code: this.code
                }
            }, e
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(331), i = n(332);
        e.exports = function (e, t) {
            return e && !r(t) ? i(e, t) : t
        }
    }, function (e, t, n) {
        "use strict";
        e.exports = function (e) {
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
        }
    }, function (e, t, n) {
        "use strict";
        e.exports = function (e, t) {
            return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(13),
            i = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
        e.exports = function (e) {
            var t, n, o, a = {};
            return e ? (r.forEach(e.split("\n"), (function (e) {
                if (o = e.indexOf(":"), t = r.trim(e.substr(0, o)).toLowerCase(), n = r.trim(e.substr(o + 1)), t) {
                    if (a[t] && i.indexOf(t) >= 0) return;
                    a[t] = "set-cookie" === t ? (a[t] ? a[t] : []).concat([n]) : a[t] ? a[t] + ", " + n : n
                }
            })), a) : a
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(13);
        e.exports = r.isStandardBrowserEnv() ? function () {
            var e, t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");

            function i(e) {
                var r = e;
                return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), {
                    href: n.href,
                    protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                    host: n.host,
                    search: n.search ? n.search.replace(/^\?/, "") : "",
                    hash: n.hash ? n.hash.replace(/^#/, "") : "",
                    hostname: n.hostname,
                    port: n.port,
                    pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
                }
            }

            return e = i(window.location.href), function (t) {
                var n = r.isString(t) ? i(t) : t;
                return n.protocol === e.protocol && n.host === e.host
            }
        }() : function () {
            return !0
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(13);
        e.exports = r.isStandardBrowserEnv() ? {
            write: function (e, t, n, i, o, a) {
                var s = [];
                s.push(e + "=" + encodeURIComponent(t)), r.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), r.isString(i) && s.push("path=" + i), r.isString(o) && s.push("domain=" + o), !0 === a && s.push("secure"), document.cookie = s.join("; ")
            }, read: function (e) {
                var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                return t ? decodeURIComponent(t[3]) : null
            }, remove: function (e) {
                this.write(e, "", Date.now() - 864e5)
            }
        } : {
            write: function () {
            }, read: function () {
                return null
            }, remove: function () {
            }
        }
    }, function (e, t, n) {
        "use strict";
        var r = n(132);

        function i(e) {
            if ("function" != typeof e) throw new TypeError("executor must be a function.");
            var t;
            this.promise = new Promise((function (e) {
                t = e
            }));
            var n = this;
            e((function (e) {
                n.reason || (n.reason = new r(e), t(n.reason))
            }))
        }

        i.prototype.throwIfRequested = function () {
            if (this.reason) throw this.reason
        }, i.source = function () {
            var e;
            return {
                token: new i((function (t) {
                    e = t
                })), cancel: e
            }
        }, e.exports = i
    }, function (e, t, n) {
        "use strict";
        e.exports = function (e) {
            return function (t) {
                return e.apply(null, t)
            }
        }
    }, function (e, t, n) {
        "use strict";
        n.r(t);
        var r = {};
        n.r(r), n.d(r, "shimGetUserMedia", (function () {
            return de
        })), n.d(r, "shimGetDisplayMedia", (function () {
            return fe
        })), n.d(r, "shimMediaStream", (function () {
            return le
        })), n.d(r, "shimOnTrack", (function () {
            return pe
        })), n.d(r, "shimGetSendersWithDtmf", (function () {
            return he
        })), n.d(r, "shimGetStats", (function () {
            return ve
        })), n.d(r, "shimSenderReceiverGetStats", (function () {
            return _e
        })), n.d(r, "shimAddTrackRemoveTrackWithNative", (function () {
            return me
        })), n.d(r, "shimAddTrackRemoveTrack", (function () {
            return Ee
        })), n.d(r, "shimPeerConnection", (function () {
            return ye
        })), n.d(r, "fixNegotiationNeeded", (function () {
            return Se
        }));
        var i = {};
        n.r(i), n.d(i, "shimGetUserMedia", (function () {
            return Ce
        })), n.d(i, "shimGetDisplayMedia", (function () {
            return be
        })), n.d(i, "shimPeerConnection", (function () {
            return Re
        })), n.d(i, "shimReplaceTrack", (function () {
            return Ae
        }));
        var o = {};
        n.r(o), n.d(o, "shimGetUserMedia", (function () {
            return Ie
        })), n.d(o, "shimGetDisplayMedia", (function () {
            return Oe
        })), n.d(o, "shimOnTrack", (function () {
            return Ne
        })), n.d(o, "shimPeerConnection", (function () {
            return we
        })), n.d(o, "shimSenderGetStats", (function () {
            return De
        })), n.d(o, "shimReceiverGetStats", (function () {
            return Pe
        })), n.d(o, "shimRemoveStream", (function () {
            return ke
        })), n.d(o, "shimRTCDataChannel", (function () {
            return Le
        })), n.d(o, "shimAddTransceiver", (function () {
            return Me
        })), n.d(o, "shimGetParameters", (function () {
            return xe
        })), n.d(o, "shimCreateOffer", (function () {
            return Ue
        })), n.d(o, "shimCreateAnswer", (function () {
            return Ve
        }));
        var a = {};
        n.r(a), n.d(a, "shimLocalStreamsAPI", (function () {
            return Fe
        })), n.d(a, "shimRemoteStreamsAPI", (function () {
            return je
        })), n.d(a, "shimCallbacksAPI", (function () {
            return Be
        })), n.d(a, "shimGetUserMedia", (function () {
            return We
        })), n.d(a, "shimConstraints", (function () {
            return Ge
        })), n.d(a, "shimRTCIceServerUrls", (function () {
            return He
        })), n.d(a, "shimTrackEventTransceiver", (function () {
            return Ke
        })), n.d(a, "shimCreateOfferLegacy", (function () {
            return Ye
        })), n.d(a, "shimAudioContext", (function () {
            return Je
        }));
        var s = {};
        n.r(s), n.d(s, "shimRTCIceCandidate", (function () {
            return Qe
        })), n.d(s, "shimMaxMessageSize", (function () {
            return qe
        })), n.d(s, "shimSendThrowTypeError", (function () {
            return $e
        })), n.d(s, "shimConnectionState", (function () {
            return Ze
        })), n.d(s, "removeAllowExtmapMixed", (function () {
            return et
        }));
        var c, u, d, f, l, p, h, v, _ = n(39), m = {
            SDK_VERSION: _.version,
            PROCESS_ID: "",
            GATEWAY_ADDRESS: "https://gateway.agrtc.cn",
            GATEWAY_ADDRESS1: "https://gateway1.agrtc.cn",
            GATEWAY_ADDRESS_SSL: !0,
            GATEWAY_CONNECT_TIMEOUT: 2e3,
            TASK_GATEWAY_ADDRESS: "https://gateway.agrtc.cn",
            TASK_GATEWAY_ADDRESS_SSL: !0,
            TASK_GATEWAY_CONNECT_TIMEOUT: 2e3,
            GATEWAY_ERTRY_TIMEOUT: 12e5,
            ENABLE_USER_QUALITY_UPLOAD: !1,
            ACCOUNT_REGISTER_RETRY_TIMEOUT: 1,
            ACCOUNT_REGISTER_RETRY_RATIO: 2,
            ACCOUNT_REGISTER_RETRY_TIMEOUT_MAX: 6e4,
            ACCOUNT_REGISTER_RETRY_COUNT_MAX: 1e5,
            AUDIO_CONTEXT: null,
            EVENT_REPORT_DOMAIN: "event.agrtc.cn",
            EVENT_REPORT_BACKUP_DOMAIN: "event.agrtc.cn",
            WEBCS_BACKUP_CONNECT_TIMEOUT: 6e3,
            HTTP_CONNECT_TIMEOUT: 5e3,
            PLAYER_STATE_DEFER: 2e3,
            SIGNAL_REQUEST_TIMEOUT: 1e4,
            SIGNAL_REQUEST_WATCH_INTERVAL: 1e3,
            REPORT_STATS: !0,
            UPLOAD_LOG: !1,
            NOT_REPORT_EVENT: [],
            FILEPATH_LENMAX: 255,
            SUBSCRIBE_TCC: !1,
            PING_PONG_TIME_OUT: 10,
            DUALSTREAM_OPERATION_CHECK: !0,
            WEBSOCKET_TIMEOUT_MIN: 1e4,
            EVENT_REPORT_SEND_INTERVAL: 1e3,
            MEDIA_ELEMENT_EXISTS_DEPTH: 3,
            CANDIDATE_TIMEOUT: 2e3,
            SHIM_CANDIDATE: !1,
            LEAVE_MSG_TIMEOUT: 2e3,
            SHOW_REPORT_INVOKER_LOG: !1,
            STATS_FILTER: {transportId: !0, googTrackId: !0},
            JOIN_EXTEND: "",
            PUB_EXTEND: "",
            SUB_EXTEND: "",
            FORCE_TURN: !1,
            TURN_ENABLE_TCP: !0,
            TURN_ENABLE_UDP: !0,
            MAX_UPLOAD_CACHE: 50,
            UPLOAD_CACHE_INTERVAL: 200,
            AUDIO_SOURCE_VOLUME_UPDATE_INTERVAL: 200,
            AUDIO_SOURCE_AVG_VOLUME_DURATION: 3e3,
            AUDIO_VOLUME_INDICATION_INTERVAL: 2e3
        };
        !function (e) {
            e.DEST_TOKEN_EXPIRED = "DEST_TOKEN_EXPIRED", e.RELAY_OK = "RELAY_OK", e.SERVER_CONNECTION_LOST = "SERVER_CONNECTION_LOST", e.SRC_TOKEN_EXPIRED = "SRC_TOKEN_EXPIRED"
        }(c || (c = {})), function (e) {
            e.NETWORK_CONNECTED = "NETWORK_CONNECTED", e.NETWORK_DISCONNECTED = "NETWORK_DISCONNECTED", e.PACKET_JOINED_DEST_CHANNEL = "PACKET_JOINED_DEST_CHANNEL", e.PACKET_JOINED_SRC_CHANNEL = "PACKET_JOINED_SRC_CHANNEL", e.PACKET_RECEIVED_AUDIO_FROM_SRC = "PACKET_RECEIVED_AUDIO_FROM_SRC", e.PACKET_RECEIVED_VIDEO_FROM_SRC = "PACKET_RECEIVED_VIDEO_FROM_SRC", e.PACKET_SENT_TO_DEST_CHANNEL = "PACKET_SENT_TO_DEST_CHANNEL", e.PACKET_UPDATE_DEST_CHANNEL = "PACKET_UPDATE_DEST_CHANNEL", e.PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE = "PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE", e.PACKET_UPDATE_DEST_CHANNEL_REFUSED = "PACKET_UPDATE_DEST_CHANNEL_REFUSED"
        }(u || (u = {})), function (e) {
            e.RELAY_STATE_CONNECTING = "RELAY_STATE_CONNECTING", e.RELAY_STATE_FAILURE = "RELAY_STATE_FAILURE", e.RELAY_STATE_IDLE = "RELAY_STATE_IDLE", e.RELAY_STATE_RUNNING = "RELAY_STATE_RUNNING"
        }(d || (d = {})), function (e) {
            e.CHANNEL_BANNED = "CHANNEL_BANNED", e.IP_BANNED = "IP_BANNED", e.LEAVE = "LEAVE", e.CONNECT_TIME_OUT = "CONNECT_TIME_OUT", e.KEEP_A_LIVE_TIME_OUT = "KEEP_A_LIVE_TIME_OUT", e.NETWORK_ERROR = "NETWORK_ERROR", e.SERVER_ERROR = "SERVER_ERROR", e.UID_BANNED = "UID_BANNED", e.DEVELOPER_INVALID = "DEVELOPER_INVALID", e.TOKEN_INVALID = "TOKEN_INVALID"
        }(f || (f = {})), function (e) {
            e[e.AUDIO_ONLY = 2] = "AUDIO_ONLY", e[e.DISABLE = 0] = "DISABLE", e[e.LOW_STREAM = 1] = "LOW_STREAM"
        }(l || (l = {})), function (e) {
            e[e.HIGH_STREAM = 0] = "HIGH_STREAM", e[e.LOW_STREAM = 1] = "LOW_STREAM"
        }(p || (p = {})), function (e) {
            e.WIN_10 = "Windows 10", e.WIN_81 = "Windows 8.1", e.WIN_8 = "Windows 8", e.WIN_7 = "Windows 7", e.WIN_VISTA = "Windows Vista", e.WIN_SERVER_2003 = "Windows Server 2003", e.WIN_XP = "Windows XP", e.WIN_2000 = "Windows 2000", e.ANDROID = "Android", e.OPEN_BSD = "Open BSD", e.SUN_OS = "Sun OS", e.LINUX = "Linux", e.IOS = "iOS", e.MAC_OS_X = "Mac OS X", e.MAC_OS = "Mac OS", e.QNX = "QNX", e.UNIX = "UNIX", e.BEOS = "BeOS", e.OS_2 = "OS/2", e.SEARCH_BOT = "Search Bot"
        }(h || (h = {})), function (e) {
            e.UNEXPECTED_ERROR = "UNEXPECTED_ERROR", e.UNEXPECTED_RESPONSE = "UNEXPECTED_RESPONSE", e.TIMEOUT = "TIMEOUT", e.INVALID_PARAMS = "INVALID_PARAMS", e.NOT_SUPPORT = "NOT_SUPPORT", e.INVALID_OPERATION = "INVALID_OPERATION", e.OPERATION_ABORT = "OPERATION_ABORT", e.WEB_SECURITY_RESTRICT = "WEB_SECURITY_RESTRICT", e.NETWORK_ERROR = "NETWORK_ERROR", e.NETWORK_TIMEOUT = "NETWORK_TIMEOUT", e.NETWORK_RESPONSE_ERROR = "NETWORK_RESPONSE_ERROR", e.API_INVOKE_TIMEOUT = "API_INVOKE_TIMEOUT", e.ENUMERATE_DEVICES_FAILED = "ENUMERATE_DEVICES_FAILED", e.DEVICE_NOT_FOUND = "DEVICE_NOTE_FOUND", e.ELECTRON_IS_NULL = "ELECTRON_IS_NULL", e.ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR = "ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR", e.STREAM_ALREADY_INITIALIZED = "STREAM_ALREADY_INITIALIZED", e.STREAM_IS_CLOSED = "STREAM_IS_CLOSED", e.ABORT_OTHER_INIT = "ABORT_OTHER_INIT", e.CHROME_PLUGIN_NO_RESPONSE = "CHROME_PLUGIN_NO_RESPONSE", e.CHROME_PLUGIN_NOT_INSTALL = "CHROME_PLUGIN_NOT_INSTALL", e.MEDIA_OPTION_INVALID = "MEDIA_OPTION_INVALID", e.PERMISSION_DENIED = "PERMISSION_DENIED", e.CONSTRAINT_NOT_SATISFIED = "CONSTRAINT_NOT_SATISFIED", e.CAN_NOT_AUTOPLAY = "CAN_NOT_AUTOPLAY", e.HIGH_STREAM_NO_VIDEO_TRACK = "HIGH_STREAM_NO_VIDEO_TRACK", e.SCREEN_SHARE_CAN_NOT_CREATE_LOW_STREAM = "SCREEN_SHARE_CAN_NOT_CREATE_LOW_STREAM", e.TOKEN_GENERATOR_FUNCTION_ERROR = "TOKEN_GENERATOR_FUNCTION_ERROR", e.INVALID_UINT_UID_FROM_STRING_UID = "INVALID_UINT_UID_FROM_STRING_UID", e.CAN_NOT_GET_PROXY_SERVER = "CAN_NOT_GET_PROXY_SERVER", e.CAN_NOT_GET_GATEWAY_SERVER = "CAN_NOT_GET_GATEWAY_SERVER", e.UID_CONFLICT = "UID_CONFLICT", e.TRACK_ALREADY_PUBLISHED = "TRACK_ALREADY_PUBLISHED", e.TRACK_IS_NOT_PUBLISHED = "TRACK_IS_NOT_PUBLISHED", e.INVALID_LOCAL_TRACK = "INVALID_LOCAL_TRACK", e.SENDER_NOT_FOUND = "SENDER_NOT_FOUND", e.CREATE_OFFER_FAILED = "CREATE_OFFER_FAILED", e.SET_ANSWER_FAILED = "SET_ANSWER_FAILED", e.ICE_FAILED = "ICE_FAILED", e.PC_CLOSED = "PC_CLOSED", e.SENDER_REPLACE_FAILED = "SENDER_REPLACE_FAILED", e.GATEWAY_P2P_LOST = "GATEWAY_P2P_LOST", e.CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS = "CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS", e.INVALID_REMOTE_USER = "INVALID_REMOTE_USER", e.TRACK_IS_NOT_SUBSCRIBED = "TRACK_IS_NOT_SUBSCRIBED", e.SUBSCRIPTION_IS_IN_PROGRESS = "SUBSCRIPTION_IS_IN_PROGRESS", e.FETCH_AUDIO_FILE_FAILED = "FETCH_AUDIO_FILE_FAILED", e.READ_LOCAL_AUDIO_FILE_ERROR = "READ_LOCAL_AUDIO_FILE_ERROR", e.DECODE_AUDIO_FILE_FAILED = "DECODE_AUDIO_FILE_FAILED", e.EFFECT_ID_CONFLICTED = "EFFECT_ID_CONFLICTED", e.EFFECT_SOUND_ID_NOT_FOUND = "EFFECT_SOUND_ID_NOT_FOUND", e.WS_ABORT = "WS_ABORT", e.WS_DISCONNECT = "WS_DISCONNECT", e.WS_ERR = "WS_ERR", e.CAN_NOT_CONNECT_TO_LIVE_STREAMING_WORKER = "CAN_NOT_CONNECT_TO_LIVE_STREAMING_WORKER", e.REQUEST_TO_LIVE_STREAMING_WORKER_FAILED = "REQUEST_TO_LIVE_STREAMING_WORKER_FAILED", e.PUSH_RTMP_URL_CONFLICT = "PUSH_RTMP_URL_CONFLICT", e.PULL_URL_CONFLICT = "PULL_URL_CONFLICT", e.WEBGL_INTERNAL_ERROR = "WEBGL_INTERNAL_ERROR", e.BEAUTY_PROCESSOR_INTERNAL_ERROR = "BEAUTY_PROCESSOR_INTERNAL_ERROR", e.CROSS_CHANNEL_WAIT_STATUS_ERROR = "CROSS_CHANNEL_WAIT_STATUS_ERROR", e.CROSS_CHANNEL_FAILED_JOIN_SRC = "CROSS_CHANNEL_FAILED_JOIN_SEC", e.CROSS_CHANNEL_FAILED_JOIN_DEST = "CROSS_CHANNEL_FAILED_JOIN_DEST", e.CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST = "CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST", e.CROSS_CHANNEL_SERVER_ERROR_RESPONSE = "CROSS_CHANNEL_SERVER_ERROR_RESPONSE"
        }(v || (v = {}));
        var E, y = function (e) {
            var t = e;
            void 0 === t && (t = 7);
            var n = Math.random().toString(16).substr(2, t).toLowerCase();
            return n.length === t ? n : n + y(t - n.length)
        }, S = function (e, t) {
            var n = "YYYY-MM-DD hh:mm:ss";
            if ("number" != typeof e) throw new Error("[timesToDate]: timestamp must be number");
            t && "string" == typeof t && (n = t);
            var r = e || Date.now(), i = new Date(r) || new Date(r), o = i.getFullYear(), a = i.getMonth() + 1,
                s = i.getDate(), c = i.getHours(), u = i.getMinutes(), d = i.getSeconds(), f = i.getMilliseconds();
            return n.indexOf("YYYY") > -1 && (n = n.replace("YYYY", (function (e) {
                return "" + o
            }))), n.indexOf("MM") > -1 ? n = n.replace("MM", (function (e) {
                return a < 10 ? "0" + a : "" + a
            })) : n.indexOf("M") > -1 && (n = n.replace("M", (function (e) {
                return "" + a
            }))), n.indexOf("DD") > -1 ? n = n.replace("DD", (function (e) {
                return s < 10 ? "0" + s : "" + s
            })) : n.indexOf("D") > -1 && (n = n.replace("D", (function (e) {
                return "" + s
            }))), n.indexOf("hh") > -1 ? n = n.replace("hh", (function (e) {
                return c < 10 ? "0" + c : "" + c
            })) : n.indexOf("h") > -1 && (n = n.replace("h", (function (e) {
                return "" + c
            }))), n.indexOf("mm") > -1 ? n = n.replace("mm", (function (e) {
                return u < 10 ? "0" + u : "" + u
            })) : n.indexOf("m") > -1 && (n = n.replace("m", (function (e) {
                return "" + u
            }))), n.indexOf("ss") > -1 ? n = n.replace("ss", (function (e) {
                return d < 10 ? "0" + d : "" + d
            })) : n.indexOf("s") > -1 && (n = n.replace("s", (function (e) {
                return "" + d
            }))), n.indexOf("ms") > -1 && (n = n.replace("ms", (function () {
                return "" + f
            }))), n
        };
        !function (e) {
            e[e.DEBUG = 0] = "DEBUG", e[e.INFO = 1] = "INFO", e[e.WARNING = 2] = "WARNING", e[e.ERROR = 3] = "ERROR", e[e.NONE = 4] = "NONE"
        }(E || (E = {}));
        var T = new (function () {
            function e() {
                this.logPrefix = "SupLogger", this.logLevel = E.NONE, this.uploadServeTranslators = [], this.DEBUG = E.DEBUG, this.INFO = E.INFO, this.WARNING = E.WARNING, this.ERROR = E.ERROR, this.NONE = E.NONE
            }

            return e.prototype.use = function (e) {
                "function" == typeof e && this.uploadServeTranslators.push((function (t, n) {
                    e(t, n)
                }))
            }, e.prototype.setLogLevel = function (e, t) {
                t && (this.logPrefix = t), "number" == typeof e && e > -1 && e < 5 && (this.logLevel = e)
            }, e.prototype.error = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                if (!(this.logLevel > E.ERROR && this.logLevel !== E.NONE || this.logLevel === E.NONE)) {
                    var n = e, r = Date.now();
                    n.unshift("[" + S(r, "hh:mm:ss:ms") + "] %c" + this.logPrefix + "@" + _.version + " [ERROR]: ", "color: #dc3545;"), this.uploadServeTranslators.length > 0 ? this.uploadServeTranslators.map((function (e) {
                        e({type: "error", params: n, timestamp: r}, (function () {
                            console.error.apply(console, n)
                        }))
                    })) : console.error.apply(console, n)
                }
            }, e.prototype.warning = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                if (!(this.logLevel > E.WARNING && this.logLevel !== E.NONE || this.logLevel === E.NONE)) {
                    var n = e, r = Date.now();
                    n.unshift("[" + S(r, "hh:mm:ss:ms") + "] %c" + this.logPrefix + "@" + _.version + " [WARNING]: ", "color: #ffc107;"), this.uploadServeTranslators.length > 0 ? this.uploadServeTranslators.map((function (e) {
                        e({type: "warning", params: n, timestamp: r}, (function () {
                            console.warn.apply(console, n)
                        }))
                    })) : console.warn.apply(console, n)
                }
            }, e.prototype.info = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                if (!(this.logLevel > E.INFO && this.logLevel !== E.NONE || this.logLevel === E.NONE)) {
                    var n = e, r = Date.now();
                    n.unshift("[" + S(r, "hh:mm:ss:ms") + "] %c" + this.logPrefix + "@" + _.version + " [INFO]: ", "color:  #007bff;"), this.uploadServeTranslators.length > 0 ? this.uploadServeTranslators.map((function (e) {
                        e({type: "info", params: n, timestamp: r}, (function () {
                            console.log.apply(console, n)
                        }))
                    })) : console.log.apply(console, n)
                }
            }, e.prototype.debug = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                if (!(this.logLevel > E.DEBUG && this.logLevel !== E.NONE || this.logLevel === E.NONE)) {
                    var n = e, r = Date.now();
                    n.unshift("[" + S(r, "hh:mm:ss.ms") + "] %c" + this.logPrefix + "@" + _.version + " [DEBUG]: ", "color:#6facff;"), this.uploadServeTranslators.length > 0 ? this.uploadServeTranslators.map((function (e) {
                        e({type: "debug", params: n, timestamp: r}, (function () {
                            console.log.apply(console, n)
                        }))
                    })) : console.log.apply(console, n)
                }
            }, e
        }());
        T.setLogLevel(T.DEBUG, "anyrtc-SDK");
        var g, C = T, b = function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator, n = t && e[t], r = 0;
            if (n) return n.call(e);
            if (e && "number" == typeof e.length) return {
                next: function () {
                    return e && r >= e.length && (e = void 0), {value: e && e[r++], done: !e}
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }, R = Array.prototype, A = function () {
            function e() {
                this._events = {}, this.addListener = this.on
            }

            return e.prototype.getListeners = function (e) {
                return this._events[e] ? R.map.call(this._events[e], (function (e) {
                    return e.listener
                })) : []
            }, e.prototype.on = function (e, t) {
                this._events[e] || (this._events[e] = []);
                var n = this._events[e];
                -1 === this._indexOfListener(n, t) && n.push({listener: t, once: !1})
            }, e.prototype.once = function (e, t) {
                this._events[e] || (this._events[e] = []);
                var n = this._events[e];
                -1 === this._indexOfListener(n, t) && n.push({listener: t, once: !0})
            }, e.prototype.off = function (e, t) {
                this._events[e] || (this._events[e] = []);
                var n = this._events[e], r = this._indexOfListener(n, t);
                -1 !== r && R.splice.call(n, r, 1)
            }, e.prototype.removeAllListeners = function (e) {
                e ? delete this._events[e] : this._events = {}
            }, e.prototype.emit = function (e) {
                for (var t, n, r = [], i = 1; i < arguments.length; i++) r[i - 1] = arguments[i];
                this._events[e] || (this._events[e] = []);
                var o = this._events[e];
                try {
                    for (var a = b(o), s = a.next(); !s.done; s = a.next()) {
                        var c = s.value;
                        c.once && this.off(e, c.listener), c.listener.apply(this, r || [])
                    }
                } catch (e) {
                    t = {error: e}
                } finally {
                    try {
                        s && !s.done && (n = a.return) && n.call(a)
                    } finally {
                        if (t) throw t.error
                    }
                }
            }, e.prototype._indexOfListener = function (e, t) {
                for (var n = e.length; n--;) if (e[n].listener === t) return n;
                return -1
            }, e
        }();
        !function (e) {
            e.CONNECTION_STATE_CHANGE = "@connectionStateChange", e.ICE_CONNECTION_STATE_CHANGE = "@iceConnectionStateChange", e.ICE_CANDIDATE = "@iceCandidate", e.CREATE_ANSWER = "@createAnswer", e.TRACK_ADDED = "@trackAdded", e.RTC_NEED_RENEGOTIATE = "@need_renegotiate", e.TRACK_ENDED = "track-ended", e.FIRST_FRAME_DECODED = "first-frame-decoded", e.UPDATE_MUTE_STATE = "@updateMuteState", e.VIDEO_SIZE_CHANGE = "video-resize", e.FIRST_VIDEO_DECODE = "first-video-decode", e.FIRST_VIDEO_RECEIVED = "first-video-received", e.FIRST_AUDIO_DECODE = "first-audio-decode", e.FIRST_AUDIO_RECEIVED = "first-audio-receivd", e.AUDIO_SOURCE_STATE_CHANGE = "audio_source_state_change", e.ON_KEEP_ALIVE = "KeepAlive", e.ON_FORCE_OFFLINE = "ForceOffline", e.ON_SESSION_INIT = "SessInit", e.ON_PUBLISH = "DoPublish", e.ON_PUBLISH_EX = "DoPublishS", e.ON_RE_PUBLISH = "DoRePublish", e.ON_SUBSCRIBE = "DoSubscribe", e.ON_ICE = "Ice", e.ON_PUBER_QUALITY = "PubQuality", e.ON_CHANNEL_MESSAGE = "ChanMsg", e.ON_CHANNEL_USER_ONLINE = "B_UserOnline", e.ON_CHANNEL_USER_OFFLINE = "B_UserOffline", e.ON_CHANNEL_SET_USER_ROLE = "SetRole", e.ON_CHANNEL_DUALSTREAM_ENABLE = "DualStream", e.ON_CHANNEL_USER_STREAM_OPEN = "B_StreamOpen", e.ON_CHANNEL_USER_STREAM_CLOSE = "B_StreamClose", e.ON_CHANNEL_USER_DISABLE_AUDIO = "DisableAudio", e.ON_CHANNEL_USER_ENABLE_AUDIO = "EnableAudio", e.ON_CHANNEL_USER_DISABLE_VIDEO = "DisableVideo", e.ON_CHANNEL_USER_ENABLE_VIDEO = "EnableVideo", e.ON_CHANNEL_USER_ENABLE_LOCAL_VIDEO = "EnableLocalVideo", e.ON_CHANNEL_USER_ENABLE_LOCAL_AUDIO = "EnableLocalAudio", e.ON_CHANNEL_USER_MUTE_VIDEO = "MuteLocalVideoStream", e.ON_CHANNEL_USER_MUTE_AUDIO = "MuteLocalAudioStream", e.STATE_CHANGE = "state_change", e.NETWORK_QUALITY = "network-quality", e.RECORDING_DEVICE_CHANGED = "recordingDeviceChanged", e.PLAYOUT_DEVICE_CHANGED = "playoutDeviceChanged", e.CAMERA_DEVICE_CHANGED = "cameraDeviceChanged"
        }(g || (g = {}));
        var I, O = g, N = (I = function (e, t) {
            return (I = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
        }, function (e, t) {
            function n() {
                this.constructor = e
            }

            I(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        }), w = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, D = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        }, P = function (e) {
            function t(t) {
                var n = e.call(this) || this;
                n._appId = "", n._serverIsWss = !0, n._serverUrl = "", n._serverPort = 0, n._connectBeginTime = void 0, n._revState = "DISCONNECTED", n._curState = "DISCONNECTED", n._userId = null, n._keepAiveInterval = 0, n._keepAliveIntervalTime = 1e4, n._connectTimeout = 0, n._keepAliveTimeout = 0, n.signal = null;
                var r = n;
                return t && t.appId && (r._appId = t.appId), n
            }

            return N(t, e), t.prototype.setAppInfo = function (e) {
                var t = e.appId;
                this._appId = t
            }, t.prototype.configServer = function (e, t, n) {
                this._serverIsWss = e, this._serverUrl = t, this._serverPort = n
            }, t.prototype.connectCTS = function () {
                var e = this;
                return new Promise((function (t, n) {
                    if (!e._connectBeginTime && (e._connectBeginTime = Date.now()), e.signal) return C.error("[connectCTS] alreadly connected."), !1;
                    var r = (e._serverIsWss ? "wss" : "ws") + "://" + e._serverUrl + ":" + e._serverPort,
                        i = new WebSocket(r);
                    e.signal = i, e._emitConnectionState("CONNECTING"), e._setConnectTimeout(), i.onopen = function () {
                        e._connectBeginTime = void 0, e._clearConnectTimeout(), e._emitConnectionState("CONNECTED"), t()
                    }, i.onmessage = function (t) {
                        var n = t.data, r = JSON.parse(n), i = r.Cmd, o = (r.Encrypt, r.Content), a = JSON.parse(o);
                        switch (i) {
                            case"KeepAlive":
                                e._handleKeepAlive();
                                break;
                            case"Online":
                                e._startKeepAlive();
                                break;
                            default:
                                e.handleMediaServerEvents && e.handleMediaServerEvents(i, a)
                        }
                    }, i.onclose = function (t) {
                        var r = t.code, i = t.reason;
                        switch (C.info("meida serve disconnected with code " + r + ", reason " + i), e._clearConnectTimeout(), e._stopKeepAlive(), e._removeHandleKeepAlive(), r) {
                            case 1e3:
                            case 1005:
                                e._emitConnectionState("DISCONNECTED", f.LEAVE);
                                break;
                            case 3001:
                                e._emitConnectionState("RECONNECTING", f.NETWORK_ERROR), e._stopKeepAlive(), e._removeHandleKeepAlive(), e.clearEventEmitter(), e.signal.onclose = null, e.signal = void 0;
                                break;
                            default:
                                "RECONNECTING" !== e._curState && e._emitConnectionState("RECONNECTING", f.SERVER_ERROR)
                        }
                        e.signal = null, n()
                    }, i.onerror = function (e) {
                        C.error("WebSocket with some error ", e)
                    }
                }))
            }, t.prototype.doKeepAlive = function () {
                var e = {Cmd: "KeepAlive"};
                e.Content = JSON.stringify({time: Date.now().toString()}), this._sendMessage(e)
            }, t.prototype.doOnline = function (e) {
                return w(this, void 0, void 0, (function () {
                    var t;
                    return D(this, (function (n) {
                        return t = this, [2, new Promise((function (n, r) {
                            var i = function (e) {
                                var o = e.data, a = JSON.parse(o), s = a.Cmd, c = (a.Encrypt, a.Content),
                                    u = JSON.parse(c);
                                if ("Online" === s) {
                                    t.signal.removeEventListener("message", i);
                                    var d = u.Code;
                                    if (0 === d) {
                                        var f = u.UserId;
                                        t._userId = f, n(f)
                                    } else C.error("user online failure, code => ", d), r(d)
                                }
                            };
                            t.signal.addEventListener("message", i);
                            var o = {Cmd: "Online"};
                            o.AppId = t._appId, o.Content = JSON.stringify(Object.assign({
                                ACodec: "opus",
                                DevType: 7
                            }, e)), t._sendMessage(o)
                        }))]
                    }))
                }))
            }, t.prototype.doOffline = function (e) {
                var t = {Cmd: "Offline"};
                t.Content = JSON.stringify({UserId: this._userId, UserSId: e}), this._sendMessage(t)
            }, t.prototype.doPublish = function (e, t) {
                var n = this;
                return new Promise((function (r, i) {
                    var o = function (e) {
                        var t = e.data, i = JSON.parse(t), a = i.Cmd, s = (i.Encrypt, i.Content), c = JSON.parse(s);
                        a === O.ON_PUBLISH && (n.signal.removeEventListener("message", o), r(c))
                    };
                    n.signal.addEventListener("message", o);
                    var a = {Cmd: "DoPublish"},
                        s = {StreamId: n._userId, ClientType: "sdk", AudCodecType: "Opus", VidCodecType: "H264"};
                    if ("[object Object]" === Object.prototype.toString.call(e) && (s.AVSetting = JSON.stringify(Object.assign({
                        HasAudio: !0,
                        HasVideo: !0
                    }, e))), t) {
                        var c = t.Uri, u = t.Account, d = t.Pwd;
                        a.Content = {Uri: c || "", Account: u || "", Pwd: d || ""}
                    }
                    a.Content = JSON.stringify(s), n._sendMessage(a)
                }))
            }, t.prototype.doRePublish = function (e) {
                var t = this;
                return new Promise((function (n, r) {
                    var i = function (e) {
                        var r = e.data, o = JSON.parse(r), a = o.Cmd, s = (o.Encrypt, o.Content), c = JSON.parse(s);
                        a === O.ON_RE_PUBLISH && (t.signal.removeEventListener("message", i), n(c))
                    };
                    t.signal.addEventListener("message", i);
                    var o = {Cmd: "DoRePublish"}, a = {StreamId: t._userId, ClientType: "sdk"};
                    "[object Object]" === Object.prototype.toString.call(e) && (a.AVSetting = JSON.stringify(Object.assign({
                        HasAudio: !0,
                        HasVideo: !0
                    }, e))), o.Content = JSON.stringify(a), t._sendMessage(o)
                }))
            }, t.prototype.doPublishS = function (e) {
                var t = {Cmd: "DoPublishS"}, n = {StreamId: this._userId};
                if (e) {
                    var r = e.Uri, i = e.Account, o = e.Pwd;
                    t.Content = {Uri: r || "", Account: i || "", Pwd: o || ""}
                }
                t.Content = JSON.stringify(n), this._sendMessage(t)
            }, t.prototype.doUnPublish = function () {
                var e = {Cmd: "DoUnPublish"};
                e.Content = JSON.stringify({StreamId: this._userId}), this._sendMessage(e)
            }, t.prototype.doUnPublishS = function () {
                var e = {Cmd: "DoUnPublishS"};
                e.Content = JSON.stringify({StreamId: this._userId}), this._sendMessage(e)
            }, t.prototype.doSubscribe = function (e) {
                var t = {Cmd: "DoSubscribe"};
                t.Content = JSON.stringify(Object.assign({SubSessId: y(32)}, e)), this._sendMessage(t)
            }, t.prototype.doUnSubscribe = function (e) {
                var t = {Cmd: "DoUnSubscribe"};
                t.Content = JSON.stringify(Object.assign({StreamId: e})), this._sendMessage(t)
            }, t.prototype.doReNewToken = function (e) {
                var t = {Cmd: "RenewAcsToken"};
                t.Content = JSON.stringify({AcsToken: e}), this._sendMessage(t)
            }, t.prototype.sendAnswer = function (e, t, n) {
                var r = {Cmd: "Answer"}, i = {StreamId: e, Sdp: t};
                void 0 !== n && (i.SubStream = n), r.Content = JSON.stringify(i), this._sendMessage(r)
            }, t.prototype.sendIceCandidate = function (e, t, n) {
                var r = {Cmd: "Ice"}, i = {StreamId: e, Sdp: t};
                void 0 !== n && (i.SubStream = n), r.Content = JSON.stringify(i), this._sendMessage(r)
            }, t.prototype.setClientRole = function (e) {
                var t = {Cmd: "ChanMsg"};
                t.Content = JSON.stringify({
                    Cmd: "SetRole",
                    UserId: this._userId,
                    Role: e,
                    ToSvr: "MNode"
                }), this._sendMessage(t)
            }, t.prototype.enableDualStream = function (e) {
                var t = {Cmd: "ChanMsg"};
                t.Content = JSON.stringify({
                    Cmd: "DualStream",
                    UserId: this._userId,
                    Enable: e,
                    ToSvr: "MNode"
                }), this._sendMessage(t)
            }, t.prototype.setAVStatus = function (e, t, n) {
                var r = {Cmd: "ChanMsg"};
                r.Content = JSON.stringify({
                    Cmd: "SetAVStatus",
                    StreamId: e,
                    RecvAudio: t,
                    RecvVideo: n,
                    ToSvr: "GNode"
                }), this._sendMessage(r)
            }, t.prototype.setRemoteVStrmType = function (e, t) {
                var n = {Cmd: "ChanMsg"};
                n.Content = JSON.stringify({
                    Cmd: "SetRemoteVStrmType",
                    UserId: this._userId,
                    StreamId: e,
                    StrmType: t,
                    ToSvr: "GNode"
                }), this._sendMessage(n)
            }, t.prototype.reportAVStat = function (e) {
                var t = e.TimeUsed, n = e.AudNum, r = e.VidSize, i = {Cmd: "ReportAVStat"};
                i.TimeUsed = t, i.AudNum = n, i.VidSize = r, i.AudBitrate = 0, i.VidBitrate = 0, i.Content = "", this._sendMessage(i)
            }, t.prototype.reportArStats = function (e) {
                var t = {Cmd: "ReportArStats"};
                t.Content = JSON.stringify(e), this._sendMessage(t)
            }, t.prototype.enableLocalVideo = function (e) {
                var t = {Cmd: "ChanMsg"};
                t.Content = JSON.stringify({
                    Cmd: "EnableLocalVideo",
                    UserId: this._userId,
                    Enable: e,
                    ToSvr: "MNode"
                }), this._sendMessage(t)
            }, t.prototype.enableLocalAudio = function (e) {
                var t = {Cmd: "ChanMsg"};
                t.Content = JSON.stringify({
                    Cmd: "EnableLocalAudio",
                    UserId: this._userId,
                    Enable: e,
                    ToSvr: "MNode"
                }), this._sendMessage(t)
            }, t.prototype.muteLocalVideoStream = function (e) {
                var t = {Cmd: "ChanMsg"};
                t.Content = JSON.stringify({
                    Cmd: "MuteLocalVideoStream",
                    UserId: this._userId,
                    Mute: e,
                    ToSvr: "MNode"
                }), this._sendMessage(t)
            }, t.prototype.muteLocalAudioStream = function (e) {
                var t = {Cmd: "ChanMsg"};
                t.Content = JSON.stringify({
                    Cmd: "MuteLocalAudioStream",
                    UserId: this._userId,
                    Mute: e,
                    ToSvr: "MNode"
                }), this._sendMessage(t)
            }, t.prototype.uploadUserQuality = function (e, t) {
                var n = {Cmd: "ChanMsg"};
                n.Content = JSON.stringify({
                    Cmd: "UserQuality",
                    UserId: this._userId,
                    TxQ: e,
                    RxQ: t,
                    ToSvr: "MNode"
                }), this._sendMessage(n)
            }, t.prototype.disconnectCTS = function (e) {
                if (e) {
                    switch (e) {
                        case"KEEP_A_LIVE_TIME_OUT":
                            this._emitConnectionState("RECONNECTING", f.KEEP_A_LIVE_TIME_OUT);
                            break;
                        case"UID_BANNED":
                            this._emitConnectionState("DISCONNECTED", f.UID_BANNED)
                    }
                    this._stopKeepAlive(), this._removeHandleKeepAlive(), this.clearEventEmitter(), this.signal && (this.signal.onclose = null, this.signal = void 0)
                } else this.signal && this.signal.close(1e3, e)
            }, t.prototype.clearEventEmitter = function () {
                this.removeAllListeners()
            }, t.prototype._setConnectTimeout = function () {
                var e = this;
                e._clearConnectTimeout(), e._connectTimeout = window.setTimeout((function () {
                    e._emitConnectionState("DISCONNECTING", f.CONNECT_TIME_OUT)
                }), 1e4)
            }, t.prototype._startKeepAlive = function () {
                var e = this;
                e._stopKeepAlive(), e.doKeepAlive(), e._keepAiveInterval = window.setInterval((function () {
                    e.doKeepAlive()
                }), e._keepAliveIntervalTime)
            }, t.prototype._stopKeepAlive = function () {
                this._keepAiveInterval && clearInterval(this._keepAiveInterval)
            }, t.prototype._clearConnectTimeout = function () {
                this._connectTimeout && clearTimeout(this._connectTimeout)
            }, t.prototype._handleKeepAlive = function () {
                var e = this;
                e._removeHandleKeepAlive(), e._keepAliveTimeout = window.setTimeout((function () {
                    e.disconnectCTS("KEEP_A_LIVE_TIME_OUT")
                }), 3 * e._keepAliveIntervalTime)
            }, t.prototype._removeHandleKeepAlive = function () {
                this._keepAliveTimeout && clearTimeout(this._keepAliveTimeout)
            }, t.prototype._sendMessage = function (e) {
                return "object" != typeof e ? (C.error("[_sendMessage] msg must be object."), !1) : (this.signal && 1 === this.signal.readyState && this.signal.send(JSON.stringify(e)), !0)
            }, t.prototype._emitConnectionState = function (e, t) {
                this._revState = this._curState, this._curState = e, this.handleMediaServerEvents && this.handleMediaServerEvents("connection-state-change", {
                    curState: this._curState,
                    revState: this._revState,
                    reason: t
                })
            }, t
        }(A), k = function (e) {
            for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            this.name = "ArRTCException", this.code = e;
            var r = "ArRTCError".concat(" ").concat(this.code, ": ");
            this.message = t[0] ? r.concat(t[0]) : r, this.data = t[1] ? t[1] : {}
        }, L = n(51), M = n.n(L), x = function () {
            return (x = Object.assign || function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }).apply(this, arguments)
        }, U = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, V = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        }, F = function () {
            function e(e, t) {
                this.url = [], this.urlSuffix = "", this._joinInfo = {}, this._timeout = 6e3, this._useWss = !0, this._startTime = 0, this._reqtInstance = [];
                var n = t.url, r = t.timeout, i = t.wss;
                this.url = n, this._timeout = r, this._useWss = "boolean" != typeof i || i, this._joinInfo = e, this._reqtInstance = this._createReqInstance()
            }

            return e.prototype._createReqInstance = function () {
                var e = this, t = [];
                return this.url.map((function (n) {
                    if (n) {
                        var r = M.a.create({baseURL: n, timeout: e._timeout});
                        t.push(r)
                    }
                })), t
            }, e.prototype._joinGateWay = function (e, t) {
                return U(this, void 0, void 0, (function () {
                    var n = this;
                    return V(this, (function (r) {
                        return [2, Promise.race(this._reqtInstance.map((function (r) {
                            return r.post(e, x(x({}, t), {
                                sid: n._joinInfo.sid,
                                appId: n._joinInfo.appId,
                                cname: n._joinInfo.cname,
                                uid: n._joinInfo.uid,
                                token: n._joinInfo.token,
                                wss: n._useWss
                            }))
                        }))).then((function (e) {
                            return e.data
                        })).catch((function (e) {
                            return Promise.resolve({code: -1, msg: e.message})
                        }))]
                    }))
                }))
            }, e
        }(), j = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), B = function () {
            return (B = Object.assign || function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }).apply(this, arguments)
        }, W = function (e) {
            function t(t) {
                var n = e.call(this, t, {
                    url: [m.GATEWAY_ADDRESS, m.GATEWAY_ADDRESS1],
                    timeout: m.GATEWAY_CONNECT_TIMEOUT,
                    wss: m.GATEWAY_ADDRESS_SSL
                }) || this;
                return n.urlSuffix = "/arapi/v1?action=", n
            }

            return j(t, e), t.prototype.joinGateway = function (e) {
                var t = this;
                return new Promise((function (n, r) {
                    var i = t.urlSuffix.concat("wrtc_gateway"), o = {opid: 133, ts: Date.now()};
                    !function a() {
                        return t._joinGateWay(i, B(B({}, o), e)).then((function (e) {
                            var t = e.code;
                            e.msg;
                            if (0 === t) n(e); else if (-1 === t) setTimeout((function () {
                                a()
                            }), m.GATEWAY_CONNECT_TIMEOUT); else {
                                if (-4 === t) throw r("MISSING_PARAMETER"), new Error("MISSING_PARAMETER");
                                if (13 === t) throw r("DEVELOPER_INVALID"), new k("DEVELOPER_INVALID");
                                if (14 === t) throw r("UID_BANNED"), new k("UID_BANNED");
                                if (15 === t) throw r("IP_BANNED"), new k("IP_BANNED");
                                if (16 === t) throw r("CHANNEL_BANNED"), new k("CHANNEL_BANNED");
                                if (101 === t) throw r("APPID_INVALID"), new k("APPID_INVALID");
                                if (2002 === t) throw r("DEVELOPER_INVALID"), new k("DEVELOPER_INVALID");
                                if (109 === t) throw r("TOKEN_EXPIRED"), new k("TOKEN_EXPIRED", "You must request a new token from your server and call join to use the new token to join the channel");
                                if (110 === t) throw new k("TOKEN_INVALID", "make sure token is right and try angain please");
                                setTimeout((function () {
                                    a()
                                }), m.GATEWAY_CONNECT_TIMEOUT)
                            }
                        }))
                    }()
                }))
            }, t
        }(F), G = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), H = function (e) {
            function t(t, n) {
                var r = e.call(this) || this;
                return r.peer = void 0, r._ID = n || y(8), r._originMediaStreamTrack = t, r._mediaStreamTrack = t, r
            }

            return G(t, e), t.prototype.getTrackId = function () {
                return this._ID
            }, t.prototype.getTrackLabel = function () {
                var e;
                return null === (e = this._originMediaStreamTrack) || void 0 === e ? void 0 : e.label
            }, t.prototype.getMediaStreamTrack = function () {
                return this._mediaStreamTrack
            }, t
        }(A), K = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), Y = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, J = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        }, z = function (e) {
            function t(t, n) {
                var r = e.call(this, t, n) || this;
                return r._enabled = !0, r._userId = null, r._isClosed = !1, t.addEventListener("ended", r.emit.bind(r, O.TRACK_ENDED)), r
            }

            return K(t, e), t.prototype.setEnabled = function (e) {
                "boolean" == typeof e && (this._enabled = !!e, this._originMediaStreamTrack.enabled = e, this.emit("@updateMuteState", this._enabled))
            }, t.prototype.close = function () {
                this._originMediaStreamTrack.stop(), this._mediaStreamTrack !== this._originMediaStreamTrack && this._mediaStreamTrack.stop(), this.emit(O.TRACK_ENDED), this._isClosed = !0
            }, t.prototype._setUserId = function (e) {
                this._userId = e
            }, t.prototype._updateOriginMediaStreamTrack = function (e, t) {
                return Y(this, void 0, void 0, (function () {
                    return J(this, (function (e) {
                        return [2]
                    }))
                }))
            }, t.prototype._updatePlayerSource = function () {
            }, t.prototype._getDefaultPlayerConfig = function () {
                return {}
            }, t
        }(H), X = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), Q = function (e) {
            function t(t, n) {
                var r = e.call(this, t, n) || this;
                r.getMediaStreamTrack();
                return r
            }

            return X(t, e), t
        }(H);
        let q = !0, $ = !0;

        function Z(e, t, n) {
            const r = e.match(t);
            return r && r.length >= n && parseInt(r[n], 10)
        }

        function ee(e, t, n) {
            if (!e.RTCPeerConnection) return;
            const r = e.RTCPeerConnection.prototype, i = r.addEventListener;
            r.addEventListener = function (e, r) {
                if (e !== t) return i.apply(this, arguments);
                const o = e => {
                    const t = n(e);
                    t && (r.handleEvent ? r.handleEvent(t) : r(t))
                };
                return this._eventMap = this._eventMap || {}, this._eventMap[t] || (this._eventMap[t] = new Map), this._eventMap[t].set(r, o), i.apply(this, [e, o])
            };
            const o = r.removeEventListener;
            r.removeEventListener = function (e, n) {
                if (e !== t || !this._eventMap || !this._eventMap[t]) return o.apply(this, arguments);
                if (!this._eventMap[t].has(n)) return o.apply(this, arguments);
                const r = this._eventMap[t].get(n);
                return this._eventMap[t].delete(n), 0 === this._eventMap[t].size && delete this._eventMap[t], 0 === Object.keys(this._eventMap).length && delete this._eventMap, o.apply(this, [e, r])
            }, Object.defineProperty(r, "on" + t, {
                get() {
                    return this["_on" + t]
                }, set(e) {
                    this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this["_on" + t]), e && this.addEventListener(t, this["_on" + t] = e)
                }, enumerable: !0, configurable: !0
            })
        }

        function te(e) {
            return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (q = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled")
        }

        function ne(e) {
            return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : ($ = !e, "adapter.js deprecation warnings " + (e ? "disabled" : "enabled"))
        }

        function re() {
            if ("object" == typeof window) {
                if (q) return;
                "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments)
            }
        }

        function ie(e, t) {
            $ && console.warn(e + " is deprecated, please use " + t + " instead.")
        }

        function oe(e) {
            const t = {browser: null, version: null};
            if (void 0 === e || !e.navigator) return t.browser = "Not a browser.", t;
            const {navigator: n} = e;
            if (n.mozGetUserMedia) t.browser = "firefox", t.version = Z(n.userAgent, /Firefox\/(\d+)\./, 1); else if (n.webkitGetUserMedia || !1 === e.isSecureContext && e.webkitRTCPeerConnection && !e.RTCIceGatherer) t.browser = "chrome", t.version = Z(n.userAgent, /Chrom(e|ium)\/(\d+)\./, 2); else if (n.mediaDevices && n.userAgent.match(/Edge\/(\d+).(\d+)$/)) t.browser = "edge", t.version = Z(n.userAgent, /Edge\/(\d+).(\d+)$/, 2); else {
                if (!e.RTCPeerConnection || !n.userAgent.match(/AppleWebKit\/(\d+)\./)) return t.browser = "Not a supported browser.", t;
                t.browser = "safari", t.version = Z(n.userAgent, /AppleWebKit\/(\d+)\./, 1), t.supportsUnifiedPlan = e.RTCRtpTransceiver && "currentDirection" in e.RTCRtpTransceiver.prototype
            }
            return t
        }

        function ae(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        }

        function se(e) {
            return ae(e) ? Object.keys(e).reduce((function (t, n) {
                const r = ae(e[n]), i = r ? se(e[n]) : e[n], o = r && !Object.keys(i).length;
                return void 0 === i || o ? t : Object.assign(t, {[n]: i})
            }), {}) : e
        }

        function ce(e, t, n) {
            const r = n ? "outbound-rtp" : "inbound-rtp", i = new Map;
            if (null === t) return i;
            const o = [];
            return e.forEach(e => {
                "track" === e.type && e.trackIdentifier === t.id && o.push(e)
            }), o.forEach(t => {
                e.forEach(n => {
                    n.type === r && n.trackId === t.id && function e(t, n, r) {
                        n && !r.has(n.id) && (r.set(n.id, n), Object.keys(n).forEach(i => {
                            i.endsWith("Id") ? e(t, t.get(n[i]), r) : i.endsWith("Ids") && n[i].forEach(n => {
                                e(t, t.get(n), r)
                            })
                        }))
                    }(e, n, i)
                })
            }), i
        }

        const ue = re;

        function de(e) {
            const t = e && e.navigator;
            if (!t.mediaDevices) return;
            const n = oe(e), r = function (e) {
                if ("object" != typeof e || e.mandatory || e.optional) return e;
                const t = {};
                return Object.keys(e).forEach(n => {
                    if ("require" === n || "advanced" === n || "mediaSource" === n) return;
                    const r = "object" == typeof e[n] ? e[n] : {ideal: e[n]};
                    void 0 !== r.exact && "number" == typeof r.exact && (r.min = r.max = r.exact);
                    const i = function (e, t) {
                        return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" : t
                    };
                    if (void 0 !== r.ideal) {
                        t.optional = t.optional || [];
                        let e = {};
                        "number" == typeof r.ideal ? (e[i("min", n)] = r.ideal, t.optional.push(e), e = {}, e[i("max", n)] = r.ideal, t.optional.push(e)) : (e[i("", n)] = r.ideal, t.optional.push(e))
                    }
                    void 0 !== r.exact && "number" != typeof r.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[i("", n)] = r.exact) : ["min", "max"].forEach(e => {
                        void 0 !== r[e] && (t.mandatory = t.mandatory || {}, t.mandatory[i(e, n)] = r[e])
                    })
                }), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t
            }, i = function (e, i) {
                if (n.version >= 61) return i(e);
                if ((e = JSON.parse(JSON.stringify(e))) && "object" == typeof e.audio) {
                    const t = function (e, t, n) {
                        t in e && !(n in e) && (e[n] = e[t], delete e[t])
                    };
                    t((e = JSON.parse(JSON.stringify(e))).audio, "autoGainControl", "googAutoGainControl"), t(e.audio, "noiseSuppression", "googNoiseSuppression"), e.audio = r(e.audio)
                }
                if (e && "object" == typeof e.video) {
                    let o = e.video.facingMode;
                    o = o && ("object" == typeof o ? o : {ideal: o});
                    const a = n.version < 66;
                    if (o && ("user" === o.exact || "environment" === o.exact || "user" === o.ideal || "environment" === o.ideal) && (!t.mediaDevices.getSupportedConstraints || !t.mediaDevices.getSupportedConstraints().facingMode || a)) {
                        let n;
                        if (delete e.video.facingMode, "environment" === o.exact || "environment" === o.ideal ? n = ["back", "rear"] : "user" !== o.exact && "user" !== o.ideal || (n = ["front"]), n) return t.mediaDevices.enumerateDevices().then(t => {
                            let a = (t = t.filter(e => "videoinput" === e.kind)).find(e => n.some(t => e.label.toLowerCase().includes(t)));
                            return !a && t.length && n.includes("back") && (a = t[t.length - 1]), a && (e.video.deviceId = o.exact ? {exact: a.deviceId} : {ideal: a.deviceId}), e.video = r(e.video), ue("chrome: " + JSON.stringify(e)), i(e)
                        })
                    }
                    e.video = r(e.video)
                }
                return ue("chrome: " + JSON.stringify(e)), i(e)
            }, o = function (e) {
                return n.version >= 64 ? e : {
                    name: {
                        PermissionDeniedError: "NotAllowedError",
                        PermissionDismissedError: "NotAllowedError",
                        InvalidStateError: "NotAllowedError",
                        DevicesNotFoundError: "NotFoundError",
                        ConstraintNotSatisfiedError: "OverconstrainedError",
                        TrackStartError: "NotReadableError",
                        MediaDeviceFailedDueToShutdown: "NotAllowedError",
                        MediaDeviceKillSwitchOn: "NotAllowedError",
                        TabCaptureError: "AbortError",
                        ScreenCaptureError: "AbortError",
                        DeviceCaptureError: "AbortError"
                    }[e.name] || e.name, message: e.message, constraint: e.constraint || e.constraintName, toString() {
                        return this.name + (this.message && ": ") + this.message
                    }
                }
            };
            if (t.getUserMedia = function (e, n, r) {
                i(e, e => {
                    t.webkitGetUserMedia(e, n, e => {
                        r && r(o(e))
                    })
                })
            }.bind(t), t.mediaDevices.getUserMedia) {
                const e = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
                t.mediaDevices.getUserMedia = function (t) {
                    return i(t, t => e(t).then(e => {
                        if (t.audio && !e.getAudioTracks().length || t.video && !e.getVideoTracks().length) throw e.getTracks().forEach(e => {
                            e.stop()
                        }), new DOMException("", "NotFoundError");
                        return e
                    }, e => Promise.reject(o(e))))
                }
            }
        }

        function fe(e, t) {
            e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || e.navigator.mediaDevices && ("function" == typeof t ? e.navigator.mediaDevices.getDisplayMedia = function (n) {
                return t(n).then(t => {
                    const r = n.video && n.video.width, i = n.video && n.video.height, o = n.video && n.video.frameRate;
                    return n.video = {
                        mandatory: {
                            chromeMediaSource: "desktop",
                            chromeMediaSourceId: t,
                            maxFrameRate: o || 3
                        }
                    }, r && (n.video.mandatory.maxWidth = r), i && (n.video.mandatory.maxHeight = i), e.navigator.mediaDevices.getUserMedia(n)
                })
            } : console.error("shimGetDisplayMedia: getSourceId argument is not a function"))
        }

        function le(e) {
            e.MediaStream = e.MediaStream || e.webkitMediaStream
        }

        function pe(e) {
            if ("object" == typeof e && e.RTCPeerConnection && !("ontrack" in e.RTCPeerConnection.prototype)) {
                Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
                    get() {
                        return this._ontrack
                    }, set(e) {
                        this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = e)
                    }, enumerable: !0, configurable: !0
                });
                const t = e.RTCPeerConnection.prototype.setRemoteDescription;
                e.RTCPeerConnection.prototype.setRemoteDescription = function () {
                    return this._ontrackpoly || (this._ontrackpoly = t => {
                        t.stream.addEventListener("addtrack", n => {
                            let r;
                            r = e.RTCPeerConnection.prototype.getReceivers ? this.getReceivers().find(e => e.track && e.track.id === n.track.id) : {track: n.track};
                            const i = new Event("track");
                            i.track = n.track, i.receiver = r, i.transceiver = {receiver: r}, i.streams = [t.stream], this.dispatchEvent(i)
                        }), t.stream.getTracks().forEach(n => {
                            let r;
                            r = e.RTCPeerConnection.prototype.getReceivers ? this.getReceivers().find(e => e.track && e.track.id === n.id) : {track: n};
                            const i = new Event("track");
                            i.track = n, i.receiver = r, i.transceiver = {receiver: r}, i.streams = [t.stream], this.dispatchEvent(i)
                        })
                    }, this.addEventListener("addstream", this._ontrackpoly)), t.apply(this, arguments)
                }
            } else ee(e, "track", e => (e.transceiver || Object.defineProperty(e, "transceiver", {value: {receiver: e.receiver}}), e))
        }

        function he(e) {
            if ("object" == typeof e && e.RTCPeerConnection && !("getSenders" in e.RTCPeerConnection.prototype) && "createDTMFSender" in e.RTCPeerConnection.prototype) {
                const t = function (e, t) {
                    return {
                        track: t, get dtmf() {
                            return void 0 === this._dtmf && ("audio" === t.kind ? this._dtmf = e.createDTMFSender(t) : this._dtmf = null), this._dtmf
                        }, _pc: e
                    }
                };
                if (!e.RTCPeerConnection.prototype.getSenders) {
                    e.RTCPeerConnection.prototype.getSenders = function () {
                        return this._senders = this._senders || [], this._senders.slice()
                    };
                    const n = e.RTCPeerConnection.prototype.addTrack;
                    e.RTCPeerConnection.prototype.addTrack = function (e, r) {
                        let i = n.apply(this, arguments);
                        return i || (i = t(this, e), this._senders.push(i)), i
                    };
                    const r = e.RTCPeerConnection.prototype.removeTrack;
                    e.RTCPeerConnection.prototype.removeTrack = function (e) {
                        r.apply(this, arguments);
                        const t = this._senders.indexOf(e);
                        -1 !== t && this._senders.splice(t, 1)
                    }
                }
                const n = e.RTCPeerConnection.prototype.addStream;
                e.RTCPeerConnection.prototype.addStream = function (e) {
                    this._senders = this._senders || [], n.apply(this, [e]), e.getTracks().forEach(e => {
                        this._senders.push(t(this, e))
                    })
                };
                const r = e.RTCPeerConnection.prototype.removeStream;
                e.RTCPeerConnection.prototype.removeStream = function (e) {
                    this._senders = this._senders || [], r.apply(this, [e]), e.getTracks().forEach(e => {
                        const t = this._senders.find(t => t.track === e);
                        t && this._senders.splice(this._senders.indexOf(t), 1)
                    })
                }
            } else if ("object" == typeof e && e.RTCPeerConnection && "getSenders" in e.RTCPeerConnection.prototype && "createDTMFSender" in e.RTCPeerConnection.prototype && e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype)) {
                const t = e.RTCPeerConnection.prototype.getSenders;
                e.RTCPeerConnection.prototype.getSenders = function () {
                    const e = t.apply(this, []);
                    return e.forEach(e => e._pc = this), e
                }, Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
                    get() {
                        return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf
                    }
                })
            }
        }

        function ve(e) {
            if (!e.RTCPeerConnection) return;
            const t = e.RTCPeerConnection.prototype.getStats;
            e.RTCPeerConnection.prototype.getStats = function () {
                const [e, n, r] = arguments;
                if (arguments.length > 0 && "function" == typeof e) return t.apply(this, arguments);
                if (0 === t.length && (0 === arguments.length || "function" != typeof e)) return t.apply(this, []);
                const i = function (e) {
                    const t = {};
                    return e.result().forEach(e => {
                        const n = {
                            id: e.id,
                            timestamp: e.timestamp,
                            type: {
                                localcandidate: "local-candidate",
                                remotecandidate: "remote-candidate"
                            }[e.type] || e.type
                        };
                        e.names().forEach(t => {
                            n[t] = e.stat(t)
                        }), t[n.id] = n
                    }), t
                }, o = function (e) {
                    return new Map(Object.keys(e).map(t => [t, e[t]]))
                };
                if (arguments.length >= 2) {
                    const r = function (e) {
                        n(o(i(e)))
                    };
                    return t.apply(this, [r, e])
                }
                return new Promise((e, n) => {
                    t.apply(this, [function (t) {
                        e(o(i(t)))
                    }, n])
                }).then(n, r)
            }
        }

        function _e(e) {
            if (!("object" == typeof e && e.RTCPeerConnection && e.RTCRtpSender && e.RTCRtpReceiver)) return;
            if (!("getStats" in e.RTCRtpSender.prototype)) {
                const t = e.RTCPeerConnection.prototype.getSenders;
                t && (e.RTCPeerConnection.prototype.getSenders = function () {
                    const e = t.apply(this, []);
                    return e.forEach(e => e._pc = this), e
                });
                const n = e.RTCPeerConnection.prototype.addTrack;
                n && (e.RTCPeerConnection.prototype.addTrack = function () {
                    const e = n.apply(this, arguments);
                    return e._pc = this, e
                }), e.RTCRtpSender.prototype.getStats = function () {
                    const e = this;
                    return this._pc.getStats().then(t => ce(t, e.track, !0))
                }
            }
            if (!("getStats" in e.RTCRtpReceiver.prototype)) {
                const t = e.RTCPeerConnection.prototype.getReceivers;
                t && (e.RTCPeerConnection.prototype.getReceivers = function () {
                    const e = t.apply(this, []);
                    return e.forEach(e => e._pc = this), e
                }), ee(e, "track", e => (e.receiver._pc = e.srcElement, e)), e.RTCRtpReceiver.prototype.getStats = function () {
                    const e = this;
                    return this._pc.getStats().then(t => ce(t, e.track, !1))
                }
            }
            if (!("getStats" in e.RTCRtpSender.prototype) || !("getStats" in e.RTCRtpReceiver.prototype)) return;
            const t = e.RTCPeerConnection.prototype.getStats;
            e.RTCPeerConnection.prototype.getStats = function () {
                if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) {
                    const e = arguments[0];
                    let t, n, r;
                    return this.getSenders().forEach(n => {
                        n.track === e && (t ? r = !0 : t = n)
                    }), this.getReceivers().forEach(t => (t.track === e && (n ? r = !0 : n = t), t.track === e)), r || t && n ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : t ? t.getStats() : n ? n.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"))
                }
                return t.apply(this, arguments)
            }
        }

        function me(e) {
            e.RTCPeerConnection.prototype.getLocalStreams = function () {
                return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, Object.keys(this._shimmedLocalStreams).map(e => this._shimmedLocalStreams[e][0])
            };
            const t = e.RTCPeerConnection.prototype.addTrack;
            e.RTCPeerConnection.prototype.addTrack = function (e, n) {
                if (!n) return t.apply(this, arguments);
                this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                const r = t.apply(this, arguments);
                return this._shimmedLocalStreams[n.id] ? -1 === this._shimmedLocalStreams[n.id].indexOf(r) && this._shimmedLocalStreams[n.id].push(r) : this._shimmedLocalStreams[n.id] = [n, r], r
            };
            const n = e.RTCPeerConnection.prototype.addStream;
            e.RTCPeerConnection.prototype.addStream = function (e) {
                this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e.getTracks().forEach(e => {
                    if (this.getSenders().find(t => t.track === e)) throw new DOMException("Track already exists.", "InvalidAccessError")
                });
                const t = this.getSenders();
                n.apply(this, arguments);
                const r = this.getSenders().filter(e => -1 === t.indexOf(e));
                this._shimmedLocalStreams[e.id] = [e].concat(r)
            };
            const r = e.RTCPeerConnection.prototype.removeStream;
            e.RTCPeerConnection.prototype.removeStream = function (e) {
                return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, delete this._shimmedLocalStreams[e.id], r.apply(this, arguments)
            };
            const i = e.RTCPeerConnection.prototype.removeTrack;
            e.RTCPeerConnection.prototype.removeTrack = function (e) {
                return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e && Object.keys(this._shimmedLocalStreams).forEach(t => {
                    const n = this._shimmedLocalStreams[t].indexOf(e);
                    -1 !== n && this._shimmedLocalStreams[t].splice(n, 1), 1 === this._shimmedLocalStreams[t].length && delete this._shimmedLocalStreams[t]
                }), i.apply(this, arguments)
            }
        }

        function Ee(e) {
            if (!e.RTCPeerConnection) return;
            const t = oe(e);
            if (e.RTCPeerConnection.prototype.addTrack && t.version >= 65) return me(e);
            const n = e.RTCPeerConnection.prototype.getLocalStreams;
            e.RTCPeerConnection.prototype.getLocalStreams = function () {
                const e = n.apply(this);
                return this._reverseStreams = this._reverseStreams || {}, e.map(e => this._reverseStreams[e.id])
            };
            const r = e.RTCPeerConnection.prototype.addStream;
            e.RTCPeerConnection.prototype.addStream = function (t) {
                if (this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, t.getTracks().forEach(e => {
                    if (this.getSenders().find(t => t.track === e)) throw new DOMException("Track already exists.", "InvalidAccessError")
                }), !this._reverseStreams[t.id]) {
                    const n = new e.MediaStream(t.getTracks());
                    this._streams[t.id] = n, this._reverseStreams[n.id] = t, t = n
                }
                r.apply(this, [t])
            };
            const i = e.RTCPeerConnection.prototype.removeStream;

            function o(e, t) {
                let n = t.sdp;
                return Object.keys(e._reverseStreams || []).forEach(t => {
                    const r = e._reverseStreams[t], i = e._streams[r.id];
                    n = n.replace(new RegExp(i.id, "g"), r.id)
                }), new RTCSessionDescription({type: t.type, sdp: n})
            }

            function a(e, t) {
                let n = t.sdp;
                return Object.keys(e._reverseStreams || []).forEach(t => {
                    const r = e._reverseStreams[t], i = e._streams[r.id];
                    n = n.replace(new RegExp(r.id, "g"), i.id)
                }), new RTCSessionDescription({type: t.type, sdp: n})
            }

            e.RTCPeerConnection.prototype.removeStream = function (e) {
                this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, i.apply(this, [this._streams[e.id] || e]), delete this._reverseStreams[this._streams[e.id] ? this._streams[e.id].id : e.id], delete this._streams[e.id]
            }, e.RTCPeerConnection.prototype.addTrack = function (t, n) {
                if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                const r = [].slice.call(arguments, 1);
                if (1 !== r.length || !r[0].getTracks().find(e => e === t)) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
                const i = this.getSenders().find(e => e.track === t);
                if (i) throw new DOMException("Track already exists.", "InvalidAccessError");
                this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {};
                const o = this._streams[n.id];
                if (o) o.addTrack(t), Promise.resolve().then(() => {
                    this.dispatchEvent(new Event("negotiationneeded"))
                }); else {
                    const r = new e.MediaStream([t]);
                    this._streams[n.id] = r, this._reverseStreams[r.id] = n, this.addStream(r)
                }
                return this.getSenders().find(e => e.track === t)
            }, ["createOffer", "createAnswer"].forEach((function (t) {
                const n = e.RTCPeerConnection.prototype[t], r = {
                    [t]() {
                        const e = arguments;
                        return arguments.length && "function" == typeof arguments[0] ? n.apply(this, [t => {
                            const n = o(this, t);
                            e[0].apply(null, [n])
                        }, t => {
                            e[1] && e[1].apply(null, t)
                        }, arguments[2]]) : n.apply(this, arguments).then(e => o(this, e))
                    }
                };
                e.RTCPeerConnection.prototype[t] = r[t]
            }));
            const s = e.RTCPeerConnection.prototype.setLocalDescription;
            e.RTCPeerConnection.prototype.setLocalDescription = function () {
                return arguments.length && arguments[0].type ? (arguments[0] = a(this, arguments[0]), s.apply(this, arguments)) : s.apply(this, arguments)
            };
            const c = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, "localDescription");
            Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
                get() {
                    const e = c.get.apply(this);
                    return "" === e.type ? e : o(this, e)
                }
            }), e.RTCPeerConnection.prototype.removeTrack = function (e) {
                if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                if (!e._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
                if (!(e._pc === this)) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
                let t;
                this._streams = this._streams || {}, Object.keys(this._streams).forEach(n => {
                    this._streams[n].getTracks().find(t => e.track === t) && (t = this._streams[n])
                }), t && (1 === t.getTracks().length ? this.removeStream(this._reverseStreams[t.id]) : t.removeTrack(e.track), this.dispatchEvent(new Event("negotiationneeded")))
            }
        }

        function ye(e) {
            const t = oe(e);
            if (!e.RTCPeerConnection && e.webkitRTCPeerConnection && (e.RTCPeerConnection = e.webkitRTCPeerConnection), !e.RTCPeerConnection) return;
            const n = 0 === e.RTCPeerConnection.prototype.addIceCandidate.length;
            t.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach((function (t) {
                const n = e.RTCPeerConnection.prototype[t], r = {
                    [t]() {
                        return arguments[0] = new ("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), n.apply(this, arguments)
                    }
                };
                e.RTCPeerConnection.prototype[t] = r[t]
            }));
            const r = e.RTCPeerConnection.prototype.addIceCandidate;
            e.RTCPeerConnection.prototype.addIceCandidate = function () {
                return n || arguments[0] ? t.version < 78 && arguments[0] && "" === arguments[0].candidate ? Promise.resolve() : r.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
            }
        }

        function Se(e) {
            const t = oe(e);
            ee(e, "negotiationneeded", e => {
                const n = e.target;
                if (!(t.version < 72 || n.getConfiguration && "plan-b" === n.getConfiguration().sdpSemantics) || "stable" === n.signalingState) return e
            })
        }

        var Te = n(133), ge = n.n(Te);

        function Ce(e) {
            const t = e && e.navigator, n = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
            t.mediaDevices.getUserMedia = function (e) {
                return n(e).catch(e => Promise.reject(function (e) {
                    return {
                        name: {PermissionDeniedError: "NotAllowedError"}[e.name] || e.name,
                        message: e.message,
                        constraint: e.constraint,
                        toString() {
                            return this.name
                        }
                    }
                }(e)))
            }
        }

        function be(e) {
            "getDisplayMedia" in e.navigator && e.navigator.mediaDevices && (e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || (e.navigator.mediaDevices.getDisplayMedia = e.navigator.getDisplayMedia.bind(e.navigator)))
        }

        function Re(e) {
            const t = oe(e);
            if (e.RTCIceGatherer && (e.RTCIceCandidate || (e.RTCIceCandidate = function (e) {
                return e
            }), e.RTCSessionDescription || (e.RTCSessionDescription = function (e) {
                return e
            }), t.version < 15025)) {
                const t = Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype, "enabled");
                Object.defineProperty(e.MediaStreamTrack.prototype, "enabled", {
                    set(e) {
                        t.set.call(this, e);
                        const n = new Event("enabled");
                        n.enabled = e, this.dispatchEvent(n)
                    }
                })
            }
            e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype) && Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
                get() {
                    return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new e.RTCDtmfSender(this) : "video" === this.track.kind && (this._dtmf = null)), this._dtmf
                }
            }), e.RTCDtmfSender && !e.RTCDTMFSender && (e.RTCDTMFSender = e.RTCDtmfSender);
            const n = ge()(e, t.version);
            e.RTCPeerConnection = function (e) {
                return e && e.iceServers && (e.iceServers = function (e, t) {
                    let n = !1;
                    return (e = JSON.parse(JSON.stringify(e))).filter(e => {
                        if (e && (e.urls || e.url)) {
                            let t = e.urls || e.url;
                            e.url && !e.urls && ie("RTCIceServer.url", "RTCIceServer.urls");
                            const r = "string" == typeof t;
                            return r && (t = [t]), t = t.filter(e => {
                                if (0 === e.indexOf("stun:")) return !1;
                                const t = e.startsWith("turn") && !e.startsWith("turn:[") && e.includes("transport=udp");
                                return t && !n ? (n = !0, !0) : t && !n
                            }), delete e.url, e.urls = r ? t[0] : t, !!t.length
                        }
                    })
                }(e.iceServers, t.version), re("ICE servers after filtering:", e.iceServers)), new n(e)
            }, e.RTCPeerConnection.prototype = n.prototype
        }

        function Ae(e) {
            e.RTCRtpSender && !("replaceTrack" in e.RTCRtpSender.prototype) && (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack)
        }

        function Ie(e) {
            const t = oe(e), n = e && e.navigator, r = e && e.MediaStreamTrack;
            if (n.getUserMedia = function (e, t, r) {
                ie("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), n.mediaDevices.getUserMedia(e).then(t, r)
            }, !(t.version > 55 && "autoGainControl" in n.mediaDevices.getSupportedConstraints())) {
                const e = function (e, t, n) {
                    t in e && !(n in e) && (e[n] = e[t], delete e[t])
                }, t = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
                if (n.mediaDevices.getUserMedia = function (n) {
                    return "object" == typeof n && "object" == typeof n.audio && (n = JSON.parse(JSON.stringify(n)), e(n.audio, "autoGainControl", "mozAutoGainControl"), e(n.audio, "noiseSuppression", "mozNoiseSuppression")), t(n)
                }, r && r.prototype.getSettings) {
                    const t = r.prototype.getSettings;
                    r.prototype.getSettings = function () {
                        const n = t.apply(this, arguments);
                        return e(n, "mozAutoGainControl", "autoGainControl"), e(n, "mozNoiseSuppression", "noiseSuppression"), n
                    }
                }
                if (r && r.prototype.applyConstraints) {
                    const t = r.prototype.applyConstraints;
                    r.prototype.applyConstraints = function (n) {
                        return "audio" === this.kind && "object" == typeof n && (n = JSON.parse(JSON.stringify(n)), e(n, "autoGainControl", "mozAutoGainControl"), e(n, "noiseSuppression", "mozNoiseSuppression")), t.apply(this, [n])
                    }
                }
            }
        }

        function Oe(e, t) {
            e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || e.navigator.mediaDevices && (e.navigator.mediaDevices.getDisplayMedia = function (n) {
                if (!n || !n.video) {
                    const e = new DOMException("getDisplayMedia without video constraints is undefined");
                    return e.name = "NotFoundError", e.code = 8, Promise.reject(e)
                }
                return !0 === n.video ? n.video = {mediaSource: t} : n.video.mediaSource = t, e.navigator.mediaDevices.getUserMedia(n)
            })
        }

        function Ne(e) {
            "object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
                get() {
                    return {receiver: this.receiver}
                }
            })
        }

        function we(e) {
            const t = oe(e);
            if ("object" != typeof e || !e.RTCPeerConnection && !e.mozRTCPeerConnection) return;
            if (!e.RTCPeerConnection && e.mozRTCPeerConnection && (e.RTCPeerConnection = e.mozRTCPeerConnection), t.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach((function (t) {
                const n = e.RTCPeerConnection.prototype[t], r = {
                    [t]() {
                        return arguments[0] = new ("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), n.apply(this, arguments)
                    }
                };
                e.RTCPeerConnection.prototype[t] = r[t]
            })), t.version < 68) {
                const t = e.RTCPeerConnection.prototype.addIceCandidate;
                e.RTCPeerConnection.prototype.addIceCandidate = function () {
                    return arguments[0] ? arguments[0] && "" === arguments[0].candidate ? Promise.resolve() : t.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                }
            }
            const n = {
                inboundrtp: "inbound-rtp",
                outboundrtp: "outbound-rtp",
                candidatepair: "candidate-pair",
                localcandidate: "local-candidate",
                remotecandidate: "remote-candidate"
            }, r = e.RTCPeerConnection.prototype.getStats;
            e.RTCPeerConnection.prototype.getStats = function () {
                const [e, i, o] = arguments;
                return r.apply(this, [e || null]).then(e => {
                    if (t.version < 53 && !i) try {
                        e.forEach(e => {
                            e.type = n[e.type] || e.type
                        })
                    } catch (t) {
                        if ("TypeError" !== t.name) throw t;
                        e.forEach((t, r) => {
                            e.set(r, Object.assign({}, t, {type: n[t.type] || t.type}))
                        })
                    }
                    return e
                }).then(i, o)
            }
        }

        function De(e) {
            if ("object" != typeof e || !e.RTCPeerConnection || !e.RTCRtpSender) return;
            if (e.RTCRtpSender && "getStats" in e.RTCRtpSender.prototype) return;
            const t = e.RTCPeerConnection.prototype.getSenders;
            t && (e.RTCPeerConnection.prototype.getSenders = function () {
                const e = t.apply(this, []);
                return e.forEach(e => e._pc = this), e
            });
            const n = e.RTCPeerConnection.prototype.addTrack;
            n && (e.RTCPeerConnection.prototype.addTrack = function () {
                const e = n.apply(this, arguments);
                return e._pc = this, e
            }), e.RTCRtpSender.prototype.getStats = function () {
                return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map)
            }
        }

        function Pe(e) {
            if ("object" != typeof e || !e.RTCPeerConnection || !e.RTCRtpSender) return;
            if (e.RTCRtpSender && "getStats" in e.RTCRtpReceiver.prototype) return;
            const t = e.RTCPeerConnection.prototype.getReceivers;
            t && (e.RTCPeerConnection.prototype.getReceivers = function () {
                const e = t.apply(this, []);
                return e.forEach(e => e._pc = this), e
            }), ee(e, "track", e => (e.receiver._pc = e.srcElement, e)), e.RTCRtpReceiver.prototype.getStats = function () {
                return this._pc.getStats(this.track)
            }
        }

        function ke(e) {
            e.RTCPeerConnection && !("removeStream" in e.RTCPeerConnection.prototype) && (e.RTCPeerConnection.prototype.removeStream = function (e) {
                ie("removeStream", "removeTrack"), this.getSenders().forEach(t => {
                    t.track && e.getTracks().includes(t.track) && this.removeTrack(t)
                })
            })
        }

        function Le(e) {
            e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel)
        }

        function Me(e) {
            if ("object" != typeof e || !e.RTCPeerConnection) return;
            const t = e.RTCPeerConnection.prototype.addTransceiver;
            t && (e.RTCPeerConnection.prototype.addTransceiver = function () {
                this.setParametersPromises = [];
                const e = arguments[1], n = e && "sendEncodings" in e;
                n && e.sendEncodings.forEach(e => {
                    if ("rid" in e) {
                        if (!/^[a-z0-9]{0,16}$/i.test(e.rid)) throw new TypeError("Invalid RID value provided.")
                    }
                    if ("scaleResolutionDownBy" in e && !(parseFloat(e.scaleResolutionDownBy) >= 1)) throw new RangeError("scale_resolution_down_by must be >= 1.0");
                    if ("maxFramerate" in e && !(parseFloat(e.maxFramerate) >= 0)) throw new RangeError("max_framerate must be >= 0.0")
                });
                const r = t.apply(this, arguments);
                if (n) {
                    const {sender: t} = r, n = t.getParameters();
                    (!("encodings" in n) || 1 === n.encodings.length && 0 === Object.keys(n.encodings[0]).length) && (n.encodings = e.sendEncodings, t.sendEncodings = e.sendEncodings, this.setParametersPromises.push(t.setParameters(n).then(() => {
                        delete t.sendEncodings
                    }).catch(() => {
                        delete t.sendEncodings
                    })))
                }
                return r
            })
        }

        function xe(e) {
            if ("object" != typeof e || !e.RTCRtpSender) return;
            const t = e.RTCRtpSender.prototype.getParameters;
            t && (e.RTCRtpSender.prototype.getParameters = function () {
                const e = t.apply(this, arguments);
                return "encodings" in e || (e.encodings = [].concat(this.sendEncodings || [{}])), e
            })
        }

        function Ue(e) {
            if ("object" != typeof e || !e.RTCPeerConnection) return;
            const t = e.RTCPeerConnection.prototype.createOffer;
            e.RTCPeerConnection.prototype.createOffer = function () {
                return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(() => t.apply(this, arguments)).finally(() => {
                    this.setParametersPromises = []
                }) : t.apply(this, arguments)
            }
        }

        function Ve(e) {
            if ("object" != typeof e || !e.RTCPeerConnection) return;
            const t = e.RTCPeerConnection.prototype.createAnswer;
            e.RTCPeerConnection.prototype.createAnswer = function () {
                return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(() => t.apply(this, arguments)).finally(() => {
                    this.setParametersPromises = []
                }) : t.apply(this, arguments)
            }
        }

        function Fe(e) {
            if ("object" == typeof e && e.RTCPeerConnection) {
                if ("getLocalStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams = function () {
                    return this._localStreams || (this._localStreams = []), this._localStreams
                }), !("addStream" in e.RTCPeerConnection.prototype)) {
                    const t = e.RTCPeerConnection.prototype.addTrack;
                    e.RTCPeerConnection.prototype.addStream = function (e) {
                        this._localStreams || (this._localStreams = []), this._localStreams.includes(e) || this._localStreams.push(e), e.getAudioTracks().forEach(n => t.call(this, n, e)), e.getVideoTracks().forEach(n => t.call(this, n, e))
                    }, e.RTCPeerConnection.prototype.addTrack = function (e, ...n) {
                        return n && n.forEach(e => {
                            this._localStreams ? this._localStreams.includes(e) || this._localStreams.push(e) : this._localStreams = [e]
                        }), t.apply(this, arguments)
                    }
                }
                "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function (e) {
                    this._localStreams || (this._localStreams = []);
                    const t = this._localStreams.indexOf(e);
                    if (-1 === t) return;
                    this._localStreams.splice(t, 1);
                    const n = e.getTracks();
                    this.getSenders().forEach(e => {
                        n.includes(e.track) && this.removeTrack(e)
                    })
                })
            }
        }

        function je(e) {
            if ("object" == typeof e && e.RTCPeerConnection && ("getRemoteStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getRemoteStreams = function () {
                return this._remoteStreams ? this._remoteStreams : []
            }), !("onaddstream" in e.RTCPeerConnection.prototype))) {
                Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
                    get() {
                        return this._onaddstream
                    }, set(e) {
                        this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = e), this.addEventListener("track", this._onaddstreampoly = e => {
                            e.streams.forEach(e => {
                                if (this._remoteStreams || (this._remoteStreams = []), this._remoteStreams.includes(e)) return;
                                this._remoteStreams.push(e);
                                const t = new Event("addstream");
                                t.stream = e, this.dispatchEvent(t)
                            })
                        })
                    }
                });
                const t = e.RTCPeerConnection.prototype.setRemoteDescription;
                e.RTCPeerConnection.prototype.setRemoteDescription = function () {
                    const e = this;
                    return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function (t) {
                        t.streams.forEach(t => {
                            if (e._remoteStreams || (e._remoteStreams = []), e._remoteStreams.indexOf(t) >= 0) return;
                            e._remoteStreams.push(t);
                            const n = new Event("addstream");
                            n.stream = t, e.dispatchEvent(n)
                        })
                    }), t.apply(e, arguments)
                }
            }
        }

        function Be(e) {
            if ("object" != typeof e || !e.RTCPeerConnection) return;
            const t = e.RTCPeerConnection.prototype, n = t.createOffer, r = t.createAnswer, i = t.setLocalDescription,
                o = t.setRemoteDescription, a = t.addIceCandidate;
            t.createOffer = function (e, t) {
                const r = arguments.length >= 2 ? arguments[2] : arguments[0], i = n.apply(this, [r]);
                return t ? (i.then(e, t), Promise.resolve()) : i
            }, t.createAnswer = function (e, t) {
                const n = arguments.length >= 2 ? arguments[2] : arguments[0], i = r.apply(this, [n]);
                return t ? (i.then(e, t), Promise.resolve()) : i
            };
            let s = function (e, t, n) {
                const r = i.apply(this, [e]);
                return n ? (r.then(t, n), Promise.resolve()) : r
            };
            t.setLocalDescription = s, s = function (e, t, n) {
                const r = o.apply(this, [e]);
                return n ? (r.then(t, n), Promise.resolve()) : r
            }, t.setRemoteDescription = s, s = function (e, t, n) {
                const r = a.apply(this, [e]);
                return n ? (r.then(t, n), Promise.resolve()) : r
            }, t.addIceCandidate = s
        }

        function We(e) {
            const t = e && e.navigator;
            if (t.mediaDevices && t.mediaDevices.getUserMedia) {
                const e = t.mediaDevices, n = e.getUserMedia.bind(e);
                t.mediaDevices.getUserMedia = e => n(Ge(e))
            }
            !t.getUserMedia && t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = function (e, n, r) {
                t.mediaDevices.getUserMedia(e).then(n, r)
            }.bind(t))
        }

        function Ge(e) {
            return e && void 0 !== e.video ? Object.assign({}, e, {video: se(e.video)}) : e
        }

        function He(e) {
            if (!e.RTCPeerConnection) return;
            const t = e.RTCPeerConnection;
            e.RTCPeerConnection = function (e, n) {
                if (e && e.iceServers) {
                    const t = [];
                    for (let n = 0; n < e.iceServers.length; n++) {
                        let r = e.iceServers[n];
                        !r.hasOwnProperty("urls") && r.hasOwnProperty("url") ? (ie("RTCIceServer.url", "RTCIceServer.urls"), r = JSON.parse(JSON.stringify(r)), r.urls = r.url, delete r.url, t.push(r)) : t.push(e.iceServers[n])
                    }
                    e.iceServers = t
                }
                return new t(e, n)
            }, e.RTCPeerConnection.prototype = t.prototype, "generateCertificate" in t && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {get: () => t.generateCertificate})
        }

        function Ke(e) {
            "object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
                get() {
                    return {receiver: this.receiver}
                }
            })
        }

        function Ye(e) {
            const t = e.RTCPeerConnection.prototype.createOffer;
            e.RTCPeerConnection.prototype.createOffer = function (e) {
                if (e) {
                    void 0 !== e.offerToReceiveAudio && (e.offerToReceiveAudio = !!e.offerToReceiveAudio);
                    const t = this.getTransceivers().find(e => "audio" === e.receiver.track.kind);
                    !1 === e.offerToReceiveAudio && t ? "sendrecv" === t.direction ? t.setDirection ? t.setDirection("sendonly") : t.direction = "sendonly" : "recvonly" === t.direction && (t.setDirection ? t.setDirection("inactive") : t.direction = "inactive") : !0 !== e.offerToReceiveAudio || t || this.addTransceiver("audio"), void 0 !== e.offerToReceiveVideo && (e.offerToReceiveVideo = !!e.offerToReceiveVideo);
                    const n = this.getTransceivers().find(e => "video" === e.receiver.track.kind);
                    !1 === e.offerToReceiveVideo && n ? "sendrecv" === n.direction ? n.setDirection ? n.setDirection("sendonly") : n.direction = "sendonly" : "recvonly" === n.direction && (n.setDirection ? n.setDirection("inactive") : n.direction = "inactive") : !0 !== e.offerToReceiveVideo || n || this.addTransceiver("video")
                }
                return t.apply(this, arguments)
            }
        }

        function Je(e) {
            "object" != typeof e || e.AudioContext || (e.AudioContext = e.webkitAudioContext)
        }

        var ze = n(46), Xe = n.n(ze);

        function Qe(e) {
            if (!e.RTCIceCandidate || e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype) return;
            const t = e.RTCIceCandidate;
            e.RTCIceCandidate = function (e) {
                if ("object" == typeof e && e.candidate && 0 === e.candidate.indexOf("a=") && ((e = JSON.parse(JSON.stringify(e))).candidate = e.candidate.substr(2)), e.candidate && e.candidate.length) {
                    const n = new t(e), r = Xe.a.parseCandidate(e.candidate), i = Object.assign(n, r);
                    return i.toJSON = function () {
                        return {
                            candidate: i.candidate,
                            sdpMid: i.sdpMid,
                            sdpMLineIndex: i.sdpMLineIndex,
                            usernameFragment: i.usernameFragment
                        }
                    }, i
                }
                return new t(e)
            }, e.RTCIceCandidate.prototype = t.prototype, ee(e, "icecandidate", t => (t.candidate && Object.defineProperty(t, "candidate", {
                value: new e.RTCIceCandidate(t.candidate),
                writable: "false"
            }), t))
        }

        function qe(e) {
            if (!e.RTCPeerConnection) return;
            const t = oe(e);
            "sctp" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "sctp", {
                get() {
                    return void 0 === this._sctp ? null : this._sctp
                }
            });
            const n = function (e) {
                if (!e || !e.sdp) return !1;
                const t = Xe.a.splitSections(e.sdp);
                return t.shift(), t.some(e => {
                    const t = Xe.a.parseMLine(e);
                    return t && "application" === t.kind && -1 !== t.protocol.indexOf("SCTP")
                })
            }, r = function (e) {
                const t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                if (null === t || t.length < 2) return -1;
                const n = parseInt(t[1], 10);
                return n != n ? -1 : n
            }, i = function (e) {
                let n = 65536;
                return "firefox" === t.browser && (n = t.version < 57 ? -1 === e ? 16384 : 2147483637 : t.version < 60 ? 57 === t.version ? 65535 : 65536 : 2147483637), n
            }, o = function (e, n) {
                let r = 65536;
                "firefox" === t.browser && 57 === t.version && (r = 65535);
                const i = Xe.a.matchPrefix(e.sdp, "a=max-message-size:");
                return i.length > 0 ? r = parseInt(i[0].substr(19), 10) : "firefox" === t.browser && -1 !== n && (r = 2147483637), r
            }, a = e.RTCPeerConnection.prototype.setRemoteDescription;
            e.RTCPeerConnection.prototype.setRemoteDescription = function () {
                if (this._sctp = null, "chrome" === t.browser && t.version >= 76) {
                    const {sdpSemantics: e} = this.getConfiguration();
                    "plan-b" === e && Object.defineProperty(this, "sctp", {
                        get() {
                            return void 0 === this._sctp ? null : this._sctp
                        }, enumerable: !0, configurable: !0
                    })
                }
                if (n(arguments[0])) {
                    const e = r(arguments[0]), t = i(e), n = o(arguments[0], e);
                    let a;
                    a = 0 === t && 0 === n ? Number.POSITIVE_INFINITY : 0 === t || 0 === n ? Math.max(t, n) : Math.min(t, n);
                    const s = {};
                    Object.defineProperty(s, "maxMessageSize", {get: () => a}), this._sctp = s
                }
                return a.apply(this, arguments)
            }
        }

        function $e(e) {
            if (!e.RTCPeerConnection || !("createDataChannel" in e.RTCPeerConnection.prototype)) return;

            function t(e, t) {
                const n = e.send;
                e.send = function () {
                    const r = arguments[0], i = r.length || r.size || r.byteLength;
                    if ("open" === e.readyState && t.sctp && i > t.sctp.maxMessageSize) throw new TypeError("Message too large (can send a maximum of " + t.sctp.maxMessageSize + " bytes)");
                    return n.apply(e, arguments)
                }
            }

            const n = e.RTCPeerConnection.prototype.createDataChannel;
            e.RTCPeerConnection.prototype.createDataChannel = function () {
                const e = n.apply(this, arguments);
                return t(e, this), e
            }, ee(e, "datachannel", e => (t(e.channel, e.target), e))
        }

        function Ze(e) {
            if (!e.RTCPeerConnection || "connectionState" in e.RTCPeerConnection.prototype) return;
            const t = e.RTCPeerConnection.prototype;
            Object.defineProperty(t, "connectionState", {
                get() {
                    return {
                        completed: "connected",
                        checking: "connecting"
                    }[this.iceConnectionState] || this.iceConnectionState
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t, "onconnectionstatechange", {
                get() {
                    return this._onconnectionstatechange || null
                }, set(e) {
                    this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange), delete this._onconnectionstatechange), e && this.addEventListener("connectionstatechange", this._onconnectionstatechange = e)
                }, enumerable: !0, configurable: !0
            }), ["setLocalDescription", "setRemoteDescription"].forEach(e => {
                const n = t[e];
                t[e] = function () {
                    return this._connectionstatechangepoly || (this._connectionstatechangepoly = e => {
                        const t = e.target;
                        if (t._lastConnectionState !== t.connectionState) {
                            t._lastConnectionState = t.connectionState;
                            const n = new Event("connectionstatechange", e);
                            t.dispatchEvent(n)
                        }
                        return e
                    }, this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)), n.apply(this, arguments)
                }
            })
        }

        function et(e) {
            if (!e.RTCPeerConnection) return;
            const t = oe(e);
            if ("chrome" === t.browser && t.version >= 71) return;
            if ("safari" === t.browser && t.version >= 605) return;
            const n = e.RTCPeerConnection.prototype.setRemoteDescription;
            e.RTCPeerConnection.prototype.setRemoteDescription = function (e) {
                return e && e.sdp && -1 !== e.sdp.indexOf("\na=extmap-allow-mixed") && (e.sdp = e.sdp.split("\n").filter(e => "a=extmap-allow-mixed" !== e.trim()).join("\n")), n.apply(this, arguments)
            }
        }

        var tt, nt = function ({window: e} = {}, t = {shimChrome: !0, shimFirefox: !0, shimEdge: !0, shimSafari: !0}) {
            const n = re, c = oe(e),
                u = {browserDetails: c, commonShim: s, extractVersion: Z, disableLog: te, disableWarnings: ne};
            switch (c.browser) {
                case"chrome":
                    if (!r || !ye || !t.shimChrome) return n("Chrome shim is not included in this adapter release."), u;
                    if (null === c.version) return n("Chrome shim can not determine version, not shimming."), u;
                    n("adapter.js shimming chrome."), u.browserShim = r, de(e), le(e), ye(e), pe(e), Ee(e), he(e), ve(e), _e(e), Se(e), Qe(e), Ze(e), qe(e), $e(e), et(e);
                    break;
                case"firefox":
                    if (!o || !we || !t.shimFirefox) return n("Firefox shim is not included in this adapter release."), u;
                    n("adapter.js shimming firefox."), u.browserShim = o, Ie(e), we(e), Ne(e), ke(e), De(e), Pe(e), Le(e), Me(e), xe(e), Ue(e), Ve(e), Qe(e), Ze(e), qe(e), $e(e);
                    break;
                case"edge":
                    if (!i || !Re || !t.shimEdge) return n("MS edge shim is not included in this adapter release."), u;
                    n("adapter.js shimming edge."), u.browserShim = i, Ce(e), be(e), Re(e), Ae(e), qe(e), $e(e);
                    break;
                case"safari":
                    if (!a || !t.shimSafari) return n("Safari shim is not included in this adapter release."), u;
                    n("adapter.js shimming safari."), u.browserShim = a, He(e), Ye(e), Be(e), Fe(e), je(e), Ke(e), We(e), Je(e), Qe(e), qe(e), $e(e), et(e);
                    break;
                default:
                    n("Unsupported browser!")
            }
            return u
        }({window: "undefined" == typeof window ? void 0 : window}), rt = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, it = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        }, ot = {
            timestamp: 0,
            bitrate: {actualEncoded: 0, transmit: 0},
            videoRecv: [],
            videoSend: [],
            audioRecv: [],
            audioSend: []
        };
        !function (e) {
            e.CERTIFICATE = "certificate", e.CODEC = "codec", e.CANDIDATE_PAIR = "candidate-pair", e.LOCAL_CANDIDATE = "local-candidate", e.REMOTE_CANDIDATE = "remote-candidate", e.INBOUND = "inbound-rtp", e.TRACK = "track", e.OUTBOUND = "outbound-rtp", e.PC = "peer-connection", e.REMOTE_INBOUND = "remote-inbound-rtp", e.REMOTE_OUTBOUND = "remote-outbound-rtp", e.TRANSPORT = "transport", e.CSRC = "csrc", e.DATA_CHANNEL = "data-channel", e.STREAM = "stream", e.SENDER = "sender", e.RECEIVER = "receiver"
        }(tt || (tt = {}));
        var at, st, ct = function () {
            function e(e, t) {
                var n = this;
                this._stats = {}, this.mediaBytesSent = new Map, this.mediaBytesRetransmit = new Map, this.mediaBytesTargetEncode = new Map, this.lastVideoFramesSent = new Map, this.lastDecodeVideoReceiverStats = new Map, this.lastVideoFramesDecode = new Map, this.lastVideoFramesRecv = new Map;
                var r = this;
                this.stats = Object.assign({}, ot), this.isFirstVideoReceived = !1, this.isFirstVideoDecoded = !1, this.isFirstAudioReceived = !1, this.isFirstAudioDecoded = !1, this.pc = e, this.options = t, this.intervalTimer = window.setInterval((function () {
                    return rt(n, void 0, void 0, (function () {
                        return it(this, (function (e) {
                            switch (e.label) {
                                case 0:
                                    return [4, r.updateStats()];
                                case 1:
                                    return e.sent(), [2]
                            }
                        }))
                    }))
                }), this.options.updateInterval)
            }

            return e.prototype.updateStats = function () {
                var e = this, t = this;
                return new Promise((function (n, r) {
                    return rt(e, void 0, void 0, (function () {
                        var e;
                        return it(this, (function (r) {
                            switch (r.label) {
                                case 0:
                                    return "closed" === this.pc.connectionState ? (this._stats.timestamp = Date.now(), this.stats = {}, n(), [2]) : [4, this.pc.getStats()];
                                case 1:
                                    return e = r.sent(), t.report = e, t._stats = Object.assign({}, ot), e.forEach((function (e) {
                                        switch (e.type) {
                                            case tt.OUTBOUND:
                                                "audio" === e.mediaType ? t.processAudioOutboundStats(e) : "video" === e.mediaType && t.processVideoOutboundStats(e);
                                                break;
                                            case tt.INBOUND:
                                                "audio" === e.mediaType ? t.processAudioInboundStats(e) : "video" === e.mediaType && t.processVideoInboundStats(e);
                                                break;
                                            case tt.TRANSPORT:
                                                var n = t.report.get(e.selectedCandidatePairId);
                                                n && t.processCandidatePairStats(n);
                                                break;
                                            case tt.CANDIDATE_PAIR:
                                                e.selected && t.processCandidatePairStats(e)
                                        }
                                    })), this._stats.timestamp = Date.now(), this.stats = this._stats, n(), [2]
                            }
                        }))
                    }))
                }))
            }, e.prototype.processAudioOutboundStats = function (e) {
                var t = this._stats.audioSend.find((function (t) {
                    return t.ssrc === e.ssrc
                }));
                if (t || (this._stats.audioSend.length >= 1 && (this._stats.audioSend = []), t = Object.assign({}, {
                    bytes: 0,
                    packets: 0,
                    packetsLost: 0,
                    ssrc: 0,
                    rttMs: 0
                }), this._stats.audioSend.push(t)), t.ssrc = e.ssrc, t.packets = e.packetsSent, t.bytes = e.bytesSent, e.mediaSourceId && this.processAudioMediaSource(e.mediaSourceId, t), e.codecId && (t.codec = this.getCodecFromCodecStats(e.codecId)), e.trackId && this.processAudioTrackSenderStats(e.trackId, t), e.remoteId) this.processRemoteInboundStats(e.remoteId, t); else {
                    var n = this.findRemoteStatsId(e.ssrc, tt.REMOTE_INBOUND);
                    n && this.processRemoteInboundStats(n, t)
                }
            }, e.prototype.processAudioInboundStats = function (e) {
                var t = this._stats.audioRecv.find((function (t) {
                    return t.ssrc === e.ssrc
                }));
                t || (this._stats.audioRecv.length >= 1 && (this._stats.audioRecv = []), t = Object.assign({}, {
                    jitterBufferMs: 0,
                    bytes: 0,
                    packetsLost: 0,
                    packets: 0,
                    ssrc: 0,
                    receivedFrames: 0,
                    droppedFrames: 0
                }), this._stats.audioRecv.push(t)), t.ssrc = e.ssrc, t.packets = e.packetsReceived, t.packetsLost = e.packetsLost, t.bytes = e.bytesReceived, t.jitterBufferMs = 1e3 * e.jitter, e.trackId && this.processAudioTrackReceiverStats(e.trackId, t), e.codecId && (t.codec = this.getCodecFromCodecStats(e.codecId)), t.receivedFrames || (t.receivedFrames = e.packetsReceived), t.droppedFrames || (t.droppedFrames = e.packetsLost), 0 < t.receivedFrames && !this.isFirstAudioReceived && (this.onFirstAudioReceived && this.onFirstAudioReceived(), this.isFirstAudioReceived = !0), t.outputLevel && 0 < t.outputLevel && !this.isFirstAudioDecoded && (this.onFirstAudioDecoded && this.onFirstAudioDecoded(), this.isFirstAudioDecoded = !0)
            }, e.prototype.processAudioMediaSource = function (e, t) {
                var n = this.report.get(e);
                t && (t.inputLevel = n.audioLevel)
            }, e.prototype.getCodecFromCodecStats = function (e) {
                var t = this.report.get(e);
                if (!t) return "";
                var n = t.mimeType.match(/\/(.*)$/);
                return n && n[1] ? n[1] : ""
            }, e.prototype.processAudioTrackSenderStats = function (e, t) {
                var n = this.report.get(e);
                n && (t.aecReturnLoss = n.echoReturnLoss || 0, t.aecReturnLossEnhancement = n.echoReturnLossEnhancement || 0)
            }, e.prototype.processRemoteInboundStats = function (e, t) {
                var n = this.report.get(e);
                n && (t.packetsLost = n.packetsLost, n.roundTripTime && (t.rttMs = 1e3 * n.roundTripTime))
            }, e.prototype.findRemoteStatsId = function (e, t) {
                var n = Array.from(this.report.values()).find((function (n) {
                    return n.type === t && n.ssrc === e
                }));
                return n ? n.id : null
            }, e.prototype.processVideoOutboundStats = function (e) {
                var t = this._stats.videoSend.find((function (t) {
                    return t.ssrc === e.ssrc
                }));
                t || (this._stats.videoSend.length >= 1 && (this._stats.videoSend = []), t = Object.assign({}, {
                    firsCount: 0,
                    nacksCount: 0,
                    plisCount: 0,
                    frameCount: 0,
                    bytes: 0,
                    packets: 0,
                    packetsLost: 0,
                    ssrc: 0,
                    rttMs: 0
                }), this._stats.videoSend.push(t));
                var n = this.mediaBytesSent.get(e.ssrc);
                if (n ? n.current = e.bytesSent : this.mediaBytesSent.set(e.ssrc, {current: e.bytesSent}), void 0 !== e.retransmittedBytesSent) {
                    var r = this.mediaBytesRetransmit.get(e.ssrc);
                    r ? r.current = e.retransmittedBytesSent : this.mediaBytesRetransmit.set(e.ssrc, {current: e.retransmittedBytesSent})
                }
                if (e.totalEncodedBytesTarget) {
                    var i = this.mediaBytesTargetEncode.get(e.ssrc);
                    i ? i.current = e.totalEncodedBytesTarget : this.mediaBytesTargetEncode.set(e.ssrc, {current: e.totalEncodedBytesTarget})
                }
                if (t.ssrc = e.ssrc, t.bytes = e.bytesSent, t.packets = e.packetsSent, t.firsCount = e.firCount, t.nacksCount = e.nackCount, t.plisCount = e.pliCount, t.frameCount = e.framesEncoded, e.totalEncodeTime && e.framesEncoded && (t.avgEncodeMs = 1e3 * e.totalEncodeTime / e.framesEncoded), e.codecId && (t.codec = this.getCodecFromCodecStats(e.codecId)), e.mediaSourceId && this.processVideoMediaSource(e.mediaSourceId, t), e.trackId && this.processVideoTrackSenderStats(e.trackId, t), e.remoteId) this.processRemoteInboundStats(e.remoteId, t); else {
                    var o = this.findRemoteStatsId(e.ssrc, tt.REMOTE_INBOUND);
                    o && this.processRemoteInboundStats(o, t)
                }
            }, e.prototype.processVideoInboundStats = function (e) {
                var t = this._stats.videoRecv.find((function (t) {
                    return t.ssrc === e.ssrc
                }));
                t || (this._stats.videoRecv.length >= 1 && (this._stats.videoRecv = []), t = Object.assign({}, {
                    firsCount: 0,
                    nacksCount: 0,
                    plisCount: 0,
                    framesDecodeCount: 0,
                    framesDecodeInterval: 0,
                    framesDecodeFreezeTime: 0,
                    decodeFrameRate: 0,
                    bytes: 0,
                    packetsLost: 0,
                    packets: 0,
                    ssrc: 0
                }), this._stats.videoRecv.push(t)), t.ssrc = e.ssrc, t.packets = e.packetsReceived, t.packetsLost = e.packetsLost, t.bytes = e.bytesReceived, t.firsCount = e.firCount, t.nacksCount = e.nackCount, t.plisCount = e.pliCount, t.framesDecodeCount = e.framesDecoded;
                var n = this.lastDecodeVideoReceiverStats.get(e.ssrc), r = this.lastVideoFramesDecode.get(e.ssrc),
                    i = Date.now();
                if (n) {
                    var o = n.stats, a = i - n.lts;
                    t.framesDecodeFreezeTime = o.framesDecodeFreezeTime, t.framesDecodeInterval = o.framesDecodeInterval, t.framesDecodeCount > o.framesDecodeCount ? (n.lts = Date.now(), t.framesDecodeInterval = a, 500 <= t.framesDecodeInterval && (t.framesDecodeFreezeTime += t.framesDecodeInterval)) : t.framesDecodeCount < o.framesDecodeCount && (t.framesDecodeInterval = 0)
                }
                if (r && 800 <= i - r.lts ? (t.decodeFrameRate = Math.round((t.framesDecodeCount - r.count) / ((i - r.lts) / 1e3)), this.lastVideoFramesDecode.set(t.ssrc, {
                    count: t.framesDecodeCount,
                    lts: i,
                    rate: t.decodeFrameRate
                })) : r ? t.decodeFrameRate = r.rate : this.lastVideoFramesDecode.set(t.ssrc, {
                    count: t.framesDecodeCount,
                    lts: i,
                    rate: 0
                }), e.totalDecodeTime && (t.decodeMs = 1e3 * e.totalDecodeTime), e.trackId && this.processVideoTrackReceiverStats(e.trackId, t), e.codecId && (t.codec = this.getCodecFromCodecStats(e.codecId)), e.framerateMean && (t.framesRateFirefox = e.framerateMean), 0 < t.packets && !this.isFirstVideoReceived && (this.onFirstVideoReceived && this.onFirstVideoReceived(t.receivedFrame ? t.receivedFrame.width : 0, t.receivedFrame ? t.receivedFrame.height : 0), this.isFirstVideoReceived = !0), 0 < t.framesDecodeCount && !this.isFirstVideoDecoded) {
                    var s = t.decodedFrame ? t.decodedFrame.width : 0, c = t.decodedFrame ? t.decodedFrame.height : 0;
                    this.onFirstVideoDecoded && this.onFirstVideoDecoded(s, c), this.isFirstVideoDecoded = !0
                }
                this.lastDecodeVideoReceiverStats.set(t.ssrc, {
                    stats: Object.assign({}, t),
                    lts: n ? n.lts : Date.now()
                })
            }, e.prototype.processVideoTrackReceiverStats = function (e, t) {
                var n = this.report.get(e);
                if (n) {
                    var r = this.lastVideoFramesRecv.get(t.ssrc), i = Date.now();
                    t.framesReceivedCount = n.framesReceived;
                    var o = 0;
                    r && 800 <= i - r.lts ? (o = Math.round((n.framesReceived - r.count) / ((i - r.lts) / 1e3)), this.lastVideoFramesRecv.set(t.ssrc, {
                        count: n.framesReceived,
                        lts: i,
                        rate: o
                    })) : r ? o = r.rate : this.lastVideoFramesRecv.set(t.ssrc, {
                        count: n.framesReceived,
                        lts: i,
                        rate: 0
                    }), t.receivedFrame = {
                        width: n.frameWidth || 0,
                        height: n.frameHeight || 0,
                        frameRate: o || 0
                    }, t.decodedFrame = {
                        width: n.frameWidth || 0,
                        height: n.frameHeight || 0,
                        frameRate: t.decodeFrameRate || 0
                    }, t.outputFrame = {
                        width: n.frameWidth || 0,
                        height: n.frameHeight || 0,
                        frameRate: t.decodeFrameRate || 0
                    }, n.jitterBufferDelay && n.jitterBufferEmittedCount && (t.jitterBufferMs = 1e3 * n.jitterBufferDelay / n.jitterBufferEmittedCount, t.currentDelayMs = 1e3 * n.jitterBufferDelay / n.jitterBufferEmittedCount)
                }
            }, e.prototype.processAudioTrackReceiverStats = function (e, t) {
                var n = this.report.get(e);
                if (n) {
                    t.accelerateRate = n.removedSamplesForAcceleration / n.totalSamplesReceived, t.jitterBufferMs = 1e3 * n.jitterBufferDelay / n.jitterBufferEmittedCount, t.outputLevel = n.audioLevel;
                    var r = 1920;
                    n.totalSamplesDuration && n.totalSamplesReceived && (r = n.totalSamplesReceived / n.totalSamplesDuration / 50, t.receivedFrames = Math.round(n.totalSamplesReceived / r)), n.concealedSamples && (t.droppedFrames = Math.round(n.concealedSamples / r))
                }
            }, e.prototype.processVideoMediaSource = function (e, t) {
                var n = this.report.get(e);
                n && (t.inputFrame = {width: n.width, height: n.height, frameRate: n.framesPerSecond})
            }, e.prototype.processVideoTrackSenderStats = function (e, t) {
                var n = this.report.get(e);
                if (n) {
                    var r = 0, i = Date.now(), o = this.lastVideoFramesSent.get(t.ssrc);
                    o && 800 <= i - o.lts ? (r = Math.round((n.framesSent - o.count) / ((i - o.lts) / 1e3)), this.lastVideoFramesSent.set(t.ssrc, {
                        count: n.framesSent,
                        lts: i,
                        rate: r
                    })) : o ? r = o.rate : this.lastVideoFramesSent.set(t.ssrc, {
                        count: n.framesSent,
                        lts: i,
                        rate: 0
                    }), t.sentFrame = {width: n.frameWidth, height: n.frameHeight, frameRate: r}
                }
            }, e.prototype.processCandidatePairStats = function (e) {
                this._stats.sendBandwidth = e.availableOutgoingBitrate || 0, e.currentRoundTripTime && (this._stats.rtt = 1e3 * e.currentRoundTripTime), this._stats.videoSend.forEach((function (t) {
                    !t.rttMs && e.currentRoundTripTime && (t.rttMs = 1e3 * e.currentRoundTripTime)
                })), this._stats.audioSend.forEach((function (t) {
                    !t.rttMs && e.currentRoundTripTime && (t.rttMs = 1e3 * e.currentRoundTripTime)
                }))
            }, e.prototype.getStats = function () {
                return this.stats
            }, e
        }();
        !function (e) {
            e.SERVER_CONNECTION_STATE = "server_connection_state", e.AUDIO_SENDING_STOPPED = "audio_sending_stopped", e.FIRST_AUDIO_DECODE = "first_local_audio", e.FIRST_AUDIO_RECEIVED = "first_remote_audio", e.FIRST_VIDEO_DECODE = "first_local_frame", e.FIRST_VIDEO_RECEIVED = "first_remote_frame", e.JOIN_CHOOSE_SERVER = "join_choose_server", e.JOIN_GATEWAY = "join_gateway", e.ON_ADD_AUDIO_STREAM = "on_add_audio_stream", e.ON_ADD_VIDEO_STREAM = "on_add_video_stream", e.ON_REMOVE_STREAM = "on_remove_stream", e.ON_UPDATE_STREAM = "on_update_stream", e.PUBLISH = "publish", e.REQUEST_PROXY_APPCENTER = "request_proxy_appcenter", e.REQUEST_PROXY_WORKER_MANAGER = "request_proxy_worker_manager", e.REQ_USER_ACCOUNT = "req_user_account", e.SESSION_INIT = "session_init", e.STREAM_SWITCH = "stream_switch", e.SUBSCRIBE = "subscribe", e.VIDEO_SENDING_STOPPED = "video_sending_stopped", e.LEAVE = "leave"
        }(at || (at = {})), function (e) {
            e.API_INVOKE = "io.artc.pb.Wrtc.ApiInvoke", e.AUDIO_SENDING_STOPPED = "io.artc.pb.Wrtc.AudioSendingStopped", e.FIRST_AUDIO_DECODE = "io.artc.pb.Wrtc.FirstAudioDecode", e.FIRST_AUDIO_RECEIVED = "io.artc.pb.Wrtc.FirstAudioReceived", e.FIRST_VIDEO_DECODE = "io.artc.pb.Wrtc.FirstVideoDecode", e.FIRST_VIDEO_RECEIVED = "io.artc.pb.Wrtc.FirstVideoReceived", e.JOIN_CHOOSE_SERVER = "io.artc.pb.Wrtc.JoinChooseServer", e.JOIN_GATEWAT = "io.artc.pb.Wrtc.JoinGateway", e.ON_ADD_AUDIO_STREAM = "io.artc.pb.Wrtc.OnAddAudioStream", e.ON_ADD_VIDEO_STREAM = "io.artc.pb.Wrtc.OnAddVideoStream", e.ON_REMOVE_STREAM = "io.artc.pb.Wrtc.OnRemoveStream", e.ON_UPDATE_STREAM = "io.artc.pb.Wrtc.OnUpdateStream", e.PUBLISH = "io.artc.pb.Wrtc.Publish", e.REQUEST_PROXY_APPCENTER = "io.artc.pb.Wrtc.RequestProxyAppCenter", e.REQUEST_PROXY_WORKER_MANAGER = "io.artc.pb.Wrtc.RequestProxyWorkerManager", e.REQ_USER_ACCOUNT = "io.artc.pb.Wrtc.ReqUserAccount", e.SESSION = "io.artc.pb.Wrtc.Session", e.STREAM_SWITCH = "io.artc.pb.Wrtc.StreamSwitch", e.SUBSCRIBE = "io.artc.pb.Wrtc.Subscribe", e.SERVER_CONNECTION_STATE = "io.artc.pb.Wrtc.ServerState", e.VIDEO_SENDING_STOPPED = "io.artc.pb.Wrtc.VideoSendingStopped", e.LEAVE = "io.artc.pb.Wrtc.Leave"
        }(st || (st = {}));
        var ut = new (function () {
            function e() {
                this.defalutBaseInfo = {
                    cid: "",
                    cname: "",
                    elapse: 0,
                    extend: "",
                    lts: 0,
                    sid: "",
                    code: 0,
                    uid: ""
                }, this.baseInfoMap = new Map, this.eventUploadPendingItems = [], this.apiInvokeUploadPendingItems = [], this.apiInvokeCount = 0, this.url = "https://".concat(m.EVENT_REPORT_DOMAIN, "/arapi/v1/events/message"), this.backupUrl = "https://".concat(m.EVENT_REPORT_BACKUP_DOMAIN, "/arapi/v1/events/message"), setInterval(this.doSend.bind(this), 1e3);
                var e = "https://" + m.EVENT_REPORT_DOMAIN, t = "https://" + m.EVENT_REPORT_BACKUP_DOMAIN;
                this.setBasicUrl(e, t)
            }

            return e.prototype.setBasicUrl = function (e, t) {
                if ("" === e) this.url = "", this.backupUrl = ""; else {
                    var n = e.concat("/arapi/v1/events/message"), r = t.concat("/arapi/v1/events/message");
                    this.url = n, this.backupUrl = r
                }
            }, e.prototype.createBaseInfo = function (e, t) {
                var n = Object.assign({}, this.defalutBaseInfo);
                return n.sid = e, this.baseInfoMap.set(e, {info: n, startTime: t}), n
            }, e.prototype.send = function (e) {
                "" !== this.url && this.eventUploadPendingItems.push(e)
            }, e.prototype.doSend = function () {
                var e = this.eventUploadPendingItems.shift();
                if (e) {
                    var t = {};
                    e.data.apiName ? t.apiName = e.data.apiName : e.data.eventType && (t.eventType = e.data.eventType);
                    var n = new URLSearchParams(t).toString(),
                        r = ~this.url.indexOf("?") ? this.url.concat(n) : this.url.concat("?").concat(n);
                    M.a.post(r, e.data).then().catch((function () {
                        M.a.post(r)
                    }))
                }
            }, e.prototype.sessionInit = function (e, t) {
                var n = Date.now(), r = this.createBaseInfo(e, n);
                r.cname = t.cname;
                var i = Date.now(), o = Object.assign({}, {willUploadConsoleLog: m.UPLOAD_LOG}, t.extend),
                    a = Object.assign({}, r, {
                        eventType: at.SESSION_INIT,
                        appid: t.appid,
                        build: "",
                        lts: i,
                        elapse: i - n,
                        eventElapse: i - n,
                        extend: JSON.stringify(o),
                        mode: t.mode,
                        role: "host" === t.role ? 1 : 2,
                        process: m.PROCESS_ID,
                        success: t.success,
                        os: 3,
                        osVersion: "",
                        deviceType: navigator.userAgent,
                        netType: 0,
                        netOperator: "",
                        sdkVersion: m.SDK_VERSION
                    });
                this.send({type: st.SESSION, data: a})
            }, e.prototype.chooseServer = function (e, t) {
                var n = this.baseInfoMap.get(e);
                if (n) {
                    var r = n.info, i = Date.now(), o = JSON.stringify(t.extend), a = Object.assign({}, r, {
                        eventType: at.JOIN_CHOOSE_SERVER,
                        lts: i,
                        elapse: 0,
                        eventElapse: i - t.startTime,
                        extend: JSON.stringify(o),
                        success: t.success,
                        uid: t.uid || "",
                        cid: "",
                        chooseServerAddr: t.chooseServer ? JSON.stringify(t.chooseServer) : "",
                        chooseServerAddrList: t.serverList ? JSON.stringify(t.serverList) : "",
                        errorCode: 0
                    });
                    this.send({type: st.JOIN_CHOOSE_SERVER, data: a})
                }
            }, e.prototype.joinGateway = function (e, t) {
                var n = this.baseInfoMap.get(e);
                if (n.uid = t.uid, n.cid = t.cid, n.startTime = t.joinStartTime, n) {
                    var r = n.info, i = Date.now(), o = JSON.stringify(t.extend), a = Object.assign({}, r, {
                        eventType: at.JOIN_GATEWAY,
                        lts: i,
                        elapse: i - n.startTime,
                        eventElapse: i - t.startTime,
                        extend: o ? JSON.stringify(o) : o,
                        success: t.success,
                        uid: n.uid,
                        cid: n.cid,
                        errorCode: 0
                    });
                    this.send({type: st.JOIN_GATEWAT, data: a})
                }
            }, e.prototype.publish = function (e, t) {
                var n = this.baseInfoMap.get(e);
                if (n) {
                    var r = n.info, i = Date.now(), o = JSON.stringify(t.extend), a = Object.assign({}, r, {
                        eventType: at.PUBLISH,
                        lts: i,
                        elapse: i - n.startTime,
                        eventElapse: i - t.startTime,
                        extend: o ? JSON.stringify(o) : o,
                        success: t.success,
                        uid: n.uid,
                        cid: n.cid,
                        errorCode: 0,
                        videoName: t.cameraDeviceId,
                        audioName: t.microphoneDeviceId
                    });
                    this.send({type: st.PUBLISH, data: a})
                }
            }, e.prototype.subscribe = function (e, t) {
                var n = this.baseInfoMap.get(e);
                if (n) {
                    var r = n.info, i = Date.now(), o = JSON.stringify(t.extend), a = Object.assign({}, r, {
                        eventType: at.SUBSCRIBE,
                        lts: i,
                        elapse: i - n.startTime,
                        eventElapse: i - t.startTime,
                        extend: o ? JSON.stringify(o) : o,
                        success: t.success,
                        uid: n.uid,
                        cid: n.cid,
                        peer: t.peerid,
                        errorCode: 0,
                        video: t.video,
                        audio: t.audio
                    });
                    this.send({type: st.SUBSCRIBE, data: a})
                }
            }, e.prototype.serverConnectionState = function (e, t) {
                var n = this.baseInfoMap.get(e);
                if (n) {
                    var r = n.info, i = Date.now(), o = JSON.stringify(t.extend), a = Object.assign({}, r, {
                        eventType: at.SERVER_CONNECTION_STATE,
                        lts: i,
                        elapse: i - n.startTime,
                        eventElapse: i - t.startTime,
                        extend: o,
                        uid: n.uid,
                        cid: n.cid
                    });
                    this.send({type: st.SERVER_CONNECTION_STATE, data: a})
                }
            }, e.prototype.firstRemoteFrame = function (e, t) {
                var n = this.baseInfoMap.get(e);
                if (n) {
                    var r = n.info, i = Date.now(), o = JSON.stringify(t.extend), a = Object.assign({}, r, {
                        eventType: at.FIRST_VIDEO_RECEIVED,
                        lts: i,
                        elapse: i - n.startTime,
                        eventElapse: i - t.startTime,
                        extend: o ? JSON.stringify(o) : o,
                        uid: n.uid,
                        cid: n.cid,
                        peer: t.peerid
                    });
                    this.send({type: st.FIRST_VIDEO_RECEIVED, data: a})
                }
            }, e.prototype.firstRemoteAudio = function (e, t) {
                var n = this.baseInfoMap.get(e);
                if (n) {
                    var r = n.info, i = Date.now(), o = JSON.stringify(t.extend), a = Object.assign({}, r, {
                        eventType: at.FIRST_VIDEO_RECEIVED,
                        lts: i,
                        elapse: i - n.startTime,
                        eventElapse: i - t.startTime,
                        extend: o ? JSON.stringify(o) : o,
                        uid: n.uid,
                        cid: n.cid,
                        peer: t.peerid
                    });
                    this.send({type: st.FIRST_VIDEO_RECEIVED, data: a})
                }
            }, e.prototype.firstLocalFrame = function (e, t) {
                var n = this.baseInfoMap.get(e);
                if (n) {
                    var r = n.info, i = Date.now(), o = JSON.stringify(t.extend), a = Object.assign({}, r, {
                        eventType: at.FIRST_VIDEO_RECEIVED,
                        lts: i,
                        elapse: i - n.startTime,
                        eventElapse: i - t.startTime,
                        extend: o ? JSON.stringify(o) : o,
                        uid: n.uid,
                        cid: n.cid,
                        peer: t.peerid
                    });
                    this.send({type: st.FIRST_VIDEO_RECEIVED, data: a})
                }
            }, e.prototype.firstLocalAudio = function (e, t) {
                var n = this.baseInfoMap.get(e);
                if (n) {
                    var r = n.info, i = Date.now(), o = JSON.stringify(t.extend), a = Object.assign({}, r, {
                        eventType: at.FIRST_AUDIO_DECODE,
                        lts: i,
                        elapse: i - n.startTime,
                        eventElapse: i - t.startTime,
                        extend: o ? JSON.stringify(o) : o,
                        uid: n.uid,
                        cid: n.cid,
                        peer: t.peerid
                    });
                    this.send({type: st.FIRST_AUDIO_DECODE, data: a})
                }
            }, e.prototype.leave = function (e, t) {
                var n = this.baseInfoMap.get(e);
                if (n) {
                    var r = n.info, i = Date.now(), o = JSON.stringify(t.extend), a = Object.assign({}, r, {
                        eventType: at.LEAVE,
                        lts: i,
                        elapse: i - n.startTime,
                        eventElapse: i - t.startTime,
                        extend: o ? JSON.stringify(o) : o,
                        uid: n.uid,
                        cid: n.cid,
                        errorCode: 0
                    });
                    this.send({type: st.LEAVE, data: a})
                }
            }, e
        }()), dt = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), ft = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, lt = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        };
        var pt = function (e) {
            function t(t, n) {
                var r = e.call(this) || this;
                return r.ID = "", r.type = "pub", r.audioTrack = void 0, r.videoTrack = void 0, r.mediaStream = new MediaStream, r.videoEncoderConfig = {}, r.audioEncoderConfig = {}, r.joinInfo = {}, r.ID = t, r.type = n, r.offerOptions = {
                    offerToReceiveAudio: !0,
                    offerToReceiveVideo: !0
                }, r.pc = r.createPeerConnection(), r.statsFilter = function (e, t) {
                    void 0 === t && (t = 100);
                    var n = navigator.userAgent.toLocaleLowerCase().match(/chrome\/[\d]./i),
                        r = n && n[0] ? Number(n[0].split("/")[1]) : null;
                    return r ? r < 76 ? null : new ct(e, {updateInterval: t}) : window.RTCStatsReport && e.getStats() instanceof Promise ? new ct(e, {updateInterval: t}) : null
                }(r.pc, 1e3), r.statsFilter && (r.statsFilter.onFirstVideoDecoded = function (e, t) {
                    var n = Date.now();
                    ut.firstLocalFrame(r.joinInfo.sid, {startTime: n, extend: {width: e, height: t}, peerid: r.ID})
                }, r.statsFilter.onFirstVideoReceived = function (e, t) {
                    var n = Date.now();
                    ut.firstRemoteFrame(r.joinInfo.sid, {startTime: n, extend: {width: e, height: t}, peerid: r.ID})
                }, r.statsFilter.onFirstAudioDecoded = function () {
                    var e = Date.now();
                    ut.firstLocalAudio(r.joinInfo.sid, {startTime: e, extend: null, peerid: r.ID})
                }, r.statsFilter.onFirstAudioReceived = function () {
                    var e = Date.now();
                    ut.firstRemoteAudio(r.joinInfo.sid, {startTime: e, extend: null, peerid: r.ID})
                }), r
            }

            return dt(t, e), t.prototype.createPeerConnection = function () {
                var e = this, t = new RTCPeerConnection({iceServers: [], iceTransportPolicy: "all"});
                return t.oniceconnectionstatechange = function (n) {
                    C.debug("oniceconnectionstatechange: " + t.iceConnectionState), e.emit(O.ICE_CONNECTION_STATE_CHANGE, t.iceConnectionState)
                }, t.onconnectionstatechange = function (n) {
                    C.debug("onconnectionstatechange: " + t.connectionState), e.emit(O.CONNECTION_STATE_CHANGE, t.connectionState)
                }, t.onicecandidate = function (t) {
                    if (t.candidate) {
                        var n = {
                            candidate: t.candidate.candidate,
                            sdpMLineIndex: t.candidate.sdpMLineIndex,
                            sdpMid: t.candidate.sdpMid
                        };
                        e.emit(O.ICE_CANDIDATE, JSON.stringify(n))
                    }
                }, t.ontrack = function (t) {
                    e.emit(O.TRACK_ADDED, t.track)
                }, t
            }, t.prototype.close = function () {
                this.pc && this.pc.close()
            }, t.prototype.getSenders = function () {
                return "pub" === this.type || "pubEx" === this.type ? this.pc.getSenders() : this.pc.getReceivers()
            }, t.prototype.getStats = function () {
                var e;
                return null === (e = this.statsFilter) || void 0 === e ? void 0 : e.getStats()
            }, t.prototype.createAnswer = function (e, t) {
                return void 0 === t && (t = !1), ft(this, void 0, void 0, (function () {
                    var n, r, i, o = this;
                    return lt(this, (function (a) {
                        switch (a.label) {
                            case 0:
                                return this.pc ? (n = JSON.parse(e), 256, Object.keys(this.videoEncoderConfig).length > 0 && this.videoEncoderConfig.bitrateMax && "pub" === this.type && "chrome" === nt.browserDetails.browser && ((r = n.sdp.split("\r\n")).forEach((function (e, t) {
                                    /^a=fmtp:\d*/.test(e) && (r[t] = e + ";x-google-min-bitrate=" + o.videoEncoderConfig.bitrateMax / 2 + ";")
                                })), n.sdp = r.join("\r\n")), [4, this.pc.setRemoteDescription(new RTCSessionDescription(n))]) : [3, 3];
                            case 1:
                                return a.sent(), [4, this.pc.createAnswer(t ? {iceRestart: t} : {})];
                            case 2:
                                i = a.sent(), this.pc.setLocalDescription(i), this.emit(O.CREATE_ANSWER, JSON.stringify(i)), a.label = 3;
                            case 3:
                                return [2]
                        }
                    }))
                }))
            }, t.prototype.setIceCandidate = function (e) {
                if (this.pc) {
                    var t = JSON.parse(e), n = t.sdpMLineIndex, r = t.candidate,
                        i = new RTCIceCandidate({sdpMLineIndex: n, candidate: r});
                    this.pc.addIceCandidate(i)
                }
            }, t.prototype.updateBandWidth = function (e) {
                return ft(this, void 0, void 0, (function () {
                    var t, n;
                    return lt(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return "pub" !== this.type && "pubEx" !== this.type ? [3, 2] : "chrome" === nt.browserDetails.browser || "safari" === nt.browserDetails.browser || "firefox" === nt.browserDetails.browser && nt.browserDetails.version >= 64 && "RTCRtpSender" in window && "setParameters" in window.RTCRtpSender.prototype ? (t = this.pc.getSenders()[0], (n = t.getParameters()).encodings || (n.encodings = [{}]), 0 === e ? delete n.encodings[0].maxBitrate : n.encodings[0].maxBitrate = 1e3 * e, [4, t.setParameters(n).catch((function (e) {
                                    return console.error(e)
                                }))]) : [3, 2];
                            case 1:
                                return r.sent(), [2];
                            case 2:
                                return [2]
                        }
                    }))
                }))
            }, t.prototype._mungeSdpForSimulcasting = function (e) {
                for (var t = e.split("\r\n"), n = !1, r = [-1], i = [-1], o = null, a = null, s = null, c = null, u = -1, d = 0; d < t.length; d++) {
                    if (l = t[d].match(/m=(\w+) */)) {
                        if ("video" === l[1]) {
                            if (!(r[0] < 0)) {
                                u = d;
                                break
                            }
                            n = !0
                        } else if (r[0] > -1) {
                            u = d;
                            break
                        }
                    } else if (n) {
                        var f = t[d].match(/a=ssrc-group:FID (\d+) (\d+)/);
                        if (f) r[0] = f[1], i[0] = f[2], t.splice(d, 1), d--; else {
                            if (r[0]) {
                                if ((h = t[d].match("a=ssrc:" + r[0] + " cname:(.+)")) && (o = h[1]), (h = t[d].match("a=ssrc:" + r[0] + " msid:(.+)")) && (a = h[1]), (h = t[d].match("a=ssrc:" + r[0] + " mslabel:(.+)")) && (s = h[1]), (h = t[d].match("a=ssrc:" + r[0] + " label:(.+)")) && (c = h[1]), 0 === t[d].indexOf("a=ssrc:" + i[0])) {
                                    t.splice(d, 1), d--;
                                    continue
                                }
                                if (0 === t[d].indexOf("a=ssrc:" + r[0])) {
                                    t.splice(d, 1), d--;
                                    continue
                                }
                            }
                            0 !== t[d].length || (t.splice(d, 1), d--)
                        }
                    }
                }
                if (r[0] < 0) {
                    u = -1, n = !1;
                    for (d = 0; d < t.length; d++) {
                        var l;
                        if (l = t[d].match(/m=(\w+) */)) {
                            if ("video" === l[1]) {
                                if (!(r[0] < 0)) {
                                    u = d;
                                    break
                                }
                                n = !0
                            } else if (r[0] > -1) {
                                u = d;
                                break
                            }
                        } else if (n) {
                            if (r[0] < 0) {
                                var p = t[d].match(/a=ssrc:(\d+)/);
                                if (p) {
                                    r[0] = p[1], t.splice(d, 1), d--;
                                    continue
                                }
                            } else {
                                var h;
                                if ((h = t[d].match("a=ssrc:" + r[0] + " cname:(.+)")) && (o = h[1]), (h = t[d].match("a=ssrc:" + r[0] + " msid:(.+)")) && (a = h[1]), (h = t[d].match("a=ssrc:" + r[0] + " mslabel:(.+)")) && (s = h[1]), (h = t[d].match("a=ssrc:" + r[0] + " label:(.+)")) && (c = h[1]), 0 === t[d].indexOf("a=ssrc:" + i[0])) {
                                    t.splice(d, 1), d--;
                                    continue
                                }
                                if (0 === t[d].indexOf("a=ssrc:" + r[0])) {
                                    t.splice(d, 1), d--;
                                    continue
                                }
                            }
                            0 !== t[d].length || (t.splice(d, 1), d--)
                        }
                    }
                }
                if (r[0] < 0) return e;
                u < 0 && (u = t.length), r[1] = Math.floor(4294967295 * Math.random()), r[2] = Math.floor(4294967295 * Math.random()), i[1] = Math.floor(4294967295 * Math.random()), i[2] = Math.floor(4294967295 * Math.random());
                for (d = 0; d < r.length; d++) o && (t.splice(u, 0, "a=ssrc:" + r[d] + " cname:" + o), u++), a && (t.splice(u, 0, "a=ssrc:" + r[d] + " msid:" + a), u++), s && (t.splice(u, 0, "a=ssrc:" + r[d] + " mslabel:" + s), u++), c && (t.splice(u, 0, "a=ssrc:" + r[d] + " label:" + c), u++), o && (t.splice(u, 0, "a=ssrc:" + i[d] + " cname:" + o), u++), a && (t.splice(u, 0, "a=ssrc:" + i[d] + " msid:" + a), u++), s && (t.splice(u, 0, "a=ssrc:" + i[d] + " mslabel:" + s), u++), c && (t.splice(u, 0, "a=ssrc:" + i[d] + " label:" + c), u++);
                return t.splice(u, 0, "a=ssrc-group:FID " + r[2] + " " + i[2]), t.splice(u, 0, "a=ssrc-group:FID " + r[1] + " " + i[1]), t.splice(u, 0, "a=ssrc-group:FID " + r[0] + " " + i[0]), t.splice(u, 0, "a=ssrc-group:SIM " + r[0] + " " + r[1] + " " + r[2]), (e = t.join("\r\n")).endsWith("\r\n") || (e += "\r\n"), e
            }, t
        }(A), ht = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), vt = function (e) {
            function t(t, n) {
                var r = e.call(this, t, "pub") || this;
                return r._firstAddAudioTrack = !0, r._firstAddVideoTrack = !0, r.joinInfo = n, r
            }

            return ht(t, e), t.prototype.getAllTracks = function () {
                var e = [];
                return this.audioTrack && e.push(this.audioTrack), this.videoTrack && e.push(this.videoTrack), e
            }, t.prototype.addTrack = function (e, t) {
                if (e instanceof MediaStreamTrack) {
                    var n = this.pc.getSenders();
                    if (0 === n.length) "audio" === e.kind ? this._firstAddAudioTrack = !1 : "video" === e.kind && (this._firstAddVideoTrack = !1), this.pc.addTrack(e); else {
                        var r = n.filter((function (e) {
                            return !e.dtmf
                        }))[0], i = n.filter((function (e) {
                            return !!e.dtmf
                        }))[0];
                        "audio" === e.kind ? (this._firstAddAudioTrack ? this.pc.addTrack(e) : i.replaceTrack(e), this._firstAddAudioTrack = !1) : "video" === e.kind && (this._firstAddVideoTrack ? this.pc.addTrack(e) : r.replaceTrack(e), this._firstAddVideoTrack = !1)
                    }
                    "video" === e.kind ? (this.videoTrack = e, this.videoEncoderConfig = t) : "audio" === e.kind && (this.audioTrack = e, this.audioEncoderConfig = t)
                }
            }, t.prototype.removeTrack = function (e) {
                var t = this;
                this.pc.getSenders().map((function (n) {
                    n.track === e && ("video" === n.track.kind ? (t.videoTrack = void 0, t.videoEncoderConfig = {}) : "audio" === n.track.kind && (t.audioTrack = void 0, t.audioEncoderConfig = {}))
                }))
            }, t
        }(pt), _t = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), mt = function (e) {
            function t(t, n) {
                var r = e.call(this, t, "pubEx") || this;
                return r.joinInfo = n, r
            }

            return _t(t, e), t.prototype.getAllTracks = function () {
                var e = [];
                return this.audioTrack && e.push(this.audioTrack), this.videoTrack && e.push(this.videoTrack), e
            }, t.prototype.addTrack = function (e, t) {
                e instanceof MediaStreamTrack && (this.pc.addTrack(e), "video" === e.kind && (this.videoTrack = e, this.videoEncoderConfig = t))
            }, t.prototype.removeTrack = function (e) {
                var t = this;
                this.pc.getSenders().map((function (n) {
                    n.track === e && ("video" === n.track.kind && (t.videoTrack = void 0, t.videoEncoderConfig = {}), t.pc.removeTrack(n))
                }))
            }, t
        }(pt), Et = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), yt = function (e) {
            function t(t, n) {
                var r = e.call(this, t, "sub") || this;
                return r.isLowStreamConnection = !1, r.joinInfo = n, r
            }

            return Et(t, e), t
        }(pt), St = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), Tt = function (e) {
            function t(t) {
                var n = e.call(this) || this;
                return n.peer = void 0, n.ID = "", n.type = "", n.startTime = 0, n.connectionId = "", n.currentReconnectCount = 0, n.videoTrack = void 0, n.audioTrack = void 0, n._audioMediaStreamTrack = void 0, n._videoMediaStreamTrack = void 0, n.ID = t, n
            }

            return St(t, e), t.prototype._createPC = function (e) {
                var t, n = this, r = this;
                switch (this.type) {
                    case"pub":
                        t = new vt(this.ID, e);
                        break;
                    case"pubEx":
                        t = new mt(this.ID, e);
                        break;
                    case"sub":
                        t = new yt(this.ID, e)
                }
                return r.peer = t, r.peer.on(O.CONNECTION_STATE_CHANGE, (function (e) {
                    r.emit(O.CONNECTION_STATE_CHANGE, r.ID, r.type, e)
                })), r.peer.on(O.ICE_CONNECTION_STATE_CHANGE, (function (e) {
                    r.emit(O.ICE_CONNECTION_STATE_CHANGE, r.ID, r.type, e)
                })), r.peer.on(O.ICE_CANDIDATE, (function (e) {
                    r.emit(O.ICE_CANDIDATE, r.ID, r.type, e)
                })), r.peer.on(O.CREATE_ANSWER, (function (e) {
                    r.emit(O.CREATE_ANSWER, r.ID, r.type, e)
                })), "sub" === r.type && r.peer.on(O.TRACK_ADDED, (function (e) {
                    if (n["_" + e.kind + "MediaStreamTrack"] = e, r.emit(O.TRACK_ADDED, r.ID, e.kind, e), "video" === e.kind) {
                        var t = document.createElement("video");
                        t.srcObject = new MediaStream([e]), t.onloadedmetadata = function (e) {
                            r.emit(O.FIRST_FRAME_DECODED, r.ID, r.type, "video")
                        }, t.onresize = function (e) {
                            r.emit(O.VIDEO_SIZE_CHANGE, r.ID, r.type, "video", t.videoWidth * t.videoHeight)
                        }
                    }
                })), r.peer
            }, t.prototype._closePC = function () {
                this.peer && (this.peer.close(), this.peer = void 0)
            }, t.prototype._getAllTracks = function () {
            }, t.prototype.addOriginTracks = function (e) {
                var t = this;
                if (!e) throw new k(v.INVALID_PARAMS, "tracks is undefind");
                e instanceof Array || (e = [e]), e.map((function (e) {
                    "video" === e.kind ? t._videoMediaStreamTrack || (t._videoMediaStreamTrack = e) : "audio" === e.kind && (t._audioMediaStreamTrack || (t._audioMediaStreamTrack = e))
                }))
            }, t.prototype.clearOriginTracks = function () {
                this._videoMediaStreamTrack || (this._videoMediaStreamTrack = void 0), this._audioMediaStreamTrack || (this._audioMediaStreamTrack = void 0)
            }, t.prototype.addTrack = function (e) {
                var t = this;
                this.ID;
                if (e instanceof z || e instanceof Q) {
                    var n = e.trackMediaType, r = e.getMediaStreamTrack();
                    "video" !== n || this.videoTrack ? "audio" !== n || this.audioTrack || (this.audioTrack = e, this.audioTrack.getStats = function () {
                        return t.videoTrack instanceof Q ? (C.warning("[deprecated] RemoteAudioTrack.getStats will be removed in the future, use ArRTCClient.getRemoteAudioStats instead"), t.statsCollector.getRemoteAudioTrackStats(t.ID)) : (C.warning("[deprecated] LocalAudioTrack.getStats will be removed in the future, use ArRTCClient.getLocalAudioStats instead"), t.statsCollector.getLocalAudioTrackStats(t.ID))
                    }, this._audioMediaStreamTrack = r) : (this.videoTrack = e, this.videoTrack.getStats = function () {
                        return t.videoTrack instanceof Q ? (C.warning("[deprecated] RemoteVideoTrack.getStats will be removed in the future, use ArRTCClient.getRemoteVideoStats instead"), t.statsCollector.getRemoteVideoTrackStats(t.ID)) : (C.warning("[deprecated] LocalVideoTrack.getStats will be removed in the future, use ArRTCClient.getLocalVideoStats instead"), t.statsCollector.getLocalVideoTrackStats(t.ID))
                    }, this._videoMediaStreamTrack = r), e.peer = this.peer
                }
            }, t.prototype.removeTrack = function (e) {
                e ? (e === this.videoTrack ? this.videoTrack = void 0 : e === this.audioTrack && (this.audioTrack = void 0), e.peer = void 0) : this.removeAllTracks()
            }, t.prototype.removeAllTracks = function (e) {
                void 0 === e && (e = !1), this.videoTrack && (e && this.videoTrack.stop(), this.videoTrack = void 0), this.audioTrack && (e && this.audioTrack.stop(), this.audioTrack = void 0)
            }, t
        }(A), gt = function (e, t) {
            var n = "function" == typeof Symbol && e[Symbol.iterator];
            if (!n) return e;
            var r, i, o = n.call(e), a = [];
            try {
                for (; (void 0 === t || t-- > 0) && !(r = o.next()).done;) a.push(r.value)
            } catch (e) {
                i = {error: e}
            } finally {
                try {
                    r && !r.done && (n = o.return) && n.call(o)
                } finally {
                    if (i) throw i.error
                }
            }
            return a
        }, Ct = function () {
            for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(gt(arguments[t]));
            return e
        }, bt = window.AudioContext || window.webkitAudioContext, Rt = {
            checkSupports: function () {
                return !!bt
            }, getAudioContextInstance: function () {
                return At || (function () {
                    var e = [],
                        t = ["click", "contextmenu", "auxclick", "dblclick", "mousedown", "mouseup", "pointerup", "touchend", "keydown", "keyup"];

                    function n(r) {
                        var i = 0;
                        e.forEach((function (e) {
                            "running" !== e.state ? e.resume().then((function () {
                                C.info("AudioContext playback resumed successfully")
                            })) : i++
                        })), i === e.length && t.forEach((function (e) {
                            document.removeEventListener(e, n)
                        }))
                    }

                    bt = new Proxy(bt, {
                        construct: function (t, n) {
                            var r = new (t.bind.apply(t, Ct([void 0], n)));
                            return e.push(r), r
                        }
                    }), t.forEach((function (e) {
                        document.addEventListener(e, n)
                    }))
                }(), At = new bt)
            }, decodeAsAudioBuffer: function (e) {
                return new Promise((function (t, n) {
                    var r, i = function (e) {
                        At.decodeAudioData(e, (function (e) {
                            t(e)
                        }), (function (e) {
                            e.err
                        }))
                    };
                    if (e instanceof File) {
                        var o = new FileReader;
                        o.onload = function (e) {
                            var t = e.target.result;
                            i(t)
                        }, o.onerror = function (e) {
                            o.abort(), n("readFile ${source.name} error")
                        }, o.readAsArrayBuffer(e)
                    } else if ("string" == typeof e) {
                        var a = new XMLHttpRequest;
                        a.open("GET", e, !0), a.responseType = "arraybuffer", a.onload = function () {
                            r = a.response, i(r)
                        }, a.send()
                    } else e instanceof ArrayBuffer && i(e)
                }))
            }
        }, At = Rt.getAudioContextInstance(), It = Rt, Ot = {}, Nt = function () {
            return function () {
                var e = void 0, t = navigator.userAgent,
                    n = t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                "Chrome" === n[1] && null != (e = t.match(/(OPR(?=\/))\/?(\d+)/i)) && (n = e), "Safari" === n[1] && null != (e = t.match(/version\/(\d+)/i)) && (n[2] = e[1]), ~t.toLowerCase().indexOf("qqbrowser") && null != (e = t.match(/(qqbrowser(?=\/))\/?(\d+)/i)) && (n = e), ~t.toLowerCase().indexOf("micromessenger") && null != (e = t.match(/(micromessenger(?=\/))\/?(\d+)/i)) && (n = e), ~t.toLowerCase().indexOf("edge") && null != (e = t.match(/(edge(?=\/))\/?(\d+)/i)) && (n = e), ~t.toLowerCase().indexOf("trident") && null != (e = /\brv[ :]+(\d+)/g.exec(t) || []) && (n = [null, "IE", e[1]]);
                var r = void 0, i = [{s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/}, {
                    s: "Windows 8.1",
                    r: /(Windows 8.1|Windows NT 6.3)/
                }, {s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/}, {
                    s: "Windows 7",
                    r: /(Windows 7|Windows NT 6.1)/
                }, {s: "Windows Vista", r: /Windows NT 6.0/}, {
                    s: "Windows Server 2003",
                    r: /Windows NT 5.2/
                }, {s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/}, {
                    s: "Windows 2000",
                    r: /(Windows NT 5.0|Windows 2000)/
                }, {s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/}, {
                    s: "Windows 98",
                    r: /(Windows 98|Win98)/
                }, {s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/}, {
                    s: "Windows NT 4.0",
                    r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
                }, {s: "Windows CE", r: /Windows CE/}, {s: "Windows 3.11", r: /Win16/}, {
                    s: "Android",
                    r: /Android/
                }, {s: "Open BSD", r: /OpenBSD/}, {s: "Sun OS", r: /SunOS/}, {s: "Linux", r: /(Linux|X11)/}, {
                    s: "iOS",
                    r: /(iPhone|iPad|iPod)/
                }, {s: "Mac OS X", r: /Mac OS X/}, {
                    s: "Mac OS",
                    r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
                }, {s: "QNX", r: /QNX/}, {s: "UNIX", r: /UNIX/}, {s: "BeOS", r: /BeOS/}, {
                    s: "OS/2",
                    r: /OS\/2/
                }, {
                    s: "Search Bot",
                    r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
                }];
                for (var o in i) if (i.hasOwnProperty(o)) {
                    var a = i[o];
                    if (a.r.test(navigator.userAgent)) {
                        r = a.s;
                        break
                    }
                }
                return {name: n[1], version: n[2], os: r}
            }()
        }, wt = function () {
            return Nt().os
        };
        Ot.getBrowserInfo = Nt, Ot.getBrowserOS = wt, Ot.isChrome = function () {
            var e = Nt();
            return e.name && "Chrome" === e.name
        }, Ot.isSafari = function () {
            var e = Nt();
            return e.name && "Safari" === e.name
        }, Ot.isEdge = function () {
            var e = Nt();
            return e.name && "Edge" === e.name
        }, Ot.isFireFox = function () {
            var e = Nt();
            return e.name && "Firefox" === e.name
        }, Ot.isOpera = function () {
            var e = Nt();
            return e.name && "OPR" === e.name
        }, Ot.isQQBrowser = function () {
            var e = Nt();
            return e.name && "QQBrowser" === e.name
        }, Ot.isWeChatBrowser = function () {
            var e = Nt();
            return e.name && "MicroMessenger" === e.name
        }, Ot.isSupportedPC = function () {
            var e = wt();
            return "Linux" === e || "Mac OS X" === e || "Mac OS" === e || -1 !== e.indexOf("Windows")
        }, Ot.isSupportedMobile = function () {
            var e = wt();
            return "Android" === e || "iOS" === e
        }, Ot.getBrowserVersion = function () {
            return Nt().version
        }, Ot.isChromeKernel = function () {
            return !!navigator.userAgent.match(/chrome\/[\d]./i)
        }, Ot.isLegacyChrome = function () {
            return window.navigator.appVersion && null !== window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./) && window.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1] <= 35
        };
        var Dt = Ot, Pt = !0, kt = !1;
        Dt.getBrowserInfo().os !== h.IOS && "MicroMessenger" !== Dt.getBrowserInfo().name || (Pt = !1), navigator.userAgent.toLocaleLowerCase().match(/chrome\/[\d]./i) || (kt = !0);
        var Lt = {
            getDisplayMedia: !(!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia),
            getStreamFromExtension: "Chrome" === Dt.getBrowserInfo().name && 34 < Number(Dt.getBrowserInfo().version),
            supportUnifiedPlan: function () {
                return function () {
                    if (!window.RTCRtpTransceiver) return !1;
                    if (!("currentDirection" in RTCRtpTransceiver.prototype)) return !1;
                    var e = new RTCPeerConnection, t = !1;
                    try {
                        e.addTransceiver("audio"), t = !0
                    } catch (e) {
                    }
                    return e.close(), t
                }()
            },
            supportMinBitrate: "Chrome" === Dt.getBrowserInfo().name || "Edge" === Dt.getBrowserInfo().name,
            supportMaxBitrateInEncodingParameters: "Chrome" === Dt.getBrowserInfo().name && 68 <= Number(Dt.getBrowserInfo().version) || "Firefox" === Dt.getBrowserInfo().name && 64 <= Number(Dt.getBrowserInfo().version),
            supportDualStream: Pt,
            webAudioMediaStreamDest: function () {
                return function () {
                    var e = Dt.getBrowserInfo();
                    if ("Safari" === e.name && Number(e.version) < 12) return !1;
                    var t = It.getAudioContextInstance();
                    return !!t.createMediaStreamDestination && !!t.createMediaStreamDestination().stream
                }()
            },
            supportReplaceTrack: !!window.RTCRtpSender && "function" == typeof RTCRtpSender.prototype.replaceTrack,
            supportWebGL: "undefined" != typeof WebGLRenderingContext,
            webAudioWithAEC: kt
        };
        "https:" !== location.protocol && "" !== location.hostname && "localhost" !== location.hostname && "127.0.0.1" !== location.hostname && C.error("getUserMedia() does not work on insecure origins. See https://goo.gl/rStTGz for more details. Please upgrade your site to HTTPS."), C.info("browser compatibility " + JSON.stringify(Lt));
        var Mt, xt, Ut, Vt, Ft, jt, Bt, Wt, Gt = Lt, Ht = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), Kt = function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator, n = t && e[t], r = 0;
            if (n) return n.call(e);
            if (e && "number" == typeof e.length) return {
                next: function () {
                    return e && r >= e.length && (e = void 0), {value: e && e[r++], done: !e}
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }, Yt = function (e) {
            function t() {
                var t = e.call(this) || this;
                return t.isPlayed = !1, t.updateAudioOutputLevelInterval = 0, t.mediaDestNode = void 0, t.outputTrack = void 0, t.audioBufferNode = void 0, t.isPlayed = !1, t.audioLevelBase = 0, t.audioOutputLevel = 0, t.audioOutputLevelCache = null, t.audioOutputLevelCacheMaxLength = 7.5, t.isDestroyed = !1, t._noAudioInputCount = 0, t.context = It.getAudioContextInstance(), t.destNode = t.context.destination, t.gainNode = t.context.createGain(), t.analyserNode = t.context.createAnalyser(), t
            }

            return Ht(t, e), t.prototype.startGetAudioBuffer = function (e) {
                this.audioBufferNode || (this.audioBufferNode = this.context.createScriptProcessor(e), this.gainNode.connect(this.audioBufferNode), this.audioBufferNode.connect(this.context.destination), this.audioBufferNode.onaudioprocess = function (e) {
                    console.log("ON_AUDIO_BUFFER", e)
                })
            }, t.prototype.stopGetAudioBuffer = function () {
                this.audioBufferNode && (this.audioBufferNode.onaudioprocess = null, this.gainNode.disconnect(this.audioBufferNode), this.audioBufferNode = void 0)
            }, t.prototype.createOutputTrack = function () {
                if (!Gt.webAudioMediaStreamDest) throw new k("NOT_SUPPORT your browser is not support audio processor");
                return this.mediaDestNode && this.outputTrack || (this.mediaDestNode = this.context.createMediaStreamDestination(), this.gainNode.connect(this.mediaDestNode), this.outputTrack = this.mediaDestNode.stream.getAudioTracks()[0]), this.outputTrack
            }, t.prototype.play = function (e) {
                this.isPlayed = !0, this.destNode = e || this.context.destination, this.gainNode.connect(this.destNode)
            }, t.prototype.stop = function () {
                if (this.isPlayed) try {
                    this.gainNode.disconnect(this.destNode)
                } catch (e) {
                }
                this.isPlayed = !1
            }, t.prototype.getAudioLevel = function () {
                return this.audioOutputLevel
            }, t.prototype.getAudioAvgLevel = function () {
                var e, t, n;
                return null === this.audioOutputLevelCache && (this.audioOutputLevelCache = [this.audioOutputLevel]), (t = e = this.audioOutputLevelCache, n = t.reduce, t === Array.prototype || t instanceof Array && n === Array.prototype.reduce ? {}.ArrayPrototype.reduce : n).call(e, (function (e, t) {
                    return e + t
                })) / this.audioOutputLevelCache.length
            }, t.prototype.getAudioVolume = function () {
                return this.gainNode.gain.value
            }, t.prototype.setVolume = function (e) {
                this.gainNode.gain.setValueAtTime(e / 100, this.context.currentTime)
            }, t.prototype.setMute = function (e) {
                e ? (this.disconnect(), this.audioLevelBase = 0, this.audioOutputLevel = 0) : this.connect()
            }, t.prototype.destroy = function () {
                this.disconnect(), this.stop(), this.isDestroyed = !0, this.onNoAudioInput = void 0
            }, t.prototype.disconnect = function () {
                this.sourceNode && this.sourceNode.disconnect(), this.gainNode && this.gainNode.disconnect(), clearInterval(this.updateAudioOutputLevelInterval)
            }, t.prototype.connect = function () {
                this.sourceNode && this.sourceNode.connect(this.gainNode), this.gainNode.connect(this.analyserNode), this.updateAudioOutputLevelInterval = window.setInterval(this.updateAudioOutputLevel.bind(this), 400)
            }, t.prototype.updateAudioOutputLevel = function () {
                var e, t;
                if (this.analyserNode) {
                    var n = void 0, r = {};
                    if (this.analyserNode.getFloatTimeDomainData) n = new Float32Array(this.analyserNode.frequencyBinCount), this.analyserNode.getFloatTimeDomainData(n); else {
                        var i = void 0;
                        n = new Uint8Array(this.analyserNode.frequencyBinCount), this.analyserNode.getByteTimeDomainData(n);
                        var o = !0;
                        n = new Float32Array(function (e) {
                            var t = e.map;
                            return e === Array.prototype || e instanceof Array && t === Array.prototype.map ? r.ArrayPrototype.map : t
                        }(i = r.Array.from(n)).call(i, (function (e) {
                            return 128 !== e && (o = !1), .0078125 * (e - 128)
                        }))), o ? this.noAudioInputCount += 1 : this.noAudioInputCount = 0
                    }
                    try {
                        for (var a = Kt(n), s = a.next(); !s.done; s = a.next()) {
                            var c = s.value;
                            Math.abs(c) > this.audioLevelBase && (this.audioLevelBase = Math.abs(c), 1 < this.audioLevelBase && (this.audioLevelBase = 1))
                        }
                    } catch (t) {
                        e = {error: t}
                    } finally {
                        try {
                            s && !s.done && (t = a.return) && t.call(a)
                        } finally {
                            if (e) throw e.error
                        }
                    }
                    this.audioOutputLevel = this.audioLevelBase, this.audioLevelBase = this.audioLevelBase / 4, null !== this.audioOutputLevelCache && (this.audioOutputLevelCache.push(this.audioOutputLevel), this.audioOutputLevelCache.length > this.audioOutputLevelCacheMaxLength && this.audioOutputLevelCache.shift())
                }
            }, t.prototype.isNoAudioInput = function () {
                return 3 <= this.noAudioInputCount
            }, Object.defineProperty(t.prototype, "noAudioInputCount", {
                get: function () {
                    return this._noAudioInputCount
                }, set: function (e) {
                    this._noAudioInputCount < 3 && 3 <= e ? this.onNoAudioInput && this.onNoAudioInput() : 3 <= this._noAudioInputCount && this._noAudioInputCount % 10 == 0 && this.onNoAudioInput && this.onNoAudioInput(), this._noAudioInputCount = e
                }, enumerable: !1, configurable: !0
            }), t
        }(A);
        !function (e) {
            e.DEST_TOKEN_EXPIRED = "DEST_TOKEN_EXPIRED", e.RELAY_OK = "RELAY_OK", e.SERVER_CONNECTION_LOST = "SERVER_CONNECTION_LOST", e.SRC_TOKEN_EXPIRED = "SRC_TOKEN_EXPIRED"
        }(Mt || (Mt = {})), function (e) {
            e.NETWORK_CONNECTED = "NETWORK_CONNECTED", e.NETWORK_DISCONNECTED = "NETWORK_DISCONNECTED", e.PACKET_JOINED_DEST_CHANNEL = "PACKET_JOINED_DEST_CHANNEL", e.PACKET_JOINED_SRC_CHANNEL = "PACKET_JOINED_SRC_CHANNEL", e.PACKET_RECEIVED_AUDIO_FROM_SRC = "PACKET_RECEIVED_AUDIO_FROM_SRC", e.PACKET_RECEIVED_VIDEO_FROM_SRC = "PACKET_RECEIVED_VIDEO_FROM_SRC", e.PACKET_SENT_TO_DEST_CHANNEL = "PACKET_SENT_TO_DEST_CHANNEL", e.PACKET_UPDATE_DEST_CHANNEL = "PACKET_UPDATE_DEST_CHANNEL", e.PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE = "PACKET_UPDATE_DEST_CHANNEL_NOT_CHANGE", e.PACKET_UPDATE_DEST_CHANNEL_REFUSED = "PACKET_UPDATE_DEST_CHANNEL_REFUSED"
        }(xt || (xt = {})), function (e) {
            e.RELAY_STATE_CONNECTING = "RELAY_STATE_CONNECTING", e.RELAY_STATE_FAILURE = "RELAY_STATE_FAILURE", e.RELAY_STATE_IDLE = "RELAY_STATE_IDLE", e.RELAY_STATE_RUNNING = "RELAY_STATE_RUNNING"
        }(Ut || (Ut = {})), function (e) {
            e.CHANNEL_BANNED = "CHANNEL_BANNED", e.IP_BANNED = "IP_BANNED", e.LEAVE = "LEAVE", e.CONNECT_TIME_OUT = "CONNECT_TIME_OUT", e.KEEP_A_LIVE_TIME_OUT = "KEEP_A_LIVE_TIME_OUT", e.NETWORK_ERROR = "NETWORK_ERROR", e.SERVER_ERROR = "SERVER_ERROR", e.UID_BANNED = "UID_BANNED", e.DEVELOPER_INVALID = "DEVELOPER_INVALID", e.TOKEN_INVALID = "TOKEN_INVALID"
        }(Vt || (Vt = {})), function (e) {
            e[e.AUDIO_ONLY = 2] = "AUDIO_ONLY", e[e.DISABLE = 0] = "DISABLE", e[e.LOW_STREAM = 1] = "LOW_STREAM"
        }(Ft || (Ft = {})), function (e) {
            e[e.HIGH_STREAM = 0] = "HIGH_STREAM", e[e.LOW_STREAM = 1] = "LOW_STREAM"
        }(jt || (jt = {})), function (e) {
            e.WIN_10 = "Windows 10", e.WIN_81 = "Windows 8.1", e.WIN_8 = "Windows 8", e.WIN_7 = "Windows 7", e.WIN_VISTA = "Windows Vista", e.WIN_SERVER_2003 = "Windows Server 2003", e.WIN_XP = "Windows XP", e.WIN_2000 = "Windows 2000", e.ANDROID = "Android", e.OPEN_BSD = "Open BSD", e.SUN_OS = "Sun OS", e.LINUX = "Linux", e.IOS = "iOS", e.MAC_OS_X = "Mac OS X", e.MAC_OS = "Mac OS", e.QNX = "QNX", e.UNIX = "UNIX", e.BEOS = "BeOS", e.OS_2 = "OS/2", e.SEARCH_BOT = "Search Bot"
        }(Bt || (Bt = {})), function (e) {
            e.UNEXPECTED_ERROR = "UNEXPECTED_ERROR", e.UNEXPECTED_RESPONSE = "UNEXPECTED_RESPONSE", e.TIMEOUT = "TIMEOUT", e.INVALID_PARAMS = "INVALID_PARAMS", e.NOT_SUPPORT = "NOT_SUPPORT", e.INVALID_OPERATION = "INVALID_OPERATION", e.OPERATION_ABORT = "OPERATION_ABORT", e.WEB_SECURITY_RESTRICT = "WEB_SECURITY_RESTRICT", e.NETWORK_ERROR = "NETWORK_ERROR", e.NETWORK_TIMEOUT = "NETWORK_TIMEOUT", e.NETWORK_RESPONSE_ERROR = "NETWORK_RESPONSE_ERROR", e.API_INVOKE_TIMEOUT = "API_INVOKE_TIMEOUT", e.ENUMERATE_DEVICES_FAILED = "ENUMERATE_DEVICES_FAILED", e.DEVICE_NOT_FOUND = "DEVICE_NOTE_FOUND", e.ELECTRON_IS_NULL = "ELECTRON_IS_NULL", e.ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR = "ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR", e.STREAM_ALREADY_INITIALIZED = "STREAM_ALREADY_INITIALIZED", e.STREAM_IS_CLOSED = "STREAM_IS_CLOSED", e.ABORT_OTHER_INIT = "ABORT_OTHER_INIT", e.CHROME_PLUGIN_NO_RESPONSE = "CHROME_PLUGIN_NO_RESPONSE", e.CHROME_PLUGIN_NOT_INSTALL = "CHROME_PLUGIN_NOT_INSTALL", e.MEDIA_OPTION_INVALID = "MEDIA_OPTION_INVALID", e.PERMISSION_DENIED = "PERMISSION_DENIED", e.CONSTRAINT_NOT_SATISFIED = "CONSTRAINT_NOT_SATISFIED", e.CAN_NOT_AUTOPLAY = "CAN_NOT_AUTOPLAY", e.HIGH_STREAM_NO_VIDEO_TRACK = "HIGH_STREAM_NO_VIDEO_TRACK", e.SCREEN_SHARE_CAN_NOT_CREATE_LOW_STREAM = "SCREEN_SHARE_CAN_NOT_CREATE_LOW_STREAM", e.TOKEN_GENERATOR_FUNCTION_ERROR = "TOKEN_GENERATOR_FUNCTION_ERROR", e.INVALID_UINT_UID_FROM_STRING_UID = "INVALID_UINT_UID_FROM_STRING_UID", e.CAN_NOT_GET_PROXY_SERVER = "CAN_NOT_GET_PROXY_SERVER", e.CAN_NOT_GET_GATEWAY_SERVER = "CAN_NOT_GET_GATEWAY_SERVER", e.UID_CONFLICT = "UID_CONFLICT", e.TRACK_ALREADY_PUBLISHED = "TRACK_ALREADY_PUBLISHED", e.TRACK_IS_NOT_PUBLISHED = "TRACK_IS_NOT_PUBLISHED", e.INVALID_LOCAL_TRACK = "INVALID_LOCAL_TRACK", e.SENDER_NOT_FOUND = "SENDER_NOT_FOUND", e.CREATE_OFFER_FAILED = "CREATE_OFFER_FAILED", e.SET_ANSWER_FAILED = "SET_ANSWER_FAILED", e.ICE_FAILED = "ICE_FAILED", e.PC_CLOSED = "PC_CLOSED", e.SENDER_REPLACE_FAILED = "SENDER_REPLACE_FAILED", e.GATEWAY_P2P_LOST = "GATEWAY_P2P_LOST", e.CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS = "CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS", e.INVALID_REMOTE_USER = "INVALID_REMOTE_USER", e.TRACK_IS_NOT_SUBSCRIBED = "TRACK_IS_NOT_SUBSCRIBED", e.SUBSCRIPTION_IS_IN_PROGRESS = "SUBSCRIPTION_IS_IN_PROGRESS", e.FETCH_AUDIO_FILE_FAILED = "FETCH_AUDIO_FILE_FAILED", e.READ_LOCAL_AUDIO_FILE_ERROR = "READ_LOCAL_AUDIO_FILE_ERROR", e.DECODE_AUDIO_FILE_FAILED = "DECODE_AUDIO_FILE_FAILED", e.EFFECT_ID_CONFLICTED = "EFFECT_ID_CONFLICTED", e.EFFECT_SOUND_ID_NOT_FOUND = "EFFECT_SOUND_ID_NOT_FOUND", e.WS_ABORT = "WS_ABORT", e.WS_DISCONNECT = "WS_DISCONNECT", e.WS_ERR = "WS_ERR", e.CAN_NOT_CONNECT_TO_LIVE_STREAMING_WORKER = "CAN_NOT_CONNECT_TO_LIVE_STREAMING_WORKER", e.REQUEST_TO_LIVE_STREAMING_WORKER_FAILED = "REQUEST_TO_LIVE_STREAMING_WORKER_FAILED", e.PUSH_RTMP_URL_CONFLICT = "PUSH_RTMP_URL_CONFLICT", e.PULL_URL_CONFLICT = "PULL_URL_CONFLICT", e.WEBGL_INTERNAL_ERROR = "WEBGL_INTERNAL_ERROR", e.BEAUTY_PROCESSOR_INTERNAL_ERROR = "BEAUTY_PROCESSOR_INTERNAL_ERROR", e.CROSS_CHANNEL_WAIT_STATUS_ERROR = "CROSS_CHANNEL_WAIT_STATUS_ERROR", e.CROSS_CHANNEL_FAILED_JOIN_SRC = "CROSS_CHANNEL_FAILED_JOIN_SEC", e.CROSS_CHANNEL_FAILED_JOIN_DEST = "CROSS_CHANNEL_FAILED_JOIN_DEST", e.CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST = "CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST", e.CROSS_CHANNEL_SERVER_ERROR_RESPONSE = "CROSS_CHANNEL_SERVER_ERROR_RESPONSE"
        }(Wt || (Wt = {}));
        var Jt, zt = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), Xt = new A, Qt = function (e) {
            function t(n, r) {
                var i = e.call(this) || this;
                if (!(i instanceof t)) throw new TypeError("Cannot call a class as a function");
                if (i.isCurrentTrackCloned = !1, i.isRemoteTrack = !1, i.noSoundTime = 0, i.lastNoSoundTime = 0, i.rebuildWebAudio = function () {
                    if (!i.isNoAudioInput || i.isDestroyed) return document.body.removeEventListener("click", i.rebuildWebAudio, !0), void C.debug("rebuild web audio success, current volume", i.getAudioLevel());
                    i.context.resume().then((function () {
                        return C.info("resume success")
                    })), C.debug("rebuild web audio because of ios 12 bugs"), i.disconnect();
                    var e = i.track;
                    i.track = i.track.clone(), i.isCurrentTrackCloned ? e.stop() : i.isCurrentTrackCloned = !0;
                    var t = new MediaStream([i.track]);
                    i.sourceNode = i.context.createMediaStreamSource(t), i.analyserNode = i.context.createAnalyser();
                    var n = i.gainNode.gain.value;
                    i.gainNode = i.context.createGain(), i.gainNode.gain.setValueAtTime(n, i.context.currentTime), i.connect(), i.audioElement.srcObject = t, i.isPlayed && i.play(i.destNode)
                }, "audio" !== n.kind) throw new k("UNEXPECTED_ERROR");
                i.track = n;
                var o = new MediaStream([i.track]);
                return i.isRemoteTrack = !!r, i.sourceNode = i.context.createMediaStreamSource(o), i.isRemoteTrack && (i.scriptProcessor = i.context.createScriptProcessor(16384), i.scriptProcessor.onaudioprocess = i.onScriptProcess.bind(i), i.scriptProcessor.connect(i.context.destination), i.sourceNode.connect(i.scriptProcessor), i.noSoundTimeResetInterval = window.setInterval((function () {
                    i.lastNoSoundTime = i.noSoundTime, i.noSoundTime = 0
                }), 1e3)), i.connect(), i.audioElement = document.createElement("audio"), i.audioElement.srcObject = o, r && Dt.getBrowserInfo().os === Bt.IOS && (Xt.on("state-change", i.rebuildWebAudio), i.onNoAudioInput = function () {
                    document.body.addEventListener("click", this.rebuildWebAudio, !0), this.rebuildWebAudio(), document.body.click()
                }), i
            }

            return zt(t, e), t.prototype.updateTrack = function (e) {
                this.sourceNode.disconnect(), this.track = e, this.isCurrentTrackCloned = !1;
                var t = new MediaStream([e]);
                this.sourceNode = this.context.createMediaStreamSource(t), this.sourceNode.connect(this.gainNode), this.audioElement.srcObject = t
            }, t.prototype.destroy = function () {
                this.audioElement.remove(), Xt.off("state-change", this.rebuildWebAudio), this.scriptProcessor && (this.scriptProcessor.onaudioprocess = null, this.scriptProcessor = void 0), this.noSoundTimeResetInterval && (window.clearInterval(this.noSoundTimeResetInterval), this.noSoundTimeResetInterval = void 0), this.disconnect(), this.stop(), this.isDestroyed = !0, this.onNoAudioInput = void 0
            }, t.prototype.onScriptProcess = function (e) {
                var t = performance.now ? performance.now() : Date.now();
                if (function (e) {
                    for (var t = 0; t < e.outputBuffer.numberOfChannels; t += 1) for (var n = e.outputBuffer.getChannelData(t), r = 0; r < n.length; r += 1) n[r] = 0;
                    e.inputBuffer
                }(e), !this.lastBufferTime) return this.emit("receive_track_buffer"), void (this.lastBufferTime = t);
                var n = 1e3 * e.inputBuffer.duration, r = t - this.lastBufferTime, i = 1e3 * function (e) {
                    for (var n = e.getChannelData(0), i = 0, o = 0, a = 0; a < n.length; a += 1) 0 === n[a] ? o < (i += 1) && (o = i) : i = 0;
                    return r / t.length * e.duration
                }(e.inputBuffer);
                this.noSoundTime += r - n + i, this.lastBufferTime = t
            }, Object.defineProperty(t.prototype, "isFreeze", {
                get: function () {
                    return 100 < this.lastNoSoundTime
                }, enumerable: !1, configurable: !0
            }), t
        }(Yt), qt = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, $t = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        }, Zt = new (function () {
            function e() {
                this.elementMap = new Map, this.elementsNeedToResume = []
            }

            return e.prototype.setSinkID = function (e, t) {
                return qt(this, void 0, void 0, (function () {
                    var n;
                    return $t(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return (n = this.elementMap.get(e)) ? [4, n.setSinkId(t).catch((function (t) {
                                    C.error("PERMISSION_DENIED, can not set sink id: " + e.toString())
                                }))] : [3, 2];
                            case 1:
                                return r.sent(), [3, 3];
                            case 2:
                                throw new k("UNEXPECTED_ERROR", "can not find element to set sink id");
                            case 3:
                                return [2]
                        }
                    }))
                }))
            }, e.prototype.play = function (e, t) {
                var n = this;
                if (!this.elementMap.has(t)) {
                    var r = document.createElement("audio");
                    r.autoplay = !0, r.srcObject = new MediaStream([e]), this.elementMap.set(t, r);
                    var i = r.play();
                    i && i.then && i.catch((function (e) {
                        n.elementMap.has(t) && "NotAllowedError" === e.name && (C.warning("detected audio element autoplay failed"), n.elementsNeedToResume.push(r))
                    }))
                }
            }, e.prototype.updateTrack = function (e, t) {
                var n = this.elementMap.get(e);
                n && (n.srcObject = new MediaStream([t]))
            }, e.prototype.isPlaying = function (e) {
                return this.elementMap.has(e)
            }, e.prototype.setVolume = function (e, t) {
                var n = this.elementMap.get(e);
                n && (t = Math.max(0, Math.min(100, t)), n.volume = t / 100)
            }, e.prototype.stop = function (e) {
                var t = this.elementMap.get(e);
                if (t) {
                    var n = this.elementsNeedToResume.indexOf(t);
                    this.elementsNeedToResume.splice(n, 1), t.srcObject = null, t.remove(), this.elementMap.delete(e)
                }
            }, e.prototype.autoResumeAudioElement = function () {
                var e = this;

                function t() {
                    e.elementsNeedToResume.forEach((function (e) {
                        e.play().then((function (e) {
                            C.debug("Auto resume audio element success")
                        })).catch((function (e) {
                            C.warning("Auto resume audio element failed!", e)
                        }))
                    })), e.elementsNeedToResume = []
                }

                new Promise((function (e) {
                    document.body ? t() : window.addEventListener("load", (function () {
                        return t()
                    }))
                })).then((function () {
                    document.body.addEventListener("touchstart", t, !0), document.body.addEventListener("mousedown", t, !0)
                }))
            }, e
        }()), en = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), tn = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, nn = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        }, rn = function (e) {
            function t(t, n, r) {
                var i = e.call(this, t, r) || this;
                if (i._useAudioElement = !1, i.trackMediaType = "audio", i._encoderConfig = n, !It.checkSupports()) throw new k(v.NOT_SUPPORT, "can not create audio context");
                Gt.webAudioWithAEC || (i._useAudioElement = !0), i._source = new Qt(t);
                try {
                    i._mediaStreamTrack = i._source.createOutputTrack()
                } catch (e) {
                }
                return i
            }

            return en(t, e), t.prototype.setPlaybackDevice = function (e) {
                return tn(this, void 0, void 0, (function () {
                    return nn(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                if (!this._useAudioElement) throw new k(v.NOT_SUPPORT, "your browser does not support setting the audio output device");
                                t.label = 1;
                            case 1:
                                return t.trys.push([1, 3, , 4]), [4, Zt.setSinkID(this.getTrackId(), e)];
                            case 2:
                                return t.sent(), [3, 4];
                            case 3:
                                throw t.sent();
                            case 4:
                                return [2]
                        }
                    }))
                }))
            }, t.prototype.setVolume = function (e) {
                if ("number" != typeof e) throw new k(v.INVALID_PARAMS, "value must be number.");
                if (e < 0 || e > 1e3) throw new k(v.INVALID_PARAMS, "The value ranges from 0 (mute) to 1000 (maximum).");
                this._source.setVolume(e)
            }, t.prototype.getVolumeLevel = function () {
                return this._source && this._source.getAudioLevel()
            }, t.prototype.getStats = function () {
                C.warning("[deprecated] LocalAudioTrack.getStats will be removed in the future, use ArRTCClient.getLocalAudioStats instead")
            }, t.prototype.play = function () {
                this._useAudioElement ? Zt.play(this._mediaStreamTrack, this.getTrackId()) : this._source.play()
            }, t.prototype.stop = function () {
                this._useAudioElement ? Zt.stop(this.getTrackId()) : this._source.stop()
            }, t.prototype.close = function () {
                e.prototype.close.call(this), this._source.destroy()
            }, t.prototype._updatePlayerSource = function () {
                this._source && this._source.updateTrack(this._originMediaStreamTrack), this._useAudioElement && Zt.updateTrack(this.getTrackId(), this._mediaStreamTrack)
            }, t.prototype._updateOriginMediaStreamTrack = function (e, t) {
                return tn(this, void 0, void 0, (function () {
                    return nn(this, (function (n) {
                        return this._originMediaStreamTrack === e || (this._originMediaStreamTrack.removeEventListener("ended", this._handleTrackEnded), e.addEventListener("ended", this._handleTrackEnded), t && (this._originMediaStreamTrack.stop(), this._originMediaStreamTrack = e, this._updatePlayerSource())), [2]
                    }))
                }))
            }, Object.defineProperty(t.prototype, "isPlaying", {
                get: function () {
                    return this._useAudioElement ? Zt.isPlaying(this.getTrackId()) : this._source.isPlayed
                }, enumerable: !1, configurable: !0
            }), t
        }(z), on = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), an = function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator, n = t && e[t], r = 0;
            if (n) return n.call(e);
            if (e && "number" == typeof e.length) return {
                next: function () {
                    return e && r >= e.length && (e = void 0), {value: e && e[r++], done: !e}
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }, sn = function (e) {
            function t(t, n, r) {
                var i = e.call(this, t.stream.getAudioTracks()[0], n, r) || this;
                return i.trackList = [], i.mediaStreamDestination = t, i
            }

            return on(t, e), t.prototype.hasAudioTrack = function (e) {
                return -1 !== this.trackList.findIndex((function (t) {
                    return t === e
                }))
            }, t.prototype.addAudioTrack = function (e) {
                this.hasAudioTrack(e) ? C.warning("track is already added") : (e.on(O.UPDATE_MUTE_STATE, this._handleAllAudioTrackMute.bind(this)), this.trackList.push(e), e._source.gainNode.connect(this.mediaStreamDestination), this.updateEncoderConfig())
            }, t.prototype.removeAudioTrack = function (e) {
                this.hasAudioTrack(e) && (!e._isClosed && e._source.gainNode.disconnect(this.mediaStreamDestination), this.trackList.splice(this.trackList.findIndex((function (t) {
                    return t === e
                })), 1), this.updateEncoderConfig())
            }, t.prototype.removeAllAudioTracks = function () {
                var e = this;
                this.trackList && this.trackList.map((function (t) {
                    e.removeAudioTrack(t)
                }))
            }, t.prototype.updateEncoderConfig = function () {
                var e = {};
                this.trackList && this.trackList.forEach((function (t) {
                    t._encoderConfig && ((t._encoderConfig.bitrate || 0) > (e.bitrate || 0) && (e.bitrate = t._encoderConfig.bitrate), (t._encoderConfig.sampleRate || 0) > (e.sampleRate || 0) && (e.sampleRate = t._encoderConfig.sampleRate), (t._encoderConfig.sampleSize || 0) > (e.sampleSize || 0) && (e.sampleSize = t._encoderConfig.sampleSize), t._encoderConfig.stereo && (e.stereo = !0))
                })), this._encoderConfig = e
            }, t.prototype._handleAllAudioTrackMute = function () {
                var e, t, n = !0;
                try {
                    for (var r = an(this.trackList), i = r.next(); !i.done; i = r.next()) {
                        if (!i.value._enabled) {
                            n = !1;
                            break
                        }
                    }
                } catch (t) {
                    e = {error: t}
                } finally {
                    try {
                        i && !i.done && (t = r.return) && t.call(r)
                    } finally {
                        if (e) throw e.error
                    }
                }
                n ? this.setEnabled(!0) : n !== this._enabled && this.setEnabled(!1)
            }, t
        }(rn), cn = ["play", "playing", "loadeddata", "canplay", "pause", "resize", "stalled", "suspend", "waiting"];
        !function (e) {
            e.NONE = "none", e.INIT = "init", e.CANPLAY = "canplay", e.PLAYING = "playing", e.PAUSED = "paused", e.SUSPEND = "suspend", e.STALLED = "stalled", e.WAITING = "waiting", e.ERROR = "error", e.DESTROYED = "destroyed"
        }(Jt || (Jt = {}));
        var un = function () {
            function e(e) {
                var t = this;
                this.container = void 0, this.videoElement = void 0, this.slot = void 0, this.trackId = "", this.videoTrack = null, this.videoElementCheckInterval = void 0;
                var n = this;
                this.videoElementStatus = Jt.NONE, this.handleVideoEvents = function (e) {
                    switch (e.type) {
                        case"play":
                        case"playing":
                            n.startGetVideoDimensions(), n.videoElementStatus = Jt.PLAYING;
                            break;
                        case"loadeddata":
                            n.onFirstVideoFrameDecoded && n.onFirstVideoFrameDecoded();
                            break;
                        case"canplay":
                            n.videoElementStatus = Jt.CANPLAY;
                            break;
                        case"resize":
                            var r = t.videoWidth, i = t.videoWidth;
                            C.debug("video resize => " + r + " * " + i);
                            break;
                        case"stalled":
                            n.videoElementStatus = Jt.STALLED;
                            break;
                        case"suspend":
                            n.videoElementStatus = Jt.SUSPEND;
                            break;
                        case"pause":
                            n.videoElementStatus = Jt.PAUSED;
                            break;
                        case"waiting":
                            n.videoElementStatus = Jt.WAITING
                    }
                }, this.startGetVideoDimensions = function () {
                    !function e() {
                        n.videoElement && (4 < n.videoElement.videoWidth * n.videoElement.videoHeight ? C.debug("[".concat(n.trackId, "] video dimensions:"), n.videoElement.videoWidth, n.videoElement.videoHeight) : setTimeout(e, 50))
                    }()
                }, this.slot = e.element || document.body, this.trackId = e.trackId, this.updateConfig(e)
            }

            return Object.defineProperty(e.prototype, "videoElementStatus", {
                get: function () {
                    return this._videoElementStatus
                }, set: function (e) {
                    this._videoElementStatus = e
                }, enumerable: !1, configurable: !0
            }), e.prototype.updateConfig = function (e) {
                this.config = e, this.trackId = e.trackId;
                var t = e.element;
                t !== this.slot && (this.destroy(), this.slot = t), this.createElements()
            }, e.prototype.createElements = function () {
                var e;
                this.container || (this.container = document.createElement("div")), (e = this.container).id = "artc-video-player-".concat(this.trackId), e.style.width = "100%", e.style.height = "100%", e.style.position = "relative", e.style.overflow = "hidden", this.videoTrack ? (e.style.backgroundColor = "black", this.createVideoElement(), e.appendChild(this.videoElement)) : this.removeVideoElement(), this.slot.appendChild(this.container)
            }, e.prototype.createVideoElement = function () {
                var e = this;
                if (e.videoElement || (e.videoElementStatus = Jt.INIT, e.videoElement = document.createElement("video"), e.videoElement.onerror = function () {
                    return e.videoElementStatus = Jt.ERROR
                }, e.container && e.container.appendChild(e.videoElement), cn.forEach((function (t) {
                    e.videoElement && e.videoElement.addEventListener(t, e.handleVideoEvents)
                })), e.videoElementCheckInterval = window.setInterval((function () {
                    !document.getElementById("video_".concat(e.trackId)) && e.videoElement && (e.videoElementStatus = Jt.DESTROYED)
                }), 1e3)), e.videoElement.id = "video_".concat(e.trackId), e.videoElement.className = "artc_video_player", e.videoElement.style.width = "100%", e.videoElement.style.height = "100%", e.videoElement.style.position = "absolute", e.videoElement.style.top = "0", e.videoElement.style.left = "0", e.videoElement.setAttribute("autoplay", "autoplay"), e.videoElement.autoplay = !0, e.videoElement.controls = !1, e.videoElement.setAttribute("playsinline", "playsinline"), e.config.mirror && (e.videoElement.style.transform = "rotateY(180deg)"), e.config.fit ? e.videoElement.style.objectFit = e.config.fit : e.videoElement.style.objectFit = "cover", e.videoElement.setAttribute("muted", ""), e.videoElement.muted = !0, "srcObject" in e.videoElement) e.videoElement.srcObject instanceof MediaStream && (e.videoElement.srcObject.getVideoTracks()[0], e.videoTrack), e.videoElement.srcObject = e.videoTrack ? new MediaStream([e.videoTrack]) : null; else {
                    var t = new MediaStream;
                    t.addTrack(e.videoTrack), e.videoElement.src = window.URL.createObjectURL(t)
                }
                e.videoElement.onloadedmetadata = function (t) {
                    e.videoElement.play()
                }
            }, e.prototype.removeVideoElement = function () {
                var e = this;
                e.videoElement && (cn.forEach((function (t) {
                    e.videoElement && e.videoElement.removeEventListener(t, e.handleVideoEvents)
                })), e.videoElementCheckInterval && (window.clearInterval(e.videoElementCheckInterval), e.videoElementCheckInterval = void 0), e.container && e.container.removeChild(e.videoElement), e.videoElement = void 0, e.videoElementStatus = Jt.NONE)
            }, e.prototype.updateVideoTrack = function (e) {
                this.videoTrack !== e && (this.videoTrack = e, this.createElements())
            }, e.prototype.getCurrentFrame = function () {
                if (!this.videoElement) return new ImageData(2, 2);
                var e = document.createElement("canvas");
                e.width = this.videoElement.videoWidth, e.height = this.videoElement.videoHeight;
                var t = e.getContext("2d");
                if (!t) return C.error("create canvas context failed!"), new ImageData(2, 2);
                t.drawImage(this.videoElement, 0, 0, e.width, e.height);
                var n = t.getImageData(0, 0, e.width, e.height);
                return e.remove(), n
            }, e.prototype.play = function () {
                var e = this;
                if (this.videoElement) {
                    var t = this.videoElement.play();
                    t && t.catch && t.catch((function (t) {
                        C.warning("[".concat(e.trackId, "] play warning: "), t)
                    }))
                }
            }, e.prototype.destroy = function () {
                this.videoElement && (this.videoElement.srcObject = null, this.videoElement = void 0, C.info("[[track-" + this.trackId + "] is destroyed]")), this.container && (this.slot.removeChild(this.container), this.container = void 0)
            }, e
        }();

        function dn(e, t, n) {
            return {sampleRate: e, stereo: t, bitrate: n}
        }

        function fn(e, t, n, r, i, o) {
            return {width: e, height: t, frameRate: n || r ? {ideal: n, max: r} : void 0, bitrateMin: i, bitrateMax: o}
        }

        var ln = {
            "90p": fn(160, 90),
            "90p_1": fn(160, 90),
            "120p": fn(160, 120, 15, 15, 30, 65),
            "120p_1": fn(160, 120, 15, 15, 30, 65),
            "120p_3": fn(120, 120, 15, 15, 30, 50),
            "120p_4": fn(212, 120),
            "180p": fn(320, 180, 15, 15, 30, 140),
            "180p_1": fn(320, 180, 15, 15, 30, 140),
            "180p_3": fn(180, 180, 15, 15, 30, 100),
            "180p_4": fn(240, 180, 15, 15, 30, 120),
            "240p": fn(320, 240, 15, 15, 40, 200),
            "240p_1": fn(320, 240, 15, 15, 40, 200),
            "240p_3": fn(240, 240, 15, 15, 40, 140),
            "240p_4": fn(424, 240, 15, 15, 40, 220),
            "360p": fn(640, 360, 15, 15, 80, 400),
            "360p_1": fn(640, 360, 15, 15, 80, 400),
            "360p_3": fn(360, 360, 15, 15, 80, 260),
            "360p_4": fn(640, 360, 30, 30, 80, 600),
            "360p_6": fn(360, 360, 30, 30, 80, 400),
            "360p_7": fn(480, 360, 15, 15, 80, 320),
            "360p_8": fn(480, 360, 30, 30, 80, 490),
            "360p_9": fn(640, 360, 15, 15, 80, 800),
            "360p_10": fn(640, 360, 24, 24, 80, 800),
            "360p_11": fn(640, 360, 24, 24, 80, 1e3),
            "480p": fn(640, 480, 15, 15, 100, 500),
            "480p_1": fn(640, 480, 15, 15, 100, 500),
            "480p_2": fn(640, 480, 30, 30, 100, 1e3),
            "480p_3": fn(480, 480, 15, 15, 100, 400),
            "480p_4": fn(640, 480, 30, 30, 100, 750),
            "480p_6": fn(480, 480, 30, 30, 100, 600),
            "480p_8": fn(848, 480, 15, 15, 100, 610),
            "480p_9": fn(848, 480, 30, 30, 100, 930),
            "480p_10": fn(640, 480, 10, 10, 100, 400),
            "720p": fn(1280, 720, 15, 15, 120, 1130),
            "720p_1": fn(1280, 720, 15, 15, 120, 1130),
            "720p_2": fn(1280, 720, 30, 30, 120, 2e3),
            "720p_3": fn(1280, 720, 30, 30, 120, 1710),
            "720p_5": fn(960, 720, 15, 15, 120, 910),
            "720p_6": fn(960, 720, 30, 30, 120, 1380),
            "1080p": fn(1920, 1080, 15, 15, 120, 2080),
            "1080p_1": fn(1920, 1080, 15, 15, 120, 2080),
            "1080p_2": fn(1920, 1080, 30, 30, 120, 3e3),
            "1080p_3": fn(1920, 1080, 30, 30, 120, 3150),
            "1080p_5": fn(1920, 1080, 60, 60, 120, 4780),
            "1440p": fn(2560, 1440, 30, 30, 120, 4850),
            "1440p_1": fn(2560, 1440, 30, 30, 120, 4850),
            "1440p_2": fn(2560, 1440, 60, 60, 120, 7350),
            "4k": fn(3840, 2160, 30, 30, 120, 8910),
            "4k_1": fn(3840, 2160, 30, 30, 120, 8910),
            "4k_3": fn(3840, 2160, 60, 60, 120, 13500)
        }, pn = {
            "480p": fn(640, 480, 1, 5),
            "480p_1": fn(640, 480, 1, 5),
            "480p_2": fn(640, 480, 25, 30),
            "720p": fn(1280, 720, 1, 5),
            "720p_1": fn(1280, 720, 1, 5),
            "720p_2": fn(1280, 720, 25, 30),
            "1080p": fn(1920, 1080, 1, 5),
            "1080p_1": fn(1920, 1080, 1, 5),
            "1080p_2": fn(1920, 1080, 25, 30)
        }, hn = {
            speech_low_quality: dn(16e3, !1, void 0),
            speech_standard: dn(32e3, !1, 18),
            music_standard: dn(48e3, !1, void 0),
            standard_stereo: dn(48e3, !0, 56),
            high_quality: dn(48e3, !1, 128),
            high_quality_stereo: dn(48e3, !0, 192)
        }, vn = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, _n = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        }, mn = function (e, t) {
            var n = "function" == typeof Symbol && e[Symbol.iterator];
            if (!n) return e;
            var r, i, o = n.call(e), a = [];
            try {
                for (; (void 0 === t || t-- > 0) && !(r = o.next()).done;) a.push(r.value)
            } catch (e) {
                i = {error: e}
            } finally {
                try {
                    r && !r.done && (n = o.return) && n.call(o)
                } finally {
                    if (i) throw i.error
                }
            }
            return a
        }, En = null, yn = function () {
            if (En) return En;
            try {
                return En = window.require("electron")
            } catch (e) {
                return null
            }
        };

        function Sn(e, t) {
            var n = this;
            return new Promise((function (r, i) {
                return vn(n, void 0, void 0, (function () {
                    var n, i;
                    return _n(this, (function (o) {
                        switch (o.label) {
                            case 0:
                                return n = {
                                    audio: !1,
                                    video: {
                                        mandatory: {
                                            chromeMediaSource: "desktop",
                                            chromeMediaSourceId: e,
                                            maxHeight: t.height,
                                            maxWidth: t.width
                                        }
                                    }
                                }, t.frameRate && "number" != typeof t.frameRate ? (n.video.mandatory.maxFrameRate = t.frameRate.max, n.video.mandatory.minFrameRate = t.frameRate.min) : "number" == typeof t.frameRate && (n.video.mandatory.maxFrameRate = t.frameRate), i = r, [4, navigator.mediaDevices.getUserMedia(n)];
                            case 1:
                                return i.apply(void 0, [o.sent()]), [2]
                        }
                    }))
                }))
            }))
        }

        function Tn(e) {
            var t = this;
            return new Promise((function (n, r) {
                return vn(t, void 0, void 0, (function () {
                    var t, r, i, o;
                    return _n(this, (function (a) {
                        switch (a.label) {
                            case 0:
                                t = ["window", "screen"], "application" !== e && "window" !== e || (t = ["window"]), "screen" === e && (t = ["screen"]), r = yn(), i = null;
                                try {
                                    i = r.desktopCapturer.getSources({types: t})
                                } catch (e) {
                                    i = null
                                }
                                return i instanceof Promise || (i = new Promise((function (e, n) {
                                    r.desktopCapturer.getSources({types: t}, (function (t, r) {
                                        t ? n(t) : e(r)
                                    }))
                                }))), o = n, [4, i];
                            case 1:
                                return o.apply(void 0, [a.sent()]), [2]
                        }
                    }))
                }))
            }))
        }

        function gn(e, t) {
            var n = this;
            return void 0 === t && (t = !1), new Promise((function (r, i) {
                return vn(n, void 0, void 0, (function () {
                    var n, o, a, s, c, u, d, f, l, p, h;
                    return _n(this, (function (_) {
                        switch (_.label) {
                            case 0:
                                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw n = new k(v.NOT_SUPPORT + "can not find getUserMedia"), i(n), n;
                                return t && (e.video && (delete e.video.width, delete e.video.height), e.screen && (delete e.screen.width, delete e.screen.height)), o = Gt, e.audio || e.video || e.screen || e.audioSource || e.videoSource ? e.audio || e.video ? (l = {
                                    video: e.video,
                                    audio: e.audio
                                }, C.debug("mediaDevices.getUserMedia width " + JSON.stringify(l)), [4, navigator.mediaDevices.getUserMedia(l)]) : [3, 2] : [3, 11];
                            case 1:
                                return a = _.sent(), e.audio && ((s = document.createElement("audio")).autoplay = !0, s.muted = !0, s.setAttribute("muted", "muted"), s.setAttribute("autoplay", "autoplay"), s.srcObject = new MediaStream([a.getAudioTracks()[0]])), r(a), [3, 11];
                            case 2:
                                return e.screen ? (c = Object.assign({}, {
                                    width: e.screen.width,
                                    height: e.screen.height,
                                    frameRate: e.screen.frameRate
                                }), u = e.screen.electronScreenSourceId || "screen", yn() ? (C.debug("getElectronSources width type " + u), [4, Tn(u)]) : [3, 7]) : [3, 10];
                            case 3:
                                return (d = _.sent()) ? [4, (m = d, new Promise((function (e, t) {
                                    var n = document.createElement("div");
                                    n.innerText = "share screen", n.setAttribute("style", "text-align: center; height: 25px; line-height: 25px; border-radius: 4px 4px 0 0; background: #D4D2D4; border-bottom:  solid 1px #B9B8B9;");
                                    var r = document.createElement("div");
                                    r.setAttribute("style", "width: 100%; height: 500px; padding: 15px 25px ; box-sizing: border-box;");
                                    var i = document.createElement("div");
                                    i.innerText = "anyrtc Web Screensharing wants to share the contents of your screen with " + location.host + ". Choose what you'd like to share.", i.setAttribute("style", "height: 12%;");
                                    var o = document.createElement("div");
                                    o.setAttribute("style", "width: 100%; height: 80%; background: #FFF; border:  solid 1px #CBCBCB; display: flex; flex-wrap: wrap; justify-content: space-around; overflow-y: scroll; padding: 0 15px; box-sizing: border-box;");
                                    var a = document.createElement("div");
                                    a.setAttribute("style", "text-align: right; padding: 16px 0;");
                                    var s = document.createElement("button");
                                    s.innerHTML = "cancel", s.setAttribute("style", "width: 85px;"), s.onclick = function () {
                                        document.body.removeChild(c);
                                        var e = new Error("NotAllowedError");
                                        e.name = "NotAllowedError", t(e)
                                    }, a.appendChild(s), r.appendChild(i), r.appendChild(o), r.appendChild(a);
                                    var c = document.createElement("div");
                                    c.setAttribute("style", "position: absolute; z-index: 99999999; top: 50%; left: 50%; width: 620px; height: 525px; background: #ECECEC; border-radius: 4px; -webkit-transform: translate(-50%,-50%); transform: translate(-50%,-50%);"), c.appendChild(n), c.appendChild(r), document.body.appendChild(c), m.map((function (t) {
                                        if (t.id) {
                                            var n = document.createElement("div");
                                            n.setAttribute("style", "width: 30%; height: 160px; padding: 20px 0; text-align: center;box-sizing: content-box;"), n.innerHTML = '<div style="height: 120px; display: table-cell; vertical-align: middle;"><img style="width: 100%; background: #333333; box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);" src=' + t.thumbnail.toDataURL() + ' /></div><span style="\theight: 40px; line-height: 40px; display: inline-block; width: 70%; word-break: keep-all; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' + t.name + "</span>", n.onclick = function () {
                                                document.body.removeChild(c), e(t.id)
                                            }, o.appendChild(n)
                                        }
                                    }))
                                })))] : [3, 6];
                            case 4:
                                return [4, Sn(_.sent(), c)];
                            case 5:
                                f = _.sent(), r(f), _.label = 6;
                            case 6:
                                return [3, 9];
                            case 7:
                                return o.getDisplayMedia ? (e.screen.mediaSource && ~["screen", "window", "application"].indexOf(e.screen.mediaSource) && Object.assign(c, {displaySurface: "screen" === e.screen.mediaSource ? "monitor" : e.screen.mediaSource}), l = {
                                    video: c,
                                    audio: !!e.screenAudio
                                }, C.debug("mediaDevices.getDisplayMedia width " + JSON.stringify(l)), [4, navigator.mediaDevices.getDisplayMedia(l)]) : [3, 9];
                            case 8:
                                p = _.sent(), r(p), _.label = 9;
                            case 9:
                                return [3, 11];
                            case 10:
                                (e.audioSource || e.videoSource) && (h = new MediaStream, e.audioSource && h.addTrack(e.audioSource), e.videoSource && h.addTrack(e.videoSource), r(h)), _.label = 11;
                            case 11:
                                return [2]
                        }
                        var m
                    }))
                }))
            }))
        }

        function Cn(e, t, n) {
            var r, i, o, a, s = 0, c = 0, u = 0, d = 0;
            if (n && (n.bitrateMin && (c = n.bitrateMin), n.bitrateMax && (s = n.bitrateMax), u = c || 0, d = s || 0, c > (s = s) && (c = s), c = c), t) {
                var f = t.frameRate, l = t.height, p = t.width * l, h = [];
                p < 14400 || p >= 14400 && p < 19200 ? h = [50, 100] : p >= 19200 && p < 32400 ? h = [64, 130] : p >= 32400 && p < 43200 ? h = [100, 200] : p >= 43200 && p < 57600 ? h = [120, 240] : p >= 57600 && p < 76800 ? h = [140, 280] : p >= 76800 && p < 101760 ? h = [200, 400] : p >= 101760 && p < 129600 ? h = [220, 440] : p >= 129600 && p < 172800 ? h = [260, 520] : p >= 172800 && p < 230400 ? h = [320, 640] : p >= 230400 && p < 307200 ? h = [400, 800] : p >= 307200 && p < 407040 ? h = [500, 1e3] : p >= 407040 && p < 691200 ? h = [610, 1220] : p >= 691200 && p < 921600 ? h = [910, 1820] : p >= 921600 && p < 2073600 ? h = [1130, 2260] : p >= 2073600 && p < 3686400 ? h = [2080, 4160] : p >= 3686400 && p < 8294400 ? h = [4850, 6500] : p > 8294400 && (h = [6500, 8910]), c = (r = mn(function (e, t, n, r) {
                    var i, o, a;
                    "rtc" === e || "game" === e ? (i = mn(r, 1), a = i[0], (n <= 0 || n > a) && (n = a)) : (o = mn(r, 2), a = o[1], (n <= 0 || n > a) && (n = a));
                    return [30, n]
                }(e, 0, s, h), 2))[0], s = r[1], Math.floor(f) < 10 ? (c = (i = mn([c / 2, s / 2], 2))[0], s = i[1]) : Math.floor(f) > 24 && Math.floor(f) <= 30 ? "live" === e && p <= 2073600 && (c = (o = mn([1.5 * c, 1.5 * s], 2))[0], (s = o[1]) > 6500 && (s = 6500)) : Math.floor(f) > 30 && (c = (a = mn([1.5 * c, 1.5 * s], 2))[0], s = a[1])
            }
            0 !== u && u < s && (c = u), 0 !== d && d < s && (s = d), n.bitrateMin = c, n.bitrateMax = s
        }

        function bn(e) {
            return new Promise((function (t, n) {
                C.debug("start check mediaStreamTrack resolution", e);
                var r = document.createElement("video");
                r.setAttribute("autoplay", ""), r.setAttribute("muted", ""), r.muted = !0, r.autoplay = !0, r.setAttribute("playsinline", ""), r.setAttribute("style", "position: absolute; top: 0; left: 0; width: 1px; height: 1px"), document.body.appendChild(r), r.addEventListener("playing", (function () {
                    var n = "";
                    (r.videoWidth || "Firefox" !== Dt.getBrowserInfo().name) && (n = "".concat(r.videoWidth.toString(), " x ").concat(r.videoHeight.toString()), C.debug("get track resolution: ", n, e), t([r.videoWidth, r.videoHeight]), document.body.removeChild(r))
                })), r.srcObject = new MediaStream([e])
            }))
        }

        function Rn(e) {
            return "string" == typeof e ? Object.assign({}, ln[e]) : "[object Object]" === Object.prototype.toString.call(e) ? e : {}
        }

        function An(e) {
            return "string" == typeof e ? Object.assign({}, hn[e]) : "[object Object]" === Object.prototype.toString.call(e) ? e : {}
        }

        function In(e) {
            var t = {}, n = navigator.mediaDevices.getSupportedConstraints();
            n.facingMode && e.facingMode && (t.facingMode = {exact: e.facingMode}), n.deviceId && e.cameraId && (t.deviceId = e.cameraId);
            var r = Rn(e.encoderConfig);
            if ("{}" === JSON.stringify(e.encoderConfig)) return t;
            n.width && (t.width = {ideal: r.width ? r.width : 640}), n.height && (t.height = {ideal: r.height ? r.height : 360}), n.frameRate && (t.frameRate = r.frameRate ? r.frameRate : 15, Dt.isLegacyChrome() && (t.frameRate = r.frameRate ? r.frameRate : 15), "Edge" === Dt.getBrowserInfo().name && "object" === t.frameRate && (t.frameRate.max = 60), "Firefox" === Dt.getBrowserInfo().name && (t.frameRate = {
                ideal: 30,
                max: 30
            }));
            var i = Dt.getBrowserInfo().os;
            if ("Android" === i || "iOS" === i) if (t.facingMode) {
                var o = t.facingMode;
                t.facingMode = o
            } else t = !0;
            return t
        }

        function On(e) {
            var t = {};
            if (navigator.mediaDevices.getSupportedConstraints().deviceId && e.microphoneId && (t.deviceId = e.microphoneId), Dt.isLegacyChrome() || (void 0 !== e.AGC && (t.autoGainControl = e.AGC, Dt.isChrome && (t.googAutoGainControl = e.AGC, t.googAutoGainControl2 = e.AGC)), void 0 !== e.AEC && (t.echoCancellation = e.AEC), void 0 !== e.ANS && (t.noiseSuppression = e.ANS), Dt.isChrome && void 0 !== e.ANS && (t.googNoiseSuppression = e.ANS)), "{}" !== JSON.stringify(e.encoderConfig)) {
                var n = An(e.encoderConfig);
                t.channelCount = n.stereo ? 2 : 1, t.sampleRate = n.sampleRate, t.sampleSize = n.sampleSize
            }
            return t
        }

        function Nn(e) {
            var t = {};
            e.screenSourceType && "Firefox" === Dt.getBrowserInfo().name && (~["screen", "window", "application"].indexOf(e.screenSourceType) || (t.mediaSource = e.screenSourceType));
            var n,
                r = "string" == typeof (n = e.encoderConfig) ? Object.assign({}, pn[n]) : "[object Object]" === Object.prototype.toString.call(n) ? n : {};
            return r ? (t.width = r.width ? r.width : 1280, t.height = r.height ? r.height : 720, t.frameRate = r.frameRate ? r.frameRate : 5, r.electronScreenSourceId && (t.electronScreenSourceId = r.electronScreenSourceId), Dt.isLegacyChrome() && (t.frameRate = r.frameRate), "Edge" === Dt.getBrowserInfo().name && "object" === t.frameRate && (t.frameRate.max = 60), "Firefox" === Dt.getBrowserInfo().name && (t.frameRate = {
                ideal: 30,
                max: 30
            }), t) : t
        }

        var wn, Dn = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), Pn = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, kn = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        }, Ln = function (e) {
            function t(t, n, r) {
                var i = e.call(this, t, r) || this;
                i._player = void 0, i._videoWidth = 0, i._videoHeight = 0;
                var o = i;
                return i.trackMediaType = "video", i._encoderConfig = n, bn(t).then((function (e) {
                    o._videoHeight = e[0], o._videoWidth = e[1]
                })), i
            }

            return Dn(t, e), Object.defineProperty(t.prototype, "isPlaying", {
                get: function () {
                    return !!this._player
                }, enumerable: !1, configurable: !0
            }), t.prototype.getCurrentFrameData = function () {
                var e;
                return this._player ? null === (e = this._player) || void 0 === e ? void 0 : e.getCurrentFrame() : new ImageData(2, 2)
            }, t.prototype.getEncoderConfig = function () {
                return this._encoderConfig
            }, t.prototype.play = function (e, t) {
                var n = this, r = void 0 !== t && "[object Object]" === Object.prototype.toString.call(t) ? t : {};
                if (!(e instanceof HTMLElement)) {
                    var i = void 0, o = document.getElementById(e);
                    o ? e = o : (i = "[track-".concat(this.getTrackId(), '] can not find "#'), C.warning(i.concat(e, '" element, use document.body')), e = document.body)
                }
                C.debug("[track-".concat(this.getTrackId(), "] play"));
                var a = Object.assign({}, this._getDefaultPlayerConfig(), {}, r, {
                    trackId: this.getTrackId(),
                    element: e
                });
                this._player ? this._player.updateConfig(a) : (this._player = new un(a), this._player.updateVideoTrack(this._mediaStreamTrack), this._player.onFirstVideoFrameDecoded = function () {
                    n.emit("first-video-frame")
                }, this._player.onVideoSizeChange = function (e, t) {
                    n.emit("video-resize", e, t)
                }), this._player.play()
            }, t.prototype.stop = function () {
                this._player && (this._player.destroy(), this._player = void 0)
            }, t.prototype.getStats = function () {
                C.warning("[deprecated] LocalVideoTrack.getStats will be removed in the future, use ArRTCClient.getLocalVideoStats instead");
                return {
                    captureResolutionHeight: 0,
                    captureResolutionWidth: 0,
                    sendBitrate: 0,
                    sendBytes: 0,
                    sendPackets: 0,
                    sendPacketsLost: 0,
                    sendResolutionHeight: 0,
                    sendResolutionWidth: 0,
                    targetSendBitrate: 0,
                    totalDuration: 0,
                    totalFreezeTime: 0
                }
            }, t.prototype._updateOriginMediaStreamTrack = function (e, t) {
                return Pn(this, void 0, void 0, (function () {
                    var n;
                    return kn(this, (function (r) {
                        return (n = this)._originMediaStreamTrack === e ? [2] : (n.peer && n.peer.removeTrack(n._originMediaStreamTrack), t && (n._originMediaStreamTrack.removeEventListener("ended", n._handleTrackEnded), e.addEventListener("ended", n._handleTrackEnded), n._originMediaStreamTrack.stop(), n._originMediaStreamTrack = e), n._mediaStreamTrack = n._originMediaStreamTrack, n.peer && n.peer.addTrack(n._originMediaStreamTrack, n._encoderConfig), n._updatePlayerSource(), [2, n.emit("@need_replace_track", n._mediaStreamTrack)])
                    }))
                }))
            }, t.prototype._updatePlayerSource = function () {
                this._player && this._player.updateVideoTrack(this._mediaStreamTrack)
            }, t.prototype._getDefaultPlayerConfig = function () {
                return {}
            }, t
        }(z), Mn = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), xn = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, Un = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        }, Vn = function (e) {
            function t(t, n, r) {
                var i = e.call(this, t) || this;
                return i._pubTracks = [], i._handleVideoTrackRenegotiate = void 0, i._handleVideoTrackEvent = void 0, i._handleAudioTrackEvent = void 0, i.type = "pub", i._createPC(r), i.statsCollector = n, i.statsCollector.addLocalConnection(i), i
            }

            return Mn(t, e), t.prototype.addTracks = function (e) {
                return xn(this, void 0, void 0, (function () {
                    var t, n = this;
                    return Un(this, (function (r) {
                        if (t = this, !e) throw new k(v.INVALID_PARAMS, "tracks is undefind");
                        return e instanceof Array || (e = [e]), e.map((function (e) {
                            if (e) if ("video" === e.trackMediaType) if (n.videoTrack) C.error("only one videoTrack can be publish"); else {
                                if (!(e instanceof Ln)) throw new k(v.INVALID_OPERATION, "Unable to published a non-LocalVideoTrack");
                                t._handleVideoTrackRenegotiate = t._handleRTCNeedRenegotiate.bind(t), e.on(O.RTC_NEED_RENEGOTIATE, t._handleVideoTrackRenegotiate), t._handleVideoTrackEvent = t._handleVideoTrackMuteUpdate.bind(t), e.on(O.UPDATE_MUTE_STATE, t._handleVideoTrackEvent), t.addTrack(e);
                                e.trackMediaType;
                                var r = e.getMediaStreamTrack();
                                t.videoTrack = e, t._videoMediaStreamTrack = r, e.peer = t.peer, t.peer.videoEncoderConfig = e.getEncoderConfig(), t.peer.addTrack(r, e._encoderConfig), t._pubTracks.push(e)
                            } else if ("audio" === e.trackMediaType) {
                                if (!t.audioTrack) {
                                    var i = It.getAudioContextInstance().createMediaStreamDestination(),
                                        o = new sn(i, {}, y(8));
                                    t._handleAudioTrackEvent = t._handleAudioTrackMuteUpdate.bind(t), o.on(O.UPDATE_MUTE_STATE, t._handleAudioTrackEvent), t.addTrack(o), t.peer.audioTrack || t.peer.addTrack(o.getMediaStreamTrack(), o._encoderConfig)
                                }
                                t.audioTrack.hasAudioTrack(e) || (t._pubTracks.push(e), t.audioTrack.addAudioTrack(e))
                            }
                        })), [2, t._pubTracks]
                    }))
                }))
            }, t.prototype.removeTracks = function (e) {
                return xn(this, void 0, void 0, (function () {
                    var t, n, r, i;
                    return Un(this, (function (o) {
                        if (t = this, e) {
                            for (e instanceof Array || (e = [e]), n = t._pubTracks.length - 1; n > -1; n--) if (r = t._pubTracks[n], ~e.indexOf(r)) {
                                if ("video" === r.trackMediaType) {
                                    if (this.videoTrack !== r) throw new k(v.INVALID_OPERATION, "You haven't published this track ", r);
                                    this.videoTrack.off(O.UPDATE_MUTE_STATE, t._handleVideoTrackEvent), this.videoTrack.off(O.RTC_NEED_RENEGOTIATE, t._handleVideoTrackRenegotiate), this.removeTrack(this.videoTrack), this.peer.removeTrack(this._videoMediaStreamTrack)
                                } else "audio" === r.trackMediaType && this.audioTrack && ((i = this.audioTrack).removeAudioTrack(r), 0 === i.trackList.length && (this.audioTrack.off(O.UPDATE_MUTE_STATE, t._handleAudioTrackEvent), this.removeTrack(i), this.peer.removeTrack(this._audioMediaStreamTrack)));
                                t._pubTracks.splice(n, 1)
                            }
                        } else this.audioTrack && (this.audioTrack.off(O.UPDATE_MUTE_STATE, t._handleAudioTrackEvent), this.audioTrack.removeAllAudioTracks(), this.peer.removeTrack(this._audioMediaStreamTrack)), this.videoTrack && (this.videoTrack.off(O.UPDATE_MUTE_STATE, t._handleVideoTrackEvent), this.videoTrack.off(O.RTC_NEED_RENEGOTIATE, t._handleVideoTrackRenegotiate), this.peer.removeTrack(this._videoMediaStreamTrack)), this._pubTracks = [], this.removeTrack();
                        return [2, t._pubTracks]
                    }))
                }))
            }, t.prototype.destory = function (e) {
                void 0 === e && (e = !0), this.removeTracks(), this.removeAllTracks(e), this._closePC(), this.removeAllListeners(), this.statsCollector && this.statsCollector.removeConnection(this.ID), this.type = "", this.ID = ""
            }, t.prototype._handleRTCNeedRenegotiate = function () {
                var e;
                if ("bitrateMax" in this.videoTrack._encoderConfig) {
                    var t = null === (e = this.videoTrack._encoderConfig) || void 0 === e ? void 0 : e.bitrateMax;
                    t && this.peer.updateBandWidth(t)
                }
            }, t.prototype._handleVideoTrackMuteUpdate = function (e) {
                this.emit(O.UPDATE_MUTE_STATE, this.ID, this.type, this.videoTrack.trackMediaType, e)
            }, t.prototype._handleAudioTrackMuteUpdate = function (e) {
                this.emit(O.UPDATE_MUTE_STATE, this.ID, this.type, this.audioTrack.trackMediaType, e)
            }, t
        }(Tt), Fn = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), jn = function (e) {
            function t(t, n, r) {
                var i = e.call(this, t) || this;
                return i.type = "pubEx", i._createPC(r), i.statsCollector = n, i.statsCollector.addLocalConnection(i), i
            }

            return Fn(t, e), t.prototype.addTracks = function (e) {
                var t = this;
                "video" !== e.trackMediaType || this.videoTrack || (this.videoTrack = e, e.getStats = function () {
                    return t.statsCollector.getLocalVideoTrackStats(t.ID)
                }, this._videoMediaStreamTrack = e.getMediaStreamTrack(), this.peer.addTrack(this._videoMediaStreamTrack, e._encoderConfig))
            }, t.prototype.removeTracks = function (e) {
                "video" === e.trackMediaType && e === this.videoTrack && (this.videoTrack = void 0, this.peer.removeTrack(this._videoMediaStreamTrack))
            }, t.prototype.destory = function (e) {
                void 0 === e && (e = !0), this.removeTracks(this.videoTrack), this.removeAllTracks(e), this.clearOriginTracks(), this._closePC(), this.removeAllListeners(), this.statsCollector && this.statsCollector.removeConnection(this.ID), this.type = "", this.ID = ""
            }, t
        }(Tt), Bn = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), Wn = function (e) {
            function t(t, n) {
                var r = e.call(this, t, n) || this;
                return r._player = void 0, r.trackMediaType = "video", r
            }

            return Bn(t, e), Object.defineProperty(t.prototype, "isPlaying", {
                get: function () {
                    return !!this._player
                }, enumerable: !1, configurable: !0
            }), t.prototype.getCurrentFrameData = function () {
                var e;
                return this._player ? null === (e = this._player) || void 0 === e ? void 0 : e.getCurrentFrame() : new ImageData(2, 2)
            }, t.prototype.play = function (e, t) {
                var n = void 0 !== t && "[object Object]" === Object.prototype.toString.call(t) ? t : {};
                if ("string" == typeof e) {
                    var r = void 0, i = document.getElementById(e);
                    i ? e = i : (r = "[track-".concat(this.getTrackId(), '] can not find "#'), C.warning(r.concat(e, '" element, use document.body')), e = document.body)
                }
                C.debug("[track-".concat(this.getTrackId(), "] play"));
                var o = Object.assign({}, {}, n, {trackId: this.getTrackId(), element: e});
                this._player ? this._player.updateConfig(o) : (this._player = new un(o), this._player.updateVideoTrack(this._mediaStreamTrack)), this._player.play()
            }, t.prototype.stop = function () {
                this._player && (this._player.destroy(), this._player = void 0)
            }, t.prototype.getStats = function () {
                C.warning("[deprecated] RemoteVideoTrack.getStats will be removed in the future, use ArRTCClient.getRemoteVideoStats instead")
            }, t
        }(Q), Gn = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), Hn = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, Kn = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        }, Yn = function (e) {
            function t(t, n) {
                var r = e.call(this, t, n) || this;
                return r._useAudioElement = !1, r.trackMediaType = "audio", r._source = new Qt(t, !0), Gt.webAudioWithAEC || (r._useAudioElement = !0), r
            }

            return Gn(t, e), Object.defineProperty(t.prototype, "isPlaying", {
                get: function () {
                    return this._useAudioElement ? Zt.isPlaying(this.getTrackId()) : this._source.isPlayed
                }, enumerable: !1, configurable: !0
            }), t.prototype.play = function () {
                this._useAudioElement ? Zt.play(this._mediaStreamTrack, this.getTrackId()) : this._source.play()
            }, t.prototype.stop = function () {
                this._useAudioElement ? Zt.stop(this.getTrackId()) : this._source.stop()
            }, t.prototype.setPlaybackDevice = function (e) {
                return Hn(this, void 0, void 0, (function () {
                    return Kn(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                if (!this._useAudioElement) throw new k(Wt.NOT_SUPPORT, "your browser does not support setting the audio output device");
                                t.label = 1;
                            case 1:
                                return t.trys.push([1, 3, , 4]), [4, Zt.setSinkID(this.getTrackId(), e)];
                            case 2:
                                return t.sent(), [3, 4];
                            case 3:
                                throw t.sent();
                            case 4:
                                return [2]
                        }
                    }))
                }))
            }, t.prototype.setVolume = function (e) {
                if ("number" != typeof e) throw new k(Wt.INVALID_PARAMS, "value must be number.");
                if (e < 0 || e > 1e3) throw new k(Wt.INVALID_PARAMS, "The value ranges from 0 (mute) to 1000 (maximum).");
                this._useAudioElement ? Zt.setVolume(this.getTrackId(), e) : this._source.setVolume(e)
            }, t.prototype.getVolumeLevel = function () {
                return this._source.getAudioLevel()
            }, t.prototype.getStats = function () {
                C.warning("[deprecated] RemoteAudioTrack.getStats will be removed in the future, use ArRTCClient.getRemoteAudioStats instead")
            }, t.prototype._destroy = function () {
                this._source.destroy()
            }, t
        }(Q), Jn = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), zn = function (e) {
            function t(t, n, r) {
                var i = e.call(this, t) || this;
                return i.type = "sub", i._createPC(r), i.statsCollector = n, i.statsCollector.addRemoteConnection(i), i
            }

            return Jn(t, e), t.prototype.addTracks = function (e) {
                if ("video" === e) {
                    var t = this._videoMediaStreamTrack, n = new Wn(t, y(5));
                    return this.addTrack(n), this.videoTrack
                }
                var r = this._audioMediaStreamTrack, i = new Yn(r, y(5));
                return this.addTrack(i), this.audioTrack
            }, t.prototype.removeTracks = function (e) {
                "video" === e ? this.removeTrack(this.videoTrack) : this.removeTrack(this.audioTrack)
            }, t.prototype.destory = function (e) {
                void 0 === e && (e = !0), this.removeAllTracks(e), this.clearOriginTracks(), this._closePC(), this.removeAllListeners(), this.statsCollector && this.statsCollector.removeConnection(this.ID), this.type = "", this.ID = ""
            }, t
        }(Tt), Xn = {
            transportDelay: 0,
            end2EndDelay: 0,
            receiveBitrate: 0,
            receiveLevel: 0,
            receiveBytes: 0,
            receiveDelay: 0,
            receivePackets: 0,
            receivePacketsLost: 0,
            totalDuration: 0,
            totalFreezeTime: 0,
            freezeRate: 0,
            packetLossRate: 0
        }, Qn = {
            transportDelay: 0,
            end2EndDelay: 0,
            receiveBitrate: 0,
            receiveBytes: 0,
            receiveDelay: 0,
            receivePackets: 0,
            receivePacketsLost: 0,
            receiveResolutionHeight: 0,
            receiveResolutionWidth: 0,
            totalDuration: 0,
            totalFreezeTime: 0,
            freezeRate: 0,
            packetLossRate: 0
        }, qn = {sendVolumeLevel: 0, sendBitrate: 0, sendBytes: 0, sendPackets: 0, sendPacketsLost: 0, rttMs: 0}, $n = {
            sendBytes: 0,
            sendBitrate: 0,
            sendPackets: 0,
            sendPacketsLost: 0,
            sendResolutionHeight: 0,
            sendResolutionWidth: 0,
            captureResolutionHeight: 0,
            captureResolutionWidth: 0,
            targetSendBitrate: 0,
            totalDuration: 0,
            totalFreezeTime: 0,
            rttMs: 0
        }, Zn = function () {
            function e(e) {
                this.clientId = "", this.localConnectionsMap = new Map, this.remoteConnectionsMap = new Map, this.clientId = e, this.updateStatsInterval = window.setInterval(this.updateStats.bind(this), 1e3)
            }

            return e.prototype.updateStats = function () {
                this.remoteConnectionsMap.forEach((function (e) {
                    var t = e.audioStats ? e.audioStats : Xn, n = e.videoStats ? e.videoStats : Qn;
                    e.latestAudioStats = t, e.latestVideoStats = n;
                    var r = e.pcStats, i = Object.assign({}, Xn), o = Object.assign({}, Qn),
                        a = e.connection.peer.getStats();
                    if (a) {
                        var s = a.audioRecv[0], c = a.videoRecv[0];
                        r && r.videoRecv[0];
                        i.rtt = a.rtt || 0, o.rtt = a.rtt || 0, s && ("opus" !== s.codec && "aac" !== s.codec || (i.codecType = s.codec), s.outputLevel ? i.receiveLevel = Math.round(32767 * s.outputLevel) : e.connection.audioTrack && (i.receiveLevel = Math.round(32767 * e.connection.audioTrack.getVolumeLevel())), i.receiveBytes = s.bytes, i.receivePackets = s.packets, i.receivePacketsLost = s.packetsLost, i.packetLossRate = i.receivePacketsLost - t.receivePacketsLost == 0 ? 0 : (i.receivePacketsLost - t.receivePacketsLost) / (i.receivePackets - t.receivePackets), i.receiveBitrate = t ? 8 * Math.max(0, i.receiveBytes - t.receiveBytes) : 0, i.totalDuration = t ? t.totalDuration + 1 : 1, i.totalFreezeTime = t ? t.totalFreezeTime : 0, i.freezeRate = i.totalFreezeTime / i.totalDuration, i.receiveDelay = s.jitterBufferMs), c && ("H264" !== c.codec && "VP8" !== c.codec || (o.codecType = c.codec), o.receiveBytes = c.bytes, o.receiveBitrate = n ? 8 * Math.max(0, o.receiveBytes - n.receiveBytes) : 0, o.decodeFrameRate = c.decodeFrameRate, o.renderFrameRate = c.decodeFrameRate, c.outputFrame && (o.renderFrameRate = c.outputFrame.frameRate), c.receivedFrame ? (o.receiveFrameRate = c.receivedFrame.frameRate, o.receiveResolutionHeight = c.receivedFrame.height, o.receiveResolutionWidth = c.receivedFrame.width) : e.connection.videoTrack && (o.receiveResolutionHeight = e.connection.videoTrack._videoHeight || 0, o.receiveResolutionHeight = e.connection.videoTrack._videoWidth || 0), void 0 !== c.framesRateFirefox && (o.receiveFrameRate = Math.round(c.framesRateFirefox)), o.receivePackets = c.packets, o.receivePacketsLost = c.packetsLost, o.packetLossRate = o.receivePacketsLost - n.receivePacketsLost == 0 ? 0 : (o.receivePacketsLost - n.receivePacketsLost) / (o.receivePackets - n.receivePackets), o.totalDuration = n ? n.totalDuration + 1 : 1, o.totalFreezeTime = n ? n.totalFreezeTime : 0, o.receiveDelay = c.jitterBufferMs || 0, o.freezeRate = o.totalFreezeTime / o.totalDuration), e.audioStats = i, e.videoStats = o, e.pcStats = a
                    }
                })), this.localConnectionsMap.forEach((function (e) {
                    var t = e.audioStats ? e.audioStats : qn, n = e.videoStats ? e.videoStats : $n;
                    e.latestAudioStats = t, e.latestVideoStats = n;
                    var r = Object.assign({}, qn), i = Object.assign({}, $n), o = e.connection.peer.getStats();
                    if (o) {
                        var a = o.audioSend[0], s = o.videoSend[0];
                        r.rtt = (null == a ? void 0 : a.rttMs) ? a.rttMs : 0, i.rtt = (null == s ? void 0 : s.rttMs) ? s.rttMs : 0, a && ("opus" !== a.codec && "aac" !== a.codec || (r.codecType = a.codec), a.inputLevel ? r.sendVolumeLevel = Math.round(32767 * a.inputLevel) : e.connection.audioTrack && (r.sendVolumeLevel = Math.round(32767 * e.connection.audioTrack.getVolumeLevel())), r.sendBytes = a.bytes, r.sendPackets = a.packets, r.sendPacketsLost = a.packetsLost, r.packetLossRate = r.sendPacketsLost - t.sendPacketsLost == 0 ? 0 : (r.sendPacketsLost - t.sendPacketsLost) / (r.sendPackets - t.sendPackets), r.sendBitrate = t ? 8 * Math.max(0, r.sendBytes - t.sendBytes) : 0), s && ("H264" !== s.codec && "VP8" !== s.codec || (i.codecType = s.codec), i.sendBytes = s.bytes, i.sendBitrate = n ? 8 * Math.max(0, i.sendBytes - n.sendBytes) : 0, s.inputFrame ? (i.captureFrameRate = s.inputFrame.frameRate, i.captureResolutionHeight = s.inputFrame.height, i.captureResolutionWidth = s.inputFrame.width) : e.connection.videoTrack && (i.captureResolutionWidth = e.connection.videoTrack._videoWidth || 0, i.captureResolutionHeight = e.connection.videoTrack._videoHeight || 0), s.sentFrame ? (i.sendFrameRate = s.sentFrame.frameRate, i.sendResolutionHeight = s.sentFrame.height, i.sendResolutionWidth = s.sentFrame.width) : e.connection.videoTrack && (i.sendResolutionWidth = e.connection.videoTrack._videoWidth || 0, i.sendResolutionHeight = e.connection.videoTrack._videoHeight || 0), s.avgEncodeMs && (i.encodeDelay = s.avgEncodeMs), e.connection.videoTrack && e.connection.videoTrack._encoderConfig && e.connection.videoTrack._encoderConfig.bitrateMax && (i.targetSendBitrate = 1e3 * e.connection.videoTrack._encoderConfig.bitrateMax), i.sendPackets = s.packets, i.sendPacketsLost = s.packetsLost, i.packetLossRate = i.sendPacketsLost - n.sendPacketsLost == 0 ? 0 : (i.sendPacketsLost - n.sendPacketsLost) / (i.sendPackets - n.sendPackets), i.totalDuration = n ? n.totalDuration + 1 : 1, i.totalFreezeTime = n ? n.totalFreezeTime : 0), e.audioStats = r, e.videoStats = i
                    }
                }))
            }, e.prototype.getLocalAudioTrackStats = function (e) {
                var t = this.localConnectionsMap.get(e);
                return t && t.audioStats ? t.audioStats : Object.assign({}, qn)
            }, e.prototype.getLocalVideoTrackStats = function (e) {
                var t = this.localConnectionsMap.get(e);
                return t && t.videoStats ? t.videoStats : Object.assign({}, $n)
            }, e.prototype.getRemoteAudioTrackStats = function (e) {
                var t = this.remoteConnectionsMap.get(e);
                return t && t.audioStats ? t.audioStats : Object.assign({}, Xn)
            }, e.prototype.getRemoteVideoTrackStats = function (e) {
                var t = this.remoteConnectionsMap.get(e);
                return t && t.videoStats ? t.videoStats : Object.assign({}, Qn)
            }, e.prototype.getRTCStats = function () {
                var e = 0, t = 0, n = 0, r = 0;
                this.localConnectionsMap.forEach((function (n) {
                    n.audioStats && (e += n.audioStats.sendBytes, t += n.audioStats.sendBitrate), n.videoStats && (e += n.videoStats.sendBytes, t += n.videoStats.sendBitrate)
                })), this.remoteConnectionsMap.forEach((function (e) {
                    e.audioStats && (r += e.audioStats.receiveBytes, n += e.audioStats.receiveBitrate), e.videoStats && (r += e.videoStats.receiveBytes, n += e.videoStats.receiveBitrate)
                }));
                return {
                    Duration: 0,
                    UserCount: 1,
                    SendBitrate: t,
                    SendBytes: e,
                    RecvBytes: r,
                    RecvBitrate: n,
                    OutgoingAvailableBandwidth: 0,
                    RTT: 0
                }
            }, e.prototype.removeConnection = function (e) {
                this.localConnectionsMap.delete(e), this.remoteConnectionsMap.delete(e)
            }, e.prototype.addLocalConnection = function (e) {
                var t = e.ID;
                this.localConnectionsMap.has(t) || this.localConnectionsMap.set(t, {connection: e})
            }, e.prototype.addRemoteConnection = function (e) {
                var t = e.ID;
                this.remoteConnectionsMap.has(t) || this.remoteConnectionsMap.set(t, {connection: e})
            }, e.prototype.updateTrafficStats = function (e) {
            }, e.prototype.updateUplinkStats = function (e) {
            }, e.prototype.isLocalVideoFreeze = function (e, t) {
                var n = !!t && e.framesDecodeFreezeTime > t.framesDecodeFreezeTime,
                    r = !t || e.framesDecodeCount > t.framesDecodeCount;
                return n || !r
            }, e.prototype.isRemoteAudioFreeze = function (e) {
            }, e.prototype.clear = function () {
                clearInterval(this.updateStatsInterval), this.clientId = "", this.localConnectionsMap = new Map, this.remoteConnectionsMap = new Map
            }, e
        }(), er = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), tr = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, nr = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        }, rr = function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator, n = t && e[t], r = 0;
            if (n) return n.call(e);
            if (e && "number" == typeof e.length) return {
                next: function () {
                    return e && r >= e.length && (e = void 0), {value: e && e[r++], done: !e}
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }, ir = function (e) {
            function t(t) {
                var n = e.call(this) || this;
                if (n.channelName = void 0, n.connectionState = "DISCONNECTED", n.remoteUsers = [], n.uid = "", n.localTracks = [], n._isStringUID = !0, n._turnServer = void 0, n._isDualStreamEnabled = !1, n._clientId = "", n._sessionId = "", n._config = {
                    forceWaitGatewayResponse: !0,
                    mode: "rtc",
                    codec: "h264",
                    role: "host"
                }, n._joinInfo = {}, n._appId = "", n._highStream = void 0, n._lowStream = void 0, n._latestRepInfo = {}, n._AVStatsControlls = void 0, n._reportStatsInterval = 0, n._statsCollector = void 0, n._latestEventLts = {}, n._AudioVolumeIndicator = !1, n._subPeerAVStats = {}, n._puberDownloadQuality = 0, n._puberUploadQuality = 0, n._getRemoteNetworkQuality = function () {
                    var e = n, t = {}, r = e.getRemoteAudioStats(), i = e.getRemoteVideoStats();
                    return Object.keys(r).map((function (e) {
                        var n = r[e], o = i[e], a = (n.packetLossRate + o.packetLossRate) / 2, s = (n.rtt + o.rtt) / 2,
                            c = 0;
                        c = a <= 3 ? s <= 30 ? 1 : s > 500 ? 5 : s > 400 ? 4 : s > 100 ? 3 : 2 : a <= 10 ? s <= 30 ? 1 : s <= 50 ? 3 : 4 : a <= 25 ? s <= 30 ? 3 : s <= 50 ? 4 : 5 : a <= 60 ? s <= 35 ? 4 : s <= 100 ? 5 : 6 : s <= 50 ? 5 : 6, t[e] = c
                    })), t
                }, t) {
                    t.codec;
                    var r = t.mode, i = t.role;
                    "live" !== r || i || (t.role = "audience"), n._config = Object.assign(n._config, t), "rtc" === r && (n._config.role = "host"), n._config.codec = "h264"
                }
                return n._clientId = "client-" + y(5), C.info("[" + n._clientId + "] Initializing RTC client, mode: " + n._config.mode + ", codec: " + n._config.codec + ", role: " + n._config.role), n._setAVStatsRepTimer(), n
            }

            return er(t, e), t.prototype.join = function (e, t, n, r) {
                var i = this;
                C.info("[" + this._clientId + "] start join channel " + t);
                var o = this;
                o._latestEventLts.joinStartTime = Date.now();
                return new Promise((function (a, s) {
                    return tr(i, void 0, void 0, (function () {
                        var i, c, u, d;
                        return nr(this, (function (l) {
                            switch (l.label) {
                                case 0:
                                    if ("DISCONNECTED" !== o.connectionState) throw new k(v.INVALID_OPERATION, "join failure Cause of current server state is " + o.connectionState);
                                    if ("string" != typeof e) throw new TypeError("appid must be string.");
                                    if ("" === e) throw new TypeError("appid can not be empty.");
                                    if (o._appId = e, o._joinInfo.appId = e, i = /^[a-zA-Z0-9 \!\#\$\%\&\(\)\+\-\:\;\<\=\.\>\?\@\[\]\^\_\{\}\|\~\,]{1,64}$/, "string" != typeof t) throw new TypeError("channel must be string.");
                                    if (!i.test(t)) throw new k(v.INVALID_PARAMS, "The channel length must be within 64 bytes. The supported characters: a-z,A-Z,0-9,space,!, #, $, %, &, (, ), +, -, :, ;, <, =, ., >, ?, @, [, ], ^, _,  {, }, |, ~, ,");
                                    if (o.channelName = t, o._joinInfo.cname = o.channelName, c = /^[a-zA-Z0-9]{1,48}$/, "" !== r && null != r && !c.test(r)) throw new k(v.INVALID_PARAMS, "The uid length must be within 48 bytes. The supported characters: a-z,A-Z,0-9");
                                    if (o._joinInfo.uid = r, o._createMediaServerIntance(), o._joinInfo.sid = y(32), "" === n || void 0 === n) throw new k(v.INVALID_PARAMS, "Invalid token: If you don not use token, set it to null");
                                    o._joinInfo.token = n || "", l.label = 1;
                                case 1:
                                    return l.trys.push([1, 3, , 4]), [4, o._authGateWay()];
                                case 2:
                                    return (u = l.sent()) && (C.info("[" + this._clientId + "] join channel " + this.channelName + " success"), a(u)), [3, 4];
                                case 3:
                                    switch (d = l.sent(), o._joinInfo.uid = "", o._joinInfo.cname = "", o._joinInfo.token = "", d) {
                                        case"CHANNEL_BANNED":
                                        case"IP_BANNED":
                                        case"SERVER_ERROR":
                                        case"UID_BANNED":
                                        case"DEVELOPER_INVALID":
                                        case"APP_INVALID":
                                        case"TOKEN_INVALID":
                                            o.emit("connection-state-change", "DISCONNECTING", "CONNECTING", f[d]);
                                            break;
                                        case"TOKEN_EXPIRED":
                                            o.emit("token-privilege-did-expire"), C.debug("token privilege has expire")
                                    }
                                    return s(d), [3, 4];
                                case 4:
                                    return [2]
                            }
                        }))
                    }))
                }))
            }, t.prototype.leave = function () {
                var e = this, t = this;
                return C.info("[" + this._clientId + "] leaving channel"), new Promise((function (n, r) {
                    return tr(e, void 0, void 0, (function () {
                        var e, i, o, a;
                        return nr(this, (function (s) {
                            return Object.keys(t._joinInfo).length > 0 ? ("CONNECTED" === t.connectionState && (null === (i = t._gateway) || void 0 === i || i.doOffline(t._joinInfo.sid), null === (o = t._gateway) || void 0 === o || o.disconnectCTS(), t.connectionState = "DISCONNECTED", null === (a = t._gateway) || void 0 === a || a.removeAllListeners(), t._gateway = void 0), t.remoteUsersQualityInterval && clearInterval(t.remoteUsersQualityInterval), this.localNetworkQualityInterval && clearInterval(this.localNetworkQualityInterval), t.remoteUsers.map((function (e, n) {
                                e._mediaStream && e._mediaStream.destory();
                                var r = t._subPeerAVStats[e.uid];
                                r && (r.subscribeAudio && t.emit("user-unpublished", e, "audio"), r.subscribeVideo && t.emit("user-unpublished", e, "video")), t._unsubscribe(e)
                            })), t._subPeerAVStats = {}, t._sessionId = "", t.remoteUsers = [], t._msSub = [], t.uid = "", t.localTracks = [], t._joinInfo = {}, t._statsCollector && t._statsCollector.clear(), t._highStream && (t._highStream.destory(), t._highStream = null), t._lowStream && (t._lowStream.destory(), t._lowStream = null), e = Date.now(), ut.leave(t._joinInfo.sid, {
                                startTime: e,
                                extend: null
                            }), C.info("[" + this._clientId + "] leaving channel success"), n(), [2]) : (r(), [2])
                        }))
                    }))
                }))
            }, t.prototype.publish = function (e) {
                var t = this, n = this;
                return new Promise((function (r, i) {
                    return tr(t, void 0, void 0, (function () {
                        var t, o, a, s, c, u, d, f, l, p, h, _, E, y, S, T, g, b, R, A, I, N, w, D, P, L, M, x, U, V, F,
                            j, B, W, G;
                        return nr(this, (function (H) {
                            switch (H.label) {
                                case 0:
                                    if (n._latestEventLts.publishStartLts = Date.now(), "CONNECTED" !== n.connectionState) throw new k(v.INVALID_OPERATION, "Can't publish stream when connection state is not connected");
                                    if (t = [], e instanceof Array) t = e; else {
                                        if (!(e instanceof z)) throw new k(v.INVALID_PARAMS, "track must be LocalTrack");
                                        t = [e]
                                    }
                                    if (0 === (t = t.filter((function (e) {
                                        return e instanceof z
                                    }))).length) throw new k(v.INVALID_PARAMS, "track list is empty");
                                    if ("live" === n._config.mode && "audience" === n._config.role) throw new k(v.INVALID_OPERATION, "audience can not publish stream");
                                    return o = [], t.map((function (e) {
                                        return o.push(e.getTrackId())
                                    })), C.info("[" + this._clientId + "] publishing tracks id: " + o.join("")), a = n._highStream || {}, s = a.videoTrack, c = a.audioTrack, [4, n._publishHighStream(t)];
                                case 1:
                                    return u = H.sent(), d = n._highStream, f = d.videoTrack, l = d.audioTrack, p = !!f, h = !!l, 0 !== n.localTracks.length ? [3, 3] : (f && (_ = f.getMediaStreamTrack(), E = f.getEncoderConfig(), (y = function (e) {
                                        return e instanceof MediaStreamTrack ? e.getSettings() : null
                                    }(_)) && Cn(n._config.mode, y, E)), [4, null === (P = n._gateway) || void 0 === P ? void 0 : P.doPublish({
                                        LocalAudioEnable: h,
                                        LocalVideoEnable: p,
                                        LocalAudioMute: !!h && !l._enabled,
                                        LocalVideoMute: !!p && !f._enabled,
                                        DualStream: n._isDualStreamEnabled
                                    }, n._turnServer)]);
                                case 2:
                                    return S = H.sent(), 0 === (N = S.Code) ? (T = {
                                        startTime: n._latestEventLts.publishStartLts,
                                        success: !0,
                                        cameraDeviceId: n._highStream.videoTrack ? n._highStream.videoTrack.getMediaStreamTrack().label : "",
                                        microphoneDeviceId: n._highStream.audioTrack ? n._highStream.audioTrack.getMediaStreamTrack().label : ""
                                    }, 0 === N ? (S.StreamId, w = S.Offer, D = n._highStream.peer, T.success = !0, D.createAnswer(w), n._isDualStreamEnabled && (n._publishLowStream(), null === (L = n._gateway) || void 0 === L || L.doPublishS(n._turnServer), null === (M = n._gateway) || void 0 === M || M.enableDualStream(!0)), n.localTracks = u, this.localNetworkQualityInterval = window.setInterval((function () {
                                        var e, t = {
                                            downlinkNetworkQuality: n._puberDownloadQuality,
                                            uplinkNetworkQuality: n._puberUploadQuality
                                        };
                                        n.emit(O.NETWORK_QUALITY, n.uid, t), m.ENABLE_USER_QUALITY_UPLOAD && (null === (e = n._gateway) || void 0 === e || e.uploadUserQuality(t.uplinkNetworkQuality, t.downlinkNetworkQuality))
                                    }), 2e3)) : T.success = !1, ut.publish(n._joinInfo.sid, T), g = [], this.localTracks.map((function (e) {
                                        return g.push(e.getTrackId())
                                    })), C.info("[" + this._clientId + "] publish tracks success id: " + g.join("")), r()) : C.error("publish failure, need republish"), [3, 6];
                                case 3:
                                    return n._highStream && (null === (x = n._highStream.peer) || void 0 === x ? void 0 : x.pc) && (b = null === (V = null === (U = n._highStream.peer) || void 0 === U ? void 0 : U.pc) || void 0 === V ? void 0 : V.getTransceivers()) ? (R = b.filter((function (e) {
                                        return "video" === e.mid
                                    })), A = b.filter((function (e) {
                                        return "audio" === e.mid
                                    })), R.length > 0 && "inactive" === (null === (F = R[0]) || void 0 === F ? void 0 : F.currentDirection) || A.length > 0 && "inactive" === (null === (j = A[0]) || void 0 === j ? void 0 : j.currentDirection) ? [4, null === (B = n._gateway) || void 0 === B ? void 0 : B.doRePublish({
                                        LocalAudioEnable: h,
                                        LocalVideoEnable: p,
                                        LocalAudioMute: !!h && !l._enabled,
                                        LocalVideoMute: !!p && !f._enabled,
                                        DualStream: n._isDualStreamEnabled
                                    })] : [3, 5]) : [3, 6];
                                case 4:
                                    return (I = H.sent()) && (N = I.Code, I.StreamId, w = I.Offer, 0 === N ? ((D = n._highStream.peer).createAnswer(w, !0), r()) : i()), [3, 6];
                                case 5:
                                    h !== !!c && (null === (W = n._gateway) || void 0 === W || W.enableLocalAudio(h)), p !== !!s && (null === (G = n._gateway) || void 0 === G || G.enableLocalVideo(p)), H.label = 6;
                                case 6:
                                    return [2]
                            }
                        }))
                    }))
                }))
            }, t.prototype.unpublish = function (e) {
                var t;
                return tr(this, void 0, void 0, (function () {
                    var n, r, i, o = this;
                    return nr(this, (function (a) {
                        switch (a.label) {
                            case 0:
                                if (!(n = this)._highStream) throw new k(v.INVALID_OPERATION, "You haven't published track yet");
                                return r = [], e && e instanceof z ? r = [e] : e instanceof Array && (r = e), r = r.filter((function (e) {
                                    return e instanceof z
                                })), void 0 !== e && JSON.stringify(r) !== JSON.stringify(n.localTracks) ? [3, 2] : (r = n.localTracks, i = n, [4, n._highStream.removeTracks(r)]);
                            case 1:
                                return i.localTracks = a.sent(), null === (t = n._gateway) || void 0 === t || t.doUnPublish(), n._isDualStreamEnabled && (n.disableDualStream(), n._lowStream && n._lowStream.destory()), n._highStream.destory(), n._highStream.clearOriginTracks(), n._highStream = void 0, this.localNetworkQualityInterval && clearInterval(this.localNetworkQualityInterval), [3, 3];
                            case 2:
                                r.map((function (e) {
                                    return tr(o, void 0, void 0, (function () {
                                        var t, r, i, o;
                                        return nr(this, (function (a) {
                                            switch (a.label) {
                                                case 0:
                                                    return ~n.localTracks.indexOf(e) ? e instanceof rn ? (t = n, [4, n._highStream.removeTracks(e)]) : [3, 2] : [3, 4];
                                                case 1:
                                                    t.localTracks = a.sent(), 0 === n.localTracks.filter((function (e) {
                                                        return e instanceof rn
                                                    })).length && (null === (i = n._gateway) || void 0 === i || i.enableLocalAudio(!1)), a.label = 2;
                                                case 2:
                                                    return e instanceof Ln ? (r = n, [4, n._highStream.removeTracks(e)]) : [3, 4];
                                                case 3:
                                                    r.localTracks = a.sent(), 0 === n.localTracks.filter((function (e) {
                                                        return e instanceof Ln
                                                    })).length && (null === (o = n._gateway) || void 0 === o || o.enableLocalVideo(!1)), n._isDualStreamEnabled && (n.disableDualStream(), n._lowStream && n._lowStream.destory()), a.label = 4;
                                                case 4:
                                                    return [2]
                                            }
                                        }))
                                    }))
                                })), a.label = 3;
                            case 3:
                                return [2]
                        }
                    }))
                }))
            }, t.prototype.subscribe = function (e, t) {
                var n = this, r = this;
                return C.info("[" + this._clientId + "] subscribe user " + e.uid + ", media type " + t), new Promise((function (i, o) {
                    return tr(n, void 0, void 0, (function () {
                        var n, o, a, s, c, u, d, f, l;
                        return nr(this, (function (p) {
                            if (!r._gateway) throw new k(v.INVALID_OPERATION, "call this api before join");
                            if (!(n = r.remoteUsers.find((function (t) {
                                return t.uid === e.uid
                            })))) throw new k("user " + e.uid + " is not find");
                            if ("video" !== t && "audio" !== t) throw new k(v.INVALID_PARAMS, "mediaType must be 'video' or 'audio'");
                            return o = n.hasVideo, a = n.hasAudio, s = o && "video" === t, c = a && "audio" === t, r._subPeerAVStats[e.uid] ? ("video" === t ? r._subPeerAVStats[e.uid].subscribeVideo = !0 : "audio" === t && (r._subPeerAVStats[e.uid].subscribeAudio = !0), null === (d = r._gateway) || void 0 === d || d.setAVStatus(e.uid, !!e.hasAudio && r._subPeerAVStats[e.uid].subscribeAudio, !!e.hasVideo && r._subPeerAVStats[e.uid].subscribeVideo)) : (r._subPeerAVStats[e.uid] = {
                                subscribeVideo: s,
                                subscribeAudio: c,
                                _originAudioTrack: null,
                                _originVideoTrack: null
                            }, r._latestEventLts.subscribeStartLts = Date.now(), null === (u = r._gateway) || void 0 === u || u.doSubscribe({
                                StreamId: e.uid,
                                SvrIp: r._msSub[0].ip,
                                SvrPort: r._msSub[0].port,
                                RecvAudio: c,
                                RecvVideo: s,
                                StrmType: n._subStreamType,
                                PubSessId: n._pubSid,
                                VideoCache: n._videoCache
                            })), c && ((null === (f = n._mediaStream) || void 0 === f ? void 0 : f._audioMediaStreamTrack) ? (n.audioTrack || (n.audioTrack = n._mediaStream.addTracks("audio")), i()) : Object.defineProperty(n, "_audioMediaStreamTrack", {
                                enumerable: !0,
                                configurable: !0,
                                set: function (e) {
                                    this.audioTrack = n._mediaStream.addTracks("audio"), i()
                                }
                            })), s && ((null === (l = n._mediaStream) || void 0 === l ? void 0 : l._videoMediaStreamTrack) ? (n.videoTrack || (n.videoTrack = n._mediaStream.addTracks("video")), i()) : Object.defineProperty(n, "_videoMediaStreamTrack", {
                                enumerable: !0,
                                configurable: !0,
                                set: function (e) {
                                    this.videoTrack = n._mediaStream.addTracks("video"), i()
                                }
                            })), [2]
                        }))
                    }))
                }))
            }, t.prototype.unsubscribe = function (e, t) {
                var n = this;
                return new Promise((function (r, i) {
                    var o, a, s = n._unsubscribe(e, t);
                    s.hasAudio || s.hasVideo ? ("video" === t ? n._subPeerAVStats[e.uid].subscribeVideo = !1 : "audio" === t && (n._subPeerAVStats[e.uid].subscribeAudio = !1), null === (a = n._gateway) || void 0 === a || a.setAVStatus(s.uid, !!s.hasAudio && n._subPeerAVStats[e.uid].subscribeAudio, !!s.hasVideo && n._subPeerAVStats[e.uid].subscribeVideo)) : (null === (o = n._gateway) || void 0 === o || o.doUnSubscribe(s.uid), s._mediaStream.destory(), s._mediaStream = null, delete n._subPeerAVStats[e.uid]);
                    r()
                }))
            }, t.prototype.getLocalAudioStats = function () {
                return this._highStream ? this._statsCollector.getLocalAudioTrackStats(this._highStream.ID) : {
                    sendVolumeLevel: 0,
                    sendBitrate: 0,
                    sendBytes: 0,
                    sendPackets: 0,
                    sendPacketsLost: 0
                }
            }, t.prototype.getLocalVideoStats = function () {
                return this._highStream ? this._statsCollector.getLocalVideoTrackStats(this._highStream.ID) : {
                    sendBytes: 0,
                    sendBitrate: 0,
                    sendPackets: 0,
                    sendPacketsLost: 0,
                    sendResolutionHeight: 0,
                    sendResolutionWidth: 0,
                    captureResolutionHeight: 0,
                    captureResolutionWidth: 0,
                    targetSendBitrate: 0,
                    totalDuration: 0,
                    totalFreezeTime: 0
                }
            }, t.prototype.getRemoteAudioStats = function () {
                var e = this, t = {};
                return this.remoteUsers.forEach((function (n) {
                    var r = n._mediaStream;
                    r && (t[r.ID] = e._statsCollector.getRemoteAudioTrackStats(r.ID))
                })), t
            }, t.prototype.getRemoteVideoStats = function () {
                var e = this, t = {};
                return e.remoteUsers.map((function (n) {
                    var r = e._statsCollector.getRemoteVideoTrackStats(n.uid);
                    t[n.uid] = r
                })), t
            }, t.prototype.setLowStreamParameter = function (e) {
                if (!e) throw new k(v.INVALID_PARAMS, "streamParameter must be object");
                if (this._isDualStreamEnabled && this._lowStream) {
                    var t = {};
                    e.framerate && (t.frameRate = e.framerate > 15 ? 15 : e.framerate), e.height && (t.height = e.height), e.width && (t.width = e.width), this._lowStream._videoMediaStreamTrack.applyConstraints(t)
                }
            }, t.prototype.enableDualStream = function () {
                return tr(this, void 0, void 0, (function () {
                    var e, t = this;
                    return nr(this, (function (n) {
                        return e = this, [2, new Promise((function (n, r) {
                            return tr(t, void 0, void 0, (function () {
                                var t, n;
                                return nr(this, (function (r) {
                                    if (!0 === e._isDualStreamEnabled) return C.warning(v.INVALID_OPERATION, "Already enabled."), [2];
                                    if (e._isDualStreamEnabled = !0, "{}" !== JSON.stringify(e._joinInfo) && "CONNECTED" === e.connectionState) {
                                        if (!e._highStream || !e._highStream.videoTrack) throw new k(v.INVALID_OPERATION, "Can't publish low stream cause of you did not publish high stream");
                                        e._publishLowStream(), null === (t = e._gateway) || void 0 === t || t.doPublishS(e._turnServer), null === (n = e._gateway) || void 0 === n || n.enableDualStream(!0)
                                    }
                                    return [2]
                                }))
                            }))
                        }))]
                    }))
                }))
            }, t.prototype.disableDualStream = function () {
                var e = this;
                return new Promise((function (t, n) {
                    var r, i;
                    !1 !== e._isDualStreamEnabled ? (e._isDualStreamEnabled = !1, null === (r = e._gateway) || void 0 === r || r.doUnPublishS(), null === (i = e._gateway) || void 0 === i || i.enableDualStream(!1)) : C.warning(v.INVALID_OPERATION, "Already disabled.")
                }))
            }, t.prototype.setParameters = function (e) {
                return tr(this, void 0, void 0, (function () {
                    var t, n, r, i, o, a, s, c, u, d, f, l;
                    return nr(this, (function (p) {
                        return t = this, n = e.ConfPriCloudAddr, r = e.ConfPriCloudAddr1, i = e.SetTurnSvr, o = e.ConfPriEventAddr, a = e.UserQuality, n && (s = n.ServerAdd, c = n.Port, u = n.Wss, d = !0, "boolean" == typeof u && (d = u), m.GATEWAY_ADDRESS_SSL !== d && (m.GATEWAY_ADDRESS_SSL = d), m.GATEWAY_ADDRESS1 && (m.GATEWAY_ADDRESS1 = ""), s && (m.GATEWAY_ADDRESS = (d ? "https://" + s : "http://" + s) + (c ? ":" + c : ""))), r && (s = r.ServerAdd, c = r.Port, u = r.Wss, d = !0, "boolean" == typeof u && (d = u), m.GATEWAY_ADDRESS_SSL !== d && (m.GATEWAY_ADDRESS_SSL = d), s && (m.GATEWAY_ADDRESS1 = (d ? "https://" + s : "http://" + s) + (c ? ":" + c : ""))), ~m.GATEWAY_ADDRESS.indexOf(m.EVENT_REPORT_DOMAIN) || ut.setBasicUrl("", ""), i && (t._turnServer = i), o && (s = o.ServerAdd, c = o.Port, u = o.Wss, s && (d = !0, "boolean" == typeof u && (d = u), f = (d ? "https://" + s : "http://" + s) + (c ? ":" + c : ""), ut.setBasicUrl(f, f))), a && "boolean" == typeof (l = a.Enable) && (m.ENABLE_USER_QUALITY_UPLOAD = l), [2]
                    }))
                }))
            }, t.prototype.setClientRole = function (e) {
                var t;
                return tr(this, void 0, void 0, (function () {
                    var n;
                    return nr(this, (function (r) {
                        if ("rtc" === (n = this)._config.mode) throw C.warning("rtc mode can not use setClientRole"), new k(v.INVALID_OPERATION, "rtc mode can not use setClientRole");
                        if ("audience" === e && n._highStream) throw new k(v.INVALID_OPERATION, "can not set client role to audience when publishing stream");
                        return e !== n._config.role && (n._config.role = e, null === (t = n._gateway) || void 0 === t || t.setClientRole(e)), [2]
                    }))
                }))
            }, t.prototype.setRemoteVideoStreamType = function (e, t) {
                var n = this;
                return new Promise((function (r, i) {
                    var o, a = n.remoteUsers.find((function (t) {
                        return t.uid === e
                    }));
                    if (!a) throw C.warning("can not find remote user " + e), new k(v.INVALID_PARAMS, "can not find remote user " + e);
                    if ("number" != typeof t) throw new k(v.INVALID_PARAMS, "streamType must be number");
                    if (!a._dualStream) throw new k(v.INVALID_OPERATION, "The remote user " + e + " did not enable the dual stream");
                    (null == a ? void 0 : a.hasVideo) && (null === (o = n._gateway) || void 0 === o || o.setRemoteVStrmType(e, t), n.emit("stream-type-changed", e, t)), a._subStreamType = t
                }))
            }, t.prototype.setStreamFallbackOption = function (e, t) {
                var n = this;
                return new Promise((function (r, i) {
                    if ("number" == typeof t) {
                        var o = n.remoteUsers.find((function (t) {
                            return t.uid === e
                        }));
                        o && (o._fallbackType = t)
                    }
                }))
            }, t.prototype.setEncryptionConfig = function (e, t) {
            }, t.prototype.renewToken = function (e) {
                var t = this;
                return new Promise((function (n, r) {
                    var i;
                    if ("CONNECTED" !== t.connectionState) throw new k(v.INVALID_OPERATION, "renewToken should not be called before user join");
                    null === (i = t._gateway) || void 0 === i || i.doReNewToken(e)
                }))
            }, t.prototype.enableAudioVolumeIndicator = function () {
                var e = this;
                e._AudioVolumeIndicator || (e._AudioVolumeIndicator = !0, setInterval((function () {
                    var t = [], n = e.getLocalAudioStats();
                    t.push({uid: e.uid, level: Math.round(n.sendVolumeLevel / 32767 * 100)});
                    var r = e.getRemoteAudioStats();
                    Object.keys(r).map((function (e) {
                        var n = r[e];
                        t.push({uid: e, level: Math.round(n.receiveLevel / 32767 * 100)})
                    })), e.emit("volume-indicator", t)
                }), 2e3))
            }, t.prototype.getRTCStats = function () {
                var e;
                return null === (e = this._statsCollector) || void 0 === e ? void 0 : e.getRTCStats()
            }, t.prototype.setLiveTranscoding = function (e) {
                return new Promise((function (e, t) {
                }))
            }, t.prototype.startLiveStreaming = function (e, t) {
                return new Promise((function (e, t) {
                }))
            }, t.prototype.stopLiveStreaming = function (e) {
                return new Promise((function (e, t) {
                }))
            }, t.prototype.addInjectStreamUrl = function (e, t) {
                return Promise.resolve()
            }, t.prototype.removeInjectStreamUrl = function () {
                return Promise.resolve()
            }, t.prototype.startChannelMediaRelay = function (e) {
                return Promise.resolve()
            }, t.prototype.updateChannelMediaRelay = function (e) {
                return Promise.resolve()
            }, t.prototype.stopChannelMediaRelay = function () {
                return Promise.resolve()
            }, t.prototype._authGateWay = function () {
                var e;
                return tr(this, void 0, void 0, (function () {
                    var t, n, r, i, o, a, s, c, u = this;
                    return nr(this, (function (d) {
                        switch (d.label) {
                            case 0:
                                return [4, new W((t = this)._joinInfo).joinGateway({extend: "", proxyServer: ""})];
                            case 1:
                                if (!(n = d.sent())) return [3, 4];
                                if (r = n.code, i = n.session_id, o = n.addresses, i && (t._sessionId = i, ut.sessionInit(t._joinInfo.sid, {
                                    cname: t.channelName,
                                    appid: t._appId,
                                    mode: "rtc" === t._config.mode ? 0 : "live" === t._config.mode ? 1 : "game" === t._config.mode && 2,
                                    role: t._config.role,
                                    code: r
                                })), !o || o instanceof Array && 0 === o.length) throw new k("Can not find service list");
                                return t._msSub = o.filter((function (e) {
                                    return 1 === e.type
                                })), [4, t._connectMediaServer(n)];
                            case 2:
                                return d.sent(), a = {
                                    ChanId: t.channelName,
                                    ChanSId: t._sessionId,
                                    UserId: t._joinInfo.uid,
                                    UserSId: t._joinInfo.sid,
                                    SdkVer: m.SDK_VERSION,
                                    VCodec: t._config.codec,
                                    Role: t._config.role,
                                    AcsToken: t._joinInfo.token || "",
                                    ChanType: "live" === t._config.mode ? 1 : 0
                                }, s = Date.now(), [4, null === (e = t._gateway) || void 0 === e ? void 0 : e.doOnline(a)];
                            case 3:
                                return (c = d.sent()) && (this._statsCollector = new Zn(this._clientId), this.remoteUsersQualityInterval = window.setInterval((function () {
                                    var e = 0, n = t._getRemoteNetworkQuality();
                                    Object.keys(n).forEach((function (r) {
                                        return tr(u, void 0, void 0, (function () {
                                            var i, o, a, s, c, u, d, f, p;
                                            return nr(this, (function (h) {
                                                switch (h.label) {
                                                    case 0:
                                                        return i = n[r], e += i, (o = t.remoteUsers.find((function (e) {
                                                            return e.uid === r
                                                        }))) && 0 !== o._fallbackType ? (a = o._fallbackType, s = o._currentFallbackStreamType, i > 3 ? (o._fallbackRecoverFlagTimes = 0, o._fallbackFallbackFlagTimes += 1, o._fallbackFallbackFlagTimes < 10 ? [2] : s < l.LOW_STREAM && o._dualStream && (o._currentFallbackStreamType = l.LOW_STREAM, 0 === o._subStreamType) ? ((null == o ? void 0 : o.hasVideo) && (null === (c = t._gateway) || void 0 === c || c.setRemoteVStrmType(o.uid, 1), t.emit("stream-type-changed", o.uid, 1)), t.emit("stream-fallback", o.uid, "fallback"), o._fallbackFallbackFlagTimes = 0, [2]) : a === l.AUDIO_ONLY && s < l.AUDIO_ONLY && o.audioTrack ? (t.emit("stream-fallback", o.uid, "fallback"), [4, t.unsubscribe(o, "video")]) : [3, 2]) : [3, 3]) : [2];
                                                    case 1:
                                                        h.sent(), null === (u = t._gateway) || void 0 === u || u.setAVStatus(o.uid, !!o.hasAudio && t._subPeerAVStats[o.uid].subscribeAudio, !!o.hasVideo && t._subPeerAVStats[o.uid].subscribeVideo), t.emit("user-unpublished", o, "video"), o._currentFallbackStreamType = l.AUDIO_ONLY, h.label = 2;
                                                    case 2:
                                                        return [3, 4];
                                                    case 3:
                                                        if (o._fallbackRecoverFlagTimes += 1, o._fallbackFallbackFlagTimes = 0, o._fallbackRecoverFlagTimes >= 10) if (o._currentFallbackStreamType === l.AUDIO_ONLY) {
                                                            if (t.emit("stream-fallback", o.uid, "recover"), null === (d = t._gateway) || void 0 === d || d.setAVStatus(o.uid, !!o.hasAudio && t._subPeerAVStats[o.uid].subscribeAudio, !!o.hasVideo && t._subPeerAVStats[o.uid].subscribeVideo), t.emit("user-published", o, "video"), o._dualStream) return (null == o ? void 0 : o.hasVideo) && (null === (f = t._gateway) || void 0 === f || f.setRemoteVStrmType(o.uid, 1), t.emit("stream-type-changed", o.uid, 1)), o._currentFallbackStreamType = l.LOW_STREAM, o._fallbackRecoverFlagTimes = 0, [2];
                                                            o._currentFallbackStreamType = l.DISABLE
                                                        } else o._currentFallbackStreamType === l.LOW_STREAM && 0 === o._subStreamType && ((null == o ? void 0 : o.hasVideo) && (null === (p = t._gateway) || void 0 === p || p.setRemoteVStrmType(o.uid, 0), t.emit("stream-type-changed", o.uid, 0)), t.emit("stream-fallback", o.uid, "recover"), o._currentFallbackStreamType = l.DISABLE);
                                                        h.label = 4;
                                                    case 4:
                                                        return [2]
                                                }
                                            }))
                                        }))
                                    })), t._puberDownloadQuality = 0 === e ? 1 : Math.round(e / Object.keys(n).length)
                                }), 2e3)), ut.joinGateway(t._joinInfo.sid, {
                                    joinStartTime: t._latestEventLts.joinStartTime,
                                    startTime: s,
                                    uid: c,
                                    cid: t._joinInfo.cid,
                                    extend: null,
                                    success: !0
                                }), t.uid = c, Object.assign(t._joinInfo, {
                                    apResponse: n,
                                    clientId: t._clientId,
                                    appId: t._appId,
                                    cname: t.channelName,
                                    uid: t.uid,
                                    turnServer: {},
                                    proxyServer: void 0,
                                    token: t._joinInfo.token ? t._joinInfo.token : "",
                                    useProxyServer: !1,
                                    startTime: Date.now()
                                }), [2, t.uid];
                            case 4:
                                return [2]
                        }
                    }))
                }))
            }, t.prototype._connectMediaServer = function (e) {
                return tr(this, void 0, void 0, (function () {
                    var t, n, r, i, o = this;
                    return nr(this, (function (a) {
                        return t = this, n = e.addresses, e.detail[8], r = Date.now(), i = n.filter((function (e) {
                            return 0 === e.type
                        })), [2, new Promise((function (a, s) {
                            return tr(o, void 0, void 0, (function () {
                                var o, c, u, d, l, p, h, _, E, y, S, T, g;
                                return nr(this, (function (b) {
                                    switch (b.label) {
                                        case 0:
                                            if (o = !1, !(i.length > 0)) return [3, 9];
                                            b.label = 1;
                                        case 1:
                                            b.trys.push([1, 6, 7, 8]), c = rr(i), u = c.next(), b.label = 2;
                                        case 2:
                                            return u.done ? [3, 5] : (d = u.value, C.debug("[" + this._clientId + "] begin connect media server ", d), null === (E = t._gateway) || void 0 === E || E.setAppInfo({appId: t._appId}), null === (y = t._gateway) || void 0 === y || y.configServer(d.wss, d.ip, d.port), [4, null === (S = t._gateway) || void 0 === S ? void 0 : S.connectCTS()]);
                                        case 3:
                                            return b.sent(), a(), o = !0, l = Date.now(), ut.chooseServer(t._joinInfo.sid, {
                                                startTime: r,
                                                success: !0,
                                                uid: t._joinInfo.uid,
                                                cid: "",
                                                elapse: l - t._latestEventLts.joinStartTime,
                                                extend: null,
                                                eventElapse: l - r,
                                                chooseServer: {},
                                                serverList: n,
                                                errorCode: "NETWORK_ERROR"
                                            }), [3, 5];
                                        case 4:
                                            return u = c.next(), [3, 2];
                                        case 5:
                                            return [3, 8];
                                        case 6:
                                            return p = b.sent(), h = {error: p}, [3, 8];
                                        case 7:
                                            try {
                                                u && !u.done && (_ = c.return) && _.call(c)
                                            } finally {
                                                if (h) throw h.error
                                            }
                                            return [7];
                                        case 8:
                                            return o || (Date.now() - (null === (T = t._gateway) || void 0 === T ? void 0 : T._connectBeginTime) < m.GATEWAY_ERTRY_TIMEOUT ? t._connectMediaServer(e) : t.emit("connection-state-change", "DISCONNECTING", null === (g = t._gateway) || void 0 === g ? void 0 : g._revState, f.NETWORK_ERROR)), [3, 10];
                                        case 9:
                                            throw s(v.CAN_NOT_GET_GATEWAY_SERVER), new k(v.CAN_NOT_GET_GATEWAY_SERVER);
                                        case 10:
                                            return [2]
                                    }
                                }))
                            }))
                        }))]
                    }))
                }))
            }, t.prototype._unsubscribe = function (e, t) {
                var n = this.remoteUsers.find((function (t) {
                    return t.uid === e.uid
                }));
                if (!n) throw new k("user " + n.uid + " is not find");
                var r = this._subPeerAVStats[n.uid];
                return void 0 !== t && "video" !== t || !n.videoTrack || (n.videoTrack.stop(), n.videoTrack = void 0, r.subscribeVideo = !1), void 0 !== t && "audio" !== t || !n.audioTrack || (n.audioTrack.stop(), n.audioTrack = void 0, r.subscribeAudio = !1), this._setAVStatsRepTimer(), n
            }, t.prototype._republish = function () {
                if (this.localTracks.length > 0) {
                    var e = [];
                    e = e.concat(this.localTracks), this._highStream.destory(!1), this._highStream = void 0, this.localTracks = [], this.publish(e), this._lowStream && (this._lowStream.destory(), this._lowStream = void 0, this._isDualStreamEnabled ? this.enableDualStream() : this.disableDualStream())
                }
            }, t.prototype._resubscribe = function (e) {
                return tr(this, void 0, void 0, (function () {
                    var t, n, r, i;
                    return nr(this, (function (o) {
                        switch (o.label) {
                            case 0:
                                return n = (t = this).remoteUsers.find((function (t) {
                                    return t.uid === e
                                })), r = !!n.hasVideo, i = !!n.hasAudio, n ? (r && t.emit("user-unpublished", n, "video"), i && t.emit("user-unpublished", n, "audio"), n.videoTrack || n.audioTrack ? [4, t.unsubscribe(n)] : [3, 2]) : [3, 3];
                            case 1:
                                o.sent(), o.label = 2;
                            case 2:
                                n.hasAudio = i, n.hasVideo = r, n.hasVideo && t.emit("user-published", n, "video"), n.hasAudio && t.emit("user-published", n, "audio"), o.label = 3;
                            case 3:
                                return [2]
                        }
                    }))
                }))
            }, t.prototype._publishHighStream = function (e) {
                return tr(this, void 0, void 0, (function () {
                    var t;
                    return nr(this, (function (n) {
                        switch (n.label) {
                            case 0:
                                return (t = this)._joinInfo && "CONNECTED" === t.connectionState ? (t._highStream || (t._highStream = new Vn(t.uid, t._statsCollector, t._joinInfo), t._highStream.on(O.CONNECTION_STATE_CHANGE, t._handlePeerConnectionEvent.bind(t, O.CONNECTION_STATE_CHANGE)), t._highStream.on(O.ICE_CONNECTION_STATE_CHANGE, t._handlePeerConnectionEvent.bind(t, O.ICE_CONNECTION_STATE_CHANGE)), t._highStream.on(O.ICE_CANDIDATE, t._handlePeerConnectionEvent.bind(t, O.ICE_CANDIDATE)), t._highStream.on(O.CREATE_ANSWER, t._handlePeerConnectionEvent.bind(t, O.CREATE_ANSWER)), t._highStream.on(O.UPDATE_MUTE_STATE, (function (e, n, r, i) {
                                    var o, a;
                                    "pub" === n && ("audio" === r ? null === (o = t._gateway) || void 0 === o || o.muteLocalAudioStream(!i) : "video" === r && (null === (a = t._gateway) || void 0 === a || a.muteLocalVideoStream(!i)))
                                })), t._highStream.on(O.FIRST_FRAME_DECODED, (function () {
                                    t._setAVStatsRepTimer()
                                })), t._highStream.on(O.VIDEO_SIZE_CHANGE, (function () {
                                    t._setAVStatsRepTimer()
                                }))), [4, t._highStream.addTracks(e)]) : [3, 2];
                            case 1:
                                return [2, n.sent()];
                            case 2:
                                throw new k(v.INVALID_OPERATION, "Can't publish stream when connection state is not connected")
                        }
                    }))
                }))
            }, t.prototype._publishLowStream = function () {
                this._lowStream = new jn(this.uid, this._statsCollector, this._joinInfo), this._lowStream.on(O.CONNECTION_STATE_CHANGE, this._handlePeerConnectionEvent.bind(this, O.CONNECTION_STATE_CHANGE)), this._lowStream.on(O.ICE_CONNECTION_STATE_CHANGE, this._handlePeerConnectionEvent.bind(this, O.ICE_CONNECTION_STATE_CHANGE)), this._lowStream.on(O.ICE_CANDIDATE, this._handlePeerConnectionEvent.bind(this, O.ICE_CANDIDATE)), this._lowStream.on(O.CREATE_ANSWER, this._handlePeerConnectionEvent.bind(this, O.CREATE_ANSWER));
                var e = this._highStream.videoTrack.getMediaStreamTrack(),
                    t = new Ln(e, this._highStream.videoTrack.encoderConfig ? this._highStream.videoTrack.encoderConfig : {}, y(5));
                return this._lowStream.addTracks(t), this.setLowStreamParameter({
                    width: 320,
                    height: 240,
                    framerate: 15
                }), this._lowStream
            }, t.prototype._calculate = function () {
                var e = this;
                if ("CONNECTED" === e.connectionState) {
                    var t = 0, n = 0, r = Object.keys(e._subPeerAVStats);
                    if (r.length > 0) r.map((function (r) {
                        var i, o = e._subPeerAVStats[r], a = 0;
                        if (o.subscribeAudio && t++, o.subscribeVideo) {
                            var s = null === (i = e._statsCollector) || void 0 === i ? void 0 : i.getRemoteVideoTrackStats(r);
                            a = s.receiveResolutionWidth * s.receiveResolutionHeight
                        }
                        n += a
                    })); else if (e.localTracks.length > 0) e.localTracks.find((function (e) {
                        return e instanceof rn
                    })) && (t += 1);
                    e._repRes(t, n)
                }
            }, t.prototype._repRes = function (e, t) {
                var n = this._latestRepInfo.lts, r = {audioNumber: e, videoSize: t, lts: Date.now()};
                this._gateway && this._gateway.reportAVStat({
                    TimeUsed: r.lts - n || 0,
                    AudNum: r.audioNumber,
                    VidSize: r.videoSize
                }), this._latestRepInfo = r
            }, t.prototype._setAVStatsRepTimer = function () {
                var e = this;
                e._clearAVStatsRepTimer(), e._AVStatsControlls = setInterval((function () {
                    e._calculate()
                }), 1e4), e._calculate()
            }, t.prototype._clearAVStatsRepTimer = function () {
                this._AVStatsControlls && clearInterval(this._AVStatsControlls)
            }, t.prototype._doReconnect = function () {
                var e, t, n, r = this;
                r.remoteUsers.map((function (e) {
                    e._mediaStream && e._mediaStream.destory();
                    var t = r._subPeerAVStats[e.uid];
                    t && (t.subscribeAudio && r.emit("user-unpublished", e, "audio"), t.subscribeVideo && r.emit("user-unpublished", e, "video")), r._unsubscribe(e)
                })), r.remoteUsersQualityInterval && clearInterval(r.remoteUsersQualityInterval), this.localNetworkQualityInterval && clearInterval(this.localNetworkQualityInterval), r.remoteUsers = [], r._latestEventLts = {}, r._msSub = [], "CONNECTED" === r.connectionState && (null === (e = r._gateway) || void 0 === e || e.doOffline(r._joinInfo.sid), r.connectionState = "DISCONNECTED", null === (t = r._gateway) || void 0 === t || t.disconnectCTS("destory")), null === (n = r._gateway) || void 0 === n || n.removeAllListeners(), r._gateway = void 0, r._joinInfo.sid = y(32), r._createMediaServerIntance(), r._authGateWay().then((function (e) {
                    r._republish(), r.remoteUsers = [], r._subPeerAVStats = {}
                }))
            }, t.prototype._createMediaServerIntance = function () {
                var e = this, t = this;
                t._gateway || (t._gateway = new P), t._gateway.handleMediaServerEvents = function (n, r) {
                    var i, o, a, s, c, u, d, f, p, h = r.Code;
                    if ("connection-state-change" === n) {
                        var v = r.curState, _ = r.revState, m = r.reason;
                        if (C.info("[" + e._clientId + "] connection state change: " + _ + " -> " + v + ", reason " + m), t.connectionState === v) return;
                        t.connectionState = v, t.emit("connection-state-change", v, _, m);
                        var E = 0;
                        switch (t.connectionState) {
                            case"CONNECTING":
                                E = 0;
                                break;
                            case"RECONNECTING":
                                E = 2;
                                break;
                            case"CONNECTED":
                                E = 1;
                                break;
                            case"DISCONNECTING":
                            case"DISCONNECTED":
                                E = 4
                        }
                        var y = Date.now();
                        ut.serverConnectionState(t._joinInfo.sid, {
                            startTime: y,
                            extend: {currentState: E}
                        }), "DISCONNECTED" === v || "RECONNECTING" === v && t._doReconnect()
                    } else if ("token-privilege-did-expire" === n) t.emit("token-privilege-did-expire"); else if ("token-privilege-will-expire" === n) t.emit("token-privilege-will-expire"); else if (n === O.ON_PUBLISH_EX) {
                        if (0 === h) {
                            var S = r.Offer;
                            (R = t._lowStream.peer).createAnswer(S)
                        }
                    } else if (n === O.ON_PUBER_QUALITY) {
                        var T = r.UserId, g = r.Quality;
                        t._puberUploadQuality = g
                    } else if (n === O.ON_SUBSCRIBE) if (0 === h) {
                        var b = r.StreamId, R = (S = r.Offer, void 0);
                        if (b === t.uid) R = t._highStream.peer; else {
                            var A = t.remoteUsers.find((function (e) {
                                return e.uid === b
                            }));
                            if (A || C.warning("can not find remote user " + b), A.uid === b) (re = new zn(b, t._statsCollector, t._joinInfo)).on(O.CONNECTION_STATE_CHANGE, t._handlePeerConnectionEvent.bind(t, O.CONNECTION_STATE_CHANGE)), re.on(O.ICE_CONNECTION_STATE_CHANGE, t._handlePeerConnectionEvent.bind(t, O.ICE_CONNECTION_STATE_CHANGE)), re.on(O.ICE_CANDIDATE, t._handlePeerConnectionEvent.bind(t, O.ICE_CANDIDATE)), re.on(O.CREATE_ANSWER, t._handlePeerConnectionEvent.bind(t, O.CREATE_ANSWER)), re.on(O.TRACK_ADDED, (function (e, t, n) {
                                "audio" === t ? A._audioMediaStreamTrack = n : "video" === t && (A._videoMediaStreamTrack = n)
                            })), A._mediaStream = re, R = re.peer
                        }
                        R && R.createAnswer(S)
                    } else {
                        var I = r.StreamId;
                        window.setTimeout((function () {
                            t._resubscribe(I)
                        }), 3e3)
                    } else if (n === O.ON_FORCE_OFFLINE) Object.keys(t._joinInfo).length > 0 && ("CONNECTED" === t.connectionState && (null === (i = t._gateway) || void 0 === i || i.disconnectCTS("UID_BANNED"), t.connectionState = "DISCONNECTED", null === (o = t._gateway) || void 0 === o || o.removeAllListeners(), t._gateway = void 0), t.remoteUsers.map((function (e, n) {
                        e._mediaStream && e._mediaStream.destory(), t._unsubscribe(e)
                    })), t._highStream && (t._highStream.destory(), t._highStream.clearOriginTracks(), t._highStream = void 0), t._lowStream && (t._lowStream.destory(), t._lowStream.clearOriginTracks(), t._lowStream = void 0), t.remoteUsersQualityInterval && clearInterval(t.remoteUsersQualityInterval), e.localNetworkQualityInterval && clearInterval(e.localNetworkQualityInterval), t.localTracks = [], t._subPeerAVStats = {}, t._sessionId = "", t.remoteUsers = [], t._msSub = [], t.uid = "", t._joinInfo = {}, t._statsCollector && t._statsCollector.clear()); else if (n === O.ON_ICE) {
                        var N = r.StreamId, w = r.Sdp, D = r.SubStream;
                        R = void 0;
                        if (N === t.uid) R = t._highStream.peer, D && (R = t._lowStream.peer); else (_e = t.remoteUsers.find((function (e) {
                            return e.uid === N
                        }))) || C.warning("can not find remote user " + N), R = (re = _e._mediaStream).peer;
                        R.setIceCandidate(w)
                    } else if (n === O.ON_SESSION_INIT) {
                        var P = r.CId, L = r.Interval;
                        t._joinInfo.cid = P, t._startReportStats(P, L)
                    } else if (n === O.ON_CHANNEL_MESSAGE) {
                        var M = r.Cmd;
                        if (M === O.ON_CHANNEL_USER_ONLINE) {
                            var x = {
                                _video_added_: !1,
                                _video_enabled_: !1,
                                _video_muted_: !1,
                                _audio_added_: !1,
                                _audio_enabled_: !1,
                                _audio_muted_: !1,
                                hasAudio: !1,
                                hasVideo: !1,
                                uid: T = r.UserId
                            };
                            t.remoteUsers.push(x), C.info("[" + e._clientId + "] remote user " + T + " join channel"), t.emit("user-joined", x)
                        } else if (M === O.ON_CHANNEL_USER_OFFLINE) {
                            var U = r.UserId, V = r.Reason, F = t.remoteUsers.find((function (e, n) {
                                if (e.uid === U) {
                                    var r = t._subPeerAVStats[U];
                                    r && (r.subscribeAudio && (t._unsubscribe(e, "audio"), t.emit("user-unpublished", e, "audio")), r.subscribeVideo && (t._unsubscribe(e, "video"), t.emit("user-unpublished", e, "video"))), e._mediaStream && (e._mediaStream.destory(), e._mediaStream = null), t.remoteUsers.splice(n, 1)
                                }
                                return e.uid === U
                            }));
                            if (F) {
                                var j = "";
                                switch (V) {
                                    case"Dropped":
                                        j = "ServerTimeOut";
                                        break;
                                    case"Offline":
                                        j = "Quit";
                                        break;
                                    case"BecomeAudience":
                                        j = "BecomeAudience"
                                }
                                C.info("[" + e._clientId + "] remote user " + U + " leave channel"), t.emit("user-left", F, j)
                            }
                            t._setAVStatsRepTimer()
                        } else if (M === O.ON_CHANNEL_SET_USER_ROLE) r.AppId, T = r.UserId, r.Code, r.Role, r.ChanId; else if (M === O.ON_CHANNEL_DUALSTREAM_ENABLE) {
                            var B = r.UserId, W = r.Enable;
                            if (_e = t.remoteUsers.find((function (e) {
                                return e.uid === B
                            }))) {
                                if (1 === _e._subStreamType) {
                                    var G = _e.uid, H = 0;
                                    H = W ? 1 : 0, (null == _e ? void 0 : _e.hasVideo) && (null === (a = t._gateway) || void 0 === a || a.setRemoteVStrmType(G, H), t.emit("stream-type-changed", G, H))
                                }
                                _e._dualStream = W
                            }
                        } else if (M === O.ON_CHANNEL_USER_STREAM_OPEN) {
                            var K = r.UserId, Y = (r.StreamId, r.PubSessionId), J = r.DualStream, z = r.HasAudio,
                                X = r.LocalAudioEnable, Q = r.LocalAudioMute, q = r.HasVideo, $ = r.LocalVideoEnable,
                                Z = r.LocalVideoMute;
                            r.VidCodecType, r.AudCodecType;
                            if (void 0 !== (_e = t.remoteUsers.find((function (e) {
                                return e.uid === K
                            })))) {
                                var ee = z && X && !Q, te = q && $ && !Z, ne = !0;
                                te && $ && !Z || (ne = !1), Object.assign(_e, {
                                    _video_added_: z,
                                    _video_enabled_: $,
                                    _video_muted_: Z,
                                    _audio_added_: q,
                                    _audio_enabled_: X,
                                    _audio_muted_: Q,
                                    hasAudio: ee,
                                    hasVideo: te,
                                    _videoCache: ne,
                                    _pubSid: Y,
                                    _dualStream: J,
                                    _subStreamType: 0,
                                    _currentFallbackStreamType: l.DISABLE,
                                    _fallbackType: l.DISABLE,
                                    _fallbackRecoverFlagTimes: 0,
                                    _fallbackFallbackFlagTimes: 0
                                }), te && (C.info("[" + e._clientId + "] remote user " + _e.uid + " published video"), t.emit("user-published", _e, "video")), ee && (C.info("[" + e._clientId + "] remote user " + _e.uid + " published audio"), t.emit("user-published", _e, "audio"))
                            }
                        } else if (M === O.ON_CHANNEL_USER_STREAM_CLOSE) {
                            var re, ie = r.UserId, oe = (r.StreamId, r.PubSessionId);
                            if (void 0 !== (_e = t.remoteUsers.find((function (e) {
                                return e.uid === ie && e._pubSid === oe
                            })))) (pe = t._subPeerAVStats[_e.uid]) && (pe.subscribeAudio && (t._unsubscribe(_e, "audio"), t.emit("user-unpublished", _e, "audio"), C.info("[" + e._clientId + "] remote user " + _e.uid + " unpublish audio track"), _e._audio_added_ = !1, _e._audio_enabled_ = !1, _e._audio_muted_ = !1, _e.hasAudio = _e._audio_added_ && _e._audio_enabled_ && !_e._audio_muted_), pe.subscribeVideo && (t._unsubscribe(_e, "video"), t.emit("user-unpublished", _e, "video"), C.info("[" + e._clientId + "] remote user " + _e.uid + " unpublish video track"), _e._video_added_ = !1, _e._video_enabled_ = !1, _e._video_muted_ = !1, _e.hasVideo = _e._video_added_ && _e._video_enabled_ && !_e._video_muted_), _e.hasVideo || _e.hasAudio || null === (s = t._gateway) || void 0 === s || s.doUnSubscribe(ie)), t._subPeerAVStats[ie] && delete t._subPeerAVStats[ie], (re = _e._mediaStream) && (re && re.destory(), delete _e._mediaStream), null === (c = t._statsCollector) || void 0 === c || c.removeConnection(_e.uid)
                        } else if ("UserQuality" === M) {
                            T = r.UserId;
                            var ae = r.TxQ, se = (r.RxQ, t._getRemoteNetworkQuality()),
                                ce = {uplinkNetworkQuality: ae, downlinkNetworkQuality: se[T] ? se[T] : 0};
                            t.emit(O.NETWORK_QUALITY, T, ce)
                        } else if (M === O.ON_CHANNEL_USER_ENABLE_LOCAL_VIDEO || M === O.ON_CHANNEL_USER_ENABLE_VIDEO || M === O.ON_CHANNEL_USER_DISABLE_VIDEO) {
                            var ue = r.UserId;
                            W = r.Enable;
                            if (!(_e = t.remoteUsers.find((function (e) {
                                return e.uid === ue
                            })))) throw new k("user " + ue + " is not find");
                            var de = _e.hasVideo;
                            if (M === O.ON_CHANNEL_USER_ENABLE_LOCAL_VIDEO ? _e._video_enabled_ = W : M === O.ON_CHANNEL_USER_ENABLE_VIDEO ? _e._video_added_ = !0 : M === O.ON_CHANNEL_USER_DISABLE_VIDEO && (_e._video_added_ = !1), _e.hasVideo = _e._video_added_ && _e._video_enabled_ && !_e._video_muted_, W || M === O.ON_CHANNEL_USER_ENABLE_VIDEO) de || (null === (u = t._gateway) || void 0 === u || u.setAVStatus(ue, !!_e.hasAudio, !!_e.hasVideo), _e._mediaStream && (_e.videoTrack = _e._mediaStream.addTracks("video")), t.emit("user-published", _e, "video")); else if (!W || M === O.ON_CHANNEL_USER_DISABLE_VIDEO) {
                                (pe = t._subPeerAVStats[_e.uid]) && pe.subscribeVideo && (t._unsubscribe(_e, "video"), _e.videoTrack && (_e.videoTrack.stop(), _e.videoTrack = void 0), null === (d = t._gateway) || void 0 === d || d.setAVStatus(ue, !!_e.hasAudio && t._subPeerAVStats[_e.uid].subscribeAudio, !!_e.hasVideo && t._subPeerAVStats[_e.uid].subscribeVideo), t.emit("user-unpublished", _e, "video"), C.info("stream removed with uid " + ue))
                            }
                            t._setAVStatsRepTimer()
                        } else if (M === O.ON_CHANNEL_USER_ENABLE_LOCAL_AUDIO || M === O.ON_CHANNEL_USER_ENABLE_AUDIO || M === O.ON_CHANNEL_USER_DISABLE_AUDIO) {
                            var fe = r.UserId;
                            W = r.Enable;
                            if (!(_e = t.remoteUsers.find((function (e) {
                                return e.uid === fe
                            })))) throw new k("user " + fe + " is not find");
                            var le = _e.hasAudio;
                            if (M === O.ON_CHANNEL_USER_ENABLE_LOCAL_AUDIO ? _e._audio_enabled_ = W : M === O.ON_CHANNEL_USER_ENABLE_AUDIO ? _e._audio_added_ = !0 : M === O.ON_CHANNEL_USER_DISABLE_AUDIO && (_e._audio_added_ = !1), _e.hasAudio = _e._audio_added_ && _e._audio_enabled_ && !_e._audio_muted_, W || M === O.ON_CHANNEL_USER_ENABLE_AUDIO) le || (null === (f = t._gateway) || void 0 === f || f.setAVStatus(fe, !!_e.hasAudio, !!_e.hasVideo), _e._mediaStream && (_e.audioTrack = _e._mediaStream.addTracks("audio")), t.emit("user-published", _e, "audio")); else if (!W || M === O.ON_CHANNEL_USER_DISABLE_AUDIO) {
                                var pe;
                                (pe = t._subPeerAVStats[_e.uid]) && pe.subscribeAudio && (t._unsubscribe(_e, "audio"), null === (p = t._gateway) || void 0 === p || p.setAVStatus(fe, !!_e.hasAudio && t._subPeerAVStats[_e.uid].subscribeAudio, !!_e.hasVideo && t._subPeerAVStats[_e.uid].subscribeVideo), t.emit("user-unpublished", _e, "audio"))
                            }
                            t._setAVStatsRepTimer()
                        } else if (M === O.ON_CHANNEL_USER_MUTE_VIDEO) {
                            var he = r.UserId, ve = r.Mute;
                            (_e = t.remoteUsers.find((function (e) {
                                return e.uid === he
                            })))._video_muted_ = ve, _e.hasVideo = _e._video_enabled_ && !_e._video_muted_, t._subPeerAVStats[he] && (t._subPeerAVStats[he].subscribeVideo = !ve), ve ? (_e.videoTrack && (_e.videoTrack.stop(), _e.videoTrack = void 0), t._subPeerAVStats[he] && t.emit("user-unpublished", _e, "video")) : t._subPeerAVStats[he] && t.emit("user-published", _e, "video"), t._setAVStatsRepTimer()
                        } else if (M === O.ON_CHANNEL_USER_MUTE_AUDIO) {
                            var _e, me = r.UserId;
                            ve = r.Mute;
                            (_e = t.remoteUsers.find((function (e) {
                                return e.uid === me
                            })))._audio_muted_ = ve, _e.hasAudio = _e._audio_enabled_ && !_e._audio_muted_, t._subPeerAVStats[me] && (t._subPeerAVStats[me].subscribeAudio = !ve), ve ? t.emit("user-unpublished", _e, "audio") : t.emit("user-published", _e, "audio"), t._setAVStatsRepTimer()
                        }
                    }
                }
            }, t.prototype._handlePeerConnectionEvent = function (e, t, n, r) {
                var i, o;
                if (e === O.ICE_CONNECTION_STATE_CHANGE) ; else if (e === O.CONNECTION_STATE_CHANGE) switch (r) {
                    case"connected":
                        if ("sub" === n) return;
                        var a = void 0;
                        if ("pub" === n ? a = this._highStream.peer : "pubEx" === n && (a = this._lowStream.peer), "{}" !== JSON.stringify(a.videoEncoderConfig)) {
                            var s = a.videoEncoderConfig;
                            s.bitrateMax && a.updateBandWidth(s.bitrateMax)
                        }
                        break;
                    case"disconnected":
                        break;
                    case"failed":
                        "CONNECTED" !== this.connectionState || "pub" !== n && "pubEx" !== n || this._doReconnect()
                } else e === O.ICE_CANDIDATE ? null === (i = this._gateway) || void 0 === i || i.sendIceCandidate(t, r, "pubEx" === n) : e === O.CREATE_ANSWER && (null === (o = this._gateway) || void 0 === o || o.sendAnswer(t, r, "pubEx" === n))
            }, t.prototype._startReportStats = function (e, t) {
                var n = this;
                n._reportStatsInterval && clearInterval(n._reportStatsInterval), n._reportStatsInterval = window.setInterval((function () {
                    var t;
                    if (n._highStream) {
                        var r = {cid: e, lts: Date.now(), type: "local"};
                        if (n._highStream.videoTrack) {
                            var i = n.getLocalVideoStats();
                            i && (r.lvid = {
                                sbr: Math.round(i.sendBitrate / 1e3),
                                sfps: i.sendFrameRate,
                                eofps: i.captureFrameRate,
                                rofps: i.captureFrameRate,
                                stbr: i.captureFrameRate,
                                stfps: i.captureFrameRate,
                                ebr: Math.round(i.sendBitrate / 1e3),
                                e_w: i.captureResolutionWidth,
                                e_h: i.captureResolutionHeight,
                                efps: i.captureFrameRate,
                                ploss: Math.round(100 * i.packetLossRate)
                            })
                        } else r.lvid = {};
                        if (n._highStream.audioTrack) {
                            var o = n.getLocalAudioStats();
                            o && (r.laud = {
                                nc: 1,
                                shz: 48e3,
                                sbr: Math.round(o.sendBitrate / 1e3),
                                vol: Math.round(100 * o.sendVolumeLevel / 32767),
                                ploss: 0
                            })
                        } else r.laud = {};
                        null === (t = n._gateway) || void 0 === t || t.reportArStats(r)
                    }
                    if (n._lowStream, n.remoteUsers.length > 0) {
                        var a = n.getRemoteAudioStats(), s = n.getRemoteVideoStats();
                        n.remoteUsers.forEach((function (t) {
                            var r, i = {cid: e, peer: t.uid, lts: Date.now(), type: "peer"};
                            if (t.videoTrack) {
                                var o = s[t.uid];
                                o && (i.vif = {
                                    w: o.receiveResolutionWidth,
                                    h: o.receiveResolutionHeight,
                                    rbr: Math.round(o.receiveBitrate / 1e3),
                                    dofps: o.receiveFrameRate,
                                    rofps: o.renderFrameRate,
                                    ploss: Math.round(100 * o.packetLossRate),
                                    rst: t._subStreamType,
                                    tft: o.totalFreezeTime,
                                    ffps: Math.round(100 * o.freezeRate)
                                })
                            } else i.vif = {};
                            if (t.audioTrack) {
                                var c = a[t.uid];
                                c && (i.aif = {
                                    ntd: c.end2EndDelay,
                                    jbd: c.receiveDelay,
                                    aloss: Math.round(100 * c.packetLossRate),
                                    nc: 1,
                                    rhz: 48e3,
                                    rb: Math.round(c.receiveBitrate / 1e3),
                                    tft: c.totalFreezeTime,
                                    ffps: Math.round(100 * c.freezeRate),
                                    vol: Math.round(100 * c.receiveLevel / 32767),
                                    ploss: 0
                                })
                            } else i.aif = {};
                            null === (r = n._gateway) || void 0 === r || r.reportArStats(i)
                        }))
                    }
                }), t)
            }, t
        }(A), or = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), ar = function (e) {
            function t(t, n) {
                var r = e.call(this) || this;
                return r.startPlayTime = 0, r.startPlayOffset = 0, r.pausePlayTime = 0, r.currentLoopCount = 0, r.options = {}, r.sourceNode = void 0, r._currentState = "stopped", r.id = n, r.context = It.getAudioContextInstance(), r.mediaStreamDestination = r.context.createMediaStreamDestination(), r.audioBuffer = t, r.startPlayOffset = r.options.startPlayTime || 0, r
            }

            return or(t, e), t.prototype.getAudioTrack = function () {
                return this.mediaStreamDestination.stream.getAudioTracks()[0]
            }, t.prototype.updateOptions = function (e) {
                "stopped" === this.currentState ? (this.options = e, this.startPlayOffset = this.options.startPlayTime || 0) : C.warning("can not set audio source options")
            }, t.prototype.startProcessAudioBuffer = function () {
                this.sourceNode && this.stopProcessAudioBuffer(), this.sourceNode = this.createSourceNode(), this.startSourceNode(), this.currentState = "playing"
            }, t.prototype.pauseProcessAudioBuffer = function () {
                this.sourceNode && "playing" === this.currentState && (this.pausePlayTime = this.currentTime, this.sourceNode.onended = null, this.sourceNode.stop(), this.sourceNode.buffer = null, this.sourceNode = this.createSourceNode(), this.currentState = "paused")
            }, t.prototype.seekAudioBuffer = function (e) {
                this.sourceNode && (this.sourceNode.onended = null, "playing" === this.currentState && this.sourceNode.stop(), this.sourceNode = this.createSourceNode(), "playing" === this.currentState ? (this.startPlayOffset = e, this.startSourceNode()) : "paused" === this.currentState && (this.pausePlayTime = e))
            }, t.prototype.resumeProcessAudioBuffer = function () {
                "paused" === this.currentState && this.sourceNode && (this.startPlayOffset = this.pausePlayTime, this.pausePlayTime = 0, this.startSourceNode(), this.currentState = "playing")
            }, t.prototype.stopProcessAudioBuffer = function () {
                if (this.sourceNode) {
                    this.sourceNode.onended = null;
                    try {
                        this.sourceNode.stop()
                    } catch (e) {
                    }
                    this.reset()
                }
            }, t.prototype.startSourceNode = function () {
                this.sourceNode && this.sourceNode.buffer && (this.sourceNode.start(0, this.startPlayOffset), this.startPlayTime = this.context.currentTime, this.sourceNode.onended = this.handleSourceNodeEnded.bind(this))
            }, t.prototype.createSourceNode = function () {
                var e = this.context.createBufferSource();
                return e.buffer = this.audioBuffer, e.loop = !!this.options.loop, e.connect(this.mediaStreamDestination), e
            }, t.prototype.handleSourceNodeEnded = function () {
                if (this.currentLoopCount += 1, this.options.cycle && this.options.cycle > this.currentLoopCount) return this.startPlayOffset = 0, this.sourceNode = void 0, void this.startProcessAudioBuffer();
                this.reset()
            }, t.prototype.reset = function () {
                this.startPlayOffset = this.options.startPlayTime || 0, this.currentState = "stopped", this.sourceNode && (this.sourceNode.disconnect(), this.sourceNode = void 0), this.currentLoopCount = 0
            }, Object.defineProperty(t.prototype, "currentState", {
                get: function () {
                    return this._currentState
                }, set: function (e) {
                    e !== this._currentState && (this._currentState = e, this.emit(O.AUDIO_SOURCE_STATE_CHANGE, this._currentState))
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(t.prototype, "duration", {
                get: function () {
                    return this.audioBuffer.duration
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(t.prototype, "currentTime", {
                get: function () {
                    return "stopped" === this.currentState ? 0 : "paused" === this.currentState ? this.pausePlayTime : (this.context.currentTime - this.startPlayTime + this.startPlayOffset) % this.audioBuffer.duration
                }, enumerable: !1, configurable: !0
            }), t
        }(A), sr = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), cr = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, ur = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        };
        !function (e) {
            e.IDLE = "IDLE", e.INITING = "INITING", e.INITEND = "INITEND"
        }(wn || (wn = {}));
        var dr = function (e) {
            function t() {
                var t = e.call(this) || this;
                t.deviceInfoMap = new Map;
                var n = t;
                return n.init().then((function () {
                    navigator.mediaDevices && navigator.mediaDevices.addEventListener && navigator.mediaDevices.addEventListener("devicechange", n.updateDevicesInfo.bind(n)), window.setInterval(n.updateDevicesInfo.bind(n), 5e3)
                })), t
            }

            return sr(t, e), t.prototype.enumerateDevices = function () {
                var e = this;
                return new Promise((function (t, n) {
                    return cr(e, void 0, void 0, (function () {
                        var e, r;
                        return ur(this, (function (i) {
                            switch (i.label) {
                                case 0:
                                    return i.trys.push([0, 3, , 4]), navigator.mediaDevices && navigator.mediaDevices.enumerateDevices ? [4, navigator.mediaDevices.enumerateDevices()] : [3, 2];
                                case 1:
                                    e = i.sent(), t(e || []), i.label = 2;
                                case 2:
                                    return [3, 4];
                                case 3:
                                    throw r = i.sent(), n(r), r;
                                case 4:
                                    return [2]
                            }
                        }))
                    }))
                }))
            }, t.prototype.getRecordingDevices = function () {
                var e = this, t = this;
                return new Promise((function (n, r) {
                    return cr(e, void 0, void 0, (function () {
                        var e, i, o;
                        return ur(this, (function (a) {
                            switch (a.label) {
                                case 0:
                                    return [4, t.enumerateDevices()];
                                case 1:
                                    if (void 0 === (e = a.sent())) throw o = new k(v.NOT_SUPPORT, "getRecordingDevices() not supported."), r(o), o;
                                    return i = e.filter((function (e) {
                                        return "audioinput" === e.kind
                                    })), n(i || []), [2]
                            }
                        }))
                    }))
                }))
            }, t.prototype.getPlayoutDevices = function () {
                var e = this, t = this;
                return new Promise((function (n, r) {
                    return cr(e, void 0, void 0, (function () {
                        var e, i, o;
                        return ur(this, (function (a) {
                            switch (a.label) {
                                case 0:
                                    return [4, t.enumerateDevices()];
                                case 1:
                                    if (void 0 === (e = a.sent())) throw o = new k(v.NOT_SUPPORT, "getPlayoutDevices() not supported."), r(o), o;
                                    return i = e.filter((function (e) {
                                        return "audiooutput" === e.kind
                                    })), n(i || []), [2]
                            }
                        }))
                    }))
                }))
            }, t.prototype.getCamerasDevices = function () {
                var e = this, t = this;
                return new Promise((function (n, r) {
                    return cr(e, void 0, void 0, (function () {
                        var e, i, o;
                        return ur(this, (function (a) {
                            switch (a.label) {
                                case 0:
                                    return [4, t.enumerateDevices()];
                                case 1:
                                    if (void 0 === (e = a.sent())) throw o = new k(v.NOT_SUPPORT, "getCamerasDevices() not supported."), r(o), o;
                                    return i = e.filter((function (e) {
                                        return "videoinput" === e.kind
                                    })), n(i || []), [2]
                            }
                        }))
                    }))
                }))
            }, t.prototype.getSpeakers = function (e) {
                var t = this;
                void 0 === e && (e = !1);
                var n = this;
                return new Promise((function (e, r) {
                    return cr(t, void 0, void 0, (function () {
                        var t, i, o;
                        return ur(this, (function (a) {
                            switch (a.label) {
                                case 0:
                                    return [4, n.enumerateDevices()];
                                case 1:
                                    if (void 0 === (t = a.sent())) throw o = new k(v.NOT_SUPPORT, "getSpeakers() not supported."), r(o), o;
                                    return i = t.filter((function (e) {
                                        return "audiooutput" === e.kind
                                    })), e(i || []), [2]
                            }
                        }))
                    }))
                }))
            }, t.prototype.searchDeviceNameById = function (e) {
                var t = this.deviceInfoMap.get(e);
                return t ? t.device.label || t.device.deviceId : null
            }, t.prototype.getDeviceById = function (e) {
                var t = this, n = this;
                return new Promise((function (r, i) {
                    return cr(t, void 0, void 0, (function () {
                        var t, o, a;
                        return ur(this, (function (s) {
                            switch (s.label) {
                                case 0:
                                    return [4, n.enumerateDevices()];
                                case 1:
                                    if (t = s.sent(), !(o = t.find((function (t) {
                                        return t.deviceId === e
                                    })))) throw a = new k(v.DEVICE_NOT_FOUND, "deviceId: ".concat(e)), i(a), a;
                                    return r(o), [2]
                            }
                        }))
                    }))
                }))
            }, t.prototype.getVideoCameraIdByLabel = function (e) {
                var t = this, n = this;
                return new Promise((function (r, i) {
                    return cr(t, void 0, void 0, (function () {
                        var t, o, a;
                        return ur(this, (function (s) {
                            switch (s.label) {
                                case 0:
                                    return [4, n.enumerateDevices()];
                                case 1:
                                    if (t = s.sent(), !(o = t.find((function (t) {
                                        return "videoinput" === t.kind && t.label === e
                                    })))) throw a = new k(v.DEVICE_NOT_FOUND, "camera label: ".concat(e)), i(a), a;
                                    return r(o.deviceId), [2]
                            }
                        }))
                    }))
                }))
            }, t.prototype.init = function () {
                return cr(this, void 0, void 0, (function () {
                    var e;
                    return ur(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                return (e = this).state = wn.INITING, [4, e.updateDevicesInfo().catch((function (t) {
                                    e.state = wn.IDLE
                                }))];
                            case 1:
                                return t.sent(), e.state = wn.INITEND, [2]
                        }
                    }))
                }))
            }, t.prototype.updateDevicesInfo = function () {
                var e = this, t = this;
                return new Promise((function (n, r) {
                    return cr(e, void 0, void 0, (function () {
                        var e, n, r;
                        return ur(this, (function (i) {
                            switch (i.label) {
                                case 0:
                                    return [4, t.enumerateDevices()];
                                case 1:
                                    return e = i.sent(), n = Date.now(), r = [], e.forEach((function (e) {
                                        if (e.deviceId) {
                                            var i = t.deviceInfoMap.get(e.deviceId);
                                            if ("ACTIVE" !== (i ? i.state : "INACTIVE")) {
                                                var o = {initAt: n, updateAt: n, device: e, state: "ACTIVE"};
                                                t.deviceInfoMap.set(e.deviceId, o), r.push(o)
                                            }
                                            i && (i.updateAt = n)
                                        }
                                    })), t.deviceInfoMap.forEach((function (e) {
                                        "ACTIVE" === e.state && e.updateAt !== n && (e.state = "INACTIVE", r.push(e))
                                    })), t.state !== wn.INITEND ? [2] : (r.forEach((function (e) {
                                        switch (e.device.kind) {
                                            case"audioinput":
                                                t.emit(O.RECORDING_DEVICE_CHANGED, e);
                                                break;
                                            case"videoinput":
                                                t.emit(O.CAMERA_DEVICE_CHANGED, e);
                                                break;
                                            case"audiooutput":
                                                t.emit(O.PLAYOUT_DEVICE_CHANGED, e)
                                        }
                                    })), [2])
                            }
                        }))
                    }))
                }))
            }, t
        }(A), fr = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), lr = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, pr = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        }, hr = function (e) {
            function t(t, n, r, i) {
                var o = e.call(this, t, n.encoderConfig ? Rn(n.encoderConfig) : {}, i) || this;
                return o._deviceName = "default", o._config = n || {}, o._constraints = r, o._config && o._config.cameraId && (o._deviceName = (new dr).searchDeviceNameById(o._config.cameraId) || "default"), o
            }

            return fr(t, e), t.prototype.getConfig = function () {
                return this._config
            }, t.prototype.setDevice = function (e) {
                return lr(this, void 0, void 0, (function () {
                    var t, n, r, i, o;
                    return pr(this, (function (a) {
                        switch (a.label) {
                            case 0:
                                return t = this, [4, (new dr).getDeviceById(e)];
                            case 1:
                                return n = a.sent(), (r = {}).video = t._constraints, r.video.deviceId = e, [4, gn(r)];
                            case 2:
                                return i = a.sent(), [4, t._updateOriginMediaStreamTrack(i.getVideoTracks()[0], !0)];
                            case 3:
                                return a.sent(), [4, bn(t._originMediaStreamTrack)];
                            case 4:
                                return o = a.sent(), t._videoWidth = o[0], t._videoWidth = o[1], t._deviceName = n.label, [2]
                        }
                    }))
                }))
            }, t.prototype.setEncoderConfiguration = function (e) {
                return lr(this, void 0, void 0, (function () {
                    var t, n, r, i;
                    return pr(this, (function (o) {
                        switch (o.label) {
                            case 0:
                                if (t = this, !e) throw new k("");
                                return n = Rn(e), t._config.encoderConfig = n, [4, In(t._config)];
                            case 1:
                                return r = o.sent(), [4, t._originMediaStreamTrack.applyConstraints(r)];
                            case 2:
                                return o.sent(), [4, bn(t._originMediaStreamTrack)];
                            case 3:
                                return i = o.sent(), t._videoWidth = i[0], t._videoHeight = i[1], t._constraints = r, t._encoderConfig = t._config.encoderConfig, t.emit(O.RTC_NEED_RENEGOTIATE), [2]
                        }
                    }))
                }))
            }, t
        }(Ln), vr = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), _r = function (e) {
            function t(t, n, r, i) {
                var o = e.call(this, n.getAudioTrack(), r, i) || this;
                return o._bufferSource = n, o._bufferSource.on(O.AUDIO_SOURCE_STATE_CHANGE, (function (e) {
                    o.emit(O.AUDIO_SOURCE_STATE_CHANGE, e)
                })), o
            }

            return vr(t, e), t.prototype.getCurrentTime = function () {
                return this._bufferSource.currentTime
            }, t.prototype.startProcessAudioBuffer = function (e) {
                e && this._bufferSource.updateOptions(e), this._bufferSource.startProcessAudioBuffer()
            }, t.prototype.pauseProcessAudioBuffer = function () {
                this._bufferSource.pauseProcessAudioBuffer()
            }, t.prototype.seekAudioBuffer = function (e) {
                this._bufferSource.seekAudioBuffer(e)
            }, t.prototype.resumeProcessAudioBuffer = function () {
                this._bufferSource.resumeProcessAudioBuffer()
            }, t.prototype.stopProcessAudioBuffer = function () {
                this._bufferSource.stopProcessAudioBuffer()
            }, Object.defineProperty(t.prototype, "currentState", {
                get: function () {
                    return this._bufferSource.currentState
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(t.prototype, "duration", {
                get: function () {
                    return this._bufferSource.duration
                }, enumerable: !1, configurable: !0
            }), t
        }(rn), mr = function () {
            var e = function (t, n) {
                return (e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(t, n)
            };
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }(), Er = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, yr = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        }, Sr = function (e) {
            function t(t, n, r, i) {
                var o = e.call(this, t, n.encoderConfig ? An(n.encoderConfig) : {}, i) || this;
                return o._deviceName = "default", o._config = n, o._constraints = r, n && n.microphoneId && (o._deviceName = (new dr).searchDeviceNameById(n.microphoneId) || "default"), o
            }

            return mr(t, e), t.prototype.setDevice = function (e) {
                var t = this, n = this;
                return new Promise((function (r, i) {
                    return Er(t, void 0, void 0, (function () {
                        var t, r, o, a;
                        return yr(this, (function (s) {
                            switch (s.label) {
                                case 0:
                                    return s.trys.push([0, 5, , 6]), [4, (new dr).getDeviceById(e)];
                                case 1:
                                    return (t = s.sent()) ? ((r = {}).audio = n._constraints, r.audio.deviceId = {exact: e}, n._originMediaStreamTrack.stop(), [4, gn(r)]) : [3, 4];
                                case 2:
                                    return o = s.sent(), [4, n._updateOriginMediaStreamTrack(o.getAudioTracks()[0], !0)];
                                case 3:
                                    s.sent(), n._deviceName = t.label, s.label = 4;
                                case 4:
                                    return [3, 6];
                                case 5:
                                    return a = s.sent(), i(a), [3, 6];
                                case 6:
                                    return [2]
                            }
                        }))
                    }))
                }))
            }, t
        }(rn), Tr = function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function a(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(a, s)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, gr = function (e, t) {
            var n, r, i, o, a = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function s(o) {
                return function (s) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {value: o[1], done: !1};
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, s])
                }
            }
        };
        C.use((function (e, t) {
            m.UPLOAD_LOG, t()
        }));
        var Cr = {
            onPlaybackDeviceChanged: function (e) {
            }, onMicrophoneChanged: function (e) {
            }, onCameraChanged: function (e) {
            }, onAudioAutoplayFailed: function () {
            }, VERSION: m.SDK_VERSION, createClient: function (e) {
                void 0 === e && (e = {codec: "h264", mode: "rtc"});
                if (["h264"].includes(e.codec) || (C.warning(v.INVALID_PARAMS, 'config.mode can only be set as ["h264"]"'), e.codec = "h264"), !["rtc", "live"].includes(e.mode)) throw new k(v.INVALID_PARAMS, 'config.mode can only be set as ["rtc","live"]"');
                return new ir(e)
            }, createCameraVideoTrack: function (e) {
                var t = this, n = y(5);
                return C.info("start create camera video track(track-" + n + ") with config " + JSON.stringify(e)), new Promise((function (r, i) {
                    return Tr(t, void 0, void 0, (function () {
                        var t, o, a, s, c, u;
                        return gr(this, (function (d) {
                            switch (d.label) {
                                case 0:
                                    return d.trys.push([0, 3, , 4]), [4, In(t = void 0 !== e ? e : {})];
                                case 1:
                                    return o = d.sent(), a = void 0, [4, gn({video: o})];
                                case 2:
                                    return s = d.sent(), a = s.getVideoTracks()[0], c = new hr(a, t, o, n), r(c), [3, 4];
                                case 3:
                                    return u = d.sent(), i(u), [3, 4];
                                case 4:
                                    return [2]
                            }
                        }))
                    }))
                }))
            }, createMicrophoneAudioTrack: function (e) {
                var t = this, n = y(5);
                return C.info("start create microphone audio track(track-" + n + ") with config " + JSON.stringify(e)), new Promise((function (r, i) {
                    return Tr(t, void 0, void 0, (function () {
                        var t, o, a, s, c, u;
                        return gr(this, (function (d) {
                            switch (d.label) {
                                case 0:
                                    return d.trys.push([0, 2, , 3]), o = void 0, a = void 0, o = On(t = void 0 !== e ? e : {}), a = null, [4, gn({audio: o}, !0)];
                                case 1:
                                    return s = d.sent(), a = s.getAudioTracks()[0], c = new Sr(a, t, o, n), r(c), [3, 3];
                                case 2:
                                    return u = d.sent(), i(u), [3, 3];
                                case 3:
                                    return [2]
                            }
                        }))
                    }))
                }))
            }, createMicrophoneAndCameraTracks: function (e, t) {
                var n = this, r = y(5), i = y(5);
                return C.info("start create camera video track(track-" + r + ") with config " + JSON.stringify(t) + " and create microphone auiod track(track-" + i + ") with config " + JSON.stringify(e)), new Promise((function (o, a) {
                    return Tr(n, void 0, void 0, (function () {
                        var n, s, c, u, d, f, l, p, h, v;
                        return gr(this, (function (_) {
                            switch (_.label) {
                                case 0:
                                    return _.trys.push([0, 4, , 5]), [4, On(n = void 0 !== e ? e : {})];
                                case 1:
                                    return s = _.sent(), [4, In(c = void 0 !== t ? t : {})];
                                case 2:
                                    return [4, gn({video: u = _.sent(), audio: s})];
                                case 3:
                                    return d = _.sent(), f = d.getAudioTracks()[0], l = d.getVideoTracks()[0], p = new hr(l, c, u, r), h = new Sr(f, n, s, i), o([h, p]), [3, 5];
                                case 4:
                                    return v = _.sent(), a(v), [3, 5];
                                case 5:
                                    return [2]
                            }
                        }))
                    }))
                }))
            }, createScreenVideoTrack: function (e, t) {
                var n = this;
                void 0 === t && (t = "disable");
                var r = y(5), i = y(5);
                return C.info("start create screen video track(track-" + r + ") with config " + JSON.stringify(e) + ", withAudio " + t), new Promise((function (o, a) {
                    return Tr(n, void 0, void 0, (function () {
                        var n, s, c, u, d, f, l, p, h, _, m, E;
                        return gr(this, (function (y) {
                            switch (y.label) {
                                case 0:
                                    return y.trys.push([0, 2, , 3]), s = Nn(n = void 0 !== e ? e : {}), (c = {}).screen = s, u = Dt.getBrowserInfo(), "enable" === t || "auto" === t ? "Chrome" === u.name && 73 <= Number(u.version) ? c.screenAudio = !0 : (c.screenAudio = !1, C.warning(v.NOT_SUPPORT, "your browser or platform is not support share-screen with audio")) : c.screenAudio = !1, [4, gn(c)];
                                case 1:
                                    return d = y.sent(), f = null === (m = d) || void 0 === m ? void 0 : m.getVideoTracks()[0], l = null === (E = d) || void 0 === E ? void 0 : E.getAudioTracks()[0], t && !l && C.warning("you didn't check share audio in the pop-up window when sharing the screen"), p = new Ln(f, n.encoderConfig ? s : {}, r), h = null, l && (h = new rn(l, n, i)), o(h ? [p, h] : p), [3, 3];
                                case 2:
                                    return _ = y.sent(), a(_), [3, 3];
                                case 3:
                                    return [2]
                            }
                        }))
                    }))
                }))
            }, createBufferSourceAudioTrack: function (e) {
                var t = this, n = y(5);
                return C.info("start create buffer source audio track(track-" + n + ") with config " + JSON.stringify(e)), new Promise((function (r, i) {
                    return Tr(t, void 0, void 0, (function () {
                        var t, o, a, s, c, u;
                        return gr(this, (function (d) {
                            switch (d.label) {
                                case 0:
                                    if (d.trys.push([0, 2, , 3]), t = e.source, e.cacheOnlineFile, o = e.encoderConfig, !t) throw new k(v.INVALID_PARAMS, "Cannot read property 'source' of undefined");
                                    return [4, It.decodeAsAudioBuffer(t)];
                                case 1:
                                    return a = d.sent(), s = new ar(a, n), c = new _r(t, s, o || {}, n), r(c), [3, 3];
                                case 2:
                                    return u = d.sent(), i(u), [3, 3];
                                case 3:
                                    return [2]
                            }
                        }))
                    }))
                }))
            }, createCustomAudioTrack: function (e) {
                var t = y(5);
                C.info("start create custom audio track(track-" + t + ") with config " + JSON.stringify(e));
                var n = e || {}, r = n.encoderConfig, i = n.mediaStreamTrack;
                if (!(i instanceof MediaStreamTrack)) throw new k("");
                var o = {};
                return r && (o.encoderConfig = r), new rn(i, o, t)
            }, createCustomVideoTrack: function (e) {
                var t = y(5);
                C.info("start create custom video track(track-" + t + ") with config " + JSON.stringify(e));
                var n = e || {}, r = n.bitrateMax, i = n.bitrateMin, o = n.mediaStreamTrack;
                if (!(o instanceof MediaStreamTrack)) throw new k("");
                var a = {encoderConfig: {}};
                return r && (a.encoderConfig.bitrateMax = r), i && (a.encoderConfig.bitrateMin = i), new Ln(o, a, t)
            }, disableLogUpload: function () {
                C.info("disable log upload"), m.UPLOAD_LOG = !1
            }, enableLogUpload: function () {
                C.info("enable log upload"), m.UPLOAD_LOG = !0
            }, setLogLevel: function (e) {
                C.info("set log level as " + e), C.setLogLevel(e, "ArRTC")
            }, getCameras: function () {
                return br.getCamerasDevices()
            }, getDevices: function () {
                return br.enumerateDevices()
            }, getElectronScreenSources: function (e) {
                return "string" != typeof e && (e = "screen"), Tn(e)
            }, getMicrophones: function () {
                return br.getRecordingDevices()
            }, getPlaybackDevices: function (e) {
                return br.getSpeakers(e)
            }, checkSystemRequirements: function () {
                var e = !!window.RTCPeerConnection, t = navigator.mediaDevices && navigator.mediaDevices.getUserMedia,
                    n = !!window.WebSocket, r = e && t && n, i = !1, o = Dt.getBrowserInfo();
                return "Chrome" === o.name && 58 <= Number(o.version) && o.os !== h.IOS && (i = !0), "Firefox" === o.name && 56 <= Number(o.version) && (i = !0), "OPR" === o.name && 45 <= Number(o.version) && (i = !0), "Safari" === o.name && 11 <= Number(o.version) && (i = !0), "Edge" === o.name && (i = !0), "MicroMessenger" !== Dt.getBrowserInfo().name && "QQBrowser" !== Dt.getBrowserInfo().name || o.os === h.IOS || (i = !0), C.debug("checkSystemRequirements, api:", r, "browser:", i), r && i
            }, createChannelMediaRelayConfiguration: function () {
                return ""
            }, getSupportedCodec: function () {
                var e = this;
                return new Promise((function (t, n) {
                    return Tr(e, void 0, void 0, (function () {
                        var e, r, i, o, a, s;
                        return gr(this, (function (c) {
                            switch (c.label) {
                                case 0:
                                    return c.trys.push([0, 4, , 5]), Cr.checkSystemRequirements() ? [3, 1] : (e = "Webrtc is not currently supported in browsers", C.error(e), [2, Promise.reject(e)]);
                                case 1:
                                    return (r = new RTCPeerConnection({iceServers: []})).addTransceiver("video"), r.addTransceiver("audio"), [4, r.createOffer()];
                                case 2:
                                    i = c.sent(), r.close(), o = {
                                        video: [],
                                        audio: []
                                    }, (a = i.sdp).match(/ VP8/i) && o.video.push("VP8"), a.match(/ H264/i) && o.video.push("H264"), a.match(/ opus/i) && o.audio.push("OPUS"), t(o), c.label = 3;
                                case 3:
                                    return [3, 5];
                                case 4:
                                    return s = c.sent(), n(s), [3, 5];
                                case 5:
                                    return [2]
                            }
                        }))
                    }))
                }))
            }
        }, br = new dr;
        br.on(O.PLAYOUT_DEVICE_CHANGED, (function (e) {
            C.info("playout device changed ", e), Cr.onPlaybackDeviceChanged && Cr.onPlaybackDeviceChanged(e)
        })), br.on(O.RECORDING_DEVICE_CHANGED, (function (e) {
            C.info("recording device changed ", e), Cr.onMicrophoneChanged && Cr.onMicrophoneChanged(e)
        })), br.on(O.CAMERA_DEVICE_CHANGED, (function (e) {
            C.info("camera device changed ", e), Cr.onCameraChanged && Cr.onCameraChanged(e)
        }));
        t.default = Cr
    }]).default
}));