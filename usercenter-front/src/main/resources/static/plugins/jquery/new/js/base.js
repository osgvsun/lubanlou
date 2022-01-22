!
function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    }: t(e)
} ("undefined" != typeof window ? window: this,
function(e, t) {
    function n(e) {
        var t = e.length,
        n = it.type(e);
        return "function" === n || it.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }
    function r(e, t, n) {
        if (it.isFunction(t)) return it.grep(e,
        function(e, r) {
            return !! t.call(e, r, e) !== n
        });
        if (t.nodeType) return it.grep(e,
        function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (ft.test(t)) return it.filter(t, e, n);
            t = it.filter(t, e)
        }
        return it.grep(e,
        function(e) {
            return it.inArray(e, t) >= 0 !== n
        })
    }
    function i(e, t) {
        do e = e[t];
        while (e && 1 !== e.nodeType);
        return e
    }
    function o(e) {
        var t = xt[e] = {};
        return it.each(e.match(bt) || [],
        function(e, n) {
            t[n] = !0
        }),
        t
    }
    function a() {
        ht.addEventListener ? (ht.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1)) : (ht.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
    }
    function s() { (ht.addEventListener || "load" === event.type || "complete" === ht.readyState) && (a(), it.ready())
    }
    function l(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var r = "data-" + t.replace(Et, "-$1").toLowerCase();
            if (n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null: +n + "" === n ? +n: Nt.test(n) ? it.parseJSON(n) : n
                } catch(i) {}
                it.data(e, t, n)
            } else n = void 0
        }
        return n
    }
    function u(e) {
        var t;
        for (t in e) if (("data" !== t || !it.isEmptyObject(e[t])) && "toJSON" !== t) return ! 1;
        return ! 0
    }
    function c(e, t, n, r) {
        if (it.acceptData(e)) {
            var i, o, a = it.expando,
            s = e.nodeType,
            l = s ? it.cache: e,
            u = s ? e[a] : e[a] && a;
            if (u && l[u] && (r || l[u].data) || void 0 !== n || "string" != typeof t) return u || (u = s ? e[a] = J.pop() || it.guid++:a),
            l[u] || (l[u] = s ? {}: {
                toJSON: it.noop
            }),
            ("object" == typeof t || "function" == typeof t) && (r ? l[u] = it.extend(l[u], t) : l[u].data = it.extend(l[u].data, t)),
            o = l[u],
            r || (o.data || (o.data = {}), o = o.data),
            void 0 !== n && (o[it.camelCase(t)] = n),
            "string" == typeof t ? (i = o[t], null == i && (i = o[it.camelCase(t)])) : i = o,
            i
        }
    }
    function d(e, t, n) {
        if (it.acceptData(e)) {
            var r, i, o = e.nodeType,
            a = o ? it.cache: e,
            s = o ? e[it.expando] : it.expando;
            if (a[s]) {
                if (t && (r = n ? a[s] : a[s].data)) {
                    it.isArray(t) ? t = t.concat(it.map(t, it.camelCase)) : t in r ? t = [t] : (t = it.camelCase(t), t = t in r ? [t] : t.split(" ")),
                    i = t.length;
                    for (; i--;) delete r[t[i]];
                    if (n ? !u(r) : !it.isEmptyObject(r)) return
                } (n || (delete a[s].data, u(a[s]))) && (o ? it.cleanData([e], !0) : nt.deleteExpando || a != a.window ? delete a[s] : a[s] = null)
            }
        }
    }
    function f() {
        return ! 0
    }
    function p() {
        return ! 1
    }
    function h() {
        try {
            return ht.activeElement
        } catch(e) {}
    }
    function m(e) {
        var t = Ot.split("|"),
        n = e.createDocumentFragment();
        if (n.createElement) for (; t.length;) n.createElement(t.pop());
        return n
    }
    function g(e, t) {
        var n, r, i = 0,
        o = typeof e.getElementsByTagName !== Ct ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== Ct ? e.querySelectorAll(t || "*") : void 0;
        if (!o) for (o = [], n = e.childNodes || e; null != (r = n[i]); i++) ! t || it.nodeName(r, t) ? o.push(r) : it.merge(o, g(r, t));
        return void 0 === t || t && it.nodeName(e, t) ? it.merge([e], o) : o
    }
    function v(e) {
        jt.test(e.type) && (e.defaultChecked = e.checked)
    }
    function y(e, t) {
        return it.nodeName(e, "table") && it.nodeName(11 !== t.nodeType ? t: t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function b(e) {
        return e.type = (null !== it.find.attr(e, "type")) + "/" + e.type,
        e
    }
    function x(e) {
        var t = Vt.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"),
        e
    }
    function w(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++) it._data(n, "globalEval", !t || it._data(t[r], "globalEval"))
    }
    function T(e, t) {
        if (1 === t.nodeType && it.hasData(e)) {
            var n, r, i, o = it._data(e),
            a = it._data(t, o),
            s = o.events;
            if (s) {
                delete a.handle,
                a.events = {};
                for (n in s) for (r = 0, i = s[n].length; i > r; r++) it.event.add(t, n, s[n][r])
            }
            a.data && (a.data = it.extend({},
            a.data))
        }
    }
    function C(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !nt.noCloneEvent && t[it.expando]) {
                i = it._data(t);
                for (r in i.events) it.removeEvent(t, r, i.handle);
                t.removeAttribute(it.expando)
            }
            "script" === n && t.text !== e.text ? (b(t).text = e.text, x(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), nt.html5Clone && e.innerHTML && !it.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && jt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected: ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }
    function N(t, n) {
        var r, i = it(n.createElement(t)).appendTo(n.body),
        o = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display: it.css(i[0], "display");
        return i.detach(),
        o
    }
    function E(e) {
        var t = ht,
        n = Zt[e];
        return n || (n = N(e, t), "none" !== n && n || (Kt = (Kt || it("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Kt[0].contentWindow || Kt[0].contentDocument).document, t.write(), t.close(), n = N(e, t), Kt.detach()), Zt[e] = n),
        n
    }
    function k(e, t) {
        return {
            get: function() {
                var n = e();
                return null != n ? n ? void delete this.get: (this.get = t).apply(this, arguments) : void 0
            }
        }
    }
    function S(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = pn.length; i--;) if (t = pn[i] + n, t in e) return t;
        return r
    }
    function A(e, t) {
        for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++) r = e[a],
        r.style && (o[a] = it._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && At(r) && (o[a] = it._data(r, "olddisplay", E(r.nodeName)))) : (i = At(r), (n && "none" !== n || !i) && it._data(r, "olddisplay", i ? n: it.css(r, "display"))));
        for (a = 0; s > a; a++) r = e[a],
        r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "": "none"));
        return e
    }
    function D(e, t, n) {
        var r = un.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }
    function j(e, t, n, r, i) {
        for (var o = n === (r ? "border": "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2)"margin" === n && (a += it.css(e, n + St[o], !0, i)),
        r ? ("content" === n && (a -= it.css(e, "padding" + St[o], !0, i)), "margin" !== n && (a -= it.css(e, "border" + St[o] + "Width", !0, i))) : (a += it.css(e, "padding" + St[o], !0, i), "padding" !== n && (a += it.css(e, "border" + St[o] + "Width", !0, i)));
        return a
    }
    function L(e, t, n) {
        var r = !0,
        i = "width" === t ? e.offsetWidth: e.offsetHeight,
        o = en(e),
        a = nt.boxSizing && "border-box" === it.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = tn(e, t, o), (0 > i || null == i) && (i = e.style[t]), rn.test(i)) return i;
            r = a && (nt.boxSizingReliable() || i === e.style[t]),
            i = parseFloat(i) || 0
        }
        return i + j(e, t, n || (a ? "border": "content"), r, o) + "px"
    }
    function H(e, t, n, r, i) {
        return new H.prototype.init(e, t, n, r, i)
    }
    function _() {
        return setTimeout(function() {
            hn = void 0
        }),
        hn = it.now()
    }
    function q(e, t) {
        var n, r = {
            height: e
        },
        i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = St[i],
        r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e),
        r
    }
    function M(e, t, n) {
        for (var r, i = (xn[t] || []).concat(xn["*"]), o = 0, a = i.length; a > o; o++) if (r = i[o].call(n, t, e)) return r
    }
    function O(e, t, n) {
        var r, i, o, a, s, l, u, c, d = this,
        f = {},
        p = e.style,
        h = e.nodeType && At(e),
        m = it._data(e, "fxshow");
        n.queue || (s = it._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function() {
            s.unqueued || l()
        }), s.unqueued++, d.always(function() {
            d.always(function() {
                s.unqueued--,
                it.queue(e, "fx").length || s.empty.fire()
            })
        })),
        1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], u = it.css(e, "display"), c = "none" === u ? it._data(e, "olddisplay") || E(e.nodeName) : u, "inline" === c && "none" === it.css(e, "float") && (nt.inlineBlockNeedsLayout && "inline" !== E(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")),
        n.overflow && (p.overflow = "hidden", nt.shrinkWrapBlocks() || d.always(function() {
            p.overflow = n.overflow[0],
            p.overflowX = n.overflow[1],
            p.overflowY = n.overflow[2]
        }));
        for (r in t) if (i = t[r], gn.exec(i)) {
            if (delete t[r], o = o || "toggle" === i, i === (h ? "hide": "show")) {
                if ("show" !== i || !m || void 0 === m[r]) continue;
                h = !0
            }
            f[r] = m && m[r] || it.style(e, r)
        } else u = void 0;
        if (it.isEmptyObject(f))"inline" === ("none" === u ? E(e.nodeName) : u) && (p.display = u);
        else {
            m ? "hidden" in m && (h = m.hidden) : m = it._data(e, "fxshow", {}),
            o && (m.hidden = !h),
            h ? it(e).show() : d.done(function() {
                it(e).hide()
            }),
            d.done(function() {
                var t;
                it._removeData(e, "fxshow");
                for (t in f) it.style(e, t, f[t])
            });
            for (r in f) a = M(h ? m[r] : 0, r, d),
            r in m || (m[r] = a.start, h && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
        }
    }
    function F(e, t) {
        var n, r, i, o, a;
        for (n in e) if (r = it.camelCase(n), i = t[r], o = e[n], it.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = it.cssHooks[r], a && "expand" in a) {
            o = a.expand(o),
            delete e[r];
            for (n in o) n in e || (e[n] = o[n], t[n] = i)
        } else t[r] = i
    }
    function B(e, t, n) {
        var r, i, o = 0,
        a = bn.length,
        s = it.Deferred().always(function() {
            delete l.elem
        }),
        l = function() {
            if (i) return ! 1;
            for (var t = hn || _(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, a = 0, l = u.tweens.length; l > a; a++) u.tweens[a].run(o);
            return s.notifyWith(e, [u, o, n]),
            1 > o && l ? n: (s.resolveWith(e, [u]), !1)
        },
        u = s.promise({
            elem: e,
            props: it.extend({},
            t),
            opts: it.extend(!0, {
                specialEasing: {}
            },
            n),
            originalProperties: t,
            originalOptions: n,
            startTime: hn || _(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var r = it.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                return u.tweens.push(r),
                r
            },
            stop: function(t) {
                var n = 0,
                r = t ? u.tweens.length: 0;
                if (i) return this;
                for (i = !0; r > n; n++) u.tweens[n].run(1);
                return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]),
                this
            }
        }),
        c = u.props;
        for (F(c, u.opts.specialEasing); a > o; o++) if (r = bn[o].call(u, e, c, u.opts)) return r;
        return it.map(c, M, u),
        it.isFunction(u.opts.start) && u.opts.start.call(e, u),
        it.fx.timer(it.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })),
        u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }
    function P(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
            o = t.toLowerCase().match(bt) || [];
            if (it.isFunction(n)) for (; r = o[i++];)"+" === r.charAt(0) ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }
    function R(e, t, n, r) {
        function i(s) {
            var l;
            return o[s] = !0,
            it.each(e[s] || [],
            function(e, s) {
                var u = s(t, n, r);
                return "string" != typeof u || a || o[u] ? a ? !(l = u) : void 0 : (t.dataTypes.unshift(u), i(u), !1)
            }),
            l
        }
        var o = {},
        a = e === In;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }
    function W(e, t) {
        var n, r, i = it.ajaxSettings.flatOptions || {};
        for (r in t) void 0 !== t[r] && ((i[r] ? e: n || (n = {}))[r] = t[r]);
        return n && it.extend(!0, e, n),
        e
    }
    function $(e, t, n) {
        for (var r, i, o, a, s = e.contents,
        l = e.dataTypes;
        "*" === l[0];) l.shift(),
        void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i) for (a in s) if (s[a] && s[a].test(i)) {
            l.unshift(a);
            break
        }
        if (l[0] in n) o = l[0];
        else {
            for (a in n) {
                if (!l[0] || e.converters[a + " " + l[0]]) {
                    o = a;
                    break
                }
                r || (r = a)
            }
            o = o || r
        }
        return o ? (o !== l[0] && l.unshift(o), n[o]) : void 0
    }
    function z(e, t, n, r) {
        var i, o, a, s, l, u = {},
        c = e.dataTypes.slice();
        if (c[1]) for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
        for (o = c.shift(); o;) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift()) if ("*" === o) o = l;
        else if ("*" !== l && l !== o) {
            if (a = u[l + " " + o] || u["* " + o], !a) for (i in u) if (s = i.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], c.unshift(s[1]));
                break
            }
            if (a !== !0) if (a && e["throws"]) t = a(t);
            else try {
                t = a(t)
            } catch(d) {
                return {
                    state: "parsererror",
                    error: a ? d: "No conversion from " + l + " to " + o
                }
            }
        }
        return {
            state: "success",
            data: t
        }
    }
    function I(e, t, n, r) {
        var i;
        if (it.isArray(t)) it.each(t,
        function(t, i) {
            n || Jn.test(e) ? r(e, i) : I(e + "[" + ("object" == typeof i ? t: "") + "]", i, n, r)
        });
        else if (n || "object" !== it.type(t)) r(e, t);
        else for (i in t) I(e + "[" + i + "]", t[i], n, r)
    }
    function X() {
        try {
            return new e.XMLHttpRequest
        } catch(t) {}
    }
    function U() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch(t) {}
    }
    function V(e) {
        return it.isWindow(e) ? e: 9 === e.nodeType ? e.defaultView || e.parentWindow: !1
    }
    var J = [],
    Y = J.slice,
    G = J.concat,
    Q = J.push,
    K = J.indexOf,
    Z = {},
    et = Z.toString,
    tt = Z.hasOwnProperty,
    nt = {},
    rt = "1.11.1",
    it = function(e, t) {
        return new it.fn.init(e, t)
    },
    ot = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    at = /^-ms-/,
    st = /-([\da-z])/gi,
    lt = function(e, t) {
        return t.toUpperCase()
    };
    it.fn = it.prototype = {
        jquery: rt,
        constructor: it,
        selector: "",
        length: 0,
        toArray: function() {
            return Y.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : Y.call(this)
        },
        pushStack: function(e) {
            var t = it.merge(this.constructor(), e);
            return t.prevObject = this,
            t.context = this.context,
            t
        },
        each: function(e, t) {
            return it.each(this, e, t)
        },
        map: function(e) {
            return this.pushStack(it.map(this,
            function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(Y.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq( - 1)
        },
        eq: function(e) {
            var t = this.length,
            n = +e + (0 > e ? t: 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: Q,
        sort: J.sort,
        splice: J.splice
    },
    it.extend = it.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {},
        s = 1,
        l = arguments.length,
        u = !1;
        for ("boolean" == typeof a && (u = a, a = arguments[s] || {},
        s++), "object" == typeof a || it.isFunction(a) || (a = {}), s === l && (a = this, s--); l > s; s++) if (null != (i = arguments[s])) for (r in i) e = a[r],
        n = i[r],
        a !== n && (u && n && (it.isPlainObject(n) || (t = it.isArray(n))) ? (t ? (t = !1, o = e && it.isArray(e) ? e: []) : o = e && it.isPlainObject(e) ? e: {},
        a[r] = it.extend(u, o, n)) : void 0 !== n && (a[r] = n));
        return a
    },
    it.extend({
        expando: "jQuery" + (rt + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === it.type(e)
        },
        isArray: Array.isArray ||
        function(e) {
            return "array" === it.type(e)
        },
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            return ! it.isArray(e) && e - parseFloat(e) >= 0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return ! 1;
            return ! 0
        },
        isPlainObject: function(e) {
            var t;
            if (!e || "object" !== it.type(e) || e.nodeType || it.isWindow(e)) return ! 1;
            try {
                if (e.constructor && !tt.call(e, "constructor") && !tt.call(e.constructor.prototype, "isPrototypeOf")) return ! 1
            } catch(n) {
                return ! 1
            }
            if (nt.ownLast) for (t in e) return tt.call(e, t);
            for (t in e);
            return void 0 === t || tt.call(e, t)
        },
        type: function(e) {
            return null == e ? e + "": "object" == typeof e || "function" == typeof e ? Z[et.call(e)] || "object": typeof e
        },
        globalEval: function(t) {
            t && it.trim(t) && (e.execScript ||
            function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(at, "ms-").replace(st, lt)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, r) {
            var i, o = 0,
            a = e.length,
            s = n(e);
            if (r) {
                if (s) for (; a > o && (i = t.apply(e[o], r), i !== !1); o++);
                else for (o in e) if (i = t.apply(e[o], r), i === !1) break
            } else if (s) for (; a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++);
            else for (o in e) if (i = t.call(e[o], o, e[o]), i === !1) break;
            return e
        },
        trim: function(e) {
            return null == e ? "": (e + "").replace(ot, "")
        },
        makeArray: function(e, t) {
            var r = t || [];
            return null != e && (n(Object(e)) ? it.merge(r, "string" == typeof e ? [e] : e) : Q.call(r, e)),
            r
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (K) return K.call(t, e, n);
                for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n: 0; r > n; n++) if (n in t && t[n] === e) return n
            }
            return - 1
        },
        merge: function(e, t) {
            for (var n = +t.length,
            r = 0,
            i = e.length; n > r;) e[i++] = t[r++];
            if (n !== n) for (; void 0 !== t[r];) e[i++] = t[r++];
            return e.length = i,
            e
        },
        grep: function(e, t, n) {
            for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++) r = !t(e[o], o),
            r !== s && i.push(e[o]);
            return i
        },
        map: function(e, t, r) {
            var i, o = 0,
            a = e.length,
            s = n(e),
            l = [];
            if (s) for (; a > o; o++) i = t(e[o], o, r),
            null != i && l.push(i);
            else for (o in e) i = t(e[o], o, r),
            null != i && l.push(i);
            return G.apply([], l)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            return "string" == typeof t && (i = e[t], t = e, e = i),
            it.isFunction(e) ? (n = Y.call(arguments, 2), r = function() {
                return e.apply(t || this, n.concat(Y.call(arguments)))
            },
            r.guid = e.guid = e.guid || it.guid++, r) : void 0
        },
        now: function() {
            return + new Date
        },
        support: nt
    }),
    it.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
    function(e, t) {
        Z["[object " + t + "]"] = t.toLowerCase()
    });
    var ut = function(e) {
        function t(e, t, n, r) {
            var i, o, a, s, l, u, d, p, h, m;
            if ((t ? t.ownerDocument || t: R) !== H && L(t), t = t || H, n = n || [], !e || "string" != typeof e) return n;
            if (1 !== (s = t.nodeType) && 9 !== s) return [];
            if (q && !r) {
                if (i = yt.exec(e)) if (a = i[1]) {
                    if (9 === s) {
                        if (o = t.getElementById(a), !o || !o.parentNode) return n;
                        if (o.id === a) return n.push(o),
                        n
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && B(t, o) && o.id === a) return n.push(o),
                    n
                } else {
                    if (i[2]) return Z.apply(n, t.getElementsByTagName(e)),
                    n;
                    if ((a = i[3]) && w.getElementsByClassName && t.getElementsByClassName) return Z.apply(n, t.getElementsByClassName(a)),
                    n
                }
                if (w.qsa && (!M || !M.test(e))) {
                    if (p = d = P, h = t, m = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                        for (u = E(e), (d = t.getAttribute("id")) ? p = d.replace(xt, "\\$&") : t.setAttribute("id", p), p = "[id='" + p + "'] ", l = u.length; l--;) u[l] = p + f(u[l]);
                        h = bt.test(e) && c(t.parentNode) || t,
                        m = u.join(",")
                    }
                    if (m) try {
                        return Z.apply(n, h.querySelectorAll(m)),
                        n
                    } catch(g) {} finally {
                        d || t.removeAttribute("id")
                    }
                }
            }
            return S(e.replace(lt, "$1"), t, n, r)
        }
        function n() {
            function e(n, r) {
                return t.push(n + " ") > T.cacheLength && delete e[t.shift()],
                e[n + " "] = r
            }
            var t = [];
            return e
        }
        function r(e) {
            return e[P] = !0,
            e
        }
        function i(e) {
            var t = H.createElement("div");
            try {
                return !! e(t)
            } catch(n) {
                return ! 1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function o(e, t) {
            for (var n = e.split("|"), r = e.length; r--;) T.attrHandle[n[r]] = t
        }
        function a(e, t) {
            var n = t && e,
            r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || J) - (~e.sourceIndex || J);
            if (r) return r;
            if (n) for (; n = n.nextSibling;) if (n === t) return - 1;
            return e ? 1 : -1
        }
        function s(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }
        function l(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function u(e) {
            return r(function(t) {
                return t = +t,
                r(function(n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }
        function c(e) {
            return e && typeof e.getElementsByTagName !== V && e
        }
        function d() {}
        function f(e) {
            for (var t = 0,
            n = e.length,
            r = ""; n > t; t++) r += e[t].value;
            return r
        }
        function p(e, t, n) {
            var r = t.dir,
            i = n && "parentNode" === r,
            o = $++;
            return t.first ?
            function(t, n, o) {
                for (; t = t[r];) if (1 === t.nodeType || i) return e(t, n, o)
            }: function(t, n, a) {
                var s, l, u = [W, o];
                if (a) {
                    for (; t = t[r];) if ((1 === t.nodeType || i) && e(t, n, a)) return ! 0
                } else for (; t = t[r];) if (1 === t.nodeType || i) {
                    if (l = t[P] || (t[P] = {}), (s = l[r]) && s[0] === W && s[1] === o) return u[2] = s[2];
                    if (l[r] = u, u[2] = e(t, n, a)) return ! 0
                }
            }
        }
        function h(e) {
            return e.length > 1 ?
            function(t, n, r) {
                for (var i = e.length; i--;) if (!e[i](t, n, r)) return ! 1;
                return ! 0
            }: e[0]
        }
        function m(e, n, r) {
            for (var i = 0,
            o = n.length; o > i; i++) t(e, n[i], r);
            return r
        }
        function g(e, t, n, r, i) {
            for (var o, a = [], s = 0, l = e.length, u = null != t; l > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), u && t.push(s));
            return a
        }
        function v(e, t, n, i, o, a) {
            return i && !i[P] && (i = v(i)),
            o && !o[P] && (o = v(o, a)),
            r(function(r, a, s, l) {
                var u, c, d, f = [],
                p = [],
                h = a.length,
                v = r || m(t || "*", s.nodeType ? [s] : s, []),
                y = !e || !r && t ? v: g(v, f, e, s, l),
                b = n ? o || (r ? e: h || i) ? [] : a: y;
                if (n && n(y, b, s, l), i) for (u = g(b, p), i(u, [], s, l), c = u.length; c--;)(d = u[c]) && (b[p[c]] = !(y[p[c]] = d));
                if (r) {
                    if (o || e) {
                        if (o) {
                            for (u = [], c = b.length; c--;)(d = b[c]) && u.push(y[c] = d);
                            o(null, b = [], u, l)
                        }
                        for (c = b.length; c--;)(d = b[c]) && (u = o ? tt.call(r, d) : f[c]) > -1 && (r[u] = !(a[u] = d))
                    }
                } else b = g(b === a ? b.splice(h, b.length) : b),
                o ? o(null, a, b, l) : Z.apply(a, b)
            })
        }
        function y(e) {
            for (var t, n, r, i = e.length,
            o = T.relative[e[0].type], a = o || T.relative[" "], s = o ? 1 : 0, l = p(function(e) {
                return e === t
            },
            a, !0), u = p(function(e) {
                return tt.call(t, e) > -1
            },
            a, !0), c = [function(e, n, r) {
                return ! o && (r || n !== A) || ((t = n).nodeType ? l(e, n, r) : u(e, n, r))
            }]; i > s; s++) if (n = T.relative[e[s].type]) c = [p(h(c), n)];
            else {
                if (n = T.filter[e[s].type].apply(null, e[s].matches), n[P]) {
                    for (r = ++s; i > r && !T.relative[e[r].type]; r++);
                    return v(s > 1 && h(c), s > 1 && f(e.slice(0, s - 1).concat({
                        value: " " === e[s - 2].type ? "*": ""
                    })).replace(lt, "$1"), n, r > s && y(e.slice(s, r)), i > r && y(e = e.slice(r)), i > r && f(e))
                }
                c.push(n)
            }
            return h(c)
        }
        function b(e, n) {
            var i = n.length > 0,
            o = e.length > 0,
            a = function(r, a, s, l, u) {
                var c, d, f, p = 0,
                h = "0",
                m = r && [],
                v = [],
                y = A,
                b = r || o && T.find.TAG("*", u),
                x = W += null == y ? 1 : Math.random() || .1,
                w = b.length;
                for (u && (A = a !== H && a); h !== w && null != (c = b[h]); h++) {
                    if (o && c) {
                        for (d = 0; f = e[d++];) if (f(c, a, s)) {
                            l.push(c);
                            break
                        }
                        u && (W = x)
                    }
                    i && ((c = !f && c) && p--, r && m.push(c))
                }
                if (p += h, i && h !== p) {
                    for (d = 0; f = n[d++];) f(m, v, a, s);
                    if (r) {
                        if (p > 0) for (; h--;) m[h] || v[h] || (v[h] = Q.call(l));
                        v = g(v)
                    }
                    Z.apply(l, v),
                    u && !r && v.length > 0 && p + n.length > 1 && t.uniqueSort(l)
                }
                return u && (W = x, A = y),
                m
            };
            return i ? r(a) : a
        }
        var x, w, T, C, N, E, k, S, A, D, j, L, H, _, q, M, O, F, B, P = "sizzle" + -new Date,
        R = e.document,
        W = 0,
        $ = 0,
        z = n(),
        I = n(),
        X = n(),
        U = function(e, t) {
            return e === t && (j = !0),
            0
        },
        V = "undefined",
        J = 1 << 31,
        Y = {}.hasOwnProperty,
        G = [],
        Q = G.pop,
        K = G.push,
        Z = G.push,
        et = G.slice,
        tt = G.indexOf ||
        function(e) {
            for (var t = 0,
            n = this.length; n > t; t++) if (this[t] === e) return t;
            return - 1
        },
        nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        rt = "[\\x20\\t\\r\\n\\f]",
        it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        ot = it.replace("w", "w#"),
        at = "\\[" + rt + "*(" + it + ")(?:" + rt + "*([*^$|!~]?=)" + rt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ot + "))|)" + rt + "*\\]",
        st = ":(" + it + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + at + ")*)|.*)\\)|)",
        lt = new RegExp("^" + rt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + rt + "+$", "g"),
        ut = new RegExp("^" + rt + "*," + rt + "*"),
        ct = new RegExp("^" + rt + "*([>+~]|" + rt + ")" + rt + "*"),
        dt = new RegExp("=" + rt + "*([^\\]'\"]*?)" + rt + "*\\]", "g"),
        ft = new RegExp(st),
        pt = new RegExp("^" + ot + "$"),
        ht = {
            ID: new RegExp("^#(" + it + ")"),
            CLASS: new RegExp("^\\.(" + it + ")"),
            TAG: new RegExp("^(" + it.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + at),
            PSEUDO: new RegExp("^" + st),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + rt + "*(even|odd|(([+-]|)(\\d*)n|)" + rt + "*(?:([+-]|)" + rt + "*(\\d+)|))" + rt + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + nt + ")$", "i"),
            needsContext: new RegExp("^" + rt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + rt + "*((?:-\\d)?\\d*)" + rt + "*\\)|)(?=[^-]|$)", "i")
        },
        mt = /^(?:input|select|textarea|button)$/i,
        gt = /^h\d$/i,
        vt = /^[^{]+\{\s*\[native \w/,
        yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        bt = /[+~]/,
        xt = /'|\\/g,
        wt = new RegExp("\\\\([\\da-f]{1,6}" + rt + "?|(" + rt + ")|.)", "ig"),
        Tt = function(e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t: 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        };
        try {
            Z.apply(G = et.call(R.childNodes), R.childNodes),
            G[R.childNodes.length].nodeType
        } catch(Ct) {
            Z = {
                apply: G.length ?
                function(e, t) {
                    K.apply(e, et.call(t))
                }: function(e, t) {
                    for (var n = e.length,
                    r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        w = t.support = {},
        N = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName: !1
        },
        L = t.setDocument = function(e) {
            var t, n = e ? e.ownerDocument || e: R,
            r = n.defaultView;
            return n !== H && 9 === n.nodeType && n.documentElement ? (H = n, _ = n.documentElement, q = !N(n), r && r !== r.top && (r.addEventListener ? r.addEventListener("unload",
            function() {
                L()
            },
            !1) : r.attachEvent && r.attachEvent("onunload",
            function() {
                L()
            })), w.attributes = i(function(e) {
                return e.className = "i",
                !e.getAttribute("className")
            }), w.getElementsByTagName = i(function(e) {
                return e.appendChild(n.createComment("")),
                !e.getElementsByTagName("*").length
            }), w.getElementsByClassName = vt.test(n.getElementsByClassName) && i(function(e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>",
                e.firstChild.className = "i",
                2 === e.getElementsByClassName("i").length
            }), w.getById = i(function(e) {
                return _.appendChild(e).id = P,
                !n.getElementsByName || !n.getElementsByName(P).length
            }), w.getById ? (T.find.ID = function(e, t) {
                if (typeof t.getElementById !== V && q) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            },
            T.filter.ID = function(e) {
                var t = e.replace(wt, Tt);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete T.find.ID, T.filter.ID = function(e) {
                var t = e.replace(wt, Tt);
                return function(e) {
                    var n = typeof e.getAttributeNode !== V && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), T.find.TAG = w.getElementsByTagName ?
            function(e, t) {
                return typeof t.getElementsByTagName !== V ? t.getElementsByTagName(e) : void 0
            }: function(e, t) {
                var n, r = [],
                i = 0,
                o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            },
            T.find.CLASS = w.getElementsByClassName &&
            function(e, t) {
                return typeof t.getElementsByClassName !== V && q ? t.getElementsByClassName(e) : void 0
            },
            O = [], M = [], (w.qsa = vt.test(n.querySelectorAll)) && (i(function(e) {
                e.innerHTML = "<select msallowclip=''><option selected=''></option></select>",
                e.querySelectorAll("[msallowclip^='']").length && M.push("[*^$]=" + rt + "*(?:''|\"\")"),
                e.querySelectorAll("[selected]").length || M.push("\\[" + rt + "*(?:value|" + nt + ")"),
                e.querySelectorAll(":checked").length || M.push(":checked")
            }), i(function(e) {
                var t = n.createElement("input");
                t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && M.push("name" + rt + "*[*^$|!~]?="),
                e.querySelectorAll(":enabled").length || M.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                M.push(",.*:")
            })), (w.matchesSelector = vt.test(F = _.matches || _.webkitMatchesSelector || _.mozMatchesSelector || _.oMatchesSelector || _.msMatchesSelector)) && i(function(e) {
                w.disconnectedMatch = F.call(e, "div"),
                F.call(e, "[s!='']:x"),
                O.push("!=", st)
            }), M = M.length && new RegExp(M.join("|")), O = O.length && new RegExp(O.join("|")), t = vt.test(_.compareDocumentPosition), B = t || vt.test(_.contains) ?
            function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement: e,
                r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            }: function(e, t) {
                if (t) for (; t = t.parentNode;) if (t === e) return ! 0;
                return ! 1
            },
            U = t ?
            function(e, t) {
                if (e === t) return j = !0,
                0;
                var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return r ? r: (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !w.sortDetached && t.compareDocumentPosition(e) === r ? e === n || e.ownerDocument === R && B(R, e) ? -1 : t === n || t.ownerDocument === R && B(R, t) ? 1 : D ? tt.call(D, e) - tt.call(D, t) : 0 : 4 & r ? -1 : 1)
            }: function(e, t) {
                if (e === t) return j = !0,
                0;
                var r, i = 0,
                o = e.parentNode,
                s = t.parentNode,
                l = [e],
                u = [t];
                if (!o || !s) return e === n ? -1 : t === n ? 1 : o ? -1 : s ? 1 : D ? tt.call(D, e) - tt.call(D, t) : 0;
                if (o === s) return a(e, t);
                for (r = e; r = r.parentNode;) l.unshift(r);
                for (r = t; r = r.parentNode;) u.unshift(r);
                for (; l[i] === u[i];) i++;
                return i ? a(l[i], u[i]) : l[i] === R ? -1 : u[i] === R ? 1 : 0
            },
            n) : H
        },
        t.matches = function(e, n) {
            return t(e, null, null, n)
        },
        t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== H && L(e), n = n.replace(dt, "='$1']"), !(!w.matchesSelector || !q || O && O.test(n) || M && M.test(n))) try {
                var r = F.call(e, n);
                if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch(i) {}
            return t(n, H, null, [e]).length > 0
        },
        t.contains = function(e, t) {
            return (e.ownerDocument || e) !== H && L(e),
            B(e, t)
        },
        t.attr = function(e, t) { (e.ownerDocument || e) !== H && L(e);
            var n = T.attrHandle[t.toLowerCase()],
            r = n && Y.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !q) : void 0;
            return void 0 !== r ? r: w.attributes || !q ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value: null
        },
        t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        },
        t.uniqueSort = function(e) {
            var t, n = [],
            r = 0,
            i = 0;
            if (j = !w.detectDuplicates, D = !w.sortStable && e.slice(0), e.sort(U), j) {
                for (; t = e[i++];) t === e[i] && (r = n.push(i));
                for (; r--;) e.splice(n[r], 1)
            }
            return D = null,
            e
        },
        C = t.getText = function(e) {
            var t, n = "",
            r = 0,
            i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += C(e)
                } else if (3 === i || 4 === i) return e.nodeValue
            } else for (; t = e[r++];) n += C(t);
            return n
        },
        T = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: ht,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(wt, Tt),
                    e[3] = (e[3] || e[4] || e[5] || "").replace(wt, Tt),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return ht.CHILD.test(e[0]) ? null: (e[3] ? e[2] = e[4] || e[5] || "": n && ft.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(wt, Tt).toLowerCase();
                    return "*" === e ?
                    function() {
                        return ! 0
                    }: function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = z[e + " "];
                    return t || (t = new RegExp("(^|" + rt + ")" + e + "(" + rt + "|$)")) && z(e,
                    function(e) {
                        return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== V && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, r) {
                    return function(i) {
                        var o = t.attr(i, e);
                        return null == o ? "!=" === n: n ? (o += "", "=" === n ? o === r: "!=" === n ? o !== r: "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice( - r.length) === r: "~=" === n ? (" " + o + " ").indexOf(r) > -1 : "|=" === n ? o === r || o.slice(0, r.length + 1) === r + "-": !1) : !0
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3),
                    a = "last" !== e.slice( - 4),
                    s = "of-type" === t;
                    return 1 === r && 0 === i ?
                    function(e) {
                        return !! e.parentNode
                    }: function(t, n, l) {
                        var u, c, d, f, p, h, m = o !== a ? "nextSibling": "previousSibling",
                        g = t.parentNode,
                        v = s && t.nodeName.toLowerCase(),
                        y = !l && !s;
                        if (g) {
                            if (o) {
                                for (; m;) {
                                    for (d = t; d = d[m];) if (s ? d.nodeName.toLowerCase() === v: 1 === d.nodeType) return ! 1;
                                    h = m = "only" === e && !h && "nextSibling"
                                }
                                return ! 0
                            }
                            if (h = [a ? g.firstChild: g.lastChild], a && y) {
                                for (c = g[P] || (g[P] = {}), u = c[e] || [], p = u[0] === W && u[1], f = u[0] === W && u[2], d = p && g.childNodes[p]; d = ++p && d && d[m] || (f = p = 0) || h.pop();) if (1 === d.nodeType && ++f && d === t) {
                                    c[e] = [W, p, f];
                                    break
                                }
                            } else if (y && (u = (t[P] || (t[P] = {}))[e]) && u[0] === W) f = u[1];
                            else for (; (d = ++p && d && d[m] || (f = p = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== v: 1 !== d.nodeType) || !++f || (y && ((d[P] || (d[P] = {}))[e] = [W, f]), d !== t)););
                            return f -= i,
                            f === r || f % r === 0 && f / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var i, o = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[P] ? o(n) : o.length > 1 ? (i = [e, e, "", n], T.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                        for (var r, i = o(e, n), a = i.length; a--;) r = tt.call(e, i[a]),
                        e[r] = !(t[r] = i[a])
                    }) : function(e) {
                        return o(e, 0, i)
                    }) : o
                }
            },
            pseudos: {
                not: r(function(e) {
                    var t = [],
                    n = [],
                    i = k(e.replace(lt, "$1"));
                    return i[P] ? r(function(e, t, n, r) {
                        for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, r, o) {
                        return t[0] = e,
                        i(t, null, o, n),
                        !n.pop()
                    }
                }),
                has: r(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: r(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                    }
                }),
                lang: r(function(e) {
                    return pt.test(e || "") || t.error("unsupported lang: " + e),
                    e = e.replace(wt, Tt).toLowerCase(),
                    function(t) {
                        var n;
                        do
                        if (n = q ? t.lang: t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(),
                        n === e || 0 === n.indexOf(e + "-");
                        while ((t = t.parentNode) && 1 === t.nodeType);
                        return ! 1
                    }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === _
                },
                focus: function(e) {
                    return e === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return ! 1;
                    return ! 0
                },
                parent: function(e) {
                    return ! T.pseudos.empty(e)
                },
                header: function(e) {
                    return gt.test(e.nodeName)
                },
                input: function(e) {
                    return mt.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: u(function() {
                    return [0]
                }),
                last: u(function(e, t) {
                    return [t - 1]
                }),
                eq: u(function(e, t, n) {
                    return [0 > n ? n + t: n]
                }),
                even: u(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: u(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: u(function(e, t, n) {
                    for (var r = 0 > n ? n + t: n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: u(function(e, t, n) {
                    for (var r = 0 > n ? n + t: n; ++r < t;) e.push(r);
                    return e
                })
            }
        },
        T.pseudos.nth = T.pseudos.eq;
        for (x in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) T.pseudos[x] = s(x);
        for (x in {
            submit: !0,
            reset: !0
        }) T.pseudos[x] = l(x);
        return d.prototype = T.filters = T.pseudos,
        T.setFilters = new d,
        E = t.tokenize = function(e, n) {
            var r, i, o, a, s, l, u, c = I[e + " "];
            if (c) return n ? 0 : c.slice(0);
            for (s = e, l = [], u = T.preFilter; s;) { (!r || (i = ut.exec(s))) && (i && (s = s.slice(i[0].length) || s), l.push(o = [])),
                r = !1,
                (i = ct.exec(s)) && (r = i.shift(), o.push({
                    value: r,
                    type: i[0].replace(lt, " ")
                }), s = s.slice(r.length));
                for (a in T.filter) ! (i = ht[a].exec(s)) || u[a] && !(i = u[a](i)) || (r = i.shift(), o.push({
                    value: r,
                    type: a,
                    matches: i
                }), s = s.slice(r.length));
                if (!r) break
            }
            return n ? s.length: s ? t.error(e) : I(e, l).slice(0)
        },
        k = t.compile = function(e, t) {
            var n, r = [],
            i = [],
            o = X[e + " "];
            if (!o) {
                for (t || (t = E(e)), n = t.length; n--;) o = y(t[n]),
                o[P] ? r.push(o) : i.push(o);
                o = X(e, b(i, r)),
                o.selector = e
            }
            return o
        },
        S = t.select = function(e, t, n, r) {
            var i, o, a, s, l, u = "function" == typeof e && e,
            d = !r && E(e = u.selector || e);
            if (n = n || [], 1 === d.length) {
                if (o = d[0] = d[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && q && T.relative[o[1].type]) {
                    if (t = (T.find.ID(a.matches[0].replace(wt, Tt), t) || [])[0], !t) return n;
                    u && (t = t.parentNode),
                    e = e.slice(o.shift().value.length)
                }
                for (i = ht.needsContext.test(e) ? 0 : o.length; i--&&(a = o[i], !T.relative[s = a.type]);) if ((l = T.find[s]) && (r = l(a.matches[0].replace(wt, Tt), bt.test(o[0].type) && c(t.parentNode) || t))) {
                    if (o.splice(i, 1), e = r.length && f(o), !e) return Z.apply(n, r),
                    n;
                    break
                }
            }
            return (u || k(e, d))(r, t, !q, n, bt.test(e) && c(t.parentNode) || t),
            n
        },
        w.sortStable = P.split("").sort(U).join("") === P,
        w.detectDuplicates = !!j,
        L(),
        w.sortDetached = i(function(e) {
            return 1 & e.compareDocumentPosition(H.createElement("div"))
        }),
        i(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width",
        function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }),
        w.attributes && i(function(e) {
            return e.innerHTML = "<input/>",
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
        }) || o("value",
        function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }),
        i(function(e) {
            return null == e.getAttribute("disabled")
        }) || o(nt,
        function(e, t, n) {
            var r;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value: null
        }),
        t
    } (e);
    it.find = ut,
    it.expr = ut.selectors,
    it.expr[":"] = it.expr.pseudos,
    it.unique = ut.uniqueSort,
    it.text = ut.getText,
    it.isXMLDoc = ut.isXML,
    it.contains = ut.contains;
    var ct = it.expr.match.needsContext,
    dt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    ft = /^.[^:#\[\.,]*$/;
    it.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === r.nodeType ? it.find.matchesSelector(r, e) ? [r] : [] : it.find.matches(e, it.grep(t,
        function(e) {
            return 1 === e.nodeType
        }))
    },
    it.fn.extend({
        find: function(e) {
            var t, n = [],
            r = this,
            i = r.length;
            if ("string" != typeof e) return this.pushStack(it(e).filter(function() {
                for (t = 0; i > t; t++) if (it.contains(r[t], this)) return ! 0
            }));
            for (t = 0; i > t; t++) it.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? it.unique(n) : n),
            n.selector = this.selector ? this.selector + " " + e: e,
            n
        },
        filter: function(e) {
            return this.pushStack(r(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(r(this, e || [], !0))
        },
        is: function(e) {
            return !! r(this, "string" == typeof e && ct.test(e) ? it(e) : e || [], !1).length
        }
    });
    var pt, ht = e.document,
    mt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    gt = it.fn.init = function(e, t) {
        var n, r;
        if (!e) return this;
        if ("string" == typeof e) {
            if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : mt.exec(e), !n || !n[1] && t) return ! t || t.jquery ? (t || pt).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                if (t = t instanceof it ? t[0] : t, it.merge(this, it.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t: ht, !0)), dt.test(n[1]) && it.isPlainObject(t)) for (n in t) it.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this
            }
            if (r = ht.getElementById(n[2]), r && r.parentNode) {
                if (r.id !== n[2]) return pt.find(e);
                this.length = 1,
                this[0] = r
            }
            return this.context = ht,
            this.selector = e,
            this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : it.isFunction(e) ? "undefined" != typeof pt.ready ? pt.ready(e) : e(it) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), it.makeArray(e, this))
    };
    gt.prototype = it.fn,
    pt = it(ht);
    var vt = /^(?:parents|prev(?:Until|All))/,
    yt = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    it.extend({
        dir: function(e, t, n) {
            for (var r = [], i = e[t]; i && 9 !== i.nodeType && (void 0 === n || 1 !== i.nodeType || !it(i).is(n));) 1 === i.nodeType && r.push(i),
            i = i[t];
            return r
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }),
    it.fn.extend({
        has: function(e) {
            var t, n = it(e, this),
            r = n.length;
            return this.filter(function() {
                for (t = 0; r > t; t++) if (it.contains(this, n[t])) return ! 0
            })
        },
        closest: function(e, t) {
            for (var n, r = 0,
            i = this.length,
            o = [], a = ct.test(e) || "string" != typeof e ? it(e, t || this.context) : 0; i > r; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && it.find.matchesSelector(n, e))) {
                o.push(n);
                break
            }
            return this.pushStack(o.length > 1 ? it.unique(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? it.inArray(this[0], it(e)) : it.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length: -1
        },
        add: function(e, t) {
            return this.pushStack(it.unique(it.merge(this.get(), it(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject: this.prevObject.filter(e))
        }
    }),
    it.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t: null
        },
        parents: function(e) {
            return it.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return it.dir(e, "parentNode", n)
        },
        next: function(e) {
            return i(e, "nextSibling")
        },
        prev: function(e) {
            return i(e, "previousSibling")
        },
        nextAll: function(e) {
            return it.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return it.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return it.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return it.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return it.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return it.sibling(e.firstChild)
        },
        contents: function(e) {
            return it.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document: it.merge([], e.childNodes)
        }
    },
    function(e, t) {
        it.fn[e] = function(n, r) {
            var i = it.map(this, t, n);
            return "Until" !== e.slice( - 5) && (r = n),
            r && "string" == typeof r && (i = it.filter(r, i)),
            this.length > 1 && (yt[e] || (i = it.unique(i)), vt.test(e) && (i = i.reverse())),
            this.pushStack(i)
        }
    });
    var bt = /\S+/g,
    xt = {};
    it.Callbacks = function(e) {
        e = "string" == typeof e ? xt[e] || o(e) : it.extend({},
        e);
        var t, n, r, i, a, s, l = [],
        u = !e.once && [],
        c = function(o) {
            for (n = e.memory && o, r = !0, a = s || 0, s = 0, i = l.length, t = !0; l && i > a; a++) if (l[a].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                n = !1;
                break
            }
            t = !1,
            l && (u ? u.length && c(u.shift()) : n ? l = [] : d.disable())
        },
        d = {
            add: function() {
                if (l) {
                    var r = l.length; !
                    function o(t) {
                        it.each(t,
                        function(t, n) {
                            var r = it.type(n);
                            "function" === r ? e.unique && d.has(n) || l.push(n) : n && n.length && "string" !== r && o(n)
                        })
                    } (arguments),
                    t ? i = l.length: n && (s = r, c(n))
                }
                return this
            },
            remove: function() {
                return l && it.each(arguments,
                function(e, n) {
                    for (var r; (r = it.inArray(n, l, r)) > -1;) l.splice(r, 1),
                    t && (i >= r && i--, a >= r && a--)
                }),
                this
            },
            has: function(e) {
                return e ? it.inArray(e, l) > -1 : !(!l || !l.length)
            },
            empty: function() {
                return l = [],
                i = 0,
                this
            },
            disable: function() {
                return l = u = n = void 0,
                this
            },
            disabled: function() {
                return ! l
            },
            lock: function() {
                return u = void 0,
                n || d.disable(),
                this
            },
            locked: function() {
                return ! u
            },
            fireWith: function(e, n) {
                return ! l || r && !u || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? u.push(n) : c(n)),
                this
            },
            fire: function() {
                return d.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !! r
            }
        };
        return d
    },
    it.extend({
        Deferred: function(e) {
            var t = [["resolve", "done", it.Callbacks("once memory"), "resolved"], ["reject", "fail", it.Callbacks("once memory"), "rejected"], ["notify", "progress", it.Callbacks("memory")]],
            n = "pending",
            r = {
                state: function() {
                    return n
                },
                always: function() {
                    return i.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var e = arguments;
                    return it.Deferred(function(n) {
                        it.each(t,
                        function(t, o) {
                            var a = it.isFunction(e[t]) && e[t];
                            i[o[1]](function() {
                                var e = a && a.apply(this, arguments);
                                e && it.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                            })
                        }),
                        e = null
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? it.extend(e, r) : r
                }
            },
            i = {};
            return r.pipe = r.then,
            it.each(t,
            function(e, o) {
                var a = o[2],
                s = o[3];
                r[o[1]] = a.add,
                s && a.add(function() {
                    n = s
                },
                t[1 ^ e][2].disable, t[2][2].lock),
                i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r: this, arguments),
                    this
                },
                i[o[0] + "With"] = a.fireWith
            }),
            r.promise(i),
            e && e.call(i, i),
            i
        },
        when: function(e) {
            var t, n, r, i = 0,
            o = Y.call(arguments),
            a = o.length,
            s = 1 !== a || e && it.isFunction(e.promise) ? a: 0,
            l = 1 === s ? e: it.Deferred(),
            u = function(e, n, r) {
                return function(i) {
                    n[e] = this,
                    r[e] = arguments.length > 1 ? Y.call(arguments) : i,
                    r === t ? l.notifyWith(n, r) : --s || l.resolveWith(n, r)
                }
            };
            if (a > 1) for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++) o[i] && it.isFunction(o[i].promise) ? o[i].promise().done(u(i, r, o)).fail(l.reject).progress(u(i, n, t)) : --s;
            return s || l.resolveWith(r, o),
            l.promise()
        }
    });
    var wt;
    it.fn.ready = function(e) {
        return it.ready.promise().done(e),
        this
    },
    it.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? it.readyWait++:it.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? !--it.readyWait: !it.isReady) {
                if (!ht.body) return setTimeout(it.ready);
                it.isReady = !0,
                e !== !0 && --it.readyWait > 0 || (wt.resolveWith(ht, [it]), it.fn.triggerHandler && (it(ht).triggerHandler("ready"), it(ht).off("ready")))
            }
        }
    }),
    it.ready.promise = function(t) {
        if (!wt) if (wt = it.Deferred(), "complete" === ht.readyState) setTimeout(it.ready);
        else if (ht.addEventListener) ht.addEventListener("DOMContentLoaded", s, !1),
        e.addEventListener("load", s, !1);
        else {
            ht.attachEvent("onreadystatechange", s),
            e.attachEvent("onload", s);
            var n = !1;
            try {
                n = null == e.frameElement && ht.documentElement
            } catch(r) {}
            n && n.doScroll && !
            function i() {
                if (!it.isReady) {
                    try {
                        n.doScroll("left")
                    } catch(e) {
                        return setTimeout(i, 50)
                    }
                    a(),
                    it.ready()
                }
            } ()
        }
        return wt.promise(t)
    };
    var Tt, Ct = "undefined";
    for (Tt in it(nt)) break;
    nt.ownLast = "0" !== Tt,
    nt.inlineBlockNeedsLayout = !1,
    it(function() {
        var e, t, n, r;
        n = ht.getElementsByTagName("body")[0],
        n && n.style && (t = ht.createElement("div"), r = ht.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== Ct && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", nt.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(r))
    }),
    function() {
        var e = ht.createElement("div");
        if (null == nt.deleteExpando) {
            nt.deleteExpando = !0;
            try {
                delete e.test
            } catch(t) {
                nt.deleteExpando = !1
            }
        }
        e = null
    } (),
    it.acceptData = function(e) {
        var t = it.noData[(e.nodeName + " ").toLowerCase()],
        n = +e.nodeType || 1;
        return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
    };
    var Nt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Et = /([A-Z])/g;
    it.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            return e = e.nodeType ? it.cache[e[it.expando]] : e[it.expando],
            !!e && !u(e)
        },
        data: function(e, t, n) {
            return c(e, t, n)
        },
        removeData: function(e, t) {
            return d(e, t)
        },
        _data: function(e, t, n) {
            return c(e, t, n, !0)
        },
        _removeData: function(e, t) {
            return d(e, t, !0)
        }
    }),
    it.fn.extend({
        data: function(e, t) {
            var n, r, i, o = this[0],
            a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = it.data(o), 1 === o.nodeType && !it._data(o, "parsedAttrs"))) {
                    for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = it.camelCase(r.slice(5)), l(o, r, i[r])));
                    it._data(o, "parsedAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                it.data(this, e)
            }) : arguments.length > 1 ? this.each(function() {
                it.data(this, e, t)
            }) : o ? l(o, e, it.data(o, e)) : void 0
        },
        removeData: function(e) {
            return this.each(function() {
                it.removeData(this, e)
            })
        }
    }),
    it.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = it._data(e, t), n && (!r || it.isArray(n) ? r = it._data(e, t, it.makeArray(n)) : r.push(n)), r || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = it.queue(e, t),
            r = n.length,
            i = n.shift(),
            o = it._queueHooks(e, t),
            a = function() {
                it.dequeue(e, t)
            };
            "inprogress" === i && (i = n.shift(), r--),
            i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)),
            !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return it._data(e, n) || it._data(e, n, {
                empty: it.Callbacks("once memory").add(function() {
                    it._removeData(e, t + "queue"),
                    it._removeData(e, n)
                })
            })
        }
    }),
    it.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--),
            arguments.length < n ? it.queue(this[0], e) : void 0 === t ? this: this.each(function() {
                var n = it.queue(this, e, t);
                it._queueHooks(this, e),
                "fx" === e && "inprogress" !== n[0] && it.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                it.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
            i = it.Deferred(),
            o = this,
            a = this.length,
            s = function() {--r || i.resolveWith(o, [o])
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = it._data(o[a], e + "queueHooks"),
            n && n.empty && (r++, n.empty.add(s));
            return s(),
            i.promise(t)
        }
    });
    var kt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    St = ["Top", "Right", "Bottom", "Left"],
    At = function(e, t) {
        return e = t || e,
        "none" === it.css(e, "display") || !it.contains(e.ownerDocument, e)
    },
    Dt = it.access = function(e, t, n, r, i, o, a) {
        var s = 0,
        l = e.length,
        u = null == n;
        if ("object" === it.type(n)) {
            i = !0;
            for (s in n) it.access(e, t, s, n[s], !0, o, a)
        } else if (void 0 !== r && (i = !0, it.isFunction(r) || (a = !0), u && (a ? (t.call(e, r), t = null) : (u = t, t = function(e, t, n) {
            return u.call(it(e), n)
        })), t)) for (; l > s; s++) t(e[s], n, a ? r: r.call(e[s], s, t(e[s], n)));
        return i ? e: u ? t.call(e) : l ? t(e[0], n) : o
    },
    jt = /^(?:checkbox|radio)$/i; !
    function() {
        var e = ht.createElement("input"),
        t = ht.createElement("div"),
        n = ht.createDocumentFragment();
        if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", nt.leadingWhitespace = 3 === t.firstChild.nodeType, nt.tbody = !t.getElementsByTagName("tbody").length, nt.htmlSerialize = !!t.getElementsByTagName("link").length, nt.html5Clone = "<:nav></:nav>" !== ht.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), nt.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", nt.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", nt.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, nt.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick",
        function() {
            nt.noCloneEvent = !1
        }), t.cloneNode(!0).click()), null == nt.deleteExpando) {
            nt.deleteExpando = !0;
            try {
                delete t.test
            } catch(r) {
                nt.deleteExpando = !1
            }
        }
    } (),
    function() {
        var t, n, r = ht.createElement("div");
        for (t in {
            submit: !0,
            change: !0,
            focusin: !0
        }) n = "on" + t,
        (nt[t + "Bubbles"] = n in e) || (r.setAttribute(n, "t"), nt[t + "Bubbles"] = r.attributes[n].expando === !1);
        r = null
    } ();
    var Lt = /^(?:input|select|textarea)$/i,
    Ht = /^key/,
    _t = /^(?:mouse|pointer|contextmenu)|click/,
    qt = /^(?:focusinfocus|focusoutblur)$/,
    Mt = /^([^.]*)(?:\.(.+)|)$/;
    it.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var o, a, s, l, u, c, d, f, p, h, m, g = it._data(e);
            if (g) {
                for (n.handler && (l = n, n = l.handler, i = l.selector), n.guid || (n.guid = it.guid++), (a = g.events) || (a = g.events = {}), (c = g.handle) || (c = g.handle = function(e) {
                    return typeof it === Ct || e && it.event.triggered === e.type ? void 0 : it.event.dispatch.apply(c.elem, arguments)
                },
                c.elem = e), t = (t || "").match(bt) || [""], s = t.length; s--;) o = Mt.exec(t[s]) || [],
                p = m = o[1],
                h = (o[2] || "").split(".").sort(),
                p && (u = it.event.special[p] || {},
                p = (i ? u.delegateType: u.bindType) || p, u = it.event.special[p] || {},
                d = it.extend({
                    type: p,
                    origType: m,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && it.expr.match.needsContext.test(i),
                    namespace: h.join(".")
                },
                l), (f = a[p]) || (f = a[p] = [], f.delegateCount = 0, u.setup && u.setup.call(e, r, h, c) !== !1 || (e.addEventListener ? e.addEventListener(p, c, !1) : e.attachEvent && e.attachEvent("on" + p, c))), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, d) : f.push(d), it.event.global[p] = !0);
                e = null
            }
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, l, u, c, d, f, p, h, m, g = it.hasData(e) && it._data(e);
            if (g && (c = g.events)) {
                for (t = (t || "").match(bt) || [""], u = t.length; u--;) if (s = Mt.exec(t[u]) || [], p = m = s[1], h = (s[2] || "").split(".").sort(), p) {
                    for (d = it.event.special[p] || {},
                    p = (r ? d.delegateType: d.bindType) || p, f = c[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = f.length; o--;) a = f[o],
                    !i && m !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, d.remove && d.remove.call(e, a));
                    l && !f.length && (d.teardown && d.teardown.call(e, h, g.handle) !== !1 || it.removeEvent(e, p, g.handle), delete c[p])
                } else for (p in c) it.event.remove(e, p + t[u], n, r, !0);
                it.isEmptyObject(c) && (delete g.handle, it._removeData(e, "events"))
            }
        },
        trigger: function(t, n, r, i) {
            var o, a, s, l, u, c, d, f = [r || ht],
            p = tt.call(t, "type") ? t.type: t,
            h = tt.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = c = r = r || ht, 3 !== r.nodeType && 8 !== r.nodeType && !qt.test(p + it.event.triggered) && (p.indexOf(".") >= 0 && (h = p.split("."), p = h.shift(), h.sort()), a = p.indexOf(":") < 0 && "on" + p, t = t[it.expando] ? t: new it.Event(p, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : it.makeArray(n, [t]), u = it.event.special[p] || {},
            i || !u.trigger || u.trigger.apply(r, n) !== !1)) {
                if (!i && !u.noBubble && !it.isWindow(r)) {
                    for (l = u.delegateType || p, qt.test(l + p) || (s = s.parentNode); s; s = s.parentNode) f.push(s),
                    c = s;
                    c === (r.ownerDocument || ht) && f.push(c.defaultView || c.parentWindow || e)
                }
                for (d = 0; (s = f[d++]) && !t.isPropagationStopped();) t.type = d > 1 ? l: u.bindType || p,
                o = (it._data(s, "events") || {})[t.type] && it._data(s, "handle"),
                o && o.apply(s, n),
                o = a && s[a],
                o && o.apply && it.acceptData(s) && (t.result = o.apply(s, n), t.result === !1 && t.preventDefault());
                if (t.type = p, !i && !t.isDefaultPrevented() && (!u._default || u._default.apply(f.pop(), n) === !1) && it.acceptData(r) && a && r[p] && !it.isWindow(r)) {
                    c = r[a],
                    c && (r[a] = null),
                    it.event.triggered = p;
                    try {
                        r[p]()
                    } catch(m) {}
                    it.event.triggered = void 0,
                    c && (r[a] = c)
                }
                return t.result
            }
        },
        dispatch: function(e) {
            e = it.event.fix(e);
            var t, n, r, i, o, a = [],
            s = Y.call(arguments),
            l = (it._data(this, "events") || {})[e.type] || [],
            u = it.event.special[e.type] || {};
            if (s[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                for (a = it.event.handlers.call(this, e, l), t = 0; (i = a[t++]) && !e.isPropagationStopped();) for (e.currentTarget = i.elem, o = 0; (r = i.handlers[o++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(r.namespace)) && (e.handleObj = r, e.data = r.data, n = ((it.event.special[r.origType] || {}).handle || r.handler).apply(i.elem, s), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e),
                e.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a = [],
            s = t.delegateCount,
            l = e.target;
            if (s && l.nodeType && (!e.button || "click" !== e.type)) for (; l != this; l = l.parentNode || this) if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                for (i = [], o = 0; s > o; o++) r = t[o],
                n = r.selector + " ",
                void 0 === i[n] && (i[n] = r.needsContext ? it(n, this).index(l) >= 0 : it.find(n, this, null, [l]).length),
                i[n] && i.push(r);
                i.length && a.push({
                    elem: l,
                    handlers: i
                })
            }
            return s < t.length && a.push({
                elem: this,
                handlers: t.slice(s)
            }),
            a
        },
        fix: function(e) {
            if (e[it.expando]) return e;
            var t, n, r, i = e.type,
            o = e,
            a = this.fixHooks[i];
            for (a || (this.fixHooks[i] = a = _t.test(i) ? this.mouseHooks: Ht.test(i) ? this.keyHooks: {}), r = a.props ? this.props.concat(a.props) : this.props, e = new it.Event(o), t = r.length; t--;) n = r[t],
            e[n] = o[n];
            return e.target || (e.target = o.srcElement || ht),
            3 === e.target.nodeType && (e.target = e.target.parentNode),
            e.metaKey = !!e.metaKey,
            a.filter ? a.filter(e, o) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode: t.keyCode),
                e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, o = t.button,
                a = t.fromElement;
                return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || ht, i = r.documentElement, n = r.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)),
                !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement: a),
                e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
                e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== h() && this.focus) try {
                        return this.focus(),
                        !1
                    } catch(e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === h() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return it.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return it.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = it.extend(new it.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? it.event.trigger(i, null, t) : it.event.dispatch.call(t, i),
            i.isDefaultPrevented() && n.preventDefault()
        }
    },
    it.removeEvent = ht.removeEventListener ?
    function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }: function(e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === Ct && (e[r] = null), e.detachEvent(r, n))
    },
    it.Event = function(e, t) {
        return this instanceof it.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? f: p) : this.type = e, t && it.extend(this, t), this.timeStamp = e && e.timeStamp || it.now(), void(this[it.expando] = !0)) : new it.Event(e, t)
    },
    it.Event.prototype = {
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = f,
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = f,
            e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = f,
            e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    it.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    },
    function(e, t) {
        it.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                i = e.relatedTarget,
                o = e.handleObj;
                return (!i || i !== r && !it.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t),
                n
            }
        }
    }),
    nt.submitBubbles || (it.event.special.submit = {
        setup: function() {
            return it.nodeName(this, "form") ? !1 : void it.event.add(this, "click._submit keypress._submit",
            function(e) {
                var t = e.target,
                n = it.nodeName(t, "input") || it.nodeName(t, "button") ? t.form: void 0;
                n && !it._data(n, "submitBubbles") && (it.event.add(n, "submit._submit",
                function(e) {
                    e._submit_bubble = !0
                }), it._data(n, "submitBubbles", !0))
            })
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && it.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function() {
            return it.nodeName(this, "form") ? !1 : void it.event.remove(this, "._submit")
        }
    }),
    nt.changeBubbles || (it.event.special.change = {
        setup: function() {
            return Lt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (it.event.add(this, "propertychange._change",
            function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), it.event.add(this, "click._change",
            function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1),
                it.event.simulate("change", this, e, !0)
            })), !1) : void it.event.add(this, "beforeactivate._change",
            function(e) {
                var t = e.target;
                Lt.test(t.nodeName) && !it._data(t, "changeBubbles") && (it.event.add(t, "change._change",
                function(e) { ! this.parentNode || e.isSimulated || e.isTrigger || it.event.simulate("change", this.parentNode, e, !0)
                }), it._data(t, "changeBubbles", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return it.event.remove(this, "._change"),
            !Lt.test(this.nodeName)
        }
    }),
    nt.focusinBubbles || it.each({
        focus: "focusin",
        blur: "focusout"
    },
    function(e, t) {
        var n = function(e) {
            it.event.simulate(t, e.target, it.event.fix(e), !0)
        };
        it.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                i = it._data(r, t);
                i || r.addEventListener(e, n, !0),
                it._data(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                i = it._data(r, t) - 1;
                i ? it._data(r, t, i) : (r.removeEventListener(e, n, !0), it._removeData(r, t))
            }
        }
    }),
    it.fn.extend({
        on: function(e, t, n, r, i) {
            var o, a;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (o in e) this.on(o, t, n, e[o], i);
                return this
            }
            if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1) r = p;
            else if (!r) return this;
            return 1 === i && (a = r, r = function(e) {
                return it().off(e),
                a.apply(this, arguments)
            },
            r.guid = a.guid || (a.guid = it.guid++)),
            this.each(function() {
                it.event.add(this, e, r, n, t)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj,
            it(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace: r.origType, r.selector, r.handler),
            this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0),
            n === !1 && (n = p),
            this.each(function() {
                it.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                it.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? it.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Ot = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    Ft = / jQuery\d+="(?:null|\d+)"/g,
    Bt = new RegExp("<(?:" + Ot + ")[\\s/>]", "i"),
    Pt = /^\s+/,
    Rt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    Wt = /<([\w:]+)/,
    $t = /<tbody/i,
    zt = /<|&#?\w+;/,
    It = /<(?:script|style|link)/i,
    Xt = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Ut = /^$|\/(?:java|ecma)script/i,
    Vt = /^true\/(.*)/,
    Jt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    Yt = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: nt.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    },
    Gt = m(ht),
    Qt = Gt.appendChild(ht.createElement("div"));
    Yt.optgroup = Yt.option,
    Yt.tbody = Yt.tfoot = Yt.colgroup = Yt.caption = Yt.thead,
    Yt.th = Yt.td,
    it.extend({
        clone: function(e, t, n) {
            var r, i, o, a, s, l = it.contains(e.ownerDocument, e);
            if (nt.html5Clone || it.isXMLDoc(e) || !Bt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Qt.innerHTML = e.outerHTML, Qt.removeChild(o = Qt.firstChild)), !(nt.noCloneEvent && nt.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || it.isXMLDoc(e))) for (r = g(o), s = g(e), a = 0; null != (i = s[a]); ++a) r[a] && C(i, r[a]);
            if (t) if (n) for (s = s || g(e), r = r || g(o), a = 0; null != (i = s[a]); a++) T(i, r[a]);
            else T(e, o);
            return r = g(o, "script"),
            r.length > 0 && w(r, !l && g(e, "script")),
            r = s = i = null,
            o
        },
        buildFragment: function(e, t, n, r) {
            for (var i, o, a, s, l, u, c, d = e.length,
            f = m(t), p = [], h = 0; d > h; h++) if (o = e[h], o || 0 === o) if ("object" === it.type(o)) it.merge(p, o.nodeType ? [o] : o);
            else if (zt.test(o)) {
                for (s = s || f.appendChild(t.createElement("div")), l = (Wt.exec(o) || ["", ""])[1].toLowerCase(), c = Yt[l] || Yt._default, s.innerHTML = c[1] + o.replace(Rt, "<$1></$2>") + c[2], i = c[0]; i--;) s = s.lastChild;
                if (!nt.leadingWhitespace && Pt.test(o) && p.push(t.createTextNode(Pt.exec(o)[0])), !nt.tbody) for (o = "table" !== l || $t.test(o) ? "<table>" !== c[1] || $t.test(o) ? 0 : s: s.firstChild, i = o && o.childNodes.length; i--;) it.nodeName(u = o.childNodes[i], "tbody") && !u.childNodes.length && o.removeChild(u);
                for (it.merge(p, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                s = f.lastChild
            } else p.push(t.createTextNode(o));
            for (s && f.removeChild(s), nt.appendChecked || it.grep(g(p, "input"), v), h = 0; o = p[h++];) if ((!r || -1 === it.inArray(o, r)) && (a = it.contains(o.ownerDocument, o), s = g(f.appendChild(o), "script"), a && w(s), n)) for (i = 0; o = s[i++];) Ut.test(o.type || "") && n.push(o);
            return s = null,
            f
        },
        cleanData: function(e, t) {
            for (var n, r, i, o, a = 0,
            s = it.expando,
            l = it.cache,
            u = nt.deleteExpando,
            c = it.event.special; null != (n = e[a]); a++) if ((t || it.acceptData(n)) && (i = n[s], o = i && l[i])) {
                if (o.events) for (r in o.events) c[r] ? it.event.remove(n, r) : it.removeEvent(n, r, o.handle);
                l[i] && (delete l[i], u ? delete n[s] : typeof n.removeAttribute !== Ct ? n.removeAttribute(s) : n[s] = null, J.push(i))
            }
        }
    }),
    it.fn.extend({
        text: function(e) {
            return Dt(this,
            function(e) {
                return void 0 === e ? it.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ht).createTextNode(e))
            },
            null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments,
            function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = y(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments,
            function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = y(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments,
            function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments,
            function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            for (var n, r = e ? it.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || it.cleanData(g(n)),
            n.parentNode && (t && it.contains(n.ownerDocument, n) && w(g(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && it.cleanData(g(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && it.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e,
            t = null == t ? e: t,
            this.map(function() {
                return it.clone(this, e, t)
            })
        },
        html: function(e) {
            return Dt(this,
            function(e) {
                var t = this[0] || {},
                n = 0,
                r = this.length;
                if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Ft, "") : void 0;
                if (! ("string" != typeof e || It.test(e) || !nt.htmlSerialize && Bt.test(e) || !nt.leadingWhitespace && Pt.test(e) || Yt[(Wt.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(Rt, "<$1></$2>");
                    try {
                        for (; r > n; n++) t = this[n] || {},
                        1 === t.nodeType && (it.cleanData(g(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch(i) {}
                }
                t && this.empty().append(e)
            },
            null, e, arguments.length)
        },
        replaceWith: function() {
            var e = arguments[0];
            return this.domManip(arguments,
            function(t) {
                e = this.parentNode,
                it.cleanData(g(this)),
                e && e.replaceChild(t, this)
            }),
            e && (e.length || e.nodeType) ? this: this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t) {
            e = G.apply([], e);
            var n, r, i, o, a, s, l = 0,
            u = this.length,
            c = this,
            d = u - 1,
            f = e[0],
            p = it.isFunction(f);
            if (p || u > 1 && "string" == typeof f && !nt.checkClone && Xt.test(f)) return this.each(function(n) {
                var r = c.eq(n);
                p && (e[0] = f.call(this, n, r.html())),
                r.domManip(e, t)
            });
            if (u && (s = it.buildFragment(e, this[0].ownerDocument, !1, this), n = s.firstChild, 1 === s.childNodes.length && (s = n), n)) {
                for (o = it.map(g(s, "script"), b), i = o.length; u > l; l++) r = s,
                l !== d && (r = it.clone(r, !0, !0), i && it.merge(o, g(r, "script"))),
                t.call(this[l], r, l);
                if (i) for (a = o[o.length - 1].ownerDocument, it.map(o, x), l = 0; i > l; l++) r = o[l],
                Ut.test(r.type || "") && !it._data(r, "globalEval") && it.contains(a, r) && (r.src ? it._evalUrl && it._evalUrl(r.src) : it.globalEval((r.text || r.textContent || r.innerHTML || "").replace(Jt, "")));
                s = n = null
            }
            return this
        }
    }),
    it.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(e, t) {
        it.fn[e] = function(e) {
            for (var n, r = 0,
            i = [], o = it(e), a = o.length - 1; a >= r; r++) n = r === a ? this: this.clone(!0),
            it(o[r])[t](n),
            Q.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var Kt, Zt = {}; !
    function() {
        var e;
        nt.shrinkWrapBlocks = function() {
            if (null != e) return e;
            e = !1;
            var t, n, r;
            return n = ht.getElementsByTagName("body")[0],
            n && n.style ? (t = ht.createElement("div"), r = ht.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== Ct && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(ht.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(r), e) : void 0
        }
    } ();
    var en, tn, nn = /^margin/,
    rn = new RegExp("^(" + kt + ")(?!px)[a-z%]+$", "i"),
    on = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (en = function(e) {
        return e.ownerDocument.defaultView.getComputedStyle(e, null)
    },
    tn = function(e, t, n) {
        var r, i, o, a, s = e.style;
        return n = n || en(e),
        a = n ? n.getPropertyValue(t) || n[t] : void 0,
        n && ("" !== a || it.contains(e.ownerDocument, e) || (a = it.style(e, t)), rn.test(a) && nn.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)),
        void 0 === a ? a: a + ""
    }) : ht.documentElement.currentStyle && (en = function(e) {
        return e.currentStyle
    },
    tn = function(e, t, n) {
        var r, i, o, a, s = e.style;
        return n = n || en(e),
        a = n ? n[t] : void 0,
        null == a && s && s[t] && (a = s[t]),
        rn.test(a) && !on.test(t) && (r = s.left, i = e.runtimeStyle, o = i && i.left, o && (i.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em": a, a = s.pixelLeft + "px", s.left = r, o && (i.left = o)),
        void 0 === a ? a: a + "" || "auto"
    }),
    !
    function() {
        function t() {
            var t, n, r, i;
            n = ht.getElementsByTagName("body")[0],
            n && n.style && (t = ht.createElement("div"), r = ht.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = a = !1, l = !0, e.getComputedStyle && (o = "1%" !== (e.getComputedStyle(t, null) || {}).top, a = "4px" === (e.getComputedStyle(t, null) || {
                width: "4px"
            }).width, i = t.appendChild(ht.createElement("div")), i.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", t.style.width = "1px", l = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = t.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", s = 0 === i[0].offsetHeight, s && (i[0].style.display = "", i[1].style.display = "none", s = 0 === i[0].offsetHeight), n.removeChild(r))
        }
        var n, r, i, o, a, s, l;
        n = ht.createElement("div"),
        n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        i = n.getElementsByTagName("a")[0],
        (r = i && i.style) && (r.cssText = "float:left;opacity:.5", nt.opacity = "0.5" === r.opacity, nt.cssFloat = !!r.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", nt.clearCloneStyle = "content-box" === n.style.backgroundClip, nt.boxSizing = "" === r.boxSizing || "" === r.MozBoxSizing || "" === r.WebkitBoxSizing, it.extend(nt, {
            reliableHiddenOffsets: function() {
                return null == s && t(),
                s
            },
            boxSizingReliable: function() {
                return null == a && t(),
                a
            },
            pixelPosition: function() {
                return null == o && t(),
                o
            },
            reliableMarginRight: function() {
                return null == l && t(),
                l
            }
        }))
    } (),
    it.swap = function(e, t, n, r) {
        var i, o, a = {};
        for (o in t) a[o] = e.style[o],
        e.style[o] = t[o];
        i = n.apply(e, r || []);
        for (o in t) e.style[o] = a[o];
        return i
    };
    var an = /alpha\([^)]*\)/i,
    sn = /opacity\s*=\s*([^)]*)/,
    ln = /^(none|table(?!-c[ea]).+)/,
    un = new RegExp("^(" + kt + ")(.*)$", "i"),
    cn = new RegExp("^([+-])=(" + kt + ")", "i"),
    dn = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    },
    fn = {
        letterSpacing: "0",
        fontWeight: "400"
    },
    pn = ["Webkit", "O", "Moz", "ms"];
    it.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = tn(e, "opacity");
                        return "" === n ? "1": n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": nt.cssFloat ? "cssFloat": "styleFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = it.camelCase(t),
                l = e.style;
                if (t = it.cssProps[s] || (it.cssProps[s] = S(l, s)), a = it.cssHooks[t] || it.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i: l[t];
                if (o = typeof n, "string" === o && (i = cn.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(it.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || it.cssNumber[s] || (n += "px"), nt.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(e, n, r))))) try {
                    l[t] = n
                } catch(u) {}
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = it.camelCase(t);
            return t = it.cssProps[s] || (it.cssProps[s] = S(e.style, s)),
            a = it.cssHooks[t] || it.cssHooks[s],
            a && "get" in a && (o = a.get(e, !0, n)),
            void 0 === o && (o = tn(e, t, r)),
            "normal" === o && t in fn && (o = fn[t]),
            "" === n || n ? (i = parseFloat(o), n === !0 || it.isNumeric(i) ? i || 0 : o) : o
        }
    }),
    it.each(["height", "width"],
    function(e, t) {
        it.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? ln.test(it.css(e, "display")) && 0 === e.offsetWidth ? it.swap(e, dn,
                function() {
                    return L(e, t, r)
                }) : L(e, t, r) : void 0
            },
            set: function(e, n, r) {
                var i = r && en(e);
                return D(e, n, r ? j(e, t, r, nt.boxSizing && "border-box" === it.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }),
    nt.opacity || (it.cssHooks.opacity = {
        get: function(e, t) {
            return sn.test((t && e.currentStyle ? e.currentStyle.filter: e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "": t ? "1": ""
        },
        set: function(e, t) {
            var n = e.style,
            r = e.currentStyle,
            i = it.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")": "",
            o = r && r.filter || n.filter || "";
            n.zoom = 1,
            (t >= 1 || "" === t) && "" === it.trim(o.replace(an, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = an.test(o) ? o.replace(an, i) : o + " " + i)
        }
    }),
    it.cssHooks.marginRight = k(nt.reliableMarginRight,
    function(e, t) {
        return t ? it.swap(e, {
            display: "inline-block"
        },
        tn, [e, "marginRight"]) : void 0
    }),
    it.each({
        margin: "",
        padding: "",
        border: "Width"
    },
    function(e, t) {
        it.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0,
                i = {},
                o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + St[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        },
        nn.test(e) || (it.cssHooks[e + t].set = D)
    }),
    it.fn.extend({
        css: function(e, t) {
            return Dt(this,
            function(e, t, n) {
                var r, i, o = {},
                a = 0;
                if (it.isArray(t)) {
                    for (r = en(e), i = t.length; i > a; a++) o[t[a]] = it.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? it.style(e, t, n) : it.css(e, t)
            },
            e, t, arguments.length > 1)
        },
        show: function() {
            return A(this, !0)
        },
        hide: function() {
            return A(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                At(this) ? it(this).show() : it(this).hide()
            })
        }
    }),
    it.Tween = H,
    H.prototype = {
        constructor: H,
        init: function(e, t, n, r, i, o) {
            this.elem = e,
            this.prop = n,
            this.easing = i || "swing",
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = r,
            this.unit = o || (it.cssNumber[n] ? "": "px")
        },
        cur: function() {
            var e = H.propHooks[this.prop];
            return e && e.get ? e.get(this) : H.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = H.propHooks[this.prop];
            return this.pos = t = this.options.duration ? it.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : H.propHooks._default.set(this),
            this
        }
    },
    H.prototype.init.prototype = H.prototype,
    H.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = it.css(e.elem, e.prop, ""), t && "auto" !== t ? t: 0) : e.elem[e.prop]
            },
            set: function(e) {
                it.fx.step[e.prop] ? it.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[it.cssProps[e.prop]] || it.cssHooks[e.prop]) ? it.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    },
    H.propHooks.scrollTop = H.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    it.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return.5 - Math.cos(e * Math.PI) / 2
        }
    },
    it.fx = H.prototype.init,
    it.fx.step = {};
    var hn, mn, gn = /^(?:toggle|show|hide)$/,
    vn = new RegExp("^(?:([+-])=|)(" + kt + ")([a-z%]*)$", "i"),
    yn = /queueHooks$/,
    bn = [O],
    xn = {
        "*": [function(e, t) {
            var n = this.createTween(e, t),
            r = n.cur(),
            i = vn.exec(t),
            o = i && i[3] || (it.cssNumber[e] ? "": "px"),
            a = (it.cssNumber[e] || "px" !== o && +r) && vn.exec(it.css(n.elem, e)),
            s = 1,
            l = 20;
            if (a && a[3] !== o) {
                o = o || a[3],
                i = i || [],
                a = +r || 1;
                do s = s || ".5",
                a /= s,
                it.style(n.elem, e, a + o);
                while (s !== (s = n.cur() / r) && 1 !== s && --l)
            }
            return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]),
            n
        }]
    };
    it.Animation = it.extend(B, {
        tweener: function(e, t) {
            it.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, r = 0,
            i = e.length; i > r; r++) n = e[r],
            xn[n] = xn[n] || [],
            xn[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? bn.unshift(e) : bn.push(e)
        }
    }),
    it.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? it.extend({},
        e) : {
            complete: n || !n && t || it.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !it.isFunction(t) && t
        };
        return r.duration = it.fx.off ? 0 : "number" == typeof r.duration ? r.duration: r.duration in it.fx.speeds ? it.fx.speeds[r.duration] : it.fx.speeds._default,
        (null == r.queue || r.queue === !0) && (r.queue = "fx"),
        r.old = r.complete,
        r.complete = function() {
            it.isFunction(r.old) && r.old.call(this),
            r.queue && it.dequeue(this, r.queue)
        },
        r
    },
    it.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(At).css("opacity", 0).show().end().animate({
                opacity: t
            },
            e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = it.isEmptyObject(e),
            o = it.speed(t, n, r),
            a = function() {
                var t = B(this, it.extend({},
                e), o); (i || it._data(this, "finish")) && t.stop(!0)
            };
            return a.finish = a,
            i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop,
                t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0),
            t && e !== !1 && this.queue(e || "fx", []),
            this.each(function() {
                var t = !0,
                i = null != e && e + "queueHooks",
                o = it.timers,
                a = it._data(this);
                if (i) a[i] && a[i].stop && r(a[i]);
                else for (i in a) a[i] && a[i].stop && yn.test(i) && r(a[i]);
                for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1)); (t || !n) && it.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"),
            this.each(function() {
                var t, n = it._data(this),
                r = n[e + "queue"],
                i = n[e + "queueHooks"],
                o = it.timers,
                a = r ? r.length: 0;
                for (n.finish = !0, it.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }),
    it.each(["toggle", "show", "hide"],
    function(e, t) {
        var n = it.fn[t];
        it.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(q(t, !0), e, r, i)
        }
    }),
    it.each({
        slideDown: q("show"),
        slideUp: q("hide"),
        slideToggle: q("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    },
    function(e, t) {
        it.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }),
    it.timers = [],
    it.fx.tick = function() {
        var e, t = it.timers,
        n = 0;
        for (hn = it.now(); n < t.length; n++) e = t[n],
        e() || t[n] !== e || t.splice(n--, 1);
        t.length || it.fx.stop(),
        hn = void 0
    },
    it.fx.timer = function(e) {
        it.timers.push(e),
        e() ? it.fx.start() : it.timers.pop()
    },
    it.fx.interval = 13,
    it.fx.start = function() {
        mn || (mn = setInterval(it.fx.tick, it.fx.interval))
    },
    it.fx.stop = function() {
        clearInterval(mn),
        mn = null
    },
    it.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    it.fn.delay = function(e, t) {
        return e = it.fx ? it.fx.speeds[e] || e: e,
        t = t || "fx",
        this.queue(t,
        function(t, n) {
            var r = setTimeout(t, e);
            n.stop = function() {
                clearTimeout(r)
            }
        })
    },
    function() {
        var e, t, n, r, i;
        t = ht.createElement("div"),
        t.setAttribute("className", "t"),
        t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        r = t.getElementsByTagName("a")[0],
        n = ht.createElement("select"),
        i = n.appendChild(ht.createElement("option")),
        e = t.getElementsByTagName("input")[0],
        r.style.cssText = "top:1px",
        nt.getSetAttribute = "t" !== t.className,
        nt.style = /top/.test(r.getAttribute("style")),
        nt.hrefNormalized = "/a" === r.getAttribute("href"),
        nt.checkOn = !!e.value,
        nt.optSelected = i.selected,
        nt.enctype = !!ht.createElement("form").enctype,
        n.disabled = !0,
        nt.optDisabled = !i.disabled,
        e = ht.createElement("input"),
        e.setAttribute("value", ""),
        nt.input = "" === e.getAttribute("value"),
        e.value = "t",
        e.setAttribute("type", "radio"),
        nt.radioValue = "t" === e.value
    } ();
    var wn = /\r/g;
    it.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0];
            return arguments.length ? (r = it.isFunction(e), this.each(function(n) {
                var i;
                1 === this.nodeType && (i = r ? e.call(this, n, it(this).val()) : e, null == i ? i = "": "number" == typeof i ? i += "": it.isArray(i) && (i = it.map(i,
                function(e) {
                    return null == e ? "": e + ""
                })), t = it.valHooks[this.type] || it.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
            })) : i ? (t = it.valHooks[i.type] || it.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n: (n = i.value, "string" == typeof n ? n.replace(wn, "") : null == n ? "": n)) : void 0
        }
    }),
    it.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = it.find.attr(e, "value");
                    return null != t ? t: it.trim(it.text(e))
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options,
                    i = e.selectedIndex,
                    o = "select-one" === e.type || 0 > i,
                    a = o ? null: [], s = o ? i + 1 : r.length, l = 0 > i ? s: o ? i: 0; s > l; l++) if (n = r[l], !(!n.selected && l !== i || (nt.optDisabled ? n.disabled: null !== n.getAttribute("disabled")) || n.parentNode.disabled && it.nodeName(n.parentNode, "optgroup"))) {
                        if (t = it(n).val(), o) return t;
                        a.push(t)
                    }
                    return a
                },
                set: function(e, t) {
                    for (var n, r, i = e.options,
                    o = it.makeArray(t), a = i.length; a--;) if (r = i[a], it.inArray(it.valHooks.option.get(r), o) >= 0) try {
                        r.selected = n = !0
                    } catch(s) {
                        r.scrollHeight
                    } else r.selected = !1;
                    return n || (e.selectedIndex = -1),
                    i
                }
            }
        }
    }),
    it.each(["radio", "checkbox"],
    function() {
        it.valHooks[this] = {
            set: function(e, t) {
                return it.isArray(t) ? e.checked = it.inArray(it(e).val(), t) >= 0 : void 0
            }
        },
        nt.checkOn || (it.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on": e.value
        })
    });
    var Tn, Cn, Nn = it.expr.attrHandle,
    En = /^(?:checked|selected)$/i,
    kn = nt.getSetAttribute,
    Sn = nt.input;
    it.fn.extend({
        attr: function(e, t) {
            return Dt(this, it.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                it.removeAttr(this, e)
            })
        }
    }),
    it.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            return e && 3 !== o && 8 !== o && 2 !== o ? typeof e.getAttribute === Ct ? it.prop(e, t, n) : (1 === o && it.isXMLDoc(e) || (t = t.toLowerCase(), r = it.attrHooks[t] || (it.expr.match.bool.test(t) ? Cn: Tn)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i: (i = it.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i: (e.setAttribute(t, n + ""), n) : void it.removeAttr(e, t)) : void 0
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
            o = t && t.match(bt);
            if (o && 1 === e.nodeType) for (; n = o[i++];) r = it.propFix[n] || n,
            it.expr.match.bool.test(n) ? Sn && kn || !En.test(n) ? e[r] = !1 : e[it.camelCase("default-" + n)] = e[r] = !1 : it.attr(e, n, ""),
            e.removeAttribute(kn ? n: r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!nt.radioValue && "radio" === t && it.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        }
    }),
    Cn = {
        set: function(e, t, n) {
            return t === !1 ? it.removeAttr(e, n) : Sn && kn || !En.test(n) ? e.setAttribute(!kn && it.propFix[n] || n, n) : e[it.camelCase("default-" + n)] = e[n] = !0,
            n
        }
    },
    it.each(it.expr.match.bool.source.match(/\w+/g),
    function(e, t) {
        var n = Nn[t] || it.find.attr;
        Nn[t] = Sn && kn || !En.test(t) ?
        function(e, t, r) {
            var i, o;
            return r || (o = Nn[t], Nn[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, Nn[t] = o),
            i
        }: function(e, t, n) {
            return n ? void 0 : e[it.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }),
    Sn && kn || (it.attrHooks.value = {
        set: function(e, t, n) {
            return it.nodeName(e, "input") ? void(e.defaultValue = t) : Tn && Tn.set(e, t, n)
        }
    }),
    kn || (Tn = {
        set: function(e, t, n) {
            var r = e.getAttributeNode(n);
            return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)),
            r.value = t += "",
            "value" === n || t === e.getAttribute(n) ? t: void 0
        }
    },
    Nn.id = Nn.name = Nn.coords = function(e, t, n) {
        var r;
        return n ? void 0 : (r = e.getAttributeNode(t)) && "" !== r.value ? r.value: null
    },
    it.valHooks.button = {
        get: function(e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value: void 0
        },
        set: Tn.set
    },
    it.attrHooks.contenteditable = {
        set: function(e, t, n) {
            Tn.set(e, "" === t ? !1 : t, n)
        }
    },
    it.each(["width", "height"],
    function(e, t) {
        it.attrHooks[t] = {
            set: function(e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        }
    })),
    nt.style || (it.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || void 0
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    });
    var An = /^(?:input|select|textarea|button|object)$/i,
    Dn = /^(?:a|area)$/i;
    it.fn.extend({
        prop: function(e, t) {
            return Dt(this, it.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = it.propFix[e] || e,
            this.each(function() {
                try {
                    this[e] = void 0,
                    delete this[e]
                } catch(t) {}
            })
        }
    }),
    it.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var r, i, o, a = e.nodeType;
            return e && 3 !== a && 8 !== a && 2 !== a ? (o = 1 !== a || !it.isXMLDoc(e), o && (t = it.propFix[t] || t, i = it.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r: e[t] = n: i && "get" in i && null !== (r = i.get(e, t)) ? r: e[t]) : void 0
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = it.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : An.test(e.nodeName) || Dn.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }),
    nt.hrefNormalized || it.each(["href", "src"],
    function(e, t) {
        it.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4)
            }
        }
    }),
    nt.optSelected || (it.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
            null
        }
    }),
    it.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"],
    function() {
        it.propFix[this.toLowerCase()] = this
    }),
    nt.enctype || (it.propFix.enctype = "encoding");
    var jn = /[\t\r\n\f]/g;
    it.fn.extend({
        addClass: function(e) {
            var t, n, r, i, o, a, s = 0,
            l = this.length,
            u = "string" == typeof e && e;
            if (it.isFunction(e)) return this.each(function(t) {
                it(this).addClass(e.call(this, t, this.className))
            });
            if (u) for (t = (e || "").match(bt) || []; l > s; s++) if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(jn, " ") : " ")) {
                for (o = 0; i = t[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                a = it.trim(r),
                n.className !== a && (n.className = a)
            }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, a, s = 0,
            l = this.length,
            u = 0 === arguments.length || "string" == typeof e && e;
            if (it.isFunction(e)) return this.each(function(t) {
                it(this).removeClass(e.call(this, t, this.className))
            });
            if (u) for (t = (e || "").match(bt) || []; l > s; s++) if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(jn, " ") : "")) {
                for (o = 0; i = t[o++];) for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                a = e ? it.trim(r) : "",
                n.className !== a && (n.className = a)
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(it.isFunction(e) ?
            function(n) {
                it(this).toggleClass(e.call(this, n, this.className, t), t)
            }: function() {
                if ("string" === n) for (var t, r = 0,
                i = it(this), o = e.match(bt) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else(n === Ct || "boolean" === n) && (this.className && it._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "": it._data(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ",
            n = 0,
            r = this.length; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(jn, " ").indexOf(t) >= 0) return ! 0;
            return ! 1
        }
    }),
    it.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
    function(e, t) {
        it.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }),
    it.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var Ln = it.now(),
    Hn = /\?/,
    _n = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    it.parseJSON = function(t) {
        if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
        var n, r = null,
        i = it.trim(t + "");
        return i && !it.trim(i.replace(_n,
        function(e, t, i, o) {
            return n && t && (r = 0),
            0 === r ? e: (n = i || t, r += !o - !i, "")
        })) ? Function("return " + i)() : it.error("Invalid JSON: " + t)
    },
    it.parseXML = function(t) {
        var n, r;
        if (!t || "string" != typeof t) return null;
        try {
            e.DOMParser ? (r = new DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
        } catch(i) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || it.error("Invalid XML: " + t),
        n
    };
    var qn, Mn, On = /#.*$/,
    Fn = /([?&])_=[^&]*/,
    Bn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Pn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Rn = /^(?:GET|HEAD)$/,
    Wn = /^\/\//,
    $n = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    zn = {},
    In = {},
    Xn = "*/".concat("*");
    try {
        Mn = location.href
    } catch(Un) {
        Mn = ht.createElement("a"),
        Mn.href = "",
        Mn = Mn.href
    }
    qn = $n.exec(Mn.toLowerCase()) || [],
    it.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Mn,
            type: "GET",
            isLocal: Pn.test(qn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Xn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": it.parseJSON,
                "text xml": it.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? W(W(e, it.ajaxSettings), t) : W(it.ajaxSettings, e)
        },
        ajaxPrefilter: P(zn),
        ajaxTransport: P(In),
        ajax: function(e, t) {
            function n(e, t, n, r) {
                var i, c, v, y, x, T = t;
                2 !== b && (b = 2, s && clearTimeout(s), u = void 0, a = r || "", w.readyState = e > 0 ? 4 : 0, i = e >= 200 && 300 > e || 304 === e, n && (y = $(d, w, n)), y = z(d, y, w, i), i ? (d.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (it.lastModified[o] = x), x = w.getResponseHeader("etag"), x && (it.etag[o] = x)), 204 === e || "HEAD" === d.type ? T = "nocontent": 304 === e ? T = "notmodified": (T = y.state, c = y.data, v = y.error, i = !v)) : (v = T, (e || !T) && (T = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || T) + "", i ? h.resolveWith(f, [c, T, w]) : h.rejectWith(f, [w, T, v]), w.statusCode(g), g = void 0, l && p.trigger(i ? "ajaxSuccess": "ajaxError", [w, d, i ? c: v]), m.fireWith(f, [w, T]), l && (p.trigger("ajaxComplete", [w, d]), --it.active || it.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e, e = void 0),
            t = t || {};
            var r, i, o, a, s, l, u, c, d = it.ajaxSetup({},
            t),
            f = d.context || d,
            p = d.context && (f.nodeType || f.jquery) ? it(f) : it.event,
            h = it.Deferred(),
            m = it.Callbacks("once memory"),
            g = d.statusCode || {},
            v = {},
            y = {},
            b = 0,
            x = "canceled",
            w = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (2 === b) {
                        if (!c) for (c = {}; t = Bn.exec(a);) c[t[1].toLowerCase()] = t[2];
                        t = c[e.toLowerCase()]
                    }
                    return null == t ? null: t
                },
                getAllResponseHeaders: function() {
                    return 2 === b ? a: null
                },
                setRequestHeader: function(e, t) {
                    var n = e.toLowerCase();
                    return b || (e = y[n] = y[n] || e, v[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return b || (d.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e) if (2 > b) for (t in e) g[t] = [g[t], e[t]];
                    else w.always(e[w.status]);
                    return this
                },
                abort: function(e) {
                    var t = e || x;
                    return u && u.abort(t),
                    n(0, t),
                    this
                }
            };
            if (h.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, d.url = ((e || d.url || Mn) + "").replace(On, "").replace(Wn, qn[1] + "//"), d.type = t.method || t.type || d.method || d.type, d.dataTypes = it.trim(d.dataType || "*").toLowerCase().match(bt) || [""], null == d.crossDomain && (r = $n.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] === qn[1] && r[2] === qn[2] && (r[3] || ("http:" === r[1] ? "80": "443")) === (qn[3] || ("http:" === qn[1] ? "80": "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = it.param(d.data, d.traditional)), R(zn, d, t, w), 2 === b) return w;
            l = d.global,
            l && 0 === it.active++&&it.event.trigger("ajaxStart"),
            d.type = d.type.toUpperCase(),
            d.hasContent = !Rn.test(d.type),
            o = d.url,
            d.hasContent || (d.data && (o = d.url += (Hn.test(o) ? "&": "?") + d.data, delete d.data), d.cache === !1 && (d.url = Fn.test(o) ? o.replace(Fn, "$1_=" + Ln++) : o + (Hn.test(o) ? "&": "?") + "_=" + Ln++)),
            d.ifModified && (it.lastModified[o] && w.setRequestHeader("If-Modified-Since", it.lastModified[o]), it.etag[o] && w.setRequestHeader("If-None-Match", it.etag[o])),
            (d.data && d.hasContent && d.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", d.contentType),
            w.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Xn + "; q=0.01": "") : d.accepts["*"]);
            for (i in d.headers) w.setRequestHeader(i, d.headers[i]);
            if (d.beforeSend && (d.beforeSend.call(f, w, d) === !1 || 2 === b)) return w.abort();
            x = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) w[i](d[i]);
            if (u = R(In, d, t, w)) {
                w.readyState = 1,
                l && p.trigger("ajaxSend", [w, d]),
                d.async && d.timeout > 0 && (s = setTimeout(function() {
                    w.abort("timeout")
                },
                d.timeout));
                try {
                    b = 1,
                    u.send(v, n)
                } catch(T) {
                    if (! (2 > b)) throw T;
                    n( - 1, T)
                }
            } else n( - 1, "No Transport");
            return w
        },
        getJSON: function(e, t, n) {
            return it.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return it.get(e, void 0, t, "script")
        }
    }),
    it.each(["get", "post"],
    function(e, t) {
        it[t] = function(e, n, r, i) {
            return it.isFunction(n) && (i = i || r, r = n, n = void 0),
            it.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }),
    it.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"],
    function(e, t) {
        it.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    it._evalUrl = function(e) {
        return it.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    },
    it.fn.extend({
        wrapAll: function(e) {
            if (it.isFunction(e)) return this.each(function(t) {
                it(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = it(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]),
                t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return this.each(it.isFunction(e) ?
            function(t) {
                it(this).wrapInner(e.call(this, t))
            }: function() {
                var t = it(this),
                n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = it.isFunction(e);
            return this.each(function(n) {
                it(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                it.nodeName(this, "body") || it(this).replaceWith(this.childNodes)
            }).end()
        }
    }),
    it.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !nt.reliableHiddenOffsets() && "none" === (e.style && e.style.display || it.css(e, "display"))
    },
    it.expr.filters.visible = function(e) {
        return ! it.expr.filters.hidden(e)
    };
    var Vn = /%20/g,
    Jn = /\[\]$/,
    Yn = /\r?\n/g,
    Gn = /^(?:submit|button|image|reset|file)$/i,
    Qn = /^(?:input|select|textarea|keygen)/i;
    it.param = function(e, t) {
        var n, r = [],
        i = function(e, t) {
            t = it.isFunction(t) ? t() : null == t ? "": t,
            r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = it.ajaxSettings && it.ajaxSettings.traditional), it.isArray(e) || e.jquery && !it.isPlainObject(e)) it.each(e,
        function() {
            i(this.name, this.value)
        });
        else for (n in e) I(n, e[n], t, i);
        return r.join("&").replace(Vn, "+")
    },
    it.fn.extend({
        serialize: function() {
            return it.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = it.prop(this, "elements");
                return e ? it.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !it(this).is(":disabled") && Qn.test(this.nodeName) && !Gn.test(e) && (this.checked || !jt.test(e))
            }).map(function(e, t) {
                var n = it(this).val();
                return null == n ? null: it.isArray(n) ? it.map(n,
                function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Yn, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Yn, "\r\n")
                }
            }).get()
        }
    }),
    it.ajaxSettings.xhr = void 0 !== e.ActiveXObject ?
    function() {
        return ! this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && X() || U()
    }: X;
    var Kn = 0,
    Zn = {},
    er = it.ajaxSettings.xhr();
    e.ActiveXObject && it(e).on("unload",
    function() {
        for (var e in Zn) Zn[e](void 0, !0)
    }),
    nt.cors = !!er && "withCredentials" in er,
    er = nt.ajax = !!er,
    er && it.ajaxTransport(function(e) {
        if (!e.crossDomain || nt.cors) {
            var t;
            return {
                send: function(n, r) {
                    var i, o = e.xhr(),
                    a = ++Kn;
                    if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (i in e.xhrFields) o[i] = e.xhrFields[i];
                    e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType),
                    e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (i in n) void 0 !== n[i] && o.setRequestHeader(i, n[i] + "");
                    o.send(e.hasContent && e.data || null),
                    t = function(n, i) {
                        var s, l, u;
                        if (t && (i || 4 === o.readyState)) if (delete Zn[a], t = void 0, o.onreadystatechange = it.noop, i) 4 !== o.readyState && o.abort();
                        else {
                            u = {},
                            s = o.status,
                            "string" == typeof o.responseText && (u.text = o.responseText);
                            try {
                                l = o.statusText
                            } catch(c) {
                                l = ""
                            }
                            s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = u.text ? 200 : 404
                        }
                        u && r(s, l, u, o.getAllResponseHeaders())
                    },
                    e.async ? 4 === o.readyState ? setTimeout(t) : o.onreadystatechange = Zn[a] = t: t()
                },
                abort: function() {
                    t && t(void 0, !0)
                }
            }
        }
    }),
    it.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return it.globalEval(e),
                e
            }
        }
    }),
    it.ajaxPrefilter("script",
    function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = "GET", e.global = !1)
    }),
    it.ajaxTransport("script",
    function(e) {
        if (e.crossDomain) {
            var t, n = ht.head || it("head")[0] || ht.documentElement;
            return {
                send: function(r, i) {
                    t = ht.createElement("script"),
                    t.async = !0,
                    e.scriptCharset && (t.charset = e.scriptCharset),
                    t.src = e.url,
                    t.onload = t.onreadystatechange = function(e, n) { (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || i(200, "success"))
                    },
                    n.insertBefore(t, n.firstChild)
                },
                abort: function() {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var tr = [],
    nr = /(=)\?(?=&|$)|\?\?/;
    it.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = tr.pop() || it.expando + "_" + Ln++;
            return this[e] = !0,
            e
        }
    }),
    it.ajaxPrefilter("json jsonp",
    function(t, n, r) {
        var i, o, a, s = t.jsonp !== !1 && (nr.test(t.url) ? "url": "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && nr.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = it.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(nr, "$1" + i) : t.jsonp !== !1 && (t.url += (Hn.test(t.url) ? "&": "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return a || it.error(i + " was not called"),
            a[0]
        },
        t.dataTypes[0] = "json", o = e[i], e[i] = function() {
            a = arguments
        },
        r.always(function() {
            e[i] = o,
            t[i] && (t.jsonpCallback = n.jsonpCallback, tr.push(i)),
            a && it.isFunction(o) && o(a[0]),
            a = o = void 0
        }), "script") : void 0
    }),
    it.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1),
        t = t || ht;
        var r = dt.exec(e),
        i = !n && [];
        return r ? [t.createElement(r[1])] : (r = it.buildFragment([e], t, i), i && i.length && it(i).remove(), it.merge([], r.childNodes))
    };
    var rr = it.fn.load;
    it.fn.load = function(e, t, n) {
        if ("string" != typeof e && rr) return rr.apply(this, arguments);
        var r, i, o, a = this,
        s = e.indexOf(" ");
        return s >= 0 && (r = it.trim(e.slice(s, e.length)), e = e.slice(0, s)),
        it.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"),
        a.length > 0 && it.ajax({
            url: e,
            type: o,
            dataType: "html",
            data: t
        }).done(function(e) {
            i = arguments,
            a.html(r ? it("<div>").append(it.parseHTML(e)).find(r) : e)
        }).complete(n &&
        function(e, t) {
            a.each(n, i || [e.responseText, t, e])
        }),
        this
    },
    it.expr.filters.animated = function(e) {
        return it.grep(it.timers,
        function(t) {
            return e === t.elem
        }).length
    };
    var ir = e.document.documentElement;
    it.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, l, u, c = it.css(e, "position"),
            d = it(e),
            f = {};
            "static" === c && (e.style.position = "relative"),
            s = d.offset(),
            o = it.css(e, "top"),
            l = it.css(e, "left"),
            u = ("absolute" === c || "fixed" === c) && it.inArray("auto", [o, l]) > -1,
            u ? (r = d.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(l) || 0),
            it.isFunction(t) && (t = t.call(e, n, s)),
            null != t.top && (f.top = t.top - s.top + a),
            null != t.left && (f.left = t.left - s.left + i),
            "using" in t ? t.using.call(e, f) : d.css(f)
        }
    },
    it.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this: this.each(function(t) {
                it.offset.setOffset(this, e, t)
            });
            var t, n, r = {
                top: 0,
                left: 0
            },
            i = this[0],
            o = i && i.ownerDocument;
            return o ? (t = o.documentElement, it.contains(t, i) ? (typeof i.getBoundingClientRect !== Ct && (r = i.getBoundingClientRect()), n = V(o), {
                top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : r) : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n = {
                    top: 0,
                    left: 0
                },
                r = this[0];
                return "fixed" === it.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), it.nodeName(e[0], "html") || (n = e.offset()), n.top += it.css(e[0], "borderTopWidth", !0), n.left += it.css(e[0], "borderLeftWidth", !0)),
                {
                    top: t.top - n.top - it.css(r, "marginTop", !0),
                    left: t.left - n.left - it.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || ir; e && !it.nodeName(e, "html") && "static" === it.css(e, "position");) e = e.offsetParent;
                return e || ir
            })
        }
    }),
    it.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    },
    function(e, t) {
        var n = /Y/.test(t);
        it.fn[e] = function(r) {
            return Dt(this,
            function(e, r, i) {
                var o = V(e);
                return void 0 === i ? o ? t in o ? o[t] : o.document.documentElement[r] : e[r] : void(o ? o.scrollTo(n ? it(o).scrollLeft() : i, n ? i: it(o).scrollTop()) : e[r] = i)
            },
            e, r, arguments.length, null)
        }
    }),
    it.each(["top", "left"],
    function(e, t) {
        it.cssHooks[t] = k(nt.pixelPosition,
        function(e, n) {
            return n ? (n = tn(e, t), rn.test(n) ? it(e).position()[t] + "px": n) : void 0
        })
    }),
    it.each({
        Height: "height",
        Width: "width"
    },
    function(e, t) {
        it.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        },
        function(n, r) {
            it.fn[r] = function(r, i) {
                var o = arguments.length && (n || "boolean" != typeof r),
                a = n || (r === !0 || i === !0 ? "margin": "border");
                return Dt(this,
                function(t, n, r) {
                    var i;
                    return it.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? it.css(t, n, a) : it.style(t, n, r, a)
                },
                t, o ? r: void 0, o, null)
            }
        })
    }),
    it.fn.size = function() {
        return this.length
    },
    it.fn.andSelf = it.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [],
    function() {
        return it
    });
    var or = e.jQuery,
    ar = e.$;
    return it.noConflict = function(t) {
        return e.$ === it && (e.$ = ar),
        t && e.jQuery === it && (e.jQuery = or),
        it
    },
    typeof t === Ct && (e.jQuery = e.$ = it),
    it
});; !
function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window: "undefined" != typeof global ? global: "undefined" != typeof self ? self: this,
        e.AMUI = t()
    }
} (function() {
    return function t(e, i, n) {
        function o(a, r) {
            if (!i[a]) {
                if (!e[a]) {
                    var l = "function" == typeof require && require;
                    if (!r && l) return l(a, !0);
                    if (s) return s(a, !0);
                    var d = new Error("Cannot find module '" + a + "'");
                    throw d.code = "MODULE_NOT_FOUND",
                    d
                }
                var u = i[a] = {
                    exports: {}
                };
                e[a][0].call(u.exports,
                function(t) {
                    var i = e[a][1][t];
                    return o(i ? i: t)
                },
                u, u.exports, t, e, i, n)
            }
            return i[a].exports
        }
        for (var s = "function" == typeof require && require,
        a = 0; a < n.length; a++) o(n[a]);
        return o
    } ({
        1 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                t(30),
                t(3),
                t(4),
                t(5),
                t(6),
                t(7),
                t(8),
                t(9),
                t(10),
                t(11),
                t(12),
                t(13),
                t(14),
                t(15),
                t(16),
                t(17),
                t(18),
                t(19),
                t(20),
                t(21),
                t(22),
                t(23),
                t(24),
                t(25),
                t(26),
                t(27),
                t(28),
                t(29),
                t(31),
                t(32),
                t(33),
                t(34),
                t(35),
                t(36),
                t(37),
                t(38),
                t(39),
                t(40),
                t(41),
                t(42),
                t(43),
                t(44),
                t(45),
                t(46),
                t(47),
                t(48),
                t(49),
                t(50),
                t(51),
                t(52),
                e.exports = n.AMUI
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            10 : 10,
            11 : 11,
            12 : 12,
            13 : 13,
            14 : 14,
            15 : 15,
            16 : 16,
            17 : 17,
            18 : 18,
            19 : 19,
            2 : 2,
            20 : 20,
            21 : 21,
            22 : 22,
            23 : 23,
            24 : 24,
            25 : 25,
            26 : 26,
            27 : 27,
            28 : 28,
            29 : 29,
            3 : 3,
            30 : 30,
            31 : 31,
            32 : 32,
            33 : 33,
            34 : 34,
            35 : 35,
            36 : 36,
            37 : 37,
            38 : 38,
            39 : 39,
            4 : 4,
            40 : 40,
            41 : 41,
            42 : 42,
            43 : 43,
            44 : 44,
            45 : 45,
            46 : 46,
            47 : 47,
            48 : 48,
            49 : 49,
            5 : 5,
            50 : 50,
            51 : 51,
            52 : 52,
            6 : 6,
            7 : 7,
            8 : 8,
            9 : 9
        }],
        2 : [function(t, e) { (function(t) {
                "use strict";
                var i = "undefined" != typeof window ? window.jQuery: "undefined" != typeof t ? t.jQuery: null;
                if ("undefined" == typeof i) throw new Error("Amaze UI 2.x requires jQuery :-(\n爱上一匹野马，可你的家里没有草原…");
                var n = i.AMUI || {},
                o = i(window),
                s = window.document,
                a = i("html");
                n.VERSION = "2.4.0",
                n.support = {},
                n.support.transition = function() {
                    var t = function() {
                        var t = s.body || s.documentElement,
                        e = {
                            WebkitTransition: "webkitTransitionEnd",
                            MozTransition: "transitionend",
                            OTransition: "oTransitionEnd otransitionend",
                            transition: "transitionend"
                        };
                        for (var i in e) if (void 0 !== t.style[i]) return e[i]
                    } ();
                    return t && {
                        end: t
                    }
                } (),
                n.support.animation = function() {
                    var t = function() {
                        var t = s.body || s.documentElement,
                        e = {
                            WebkitAnimation: "webkitAnimationEnd",
                            MozAnimation: "animationend",
                            OAnimation: "oAnimationEnd oanimationend",
                            animation: "animationend"
                        };
                        for (var i in e) if (void 0 !== t.style[i]) return e[i]
                    } ();
                    return t && {
                        end: t
                    }
                } (),
                n.support.touch = "ontouchstart" in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/) || window.DocumentTouch && document instanceof window.DocumentTouch || window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0 || !1,
                n.support.mutationobserver = window.MutationObserver || window.WebKitMutationObserver || null,
                n.support.formValidation = "function" == typeof document.createElement("form").checkValidity,
                n.utils = {},
                n.utils.debounce = function(t, e, i) {
                    var n;
                    return function() {
                        var o = this,
                        s = arguments,
                        a = function() {
                            n = null,
                            i || t.apply(o, s)
                        },
                        r = i && !n;
                        clearTimeout(n),
                        n = setTimeout(a, e),
                        r && t.apply(o, s)
                    }
                },
                n.utils.isInView = function(t, e) {
                    var n = i(t),
                    s = !(!n.width() && !n.height()) && "none" !== n.css("display");
                    if (!s) return ! 1;
                    var a = o.scrollLeft(),
                    r = o.scrollTop(),
                    l = n.offset(),
                    d = l.left,
                    u = l.top;
                    return e = i.extend({
                        topOffset: 0,
                        leftOffset: 0
                    },
                    e),
                    u + n.height() >= r && u - e.topOffset <= r + o.height() && d + n.width() >= a && d - e.leftOffset <= a + o.width()
                },
                n.utils.parseOptions = n.utils.options = function(t) {
                    if (i.isPlainObject(t)) return t;
                    var e = t ? t.indexOf("{") : -1,
                    n = {};
                    if ( - 1 != e) try {
                        n = new Function("", "var json = " + t.substr(e) + "; return JSON.parse(JSON.stringify(json));")()
                    } catch(o) {}
                    return n
                },
                n.utils.generateGUID = function(t) {
                    var e = t + "-" || "am-";
                    do e += Math.random().toString(36).substring(2, 7);
                    while (document.getElementById(e));
                    return e
                },
                i.fn.emulateTransitionEnd = function(t) {
                    var e = !1,
                    o = this;
                    i(this).one(n.support.transition.end,
                    function() {
                        e = !0
                    });
                    var s = function() {
                        e || i(o).trigger(n.support.transition.end),
                        o.transitionEndTimmer = void 0
                    };
                    return this.transitionEndTimmer = setTimeout(s, t),
                    this
                },
                i.fn.redraw = function() {
                    return i(this).each(function() {
                        this.offsetHeight
                    }),
                    this
                },
                i.fn.transitionEnd = function(t) {
                    function e(n) {
                        t.call(this, n),
                        i && o.off(i, e)
                    }
                    var i = n.support.transition.end,
                    o = this;
                    return t && i && o.on(i, e),
                    this
                },
                i.fn.removeClassRegEx = function() {
                    return this.each(function(t) {
                        var e = i(this).attr("class");
                        if (!e || !t) return ! 1;
                        var n = [];
                        e = e.split(" ");
                        for (var o = 0,
                        s = e.length; s > o; o++) e[o].match(t) || n.push(e[o]);
                        i(this).attr("class", n.join(" "))
                    })
                },
                i.fn.alterClass = function(t, e) {
                    var n = this;
                    if ( - 1 === t.indexOf("*")) return n.removeClass(t),
                    e ? n.addClass(e) : n;
                    var o = new RegExp("\\s" + t.replace(/\*/g, "[A-Za-z0-9-_]+").split(" ").join("\\s|\\s") + "\\s", "g");
                    return n.each(function(t, e) {
                        for (var n = " " + e.className + " "; o.test(n);) n = n.replace(o, " ");
                        e.className = i.trim(n)
                    }),
                    e ? n.addClass(e) : n
                },
                n.utils.rAF = function() {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
                    function(t) {
                        return window.setTimeout(t, 1e3 / 60)
                    }
                } (),
                n.utils.cancelAF = function() {
                    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame ||
                    function(t) {
                        window.clearTimeout(t)
                    }
                } (),
                n.utils.measureScrollbar = function() {
                    if (document.body.clientWidth >= window.innerWidth) return 0;
                    var t = i('<div style="width: 100px;height: 100px;overflow: scroll;position: absolute;top: -9999px;"></div>');
                    i(document.body).append(t);
                    var e = t[0].offsetWidth - t[0].clientWidth;
                    return t.remove(),
                    e
                },
                n.utils.imageLoader = function(t, e) {
                    function i() {
                        e(t[0])
                    }
                    function n() {
                        if (this.one("load", i), /MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                            var t = this.attr("src"),
                            e = t.match(/\?/) ? "&": "?";
                            e += "random=" + (new Date).getTime(),
                            this.attr("src", t + e)
                        }
                    }
                    return t.attr("src") ? void(t[0].complete || 4 === t[0].readyState ? i() : n.call(t)) : void i()
                },
                n.template = function(t, e) {
                    var i = n.template;
                    return i.cache[t] || (i.cache[t] = function() {
                        var e = t,
                        n = /^[\w\-]+$/.test(t) ? i.get(t) : (e = "template(string)", t),
                        o = 1,
                        s = ("try { " + (i.variable ? "var " + i.variable + " = this.stash;": "with (this.stash) { ") + "this.ret += '" + n.replace(/<%/g, "").replace(/%>/g, "").replace(/'(?![^\x11\x13]+?\x13)/g, "\\x27").replace(/^\s*|\s*$/g, "").replace(/\n/g,
                        function() {
                            return "';\nthis.line = " + ++o + "; this.ret += '\\n"
                        }).replace(/\x11-(.+?)\x13/g, "' + ($1) + '").replace(/\x11=(.+?)\x13/g, "' + this.escapeHTML($1) + '").replace(/\x11(.+?)\x13/g, "'; $1; this.ret += '") + "'; " + (i.variable ? "": "}") + "return this.ret;} catch (e) { throw 'TemplateError: ' + e + ' (on " + e + "' + ' line ' + this.line + ')'; } //@ sourceURL=" + e + "\n").replace(/this\.ret \+= '';/g, ""),
                        a = new Function(s),
                        r = {
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            '"': "&#x22;",
                            "'": "&#x27;"
                        },
                        l = function(t) {
                            return ("" + t).replace(/[&<>\'\"]/g,
                            function(t) {
                                return r[t]
                            })
                        };
                        return function(t) {
                            return a.call(i.context = {
                                escapeHTML: l,
                                line: 1,
                                ret: "",
                                stash: t
                            })
                        }
                    } ()),
                    e ? i.cache[t](e) : i.cache[t]
                },
                n.template.cache = {},
                n.template.get = function(t) {
                    if (t) {
                        var e = document.getElementById(t);
                        return e && e.innerHTML || ""
                    }
                },
                n.DOMWatchers = [],
                n.DOMReady = !1,
                n.ready = function(t) {
                    n.DOMWatchers.push(t),
                    n.DOMReady && t(document)
                },
                n.DOMObserve = function(t, e, o) {
                    var s = n.support.mutationobserver;
                    s && (e = i.isPlainObject(e) ? e: {
                        childList: !0,
                        subtree: !0
                    },
                    o = "function" == typeof o && o ||
                    function() {},
                    i(t).each(function() {
                        var t = this,
                        a = i(t);
                        if (!a.data("am.observer")) try {
                            var r = new s(n.utils.debounce(function(e, i) {
                                o.call(t, e, i),
                                a.trigger("changed.dom.amui")
                            },
                            50));
                            r.observe(t, e),
                            a.data("am.observer", r)
                        } catch(l) {}
                    }))
                },
                i.fn.DOMObserve = function(t, e) {
                    return this.each(function() {
                        n.DOMObserve(this, t, e)
                    })
                },
                n.support.touch && a.addClass("am-touch"),
                i(document).on("changed.dom.amui",
                function(t) {
                    var e = t.target;
                    i.each(n.DOMWatchers,
                    function(t, i) {
                        i(e)
                    })
                }),
                i(function() {
                    var t = i("body");
                    n.DOMReady = !0,
                    i.each(n.DOMWatchers,
                    function(t, e) {
                        e(document)
                    }),
                    n.DOMObserve("[data-am-observe]"),
                    a.removeClass("no-js").addClass("js"),
                    n.support.animation && a.addClass("cssanimations"),
                    window.navigator.standalone && a.addClass("am-standalone"),
                    i(".am-topbar-fixed-top").length && t.addClass("am-with-topbar-fixed-top"),
                    i(".am-topbar-fixed-bottom").length && t.addClass("am-with-topbar-fixed-bottom");
                    var e = i(".am-layout");
                    e.find('[class*="md-block-grid"]').alterClass("md-block-grid-*"),
                    e.find('[class*="lg-block-grid"]').alterClass("lg-block-grid"),
                    i("[data-am-widget]").each(function() {
                        var t = i(this);
                        0 === t.parents(".am-layout").length && t.addClass("am-no-layout")
                    })
                }),
                i.AMUI = n,
                e.exports = n
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {}],
        3 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    window.removeEventListener("load", n, !1),
                    l = !0
                }
                function o(t) {
                    return d = d || new o.Class(t)
                }
                function s(t, e) {
                    for (var i in e) t[i] = e[i];
                    return t
                }
                function a() {
                    "#ath" == document.location.hash && history.replaceState("", window.document.title, document.location.href.split("#")[0]),
                    u.test(document.location.href) && history.replaceState("", window.document.title, document.location.href.replace(u, "$1")),
                    c.test(document.location.search) && history.replaceState("", window.document.title, document.location.href.replace(c, "$2"))
                }
                var r = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2);
                var l = !1;
                "complete" === document.readyState ? l = !0 : window.addEventListener("load", n, !1);
                var d, u = /\/ath(\/)?$/,
                c = /([\?&]ath=[^&]*$|&ath=[^&]*(&))/;
                o.intl = {
                    en_us: {
                        message: "To add this web net.app to the home screen: tap %icon and then <strong>%action</strong>.",
                        action: {
                            ios: "Add to Home Screen",
                            android: "Add to homescreen",
                            windows: "pin to start"
                        }
                    },
                    zh_cn: {
                        message: "如要把应用程式加至主屏幕,请点击%icon, 然后<strong>%action</strong>",
                        action: {
                            ios: "加至主屏幕",
                            android: "加至主屏幕",
                            windows: "按住启动"
                        }
                    },
                    zh_tw: {
                        message: "如要把應用程式加至主屏幕, 請點擊%icon, 然後<strong>%action</strong>.",
                        action: {
                            ios: "加至主屏幕",
                            android: "加至主屏幕",
                            windows: "按住啟動"
                        }
                    }
                };
                for (var h in o.intl) o.intl[h.substr(0, 2)] = o.intl[h];
                o.defaults = {
                    appID: "org.cubiq.addtohome",
                    fontSize: 15,
                    debug: !1,
                    modal: !1,
                    mandatory: !1,
                    autostart: !0,
                    skipFirstVisit: !1,
                    startDelay: 1,
                    lifespan: 15,
                    displayPace: 1440,
                    maxDisplayCount: 0,
                    icon: !0,
                    message: "",
                    validLocation: [],
                    onInit: null,
                    onShow: null,
                    onRemove: null,
                    onAdd: null,
                    onPrivate: null,
                    detectHomescreen: !1
                };
                var p = window.navigator.userAgent,
                f = window.navigator;
                s(o, {
                    hasToken: "#ath" == document.location.hash || u.test(document.location.href) || c.test(document.location.search),
                    isRetina: window.devicePixelRatio && window.devicePixelRatio > 1,
                    isIDevice: /iphone|ipod|ipad/i.test(p),
                    isMobileChrome: p.indexOf("Android") > -1 && /Chrome\/[.0-9]*/.test(p),
                    isMobileIE: p.indexOf("Windows Phone") > -1,
                    language: f.language && f.language.toLowerCase().replace("-", "_") || ""
                }),
                o.language = o.language && o.language in o.intl ? o.language: "en_us",
                o.isMobileSafari = o.isIDevice && p.indexOf("Safari") > -1 && p.indexOf("CriOS") < 0,
                o.OS = o.isIDevice ? "ios": o.isMobileChrome ? "android": o.isMobileIE ? "windows": "unsupported",
                o.OSVersion = p.match(/(OS|Android) (\d+[_\.]\d+)/),
                o.OSVersion = o.OSVersion && o.OSVersion[2] ? +o.OSVersion[2].replace("_", ".") : 0,
                o.isStandalone = window.navigator.standalone || o.isMobileChrome && screen.height - document.documentElement.clientHeight < 40,
                o.isTablet = o.isMobileSafari && p.indexOf("iPad") > -1 || o.isMobileChrome && p.indexOf("Mobile") < 0,
                o.isCompatible = o.isMobileSafari && o.OSVersion >= 6 || o.isMobileChrome;
                var m = {
                    lastDisplayTime: 0,
                    returningVisitor: !1,
                    displayCount: 0,
                    optedout: !1,
                    added: !1
                };
                o.removeSession = function(t) {
                    try {
                        localStorage.removeItem(t || o.defaults.appID)
                    } catch(e) {}
                },
                o.Class = function(t) {
                    if (this.options = s({},
                    o.defaults), s(this.options, t), this.options.mandatory = this.options.mandatory && ("standalone" in window.navigator || this.options.debug), this.options.modal = this.options.modal || this.options.mandatory, this.options.mandatory && (this.options.startDelay = -.5), this.options.detectHomescreen = this.options.detectHomescreen === !0 ? "hash": this.options.detectHomescreen, this.options.debug && (o.isCompatible = !0, o.OS = "string" == typeof this.options.debug ? this.options.debug: "unsupported" == o.OS ? "android": o.OS, o.OSVersion = "ios" == o.OS ? "8": "4"), this.container = document.documentElement, this.session = localStorage.getItem(this.options.appID), this.session = this.session ? JSON.parse(this.session) : void 0, !o.hasToken || o.isCompatible && this.session || (o.hasToken = !1, a()), o.isCompatible) {
                        this.session = this.session || m;
                        try {
                            localStorage.setItem(this.options.appID, JSON.stringify(this.session)),
                            o.hasLocalStorage = !0
                        } catch(e) {
                            o.hasLocalStorage = !1,
                            this.options.onPrivate && this.options.onPrivate.call(this)
                        }
                        for (var i = !this.options.validLocation.length,
                        n = this.options.validLocation.length; n--;) if (this.options.validLocation[n].test(document.location.href)) {
                            i = !0;
                            break
                        }
                        if (localStorage.getItem("addToHome") && this.optOut(), !this.session.optedout && !this.session.added && i) {
                            if (o.isStandalone) return void(this.session.added || (this.session.added = !0, this.updateSession(), this.options.onAdd && o.hasLocalStorage && this.options.onAdd.call(this)));
                            if (this.options.detectHomescreen) {
                                if (o.hasToken) return a(),
                                void(this.session.added || (this.session.added = !0, this.updateSession(), this.options.onAdd && o.hasLocalStorage && this.options.onAdd.call(this)));
                                "hash" == this.options.detectHomescreen ? history.replaceState("", window.document.title, document.location.href + "#ath") : "smartURL" == this.options.detectHomescreen ? history.replaceState("", window.document.title, document.location.href.replace(/(\/)?$/, "/ath$1")) : history.replaceState("", window.document.title, document.location.href + (document.location.search ? "&": "?") + "ath=")
                            } (this.session.returningVisitor || (this.session.returningVisitor = !0, this.updateSession(), !this.options.skipFirstVisit)) && o.hasLocalStorage && (this.ready = !0, this.options.onInit && this.options.onInit.call(this), this.options.autostart && this.show())
                        }
                    }
                },
                o.Class.prototype = {
                    events: {
                        load: "_delayedShow",
                        error: "_delayedShow",
                        orientationchange: "resize",
                        resize: "resize",
                        scroll: "resize",
                        click: "remove",
                        touchmove: "_preventDefault",
                        transitionend: "_removeElements",
                        webkitTransitionEnd: "_removeElements",
                        MSTransitionEnd: "_removeElements"
                    },
                    handleEvent: function(t) {
                        var e = this.events[t.type];
                        e && this[e](t)
                    },
                    show: function(t) {
                        if (this.options.autostart && !l) return void setTimeout(this.show.bind(this), 50);
                        if (!this.shown) {
                            var e = Date.now(),
                            i = this.session.lastDisplayTime;
                            if (t !== !0) {
                                if (!this.ready) return;
                                if (e - i < 6e4 * this.options.displayPace) return;
                                if (this.options.maxDisplayCount && this.session.displayCount >= this.options.maxDisplayCount) return
                            }
                            this.shown = !0,
                            this.session.lastDisplayTime = e,
                            this.session.displayCount++,
                            this.updateSession(),
                            this.applicationIcon || (this.applicationIcon = document.querySelector("ios" == o.OS ? 'head link[rel^=apple-touch-icon][sizes="152x152"],head link[rel^=apple-touch-icon][sizes="144x144"],head link[rel^=apple-touch-icon][sizes="120x120"],head link[rel^=apple-touch-icon][sizes="114x114"],head link[rel^=apple-touch-icon]': 'head link[rel^="shortcut icon"][sizes="196x196"],head link[rel^=apple-touch-icon]'));
                            var n = "";
                            n = this.options.message in o.intl ? o.intl[this.options.message].message.replace("%action", o.intl[this.options.message].action[o.OS]) : "" !== this.options.message ? this.options.message: o.intl[o.language].message.replace("%action", o.intl[o.language].action[o.OS]),
                            n = "<p>" + n.replace("%icon", '<span class="ath-action-icon">icon</span>') + "</p>",
                            this.viewport = document.createElement("div"),
                            this.viewport.className = "ath-viewport",
                            this.options.modal && (this.viewport.className += " ath-modal"),
                            this.options.mandatory && (this.viewport.className += " ath-mandatory"),
                            this.viewport.style.position = "absolute",
                            this.element = document.createElement("div"),
                            this.element.className = "ath-container ath-" + o.OS + " ath-" + o.OS + (o.OSVersion + "").substr(0, 1) + " ath-" + (o.isTablet ? "tablet": "phone"),
                            this.element.style.cssText = "-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);transition-property:transform,opacity;transition-duration:0;transform:translate3d(0,0,0);-webkit-transition-timing-function:ease-out",
                            this.element.style.webkitTransform = "translate3d(0,-" + window.innerHeight + "px,0)",
                            this.element.style.webkitTransitionDuration = "0s",
                            this.options.icon && this.applicationIcon && (this.element.className += " ath-icon", this.img = document.createElement("img"), this.img.className = "ath-application-icon", this.img.addEventListener("load", this, !1), this.img.addEventListener("error", this, !1), this.img.src = this.applicationIcon.href, this.element.appendChild(this.img)),
                            this.element.innerHTML += n,
                            this.viewport.style.left = "-99999em",
                            this.viewport.appendChild(this.element),
                            this.container.appendChild(this.viewport),
                            this.img || this._delayedShow()
                        }
                    },
                    _delayedShow: function() {
                        setTimeout(this._show.bind(this), 1e3 * this.options.startDelay + 500)
                    },
                    _show: function() {
                        var t = this;
                        this.updateViewport(),
                        window.addEventListener("resize", this, !1),
                        window.addEventListener("scroll", this, !1),
                        window.addEventListener("orientationchange", this, !1),
                        this.options.modal && document.addEventListener("touchmove", this, !0),
                        this.options.mandatory || setTimeout(function() {
                            t.element.addEventListener("click", t, !0)
                        },
                        1e3),
                        setTimeout(function() {
                            t.element.style.webkitTransform = "translate3d(0,0,0)",
                            t.element.style.webkitTransitionDuration = "1.2s"
                        },
                        0),
                        this.options.lifespan && (this.removeTimer = setTimeout(this.remove.bind(this), 1e3 * this.options.lifespan)),
                        this.options.onShow && this.options.onShow.call(this)
                    },
                    remove: function() {
                        clearTimeout(this.removeTimer),
                        this.img && (this.img.removeEventListener("load", this, !1), this.img.removeEventListener("error", this, !1)),
                        window.removeEventListener("resize", this, !1),
                        window.removeEventListener("scroll", this, !1),
                        window.removeEventListener("orientationchange", this, !1),
                        document.removeEventListener("touchmove", this, !0),
                        this.element.removeEventListener("click", this, !0),
                        this.element.addEventListener("transitionend", this, !1),
                        this.element.addEventListener("webkitTransitionEnd", this, !1),
                        this.element.addEventListener("MSTransitionEnd", this, !1),
                        this.element.style.webkitTransitionDuration = "0.3s",
                        this.element.style.opacity = "0"
                    },
                    _removeElements: function() {
                        this.element.removeEventListener("transitionend", this, !1),
                        this.element.removeEventListener("webkitTransitionEnd", this, !1),
                        this.element.removeEventListener("MSTransitionEnd", this, !1),
                        this.container.removeChild(this.viewport),
                        this.shown = !1,
                        this.options.onRemove && this.options.onRemove.call(this)
                    },
                    updateViewport: function() {
                        if (this.shown) {
                            this.viewport.style.width = window.innerWidth + "px",
                            this.viewport.style.height = window.innerHeight + "px",
                            this.viewport.style.left = window.scrollX + "px",
                            this.viewport.style.top = window.scrollY + "px";
                            var t = document.documentElement.clientWidth;
                            this.orientation = t > document.documentElement.clientHeight ? "landscape": "portrait";
                            var e = "ios" == o.OS ? "portrait" == this.orientation ? screen.width: screen.height: screen.width;
                            this.scale = screen.width > t ? 1 : e / window.innerWidth,
                            this.element.style.fontSize = this.options.fontSize / this.scale + "px"
                        }
                    },
                    resize: function() {
                        clearTimeout(this.resizeTimer),
                        this.resizeTimer = setTimeout(this.updateViewport.bind(this), 100)
                    },
                    updateSession: function() {
                        o.hasLocalStorage !== !1 && localStorage.setItem(this.options.appID, JSON.stringify(this.session))
                    },
                    clearSession: function() {
                        this.session = m,
                        this.updateSession()
                    },
                    optOut: function() {
                        this.session.optedout = !0,
                        this.updateSession()
                    },
                    optIn: function() {
                        this.session.optedout = !1,
                        this.updateSession()
                    },
                    clearDisplayCount: function() {
                        this.session.displayCount = 0,
                        this.updateSession()
                    },
                    _preventDefault: function(t) {
                        t.preventDefault(),
                        t.stopPropagation()
                    }
                },
                r.AMUI.addToHomescreen = o,
                e.exports = o
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        4 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                o = t(2),
                s = function(t, e) {
                    var i = this;
                    this.options = n.extend({},
                    s.DEFAULTS, e),
                    this.$element = n(t),
                    this.$element.addClass("am-fade am-in").on("click.alert.amui", ".am-close",
                    function() {
                        i.close.call(this)
                    })
                };
                s.DEFAULTS = {
                    removeElement: !0
                },
                s.prototype.close = function() {
                    function t() {
                        i.trigger("closed.alert.amui").remove()
                    }
                    var e = n(this),
                    i = e.hasClass("am-alert") ? e: e.parent(".am-alert");
                    i.trigger("close.alert.amui"),
                    i.removeClass("am-in"),
                    o.support.transition && i.hasClass("am-fade") ? i.one(o.support.transition.end, t).emulateTransitionEnd(200) : t()
                },
                n.fn.alert = function(t) {
                    return this.each(function() {
                        var e = n(this),
                        i = e.data("amui.alert"),
                        o = "object" == typeof t && t;
                        i || e.data("amui.alert", i = new s(this, o || {})),
                        "string" == typeof t && i[t].call(e)
                    })
                },
                n(document).on("click.alert.amui.data-api", "[data-am-alert]",
                function(t) {
                    var e = n(t.target);
                    n(this).addClass("am-fade am-in"),
                    e.is(".am-close") && n(this).alert("close")
                }),
                n.AMUI.alert = s,
                e.exports = s
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        5 : [function(t, e) { (function(i) {
                "use strict";
                function n(t) {
                    return this.each(function() {
                        var e = o(this),
                        i = e.data("amui.button"),
                        n = "object" == typeof t && t || {};
                        i || e.data("amui.button", i = new a(this, n)),
                        "toggle" == t ? i.toggle() : "string" == typeof t && i.setState(t)
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2),
                a = function(t, e) {
                    this.$element = o(t),
                    this.options = o.extend({},
                    a.DEFAULTS, e),
                    this.isLoading = !1,
                    this.hasSpinner = !1
                };
                a.DEFAULTS = {
                    loadingText: "loading...",
                    className: {
                        loading: "am-btn-loading",
                        disabled: "am-disabled"
                    },
                    spinner: void 0
                },
                a.prototype.setState = function(t) {
                    var e = "disabled",
                    i = this.$element,
                    n = this.options,
                    a = i.is("input") ? "val": "html",
                    r = n.className.disabled + " " + n.className.loading;
                    t += "Text",
                    n.resetText || (n.resetText = i[a]()),
                    s.support.animation && n.spinner && "html" === a && !this.hasSpinner && (n.loadingText = '<span class="am-icon-' + n.spinner + ' am-icon-spin"></span>' + n.loadingText, this.hasSpinner = !0),
                    i[a](n[t]),
                    setTimeout(o.proxy(function() {
                        "loadingText" == t ? (i.addClass(r).attr(e, e), this.isLoading = !0) : this.isLoading && (i.removeClass(r).removeAttr(e), this.isLoading = !1)
                    },
                    this), 0)
                },
                a.prototype.toggle = function() {
                    var t = !0,
                    e = this.$element,
                    i = this.$element.parent(".am-btn-group");
                    if (i.length) {
                        var n = this.$element.find("input");
                        "radio" == n.prop("type") && (n.prop("checked") && e.hasClass("am-active") ? t = !1 : i.find(".am-active").removeClass("am-active")),
                        t && n.prop("checked", !e.hasClass("am-active")).trigger("change")
                    }
                    t && (e.toggleClass("am-active"), e.hasClass("am-active") || e.blur())
                },
                o.fn.button = n,
                o(document).on("click.button.amui.data-api", "[data-am-button]",
                function(t) {
                    var e = o(t.target);
                    e.hasClass("am-btn") || (e = e.closest(".am-btn")),
                    n.call(e, "toggle"),
                    t.preventDefault()
                }),
                s.ready(function(t) {
                    o("[data-am-loading]", t).each(function() {
                        o(this).button(s.utils.parseOptions(o(this).data("amLoading")))
                    })
                }),
                o.AMUI.button = a,
                e.exports = a
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        6 : [function(t, e) { (function(i) {
                "use strict";
                function n(t) {
                    return this.each(function() {
                        var e = o(this),
                        i = e.data("amui.collapse"),
                        n = o.extend({},
                        a.DEFAULTS, s.utils.options(e.attr("data-am-collapse")), "object" == typeof t && t); ! i && n.toggle && "open" == t && (t = !t),
                        i || e.data("amui.collapse", i = new a(this, n)),
                        "string" == typeof t && i[t]()
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2),
                a = function(t, e) {
                    this.$element = o(t),
                    this.options = o.extend({},
                    a.DEFAULTS, e),
                    this.transitioning = null,
                    this.options.parent && (this.$parent = o(this.options.parent)),
                    this.options.toggle && this.toggle()
                };
                a.DEFAULTS = {
                    toggle: !0
                },
                a.prototype.open = function() {
                    if (!this.transitioning && !this.$element.hasClass("am-in")) {
                        var t = o.Event("open.collapse.amui");
                        if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                            var e = this.$parent && this.$parent.find("> .am-panel > .am-in");
                            if (e && e.length) {
                                var i = e.data("amui.collapse");
                                if (i && i.transitioning) return;
                                n.call(e, "close"),
                                i || e.data("amui.collapse", null)
                            }
                            this.$element.removeClass("am-collapse").addClass("am-collapsing").height(0),
                            this.transitioning = 1;
                            var a = function() {
                                this.$element.removeClass("am-collapsing").addClass("am-collapse am-in").height(""),
                                this.transitioning = 0,
                                this.$element.trigger("opened.collapse.amui")
                            };
                            if (!s.support.transition) return a.call(this);
                            var r = this.$element[0].scrollHeight;
                            this.$element.one(s.support.transition.end, o.proxy(a, this)).emulateTransitionEnd(300).css({
                                height: r
                            })
                        }
                    }
                },
                a.prototype.close = function() {
                    if (!this.transitioning && this.$element.hasClass("am-in")) {
                        var t = o.Event("close.collapse.amui");
                        if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                            this.$element.height(this.$element.height()).redraw(),
                            this.$element.addClass("am-collapsing").removeClass("am-collapse am-in"),
                            this.transitioning = 1;
                            var e = function() {
                                this.transitioning = 0,
                                this.$element.trigger("closed.collapse.amui").removeClass("am-collapsing").addClass("am-collapse")
                            };
                            return s.support.transition ? void this.$element.height(0).one(s.support.transition.end, o.proxy(e, this)).emulateTransitionEnd(300) : e.call(this)
                        }
                    }
                },
                a.prototype.toggle = function() {
                    this[this.$element.hasClass("am-in") ? "close": "open"]()
                },
                o.fn.collapse = n,
                o(document).on("click.collapse.amui.data-api", "[data-am-collapse]",
                function(t) {
                    var e, i = o(this),
                    a = s.utils.options(i.attr("data-am-collapse")),
                    r = a.target || t.preventDefault() || (e = i.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""),
                    l = o(r),
                    d = l.data("amui.collapse"),
                    u = d ? "toggle": a,
                    c = a.parent,
                    h = c && o(c);
                    d && d.transitioning || (h && h.find("[data-am-collapse]").not(i).addClass("am-collapsed"), i[l.hasClass("am-in") ? "addClass": "removeClass"]("am-collapsed")),
                    n.call(l, u)
                }),
                o.AMUI.collapse = a,
                e.exports = a
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        7 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                o = t(2),
                s = n(document),
                a = function(t, e) {
                    if (this.$element = n(t), this.options = n.extend({},
                    a.DEFAULTS, e), this.format = r.parseFormat(this.options.format), this.$element.data("date", this.options.date), this.language = this.getLocale(this.options.locale), this.theme = this.options.theme, this.$picker = n(r.template).appendTo("body").on({
                        click: n.proxy(this.click, this)
                    }), this.isInput = this.$element.is("input"), this.component = this.$element.is(".am-datepicker-date") ? this.$element.find(".am-datepicker-add-on") : !1, this.isInput ? this.$element.on({
                        "click.datepicker.amui": n.proxy(this.open, this),
                        "keyup.datepicker.amui": n.proxy(this.update, this)
                    }) : this.component ? this.component.on("click.datepicker.amui", n.proxy(this.open, this)) : this.$element.on("click.datepicker.amui", n.proxy(this.open, this)), this.minViewMode = this.options.minViewMode, "string" == typeof this.minViewMode) switch (this.minViewMode) {
                    case "months":
                        this.minViewMode = 1;
                        break;
                    case "years":
                        this.minViewMode = 2;
                        break;
                    default:
                        this.minViewMode = 0
                    }
                    if (this.viewMode = this.options.viewMode, "string" == typeof this.viewMode) switch (this.viewMode) {
                    case "months":
                        this.viewMode = 1;
                        break;
                    case "years":
                        this.viewMode = 2;
                        break;
                    default:
                        this.viewMode = 0
                    }
                    this.startViewMode = this.viewMode,
                    this.weekStart = (this.options.weekStart || a.locales[this.language].weekStart || 0) % 7,
                    this.weekEnd = (this.weekStart + 6) % 7,
                    this.onRender = this.options.onRender,
                    this.setTheme(),
                    this.fillDow(),
                    this.fillMonths(),
                    this.update(),
                    this.showMode()
                };
                a.DEFAULTS = {
                    locale: "zh_CN",
                    format: "yyyy-mm-dd",
                    weekStart: void 0,
                    viewMode: 0,
                    minViewMode: 0,
                    date: "",
                    theme: "",
                    autoClose: 1,
                    onRender: function() {
                        return ""
                    }
                },
                a.prototype.open = function(t) {
                    this.$picker.show(),
                    this.height = this.component ? this.component.outerHeight() : this.$element.outerHeight(),
                    this.place(),
                    n(window).on("resize.datepicker.amui", n.proxy(this.place, this)),
                    t && (t.stopPropagation(), t.preventDefault());
                    var e = this;
                    s.on("mousedown.datapicker.amui touchstart.datepicker.amui",
                    function(t) {
                        0 === n(t.target).closest(".am-datepicker").length && e.close()
                    }),
                    this.$element.trigger({
                        type: "open.datepicker.amui",
                        date: this.date
                    })
                },
                a.prototype.close = function() {
                    this.$picker.hide(),
                    n(window).off("resize.datepicker.amui", this.place),
                    this.viewMode = this.startViewMode,
                    this.showMode(),
                    this.isInput || n(document).off("mousedown.datapicker.amui touchstart.datepicker.amui", this.close),
                    this.$element.trigger({
                        type: "close.datepicker.amui",
                        date: this.date
                    })
                },
                a.prototype.set = function() {
                    var t = r.formatDate(this.date, this.format);
                    this.isInput ? this.$element.prop("value", t) : (this.component && this.$element.find("input").prop("value", t), this.$element.data("date", t))
                },
                a.prototype.setValue = function(t) {
                    this.date = "string" == typeof t ? r.parseDate(t, this.format) : new Date(t),
                    this.set(),
                    this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0),
                    this.fill()
                },
                a.prototype.place = function() {
                    var t = this.component ? this.component.offset() : this.$element.offset(),
                    e = this.component ? this.component.width() : this.$element.width(),
                    i = t.top + this.height,
                    n = t.left,
                    o = s.width() - t.left - e,
                    a = this.isOutView();
                    if (this.$picker.removeClass("am-datepicker-right"), this.$picker.removeClass("am-datepicker-up"), s.width() > 640) {
                        if (a.outRight) return this.$picker.addClass("am-datepicker-right"),
                        void this.$picker.css({
                            top: i,
                            left: "auto",
                            right: o
                        });
                        a.outBottom && (this.$picker.addClass("am-datepicker-up"), i = t.top - this.$picker.outerHeight(!0))
                    } else n = 0;
                    this.$picker.css({
                        top: i,
                        left: n
                    })
                },
                a.prototype.update = function(t) {
                    this.date = r.parseDate("string" == typeof t ? t: this.isInput ? this.$element.prop("value") : this.$element.data("date"), this.format),
                    this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0),
                    this.fill()
                },
                a.prototype.fillDow = function() {
                    for (var t = this.weekStart,
                    e = "<tr>"; t < this.weekStart + 7;) e += '<th class="am-datepicker-dow">' + a.locales[this.language].daysMin[t++%7] + "</th>";
                    e += "</tr>",
                    this.$picker.find(".am-datepicker-days thead").append(e)
                },
                a.prototype.fillMonths = function() {
                    for (var t = "",
                    e = 0; 12 > e;) t += '<span class="am-datepicker-month">' + a.locales[this.language].monthsShort[e++] + "</span>";
                    this.$picker.find(".am-datepicker-months td").append(t)
                },
                a.prototype.fill = function() {
                    var t = new Date(this.viewDate),
                    e = t.getFullYear(),
                    i = t.getMonth(),
                    n = this.date.valueOf(),
                    o = new Date(e, i - 1, 28, 0, 0, 0, 0),
                    s = r.getDaysInMonth(o.getFullYear(), o.getMonth()),
                    l = this.$picker.find(".am-datepicker-days .am-datepicker-select");
                    l.text("zh_CN" === this.language ? e + a.locales[this.language].year[0] + " " + a.locales[this.language].months[i] : a.locales[this.language].months[i] + " " + e),
                    o.setDate(s),
                    o.setDate(s - (o.getDay() - this.weekStart + 7) % 7);
                    var d = new Date(o);
                    d.setDate(d.getDate() + 42),
                    d = d.valueOf();
                    for (var u, c, h, p = []; o.valueOf() < d;) o.getDay() === this.weekStart && p.push("<tr>"),
                    u = this.onRender(o),
                    c = o.getFullYear(),
                    h = o.getMonth(),
                    i > h && c === e || e > c ? u += " am-datepicker-old": (h > i && c === e || c > e) && (u += " am-datepicker-new"),
                    o.valueOf() === n && (u += " am-active"),
                    p.push('<td class="am-datepicker-day ' + u + '">' + o.getDate() + "</td>"),
                    o.getDay() === this.weekEnd && p.push("</tr>"),
                    o.setDate(o.getDate() + 1);
                    this.$picker.find(".am-datepicker-days tbody").empty().append(p.join(""));
                    var f = this.date.getFullYear(),
                    m = this.$picker.find(".am-datepicker-months").find(".am-datepicker-select").text(e);
                    m = m.end().find("span").removeClass("am-active").removeClass("am-disabled");
                    for (var v = 0; 12 > v;) this.onRender(t.setFullYear(e, v)) && m.eq(v).addClass("am-disabled"),
                    v++;
                    f === e && m.eq(this.date.getMonth()).removeClass("am-disabled").addClass("am-active"),
                    p = "",
                    e = 10 * parseInt(e / 10, 10);
                    var g, w = this.$picker.find(".am-datepicker-years").find(".am-datepicker-select").text(e + "-" + (e + 9)).end().find("td");
                    e -= 1;
                    for (var y = -1; 11 > y; y++) g = this.onRender(t.setFullYear(e)),
                    p += '<span class="' + g + ( - 1 === y || 10 === y ? " am-datepicker-old": "") + (f === e ? " am-active": "") + '">' + e + "</span>",
                    e += 1;
                    w.html(p)
                },
                a.prototype.click = function(t) {
                    t.stopPropagation(),
                    t.preventDefault();
                    var e, i, o = this.$picker.find(".am-datepicker-days").find(".am-active"),
                    s = this.$picker.find(".am-datepicker-months"),
                    a = s.find(".am-active").index(),
                    l = n(t.target).closest("span, td, th");
                    if (1 === l.length) switch (l[0].nodeName.toLowerCase()) {
                    case "th":
                        switch (l[0].className) {
                        case "am-datepicker-switch":
                            this.showMode(1);
                            break;
                        case "am-datepicker-prev":
                        case "am-datepicker-next":
                            this.viewDate["set" + r.modes[this.viewMode].navFnc].call(this.viewDate, this.viewDate["get" + r.modes[this.viewMode].navFnc].call(this.viewDate) + r.modes[this.viewMode].navStep * ("am-datepicker-prev" === l[0].className ? -1 : 1)),
                            this.fill(),
                            this.set()
                        }
                        break;
                    case "span":
                        if (l.is(".am-disabled")) return;
                        l.is(".am-datepicker-month") ? (e = l.parent().find("span").index(l), l.is(".am-active") ? this.viewDate.setMonth(e, o.text()) : this.viewDate.setMonth(e)) : (i = parseInt(l.text(), 10) || 0, l.is(".am-active") ? this.viewDate.setFullYear(i, a, o.text()) : this.viewDate.setFullYear(i)),
                        0 !== this.viewMode && (this.date = new Date(this.viewDate), this.$element.trigger({
                            type: "changeDate.datepicker.amui",
                            date: this.date,
                            viewMode: r.modes[this.viewMode].clsName
                        })),
                        this.showMode( - 1),
                        this.fill(),
                        this.set();
                        break;
                    case "td":
                        if (l.is(".am-datepicker-day") && !l.is(".am-disabled")) {
                            var d = parseInt(l.text(), 10) || 1;
                            e = this.viewDate.getMonth(),
                            l.is(".am-datepicker-old") ? e -= 1 : l.is(".am-datepicker-new") && (e += 1),
                            i = this.viewDate.getFullYear(),
                            this.date = new Date(i, e, d, 0, 0, 0, 0),
                            this.viewDate = new Date(i, e, Math.min(28, d), 0, 0, 0, 0),
                            this.fill(),
                            this.set(),
                            this.$element.trigger({
                                type: "changeDate.datepicker.amui",
                                date: this.date,
                                viewMode: r.modes[this.viewMode].clsName
                            }),
                            this.options.autoClose && this.close()
                        }
                    }
                },
                a.prototype.mousedown = function(t) {
                    t.stopPropagation(),
                    t.preventDefault()
                },
                a.prototype.showMode = function(t) {
                    t && (this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + t))),
                    this.$picker.find(">div").hide().filter(".am-datepicker-" + r.modes[this.viewMode].clsName).show()
                },
                a.prototype.isOutView = function() {
                    var t = this.component ? this.component.offset() : this.$element.offset(),
                    e = {
                        outRight: !1,
                        outBottom: !1
                    },
                    i = this.$picker,
                    n = t.left + i.outerWidth(!0),
                    o = t.top + i.outerHeight(!0) + this.$element.innerHeight();
                    return n > s.width() && (e.outRight = !0),
                    o > s.height() && (e.outBottom = !0),
                    e
                },
                a.prototype.getLocale = function(t) {
                    return t || (t = navigator.language && navigator.language.split("-"), t[1] = t[1].toUpperCase(), t = t.join("_")),
                    a.locales[t] || (t = "en_US"),
                    t
                },
                a.prototype.setTheme = function() {
                    this.theme && this.$picker.addClass("am-datepicker-" + this.theme)
                },
                a.locales = {
                    en_US: {
                        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        weekStart: 0
                    },
                    zh_CN: {
                        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                        daysMin: ["日", "一", "二", "三", "四", "五", "六"],
                        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                        weekStart: 1,
                        year: ["年"]
                    }
                };
                var r = {
                    modes: [{
                        clsName: "days",
                        navFnc: "Month",
                        navStep: 1
                    },
                    {
                        clsName: "months",
                        navFnc: "FullYear",
                        navStep: 1
                    },
                    {
                        clsName: "years",
                        navFnc: "FullYear",
                        navStep: 10
                    }],
                    isLeapYear: function(t) {
                        return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
                    },
                    getDaysInMonth: function(t, e) {
                        return [31, r.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
                    },
                    parseFormat: function(t) {
                        var e = t.match(/[.\/\-\s].*?/),
                        i = t.split(/\W+/);
                        if (!e || !i || 0 === i.length) throw new Error("Invalid date format.");
                        return {
                            separator: e,
                            parts: i
                        }
                    },
                    parseDate: function(t, e) {
                        var i, n = t.split(e.separator);
                        if (t = new Date, t.setHours(0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0), n.length === e.parts.length) {
                            for (var o = t.getFullYear(), s = t.getDate(), a = t.getMonth(), r = 0, l = e.parts.length; l > r; r++) switch (i = parseInt(n[r], 10) || 1, e.parts[r]) {
                            case "dd":
                            case "d":
                                s = i,
                                t.setDate(i);
                                break;
                            case "mm":
                            case "m":
                                a = i - 1,
                                t.setMonth(i - 1);
                                break;
                            case "yy":
                                o = 2e3 + i,
                                t.setFullYear(2e3 + i);
                                break;
                            case "yyyy":
                                o = i,
                                t.setFullYear(i)
                            }
                            t = new Date(o, a, s, 0, 0, 0)
                        }
                        return t
                    },
                    formatDate: function(t, e) {
                        var i = {
                            d: t.getDate(),
                            m: t.getMonth() + 1,
                            yy: t.getFullYear().toString().substring(2),
                            yyyy: t.getFullYear()
                        },
                        n = [];
                        i.dd = (i.d < 10 ? "0": "") + i.d,
                        i.mm = (i.m < 10 ? "0": "") + i.m;
                        for (var o = 0,
                        s = e.parts.length; s > o; o++) n.push(i[e.parts[o]]);
                        return n.join(e.separator)
                    },
                    headTemplate: '<thead><tr class="am-datepicker-header"><th class="am-datepicker-prev"><i class="am-datepicker-prev-icon"></i></th><th colspan="5" class="am-datepicker-switch"><div class="am-datepicker-select"></div></th><th class="am-datepicker-next"><i class="am-datepicker-next-icon"></i></th></tr></thead>',
                    contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
                };
                r.template = '<div class="am-datepicker am-datepicker-dropdown"><div class="am-datepicker-caret"></div><div class="am-datepicker-days"><table class="am-datepicker-table">' + r.headTemplate + '<tbody></tbody></table></div><div class="am-datepicker-months"><table class="am-datepicker-table">' + r.headTemplate + r.contTemplate + '</table></div><div class="am-datepicker-years"><table class="am-datepicker-table">' + r.headTemplate + r.contTemplate + "</table></div></div>",
                n.fn.datepicker = function(t, e) {
                    return this.each(function() {
                        var i = n(this),
                        s = i.data("amui.datepicker"),
                        r = n.extend({},
                        o.utils.options(i.data("amDatepicker")), "object" == typeof t && t);
                        s || i.data("amui.datepicker", s = new a(this, r)),
                        "string" == typeof t && s[t] && s[t](e)
                    })
                },
                n.fn.datepicker.Constructor = a,
                o.ready(function() {
                    n("[data-am-datepicker]").datepicker()
                }),
                n.AMUI.datepicker = a,
                e.exports = a
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        8 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                o = t(2),
                s = n(document),
                a = o.support.transition,
                r = function() {
                    this.id = o.utils.generateGUID("am-dimmer"),
                    this.$element = n(r.DEFAULTS.tpl, {
                        id: this.id
                    }),
                    this.inited = !1,
                    this.scrollbarWidth = 0,
                    this.$used = n([])
                };
                r.DEFAULTS = {
                    tpl: '<div class="am-dimmer" data-am-dimmer></div>'
                },
                r.prototype.init = function() {
                    return this.inited || (n(document.body).append(this.$element), this.inited = !0, s.trigger("init.dimmer.amui")),
                    this
                },
                r.prototype.open = function(t) {
                    this.inited || this.init();
                    var e = this.$element;
                    return t && (this.$used = this.$used.add(n(t))),
                    this.checkScrollbar().setScrollbar(),
                    e.off(a.end).show().trigger("open.dimmer.amui"),
                    setTimeout(function() {
                        e.addClass("am-active")
                    },
                    0),
                    this
                },
                r.prototype.close = function(t, e) {
                    function i() {
                        o.hide(),
                        this.resetScrollbar()
                    }
                    if (this.$used = this.$used.not(n(t)), !e && this.$used.length) return this;
                    var o = this.$element;
                    return o.removeClass("am-active").trigger("close.dimmer.amui"),
                    i.call(this),
                    this
                },
                r.prototype.checkScrollbar = function() {
                    return this.scrollbarWidth = o.utils.measureScrollbar(),
                    this
                },
                r.prototype.setScrollbar = function() {
                    var t = n(document.body),
                    e = parseInt(t.css("padding-right") || 0, 10);
                    return this.scrollbarWidth && t.css("padding-right", e + this.scrollbarWidth),
                    t.addClass("am-dimmer-active"),
                    this
                },
                r.prototype.resetScrollbar = function() {
                    return n(document.body).css("padding-right", "").removeClass("am-dimmer-active"),
                    this
                };
                var l = new r;
                n.AMUI.dimmer = l,
                e.exports = l
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        9 : [function(t, e) { (function(i) {
                "use strict";
                function n(t) {
                    return this.each(function() {
                        var e = o(this),
                        i = e.data("amui.dropdown"),
                        n = o.extend({},
                        s.utils.parseOptions(e.attr("data-am-dropdown")), "object" == typeof t && t);
                        i || e.data("amui.dropdown", i = new r(this, n)),
                        "string" == typeof t && i[t]()
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2),
                a = s.support.animation,
                r = function(t, e) {
                    this.options = o.extend({},
                    r.DEFAULTS, e),
                    e = this.options,
                    this.$element = o(t),
                    this.$toggle = this.$element.find(e.selector.toggle),
                    this.$dropdown = this.$element.find(e.selector.dropdown),
                    this.$boundary = e.boundary === window ? o(window) : this.$element.closest(e.boundary),
                    this.$justify = e.justify && o(e.justify).length && o(e.justify) || void 0,
                    !this.$boundary.length && (this.$boundary = o(window)),
                    this.active = this.$element.hasClass("am-active") ? !0 : !1,
                    this.animating = null,
                    this.events()
                };
                r.DEFAULTS = {
                    animation: "am-animation-slide-top-fixed",
                    boundary: window,
                    justify: void 0,
                    selector: {
                        dropdown: ".am-dropdown-content",
                        toggle: ".am-dropdown-toggle"
                    },
                    trigger: "click"
                },
                r.prototype.toggle = function() {
                    this.clear(),
                    this.animating || this[this.active ? "close": "open"]()
                },
                r.prototype.open = function() {
                    var t = this.$toggle,
                    e = this.$element,
                    i = this.$dropdown;
                    if (!t.is(".am-disabled, :disabled") && !this.active) {
                        e.trigger("open.dropdown.amui").addClass("am-active"),
                        t.trigger("focus"),
                        this.checkDimensions();
                        var n = o.proxy(function() {
                            e.trigger("opened.dropdown.amui"),
                            this.active = !0,
                            this.animating = 0
                        },
                        this);
                        a ? (this.animating = 1, i.addClass(this.options.animation).on(a.end + ".open.dropdown.amui", o.proxy(function() {
                            n(),
                            i.removeClass(this.options.animation)
                        },
                        this))) : n()
                    }
                },
                r.prototype.close = function() {
                    if (this.active) {
                        var t = "am-dropdown-animation",
                        e = this.$element,
                        i = this.$dropdown;
                        e.trigger("close.dropdown.amui");
                        var n = o.proxy(function() {
                            e.removeClass("am-active").trigger("closed.dropdown.amui"),
                            this.active = !1,
                            this.animating = 0,
                            this.$toggle.blur()
                        },
                        this);
                        a ? (i.removeClass(this.options.animation), i.addClass(t), this.animating = 1, i.one(a.end + ".close.dropdown.amui",
                        function() {
                            i.removeClass(t),
                            n()
                        })) : n()
                    }
                },
                r.prototype.checkDimensions = function() {
                    if (this.$dropdown.length) {
                        var t = this.$dropdown,
                        e = t.offset(),
                        i = t.outerWidth(),
                        n = this.$boundary.width(),
                        s = o.isWindow(this.boundary) && this.$boundary.offset() ? this.$boundary.offset().left: 0;
                        this.$justify && t.css({
                            "min-width": this.$justify.css("width")
                        }),
                        i + (e.left - s) > n && this.$element.addClass("am-dropdown-flip")
                    }
                },
                r.prototype.clear = function() {
                    o("[data-am-dropdown]").not(this.$element).each(function() {
                        var t = o(this).data("amui.dropdown");
                        t && t.close()
                    })
                },
                r.prototype.events = function() {
                    var t = "dropdown.amui",
                    e = this.$toggle;
                    e.on("click." + t, o.proxy(function(t) {
                        t.preventDefault(),
                        this.toggle()
                    },
                    this)),
                    o(document).on("keydown.dropdown.amui", o.proxy(function(t) {
                        27 === t.keyCode && this.active && this.close()
                    },
                    this)).on("click.outer.dropdown.amui", o.proxy(function(t) { ! this.active || this.$element[0] !== t.target && this.$element.find(t.target).length || this.close()
                    },
                    this))
                },
                o.fn.dropdown = n,
                s.ready(function(t) {
                    o("[data-am-dropdown]", t).dropdown()
                }),
                o(document).on("click.dropdown.amui.data-api", ".am-dropdown form",
                function(t) {
                    t.stopPropagation()
                }),
                o.AMUI.dropdown = r,
                e.exports = r
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        10 : [function(t, e) { (function(i) {
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                o = t(2);
                n.flexslider = function(t, e) {
                    var i = n(t);
                    i.vars = n.extend({},
                    n.flexslider.defaults, e);
                    var o, s = i.vars.namespace,
                    a = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
                    r = ("ontouchstart" in window || a || window.DocumentTouch && document instanceof DocumentTouch) && i.vars.touch,
                    l = "click touchend MSPointerUp keyup",
                    d = "",
                    u = "vertical" === i.vars.direction,
                    c = i.vars.reverse,
                    h = i.vars.itemWidth > 0,
                    p = "fade" === i.vars.animation,
                    f = "" !== i.vars.asNavFor,
                    m = {},
                    v = !0;
                    n.data(t, "flexslider", i),
                    m = {
                        init: function() {
                            i.animating = !1,
                            i.currentSlide = parseInt(i.vars.startAt ? i.vars.startAt: 0, 10),
                            isNaN(i.currentSlide) && (i.currentSlide = 0),
                            i.animatingTo = i.currentSlide,
                            i.atEnd = 0 === i.currentSlide || i.currentSlide === i.last,
                            i.containerSelector = i.vars.selector.substr(0, i.vars.selector.search(" ")),
                            i.slides = n(i.vars.selector, i),
                            i.container = n(i.containerSelector, i),
                            i.count = i.slides.length,
                            i.syncExists = n(i.vars.sync).length > 0,
                            "slide" === i.vars.animation && (i.vars.animation = "swing"),
                            i.prop = u ? "top": "marginLeft",
                            i.args = {},
                            i.manualPause = !1,
                            i.stopped = !1,
                            i.started = !1,
                            i.startTimeout = null,
                            i.transitions = !i.vars.video && !p && i.vars.useCSS &&
                            function() {
                                var t = document.createElement("div"),
                                e = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                                for (var n in e) if (void 0 !== t.style[e[n]]) return i.pfx = e[n].replace("Perspective", "").toLowerCase(),
                                i.prop = "-" + i.pfx + "-transform",
                                !0;
                                return ! 1
                            } (),
                            i.ensureAnimationEnd = "",
                            "" !== i.vars.controlsContainer && (i.controlsContainer = n(i.vars.controlsContainer).length > 0 && n(i.vars.controlsContainer)),
                            "" !== i.vars.manualControls && (i.manualControls = n(i.vars.manualControls).length > 0 && n(i.vars.manualControls)),
                            i.vars.randomize && (i.slides.sort(function() {
                                return Math.round(Math.random()) - .5
                            }), i.container.empty().append(i.slides)),
                            i.doMath(),
                            i.setup("init"),
                            i.vars.controlNav && m.controlNav.setup(),
                            i.vars.directionNav && m.directionNav.setup(),
                            i.vars.keyboard && (1 === n(i.containerSelector).length || i.vars.multipleKeyboard) && n(document).bind("keyup",
                            function(t) {
                                var e = t.keyCode;
                                if (!i.animating && (39 === e || 37 === e)) {
                                    var n = 39 === e ? i.getTarget("next") : 37 === e ? i.getTarget("prev") : !1;
                                    i.flexAnimate(n, i.vars.pauseOnAction)
                                }
                            }),
                            i.vars.mousewheel && i.bind("mousewheel",
                            function(t, e) {
                                t.preventDefault();
                                var n = i.getTarget(0 > e ? "next": "prev");
                                i.flexAnimate(n, i.vars.pauseOnAction)
                            }),
                            i.vars.pausePlay && m.pausePlay.setup(),
                            i.vars.slideshow && i.vars.pauseInvisible && m.pauseInvisible.init(),
                            i.vars.slideshow && (i.vars.pauseOnHover && i.hover(function() {
                                i.manualPlay || i.manualPause || i.pause()
                            },
                            function() {
                                i.manualPause || i.manualPlay || i.stopped || i.play()
                            }), i.vars.pauseInvisible && m.pauseInvisible.isHidden() || (i.vars.initDelay > 0 ? i.startTimeout = setTimeout(i.play, i.vars.initDelay) : i.play())),
                            f && m.asNav.setup(),
                            r && i.vars.touch && m.touch(),
                            (!p || p && i.vars.smoothHeight) && n(window).bind("resize orientationchange focus", m.resize),
                            i.find("img").attr("draggable", "false"),
                            setTimeout(function() {
                                i.vars.start(i)
                            },
                            200)
                        },
                        asNav: {
                            setup: function() {
                                i.asNav = !0,
                                i.animatingTo = Math.floor(i.currentSlide / i.move),
                                i.currentItem = i.currentSlide,
                                i.slides.removeClass(s + "active-slide").eq(i.currentItem).addClass(s + "active-slide"),
                                a ? (t._slider = i, i.slides.each(function() {
                                    var t = this;
                                    t._gesture = new MSGesture,
                                    t._gesture.target = t,
                                    t.addEventListener("MSPointerDown",
                                    function(t) {
                                        t.preventDefault(),
                                        t.currentTarget._gesture && t.currentTarget._gesture.addPointer(t.pointerId)
                                    },
                                    !1),
                                    t.addEventListener("MSGestureTap",
                                    function(t) {
                                        t.preventDefault();
                                        var e = n(this),
                                        o = e.index();
                                        n(i.vars.asNavFor).data("flexslider").animating || e.hasClass("active") || (i.direction = i.currentItem < o ? "next": "prev", i.flexAnimate(o, i.vars.pauseOnAction, !1, !0, !0))
                                    })
                                })) : i.slides.on(l,
                                function(t) {
                                    t.preventDefault();
                                    var e = n(this),
                                    o = e.index(),
                                    a = e.offset().left - n(i).scrollLeft();
                                    0 >= a && e.hasClass(s + "active-slide") ? i.flexAnimate(i.getTarget("prev"), !0) : n(i.vars.asNavFor).data("flexslider").animating || e.hasClass(s + "active-slide") || (i.direction = i.currentItem < o ? "next": "prev", i.flexAnimate(o, i.vars.pauseOnAction, !1, !0, !0))
                                })
                            }
                        },
                        controlNav: {
                            setup: function() {
                                i.manualControls ? m.controlNav.setupManual() : m.controlNav.setupPaging()
                            },
                            setupPaging: function() {
                                var t, e, o = "thumbnails" === i.vars.controlNav ? "control-thumbs": "control-paging",
                                a = 1;
                                if (i.controlNavScaffold = n('<ol class="' + s + "control-nav " + s + o + '"></ol>'), i.pagingCount > 1) for (var r = 0; r < i.pagingCount; r++) {
                                    if (e = i.slides.eq(r), t = "thumbnails" === i.vars.controlNav ? '<img src="' + e.attr("data-thumb") + '"/>': "<a>" + a + "</a>", "thumbnails" === i.vars.controlNav && !0 === i.vars.thumbCaptions) {
                                        var u = e.attr("data-thumbcaption");
                                        "" != u && void 0 != u && (t += '<span class="' + s + 'caption">' + u + "</span>")
                                    }
                                    i.controlNavScaffold.append("<li>" + t + "<i></i></li>"),
                                    a++
                                }
                                i.controlsContainer ? n(i.controlsContainer).append(i.controlNavScaffold) : i.append(i.controlNavScaffold),
                                m.controlNav.set(),
                                m.controlNav.active(),
                                i.controlNavScaffold.delegate("a, img", l,
                                function(t) {
                                    if (t.preventDefault(), "" === d || d === t.type) {
                                        var e = n(this),
                                        o = i.controlNav.index(e);
                                        e.hasClass(s + "active") || (i.direction = o > i.currentSlide ? "next": "prev", i.flexAnimate(o, i.vars.pauseOnAction))
                                    }
                                    "" === d && (d = t.type),
                                    m.setToClearWatchedEvent()
                                })
                            },
                            setupManual: function() {
                                i.controlNav = i.manualControls,
                                m.controlNav.active(),
                                i.controlNav.bind(l,
                                function(t) {
                                    if (t.preventDefault(), "" === d || d === t.type) {
                                        var e = n(this),
                                        o = i.controlNav.index(e);
                                        e.hasClass(s + "active") || (i.direction = o > i.currentSlide ? "next": "prev", i.flexAnimate(o, i.vars.pauseOnAction))
                                    }
                                    "" === d && (d = t.type),
                                    m.setToClearWatchedEvent()
                                })
                            },
                            set: function() {
                                var t = "thumbnails" === i.vars.controlNav ? "img": "a";
                                i.controlNav = n("." + s + "control-nav li " + t, i.controlsContainer ? i.controlsContainer: i)
                            },
                            active: function() {
                                i.controlNav.removeClass(s + "active").eq(i.animatingTo).addClass(s + "active")
                            },
                            update: function(t, e) {
                                i.pagingCount > 1 && "add" === t ? i.controlNavScaffold.append(n("<li><a>" + i.count + "</a></li>")) : 1 === i.pagingCount ? i.controlNavScaffold.find("li").remove() : i.controlNav.eq(e).closest("li").remove(),
                                m.controlNav.set(),
                                i.pagingCount > 1 && i.pagingCount !== i.controlNav.length ? i.update(e, t) : m.controlNav.active()
                            }
                        },
                        directionNav: {
                            setup: function() {
                                var t = n('<ul class="' + s + 'direction-nav"><li class="' + s + 'nav-prev"><a class="' + s + 'prev" href="#">' + i.vars.prevText + '</a></li><li class="' + s + 'nav-next"><a class="' + s + 'next" href="#">' + i.vars.nextText + "</a></li></ul>");
                                i.controlsContainer ? (n(i.controlsContainer).append(t), i.directionNav = n("." + s + "direction-nav li a", i.controlsContainer)) : (i.append(t), i.directionNav = n("." + s + "direction-nav li a", i)),
                                m.directionNav.update(),
                                i.directionNav.bind(l,
                                function(t) {
                                    t.preventDefault();
                                    var e; ("" === d || d === t.type) && (e = i.getTarget(n(this).hasClass(s + "next") ? "next": "prev"), i.flexAnimate(e, i.vars.pauseOnAction)),
                                    "" === d && (d = t.type),
                                    m.setToClearWatchedEvent()
                                })
                            },
                            update: function() {
                                var t = s + "disabled";
                                1 === i.pagingCount ? i.directionNav.addClass(t).attr("tabindex", "-1") : i.vars.animationLoop ? i.directionNav.removeClass(t).removeAttr("tabindex") : 0 === i.animatingTo ? i.directionNav.removeClass(t).filter("." + s + "prev").addClass(t).attr("tabindex", "-1") : i.animatingTo === i.last ? i.directionNav.removeClass(t).filter("." + s + "next").addClass(t).attr("tabindex", "-1") : i.directionNav.removeClass(t).removeAttr("tabindex")
                            }
                        },
                        pausePlay: {
                            setup: function() {
                                var t = n('<div class="' + s + 'pauseplay"><a></a></div>');
                                i.controlsContainer ? (i.controlsContainer.append(t), i.pausePlay = n("." + s + "pauseplay a", i.controlsContainer)) : (i.append(t), i.pausePlay = n("." + s + "pauseplay a", i)),
                                m.pausePlay.update(i.vars.slideshow ? s + "pause": s + "play"),
                                i.pausePlay.bind(l,
                                function(t) {
                                    t.preventDefault(),
                                    ("" === d || d === t.type) && (n(this).hasClass(s + "pause") ? (i.manualPause = !0, i.manualPlay = !1, i.pause()) : (i.manualPause = !1, i.manualPlay = !0, i.play())),
                                    "" === d && (d = t.type),
                                    m.setToClearWatchedEvent()
                                })
                            },
                            update: function(t) {
                                "play" === t ? i.pausePlay.removeClass(s + "pause").addClass(s + "play").html(i.vars.playText) : i.pausePlay.removeClass(s + "play").addClass(s + "pause").html(i.vars.pauseText)
                            }
                        },
                        touch: function() {
                            function e(e) {
                                i.animating ? e.preventDefault() : (window.navigator.msPointerEnabled || 1 === e.touches.length) && (i.pause(), v = u ? i.h: i.w, w = Number(new Date), b = e.touches[0].pageX, T = e.touches[0].pageY, m = h && c && i.animatingTo === i.last ? 0 : h && c ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo: h && i.currentSlide === i.last ? i.limit: h ? (i.itemW + i.vars.itemMargin) * i.move * i.currentSlide: c ? (i.last - i.currentSlide + i.cloneOffset) * v: (i.currentSlide + i.cloneOffset) * v, d = u ? T: b, f = u ? b: T, t.addEventListener("touchmove", n, !1), t.addEventListener("touchend", o, !1))
                            }
                            function n(t) {
                                b = t.touches[0].pageX,
                                T = t.touches[0].pageY,
                                g = u ? d - T: d - b,
                                y = u ? Math.abs(g) < Math.abs(b - f) : Math.abs(g) < Math.abs(T - f);
                                var e = 500; (!y || Number(new Date) - w > e) && (t.preventDefault(), !p && i.transitions && (i.vars.animationLoop || (g /= 0 === i.currentSlide && 0 > g || i.currentSlide === i.last && g > 0 ? Math.abs(g) / v + 2 : 1), i.setProps(m + g, "setTouch")))
                            }
                            function o() {
                                if (t.removeEventListener("touchmove", n, !1), i.animatingTo === i.currentSlide && !y && null !== g) {
                                    var e = c ? -g: g,
                                    s = i.getTarget(e > 0 ? "next": "prev");
                                    i.canAdvance(s) && (Number(new Date) - w < 550 && Math.abs(e) > 50 || Math.abs(e) > v / 2) ? i.flexAnimate(s, i.vars.pauseOnAction) : p || i.flexAnimate(i.currentSlide, i.vars.pauseOnAction, !0)
                                }
                                t.removeEventListener("touchend", o, !1),
                                d = null,
                                f = null,
                                g = null,
                                m = null
                            }
                            function s(e) {
                                e.stopPropagation(),
                                i.animating ? e.preventDefault() : (i.pause(), t._gesture.addPointer(e.pointerId), x = 0, v = u ? i.h: i.w, w = Number(new Date), m = h && c && i.animatingTo === i.last ? 0 : h && c ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo: h && i.currentSlide === i.last ? i.limit: h ? (i.itemW + i.vars.itemMargin) * i.move * i.currentSlide: c ? (i.last - i.currentSlide + i.cloneOffset) * v: (i.currentSlide + i.cloneOffset) * v)
                            }
                            function r(e) {
                                e.stopPropagation();
                                var i = e.target._slider;
                                if (i) {
                                    var n = -e.translationX,
                                    o = -e.translationY;
                                    return x += u ? o: n,
                                    g = x,
                                    y = u ? Math.abs(x) < Math.abs( - n) : Math.abs(x) < Math.abs( - o),
                                    e.detail === e.MSGESTURE_FLAG_INERTIA ? void setImmediate(function() {
                                        t._gesture.stop()
                                    }) : void((!y || Number(new Date) - w > 500) && (e.preventDefault(), !p && i.transitions && (i.vars.animationLoop || (g = x / (0 === i.currentSlide && 0 > x || i.currentSlide === i.last && x > 0 ? Math.abs(x) / v + 2 : 1)), i.setProps(m + g, "setTouch"))))
                                }
                            }
                            function l(t) {
                                t.stopPropagation();
                                var e = t.target._slider;
                                if (e) {
                                    if (e.animatingTo === e.currentSlide && !y && null !== g) {
                                        var i = c ? -g: g,
                                        n = e.getTarget(i > 0 ? "next": "prev");
                                        e.canAdvance(n) && (Number(new Date) - w < 550 && Math.abs(i) > 50 || Math.abs(i) > v / 2) ? e.flexAnimate(n, e.vars.pauseOnAction) : p || e.flexAnimate(e.currentSlide, e.vars.pauseOnAction, !0)
                                    }
                                    d = null,
                                    f = null,
                                    g = null,
                                    m = null,
                                    x = 0
                                }
                            }
                            var d, f, m, v, g, w, y = !1,
                            b = 0,
                            T = 0,
                            x = 0;
                            a ? (t.style.msTouchAction = "none", t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", s, !1), t._slider = i, t.addEventListener("MSGestureChange", r, !1), t.addEventListener("MSGestureEnd", l, !1)) : t.addEventListener("touchstart", e, !1)
                        },
                        resize: function() { ! i.animating && i.is(":visible") && (h || i.doMath(), p ? m.smoothHeight() : h ? (i.slides.width(i.computedW), i.update(i.pagingCount), i.setProps()) : u ? (i.viewport.height(i.h), i.setProps(i.h, "setTotal")) : (i.vars.smoothHeight && m.smoothHeight(), i.newSlides.width(i.computedW), i.setProps(i.computedW, "setTotal")))
                        },
                        smoothHeight: function(t) {
                            if (!u || p) {
                                var e = p ? i: i.viewport;
                                t ? e.animate({
                                    height: i.slides.eq(i.animatingTo).height()
                                },
                                t) : e.height(i.slides.eq(i.animatingTo).height())
                            }
                        },
                        sync: function(t) {
                            var e = n(i.vars.sync).data("flexslider"),
                            o = i.animatingTo;
                            switch (t) {
                            case "animate":
                                e.flexAnimate(o, i.vars.pauseOnAction, !1, !0);
                                break;
                            case "play":
                                e.playing || e.asNav || e.play();
                                break;
                            case "pause":
                                e.pause()
                            }
                        },
                        uniqueID: function(t) {
                            return t.filter("[id]").add(t.find("[id]")).each(function() {
                                var t = n(this);
                                t.attr("id", t.attr("id") + "_clone")
                            }),
                            t
                        },
                        pauseInvisible: {
                            visProp: null,
                            init: function() {
                                var t = m.pauseInvisible.getHiddenProp();
                                if (t) {
                                    var e = t.replace(/[H|h]idden/, "") + "visibilitychange";
                                    document.addEventListener(e,
                                    function() {
                                        m.pauseInvisible.isHidden() ? i.startTimeout ? clearTimeout(i.startTimeout) : i.pause() : i.started ? i.play() : i.vars.initDelay > 0 ? setTimeout(i.play, i.vars.initDelay) : i.play()
                                    })
                                }
                            },
                            isHidden: function() {
                                var t = m.pauseInvisible.getHiddenProp();
                                return t ? document[t] : !1
                            },
                            getHiddenProp: function() {
                                var t = ["webkit", "moz", "ms", "o"];
                                if ("hidden" in document) return "hidden";
                                for (var e = 0; e < t.length; e++) if (t[e] + "Hidden" in document) return t[e] + "Hidden";
                                return null
                            }
                        },
                        setToClearWatchedEvent: function() {
                            clearTimeout(o),
                            o = setTimeout(function() {
                                d = ""
                            },
                            3e3)
                        }
                    },
                    i.flexAnimate = function(t, e, o, a, l) {
                        if (i.vars.animationLoop || t === i.currentSlide || (i.direction = t > i.currentSlide ? "next": "prev"), f && 1 === i.pagingCount && (i.direction = i.currentItem < t ? "next": "prev"), !i.animating && (i.canAdvance(t, l) || o) && i.is(":visible")) {
                            if (f && a) {
                                var d = n(i.vars.asNavFor).data("flexslider");
                                if (i.atEnd = 0 === t || t === i.count - 1, d.flexAnimate(t, !0, !1, !0, l), i.direction = i.currentItem < t ? "next": "prev", d.direction = i.direction, Math.ceil((t + 1) / i.visible) - 1 === i.currentSlide || 0 === t) return i.currentItem = t,
                                i.slides.removeClass(s + "active-slide").eq(t).addClass(s + "active-slide"),
                                !1;
                                i.currentItem = t,
                                i.slides.removeClass(s + "active-slide").eq(t).addClass(s + "active-slide"),
                                t = Math.floor(t / i.visible)
                            }
                            if (i.animating = !0, i.animatingTo = t, e && i.pause(), i.vars.before(i), i.syncExists && !l && m.sync("animate"), i.vars.controlNav && m.controlNav.active(), h || i.slides.removeClass(s + "active-slide").eq(t).addClass(s + "active-slide"), i.atEnd = 0 === t || t === i.last, i.vars.directionNav && m.directionNav.update(), t === i.last && (i.vars.end(i), i.vars.animationLoop || i.pause()), p) r ? (i.slides.eq(i.currentSlide).css({
                                opacity: 0,
                                zIndex: 1
                            }), i.slides.eq(t).css({
                                opacity: 1,
                                zIndex: 2
                            }), i.wrapup(y)) : (i.slides.eq(i.currentSlide).css({
                                zIndex: 1
                            }).animate({
                                opacity: 0
                            },
                            i.vars.animationSpeed, i.vars.easing), i.slides.eq(t).css({
                                zIndex: 2
                            }).animate({
                                opacity: 1
                            },
                            i.vars.animationSpeed, i.vars.easing, i.wrapup));
                            else {
                                var v, g, w, y = u ? i.slides.filter(":first").height() : i.computedW;
                                h ? (v = i.vars.itemMargin, w = (i.itemW + v) * i.move * i.animatingTo, g = w > i.limit && 1 !== i.visible ? i.limit: w) : g = 0 === i.currentSlide && t === i.count - 1 && i.vars.animationLoop && "next" !== i.direction ? c ? (i.count + i.cloneOffset) * y: 0 : i.currentSlide === i.last && 0 === t && i.vars.animationLoop && "prev" !== i.direction ? c ? 0 : (i.count + 1) * y: c ? (i.count - 1 - t + i.cloneOffset) * y: (t + i.cloneOffset) * y,
                                i.setProps(g, "", i.vars.animationSpeed),
                                i.transitions ? (i.vars.animationLoop && i.atEnd || (i.animating = !1, i.currentSlide = i.animatingTo), i.container.unbind("webkitTransitionEnd transitionend"), i.container.bind("webkitTransitionEnd transitionend",
                                function() {
                                    clearTimeout(i.ensureAnimationEnd),
                                    i.wrapup(y)
                                }), clearTimeout(i.ensureAnimationEnd), i.ensureAnimationEnd = setTimeout(function() {
                                    i.wrapup(y)
                                },
                                i.vars.animationSpeed + 100)) : i.container.animate(i.args, i.vars.animationSpeed, i.vars.easing,
                                function() {
                                    i.wrapup(y)
                                })
                            }
                            i.vars.smoothHeight && m.smoothHeight(i.vars.animationSpeed)
                        }
                    },
                    i.wrapup = function(t) {
                        p || h || (0 === i.currentSlide && i.animatingTo === i.last && i.vars.animationLoop ? i.setProps(t, "jumpEnd") : i.currentSlide === i.last && 0 === i.animatingTo && i.vars.animationLoop && i.setProps(t, "jumpStart")),
                        i.animating = !1,
                        i.currentSlide = i.animatingTo,
                        i.vars.after(i)
                    },
                    i.animateSlides = function() { ! i.animating && v && i.flexAnimate(i.getTarget("next"))
                    },
                    i.pause = function() {
                        clearInterval(i.animatedSlides),
                        i.animatedSlides = null,
                        i.playing = !1,
                        i.vars.pausePlay && m.pausePlay.update("play"),
                        i.syncExists && m.sync("pause")
                    },
                    i.play = function() {
                        i.playing && clearInterval(i.animatedSlides),
                        i.animatedSlides = i.animatedSlides || setInterval(i.animateSlides, i.vars.slideshowSpeed),
                        i.started = i.playing = !0,
                        i.vars.pausePlay && m.pausePlay.update("pause"),
                        i.syncExists && m.sync("play")
                    },
                    i.stop = function() {
                        i.pause(),
                        i.stopped = !0
                    },
                    i.canAdvance = function(t, e) {
                        var n = f ? i.pagingCount - 1 : i.last;
                        return e ? !0 : f && i.currentItem === i.count - 1 && 0 === t && "prev" === i.direction ? !0 : f && 0 === i.currentItem && t === i.pagingCount - 1 && "next" !== i.direction ? !1 : t !== i.currentSlide || f ? i.vars.animationLoop ? !0 : i.atEnd && 0 === i.currentSlide && t === n && "next" !== i.direction ? !1 : i.atEnd && i.currentSlide === n && 0 === t && "next" === i.direction ? !1 : !0 : !1
                    },
                    i.getTarget = function(t) {
                        return i.direction = t,
                        "next" === t ? i.currentSlide === i.last ? 0 : i.currentSlide + 1 : 0 === i.currentSlide ? i.last: i.currentSlide - 1
                    },
                    i.setProps = function(t, e, n) {
                        var o = function() {
                            var n = t ? t: (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo,
                            o = function() {
                                if (h) return "setTouch" === e ? t: c && i.animatingTo === i.last ? 0 : c ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo: i.animatingTo === i.last ? i.limit: n;
                                switch (e) {
                                case "setTotal":
                                    return c ? (i.count - 1 - i.currentSlide + i.cloneOffset) * t: (i.currentSlide + i.cloneOffset) * t;
                                case "setTouch":
                                    return c ? t: t;
                                case "jumpEnd":
                                    return c ? t: i.count * t;
                                case "jumpStart":
                                    return c ? i.count * t: t;
                                default:
                                    return t
                                }
                            } ();
                            return - 1 * o + "px"
                        } ();
                        i.transitions && (o = u ? "translate3d(0," + o + ",0)": "translate3d(" + o + ",0,0)", n = void 0 !== n ? n / 1e3 + "s": "0s", i.container.css("-" + i.pfx + "-transition-duration", n), i.container.css("transition-duration", n)),
                        i.args[i.prop] = o,
                        (i.transitions || void 0 === n) && i.container.css(i.args),
                        i.container.css("transform", o)
                    },
                    i.setup = function(t) {
                        if (p) i.slides.css({
                            width: "100%",
                            "float": "left",
                            marginRight: "-100%",
                            position: "relative"
                        }),
                        "init" === t && (r ? i.slides.css({
                            opacity: 0,
                            display: "block",
                            webkitTransition: "opacity " + i.vars.animationSpeed / 1e3 + "s ease",
                            zIndex: 1
                        }).eq(i.currentSlide).css({
                            opacity: 1,
                            zIndex: 2
                        }) : 0 == i.vars.fadeFirstSlide ? i.slides.css({
                            opacity: 0,
                            display: "block",
                            zIndex: 1
                        }).eq(i.currentSlide).css({
                            zIndex: 2
                        }).css({
                            opacity: 1
                        }) : i.slides.css({
                            opacity: 0,
                            display: "block",
                            zIndex: 1
                        }).eq(i.currentSlide).css({
                            zIndex: 2
                        }).animate({
                            opacity: 1
                        },
                        i.vars.animationSpeed, i.vars.easing)),
                        i.vars.smoothHeight && m.smoothHeight();
                        else {
                            var e, o;
                            "init" === t && (i.viewport = n('<div class="' + s + 'viewport"></div>').css({
                                overflow: "hidden",
                                position: "relative"
                            }).appendTo(i).append(i.container), i.cloneCount = 0, i.cloneOffset = 0, c && (o = n.makeArray(i.slides).reverse(), i.slides = n(o), i.container.empty().append(i.slides))),
                            i.vars.animationLoop && !h && (i.cloneCount = 2, i.cloneOffset = 1, "init" !== t && i.container.find(".clone").remove(), i.container.append(m.uniqueID(i.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(m.uniqueID(i.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))),
                            i.newSlides = n(i.vars.selector, i),
                            e = c ? i.count - 1 - i.currentSlide + i.cloneOffset: i.currentSlide + i.cloneOffset,
                            u && !h ? (i.container.height(200 * (i.count + i.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                                i.newSlides.css({
                                    display: "block"
                                }),
                                i.doMath(),
                                i.viewport.height(i.h),
                                i.setProps(e * i.h, "init")
                            },
                            "init" === t ? 100 : 0)) : (i.container.width(200 * (i.count + i.cloneCount) + "%"), i.setProps(e * i.computedW, "init"), setTimeout(function() {
                                i.doMath(),
                                i.newSlides.css({
                                    width: i.computedW,
                                    "float": "left",
                                    display: "block"
                                }),
                                i.vars.smoothHeight && m.smoothHeight()
                            },
                            "init" === t ? 100 : 0))
                        }
                        h || i.slides.removeClass(s + "active-slide").eq(i.currentSlide).addClass(s + "active-slide"),
                        i.vars.init(i)
                    },
                    i.doMath = function() {
                        var t = i.slides.first(),
                        e = i.vars.itemMargin,
                        n = i.vars.minItems,
                        o = i.vars.maxItems;
                        i.w = void 0 === i.viewport ? i.width() : i.viewport.width(),
                        i.h = t.height(),
                        i.boxPadding = t.outerWidth() - t.width(),
                        h ? (i.itemT = i.vars.itemWidth + e, i.minW = n ? n * i.itemT: i.w, i.maxW = o ? o * i.itemT - e: i.w, i.itemW = i.minW > i.w ? (i.w - e * (n - 1)) / n: i.maxW < i.w ? (i.w - e * (o - 1)) / o: i.vars.itemWidth > i.w ? i.w: i.vars.itemWidth, i.visible = Math.floor(i.w / i.itemW), i.move = i.vars.move > 0 && i.vars.move < i.visible ? i.vars.move: i.visible, i.pagingCount = Math.ceil((i.count - i.visible) / i.move + 1), i.last = i.pagingCount - 1, i.limit = 1 === i.pagingCount ? 0 : i.vars.itemWidth > i.w ? i.itemW * (i.count - 1) + e * (i.count - 1) : (i.itemW + e) * i.count - i.w - e) : (i.itemW = i.w, i.pagingCount = i.count, i.last = i.count - 1),
                        i.computedW = i.itemW - i.boxPadding
                    },
                    i.update = function(t, e) {
                        i.doMath(),
                        h || (t < i.currentSlide ? i.currentSlide += 1 : t <= i.currentSlide && 0 !== t && (i.currentSlide -= 1), i.animatingTo = i.currentSlide),
                        i.vars.controlNav && !i.manualControls && ("add" === e && !h || i.pagingCount > i.controlNav.length ? m.controlNav.update("add") : ("remove" === e && !h || i.pagingCount < i.controlNav.length) && (h && i.currentSlide > i.last && (i.currentSlide -= 1, i.animatingTo -= 1), m.controlNav.update("remove", i.last))),
                        i.vars.directionNav && m.directionNav.update()
                    },
                    i.addSlide = function(t, e) {
                        var o = n(t);
                        i.count += 1,
                        i.last = i.count - 1,
                        u && c ? void 0 !== e ? i.slides.eq(i.count - e).after(o) : i.container.prepend(o) : void 0 !== e ? i.slides.eq(e).before(o) : i.container.append(o),
                        i.update(e, "add"),
                        i.slides = n(i.vars.selector + ":not(.clone)", i),
                        i.setup(),
                        i.vars.added(i)
                    },
                    i.removeSlide = function(t) {
                        var e = isNaN(t) ? i.slides.index(n(t)) : t;
                        i.count -= 1,
                        i.last = i.count - 1,
                        isNaN(t) ? n(t, i.slides).remove() : u && c ? i.slides.eq(i.last).remove() : i.slides.eq(t).remove(),
                        i.doMath(),
                        i.update(e, "remove"),
                        i.slides = n(i.vars.selector + ":not(.clone)", i),
                        i.setup(),
                        i.vars.removed(i)
                    },
                    m.init()
                },
                n(window).blur(function() {
                    focused = !1
                }).focus(function() {
                    focused = !0
                }),
                n.flexslider.defaults = {
                    namespace: "am-",
                    selector: ".am-slides > li",
                    animation: "slide",
                    easing: "swing",
                    direction: "horizontal",
                    reverse: !1,
                    animationLoop: !0,
                    smoothHeight: !1,
                    startAt: 0,
                    slideshow: !0,
                    slideshowSpeed: 5e3,
                    animationSpeed: 600,
                    initDelay: 0,
                    randomize: !1,
                    fadeFirstSlide: !0,
                    thumbCaptions: !1,
                    pauseOnAction: !0,
                    pauseOnHover: !1,
                    pauseInvisible: !0,
                    useCSS: !0,
                    touch: !0,
                    video: !1,
                    controlNav: !0,
                    directionNav: !0,
                    prevText: " ",
                    nextText: " ",
                    keyboard: !0,
                    multipleKeyboard: !1,
                    mousewheel: !1,
                    pausePlay: !1,
                    pauseText: "Pause",
                    playText: "Play",
                    controlsContainer: "",
                    manualControls: "",
                    sync: "",
                    asNavFor: "",
                    itemWidth: 0,
                    itemMargin: 0,
                    minItems: 1,
                    maxItems: 0,
                    move: 0,
                    allowOneSlide: !0,
                    start: function() {},
                    before: function() {},
                    after: function() {},
                    end: function() {},
                    added: function() {},
                    removed: function() {},
                    init: function() {}
                },
                n.fn.flexslider = function(t) {
                    if (void 0 === t && (t = {}), "object" == typeof t) return this.each(function() {
                        var e = n(this),
                        i = t.selector ? t.selector: ".am-slides > li",
                        o = e.find(i);
                        1 === o.length && t.allowOneSlide === !0 || 0 === o.length ? (o.fadeIn(400), t.start && t.start(e)) : void 0 === e.data("flexslider") && new n.flexslider(this, t)
                    });
                    var e = n(this).data("flexslider");
                    switch (t) {
                    case "play":
                        e.play();
                        break;
                    case "pause":
                        e.pause();
                        break;
                    case "stop":
                        e.stop();
                        break;
                    case "next":
                        e.flexAnimate(e.getTarget("next"), !0);
                        break;
                    case "prev":
                    case "previous":
                        e.flexAnimate(e.getTarget("prev"), !0);
                        break;
                    default:
                        "number" == typeof t && e.flexAnimate(t, !0)
                    }
                },
                o.ready(function(t) {
                    n("[data-am-flexslider]", t).each(function(t, e) {
                        var i = n(e),
                        s = o.utils.parseOptions(i.data("amFlexslider"));
                        s.before = function(t) {
                            t._pausedTimer && (window.clearTimeout(t._pausedTimer), t._pausedTimer = null)
                        },
                        s.after = function(t) {
                            var e = t.vars.playAfterPaused; ! e || isNaN(e) || t.playing || t.manualPause || t.manualPlay || t.stopped || (t._pausedTimer = window.setTimeout(function() {
                                t.play()
                            },
                            e))
                        },
                        i.flexslider(s)
                    })
                }),
                e.exports = n.flexslider
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        11 : [function(t, e) { (function(i) {
                "use strict";
                function n(t, e) {
                    this.wrapper = "string" == typeof t ? document.querySelector(t) : t,
                    this.scroller = this.wrapper.children[0],
                    this.scrollerStyle = this.scroller.style,
                    this.options = {
                        startX: 0,
                        startY: 0,
                        scrollY: !0,
                        directionLockThreshold: 5,
                        momentum: !0,
                        bounce: !0,
                        bounceTime: 600,
                        bounceEasing: "",
                        preventDefault: !0,
                        preventDefaultException: {
                            tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                        },
                        HWCompositing: !0,
                        useTransition: !0,
                        useTransform: !0
                    };
                    for (var i in e) this.options[i] = e[i];
                    this.translateZ = this.options.HWCompositing && a.hasPerspective ? " translateZ(0)": "",
                    this.options.useTransition = a.hasTransition && this.options.useTransition,
                    this.options.useTransform = a.hasTransform && this.options.useTransform,
                    this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical": this.options.eventPassthrough,
                    this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault,
                    this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY,
                    this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX,
                    this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough,
                    this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold,
                    this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? a.ease[this.options.bounceEasing] || a.ease.circular: this.options.bounceEasing,
                    this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling,
                    this.options.tap === !0 && (this.options.tap = "tap"),
                    this.x = 0,
                    this.y = 0,
                    this.directionX = 0,
                    this.directionY = 0,
                    this._events = {},
                    this._init(),
                    this.refresh(),
                    this.scrollTo(this.options.startX, this.options.startY),
                    this.enable()
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = (t(2), window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                function(t) {
                    window.setTimeout(t, 1e3 / 60)
                }),
                a = function() {
                    function t(t) {
                        return n === !1 ? !1 : "" === n ? t: n + t.charAt(0).toUpperCase() + t.substr(1)
                    }
                    var e = {},
                    i = document.createElement("div").style,
                    n = function() {
                        for (var t, e = ["t", "webkitT", "MozT", "msT", "OT"], n = 0, o = e.length; o > n; n++) if (t = e[n] + "ransform", t in i) return e[n].substr(0, e[n].length - 1);
                        return ! 1
                    } ();
                    e.getTime = Date.now ||
                    function() {
                        return (new Date).getTime()
                    },
                    e.extend = function(t, e) {
                        for (var i in e) t[i] = e[i]
                    },
                    e.addEvent = function(t, e, i, n) {
                        t.addEventListener(e, i, !!n)
                    },
                    e.removeEvent = function(t, e, i, n) {
                        t.removeEventListener(e, i, !!n)
                    },
                    e.prefixPointerEvent = function(t) {
                        return window.MSPointerEvent ? "MSPointer" + t.charAt(9).toUpperCase() + t.substr(10) : t
                    },
                    e.momentum = function(t, e, i, n, o, s) {
                        var a, r, l = t - e,
                        d = Math.abs(l) / i;
                        return s = void 0 === s ? 6e-4: s,
                        a = t + d * d / (2 * s) * (0 > l ? -1 : 1),
                        r = d / s,
                        n > a ? (a = o ? n - o / 2.5 * (d / 8) : n, l = Math.abs(a - t), r = l / d) : a > 0 && (a = o ? o / 2.5 * (d / 8) : 0, l = Math.abs(t) + a, r = l / d),
                        {
                            destination: Math.round(a),
                            duration: r
                        }
                    };
                    var o = t("transform");
                    return e.extend(e, {
                        hasTransform: o !== !1,
                        hasPerspective: t("perspective") in i,
                        hasTouch: "ontouchstart" in window,
                        hasPointer: window.PointerEvent || window.MSPointerEvent,
                        hasTransition: t("transition") in i
                    }),
                    e.isBadAndroid = /Android /.test(window.navigator.appVersion) && !/Chrome\/\d/.test(window.navigator.appVersion),
                    e.extend(e.style = {},
                    {
                        transform: o,
                        transitionTimingFunction: t("transitionTimingFunction"),
                        transitionDuration: t("transitionDuration"),
                        transitionDelay: t("transitionDelay"),
                        transformOrigin: t("transformOrigin")
                    }),
                    e.hasClass = function(t, e) {
                        var i = new RegExp("(^|\\s)" + e + "(\\s|$)");
                        return i.test(t.className)
                    },
                    e.addClass = function(t, i) {
                        if (!e.hasClass(t, i)) {
                            var n = t.className.split(" ");
                            n.push(i),
                            t.className = n.join(" ")
                        }
                    },
                    e.removeClass = function(t, i) {
                        if (e.hasClass(t, i)) {
                            var n = new RegExp("(^|\\s)" + i + "(\\s|$)", "g");
                            t.className = t.className.replace(n, " ")
                        }
                    },
                    e.offset = function(t) {
                        for (var e = -t.offsetLeft,
                        i = -t.offsetTop; t = t.offsetParent;) e -= t.offsetLeft,
                        i -= t.offsetTop;
                        return {
                            left: e,
                            top: i
                        }
                    },
                    e.preventDefaultException = function(t, e) {
                        for (var i in e) if (e[i].test(t[i])) return ! 0;
                        return ! 1
                    },
                    e.extend(e.eventType = {},
                    {
                        touchstart: 1,
                        touchmove: 1,
                        touchend: 1,
                        mousedown: 2,
                        mousemove: 2,
                        mouseup: 2,
                        pointerdown: 3,
                        pointermove: 3,
                        pointerup: 3,
                        MSPointerDown: 3,
                        MSPointerMove: 3,
                        MSPointerUp: 3
                    }),
                    e.extend(e.ease = {},
                    {
                        quadratic: {
                            style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                            fn: function(t) {
                                return t * (2 - t)
                            }
                        },
                        circular: {
                            style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                            fn: function(t) {
                                return Math.sqrt(1 - --t * t)
                            }
                        },
                        back: {
                            style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                            fn: function(t) {
                                var e = 4;
                                return (t -= 1) * t * ((e + 1) * t + e) + 1
                            }
                        },
                        bounce: {
                            style: "",
                            fn: function(t) {
                                return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t: 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                            }
                        },
                        elastic: {
                            style: "",
                            fn: function(t) {
                                var e = .22,
                                i = .4;
                                return 0 === t ? 0 : 1 == t ? 1 : i * Math.pow(2, -10 * t) * Math.sin(2 * (t - e / 4) * Math.PI / e) + 1
                            }
                        }
                    }),
                    e.tap = function(t, e) {
                        var i = document.createEvent("Event");
                        i.initEvent(e, !0, !0),
                        i.pageX = t.pageX,
                        i.pageY = t.pageY,
                        t.target.dispatchEvent(i)
                    },
                    e.click = function(t) {
                        var e, i = t.target;
                        /(SELECT|INPUT|TEXTAREA)/i.test(i.tagName) || (e = document.createEvent("MouseEvents"), e.initMouseEvent("click", !0, !0, t.view, 1, i.screenX, i.screenY, i.clientX, i.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), e._constructed = !0, i.dispatchEvent(e))
                    },
                    e
                } ();
                n.prototype = {
                    version: "5.1.3",
                    _init: function() {
                        this._initEvents()
                    },
                    destroy: function() {
                        this._initEvents(!0),
                        this._execEvent("destroy")
                    },
                    _transitionEnd: function(t) {
                        t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
                    },
                    _start: function(t) {
                        if (! (1 != a.eventType[t.type] && 0 !== t.button || !this.enabled || this.initiated && a.eventType[t.type] !== this.initiated)) { ! this.options.preventDefault || a.isBadAndroid || a.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                            var e, i = t.touches ? t.touches[0] : t;
                            this.initiated = a.eventType[t.type],
                            this.moved = !1,
                            this.distX = 0,
                            this.distY = 0,
                            this.directionX = 0,
                            this.directionY = 0,
                            this.directionLocked = 0,
                            this._transitionTime(),
                            this.startTime = a.getTime(),
                            this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, e = this.getComputedPosition(), this._translate(Math.round(e.x), Math.round(e.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")),
                            this.startX = this.x,
                            this.startY = this.y,
                            this.absStartX = this.x,
                            this.absStartY = this.y,
                            this.pointX = i.pageX,
                            this.pointY = i.pageY,
                            this._execEvent("beforeScrollStart")
                        }
                    },
                    _move: function(t) {
                        if (this.enabled && a.eventType[t.type] === this.initiated) {
                            this.options.preventDefault && t.preventDefault();
                            var e, i, n, o, s = t.touches ? t.touches[0] : t,
                            r = s.pageX - this.pointX,
                            l = s.pageY - this.pointY,
                            d = a.getTime();
                            if (this.pointX = s.pageX, this.pointY = s.pageY, this.distX += r, this.distY += l, n = Math.abs(this.distX), o = Math.abs(this.distY), !(d - this.endTime > 300 && 10 > n && 10 > o)) {
                                if (this.directionLocked || this.options.freeScroll || (this.directionLocked = n > o + this.options.directionLockThreshold ? "h": o >= n + this.options.directionLockThreshold ? "v": "n"), "h" == this.directionLocked) {
                                    if ("vertical" == this.options.eventPassthrough) t.preventDefault();
                                    else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
                                    l = 0
                                } else if ("v" == this.directionLocked) {
                                    if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
                                    else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
                                    r = 0
                                }
                                r = this.hasHorizontalScroll ? r: 0,
                                l = this.hasVerticalScroll ? l: 0,
                                e = this.x + r,
                                i = this.y + l,
                                (e > 0 || e < this.maxScrollX) && (e = this.options.bounce ? this.x + r / 3 : e > 0 ? 0 : this.maxScrollX),
                                (i > 0 || i < this.maxScrollY) && (i = this.options.bounce ? this.y + l / 3 : i > 0 ? 0 : this.maxScrollY),
                                this.directionX = r > 0 ? -1 : 0 > r ? 1 : 0,
                                this.directionY = l > 0 ? -1 : 0 > l ? 1 : 0,
                                this.moved || this._execEvent("scrollStart"),
                                this.moved = !0,
                                this._translate(e, i),
                                d - this.startTime > 300 && (this.startTime = d, this.startX = this.x, this.startY = this.y)
                            }
                        }
                    },
                    _end: function(t) {
                        if (this.enabled && a.eventType[t.type] === this.initiated) {
                            this.options.preventDefault && !a.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
                            var e, i, n = (t.changedTouches ? t.changedTouches[0] : t, a.getTime() - this.startTime),
                            o = Math.round(this.x),
                            s = Math.round(this.y),
                            r = Math.abs(o - this.startX),
                            l = Math.abs(s - this.startY),
                            d = 0,
                            u = "";
                            if (this.isInTransition = 0, this.initiated = 0, this.endTime = a.getTime(), !this.resetPosition(this.options.bounceTime)) return this.scrollTo(o, s),
                            this.moved ? this._events.flick && 200 > n && 100 > r && 100 > l ? void this._execEvent("flick") : (this.options.momentum && 300 > n && (e = this.hasHorizontalScroll ? a.momentum(this.x, this.startX, n, this.maxScrollX, this.options.bounce ? this.wrapperWidth: 0, this.options.deceleration) : {
                                destination: o,
                                duration: 0
                            },
                            i = this.hasVerticalScroll ? a.momentum(this.y, this.startY, n, this.maxScrollY, this.options.bounce ? this.wrapperHeight: 0, this.options.deceleration) : {
                                destination: s,
                                duration: 0
                            },
                            o = e.destination, s = i.destination, d = Math.max(e.duration, i.duration), this.isInTransition = 1), o != this.x || s != this.y ? ((o > 0 || o < this.maxScrollX || s > 0 || s < this.maxScrollY) && (u = a.ease.quadratic), void this.scrollTo(o, s, d, u)) : void this._execEvent("scrollEnd")) : (this.options.tap && a.tap(t, this.options.tap), this.options.click && a.click(t), void this._execEvent("scrollCancel"))
                        }
                    },
                    _resize: function() {
                        var t = this;
                        clearTimeout(this.resizeTimeout),
                        this.resizeTimeout = setTimeout(function() {
                            t.refresh()
                        },
                        this.options.resizePolling)
                    },
                    resetPosition: function(t) {
                        var e = this.x,
                        i = this.y;
                        return t = t || 0,
                        !this.hasHorizontalScroll || this.x > 0 ? e = 0 : this.x < this.maxScrollX && (e = this.maxScrollX),
                        !this.hasVerticalScroll || this.y > 0 ? i = 0 : this.y < this.maxScrollY && (i = this.maxScrollY),
                        e == this.x && i == this.y ? !1 : (this.scrollTo(e, i, t, this.options.bounceEasing), !0)
                    },
                    disable: function() {
                        this.enabled = !1
                    },
                    enable: function() {
                        this.enabled = !0
                    },
                    refresh: function() {
                        this.wrapper.offsetHeight;
                        this.wrapperWidth = this.wrapper.clientWidth,
                        this.wrapperHeight = this.wrapper.clientHeight,
                        this.scrollerWidth = this.scroller.offsetWidth,
                        this.scrollerHeight = this.scroller.offsetHeight,
                        this.maxScrollX = this.wrapperWidth - this.scrollerWidth,
                        this.maxScrollY = this.wrapperHeight - this.scrollerHeight,
                        this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0,
                        this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0,
                        this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth),
                        this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight),
                        this.endTime = 0,
                        this.directionX = 0,
                        this.directionY = 0,
                        this.wrapperOffset = a.offset(this.wrapper),
                        this._execEvent("refresh"),
                        this.resetPosition()
                    },
                    on: function(t, e) {
                        this._events[t] || (this._events[t] = []),
                        this._events[t].push(e)
                    },
                    off: function(t, e) {
                        if (this._events[t]) {
                            var i = this._events[t].indexOf(e);
                            i > -1 && this._events[t].splice(i, 1)
                        }
                    },
                    _execEvent: function(t) {
                        if (this._events[t]) {
                            var e = 0,
                            i = this._events[t].length;
                            if (i) for (; i > e; e++) this._events[t][e].apply(this, [].slice.call(arguments, 1))
                        }
                    },
                    scrollBy: function(t, e, i, n) {
                        t = this.x + t,
                        e = this.y + e,
                        i = i || 0,
                        this.scrollTo(t, e, i, n)
                    },
                    scrollTo: function(t, e, i, n) {
                        n = n || a.ease.circular,
                        this.isInTransition = this.options.useTransition && i > 0,
                        !i || this.options.useTransition && n.style ? (this._transitionTimingFunction(n.style), this._transitionTime(i), this._translate(t, e)) : this._animate(t, e, i, n.fn)
                    },
                    scrollToElement: function(t, e, i, n, o) {
                        if (t = t.nodeType ? t: this.scroller.querySelector(t)) {
                            var s = a.offset(t);
                            s.left -= this.wrapperOffset.left,
                            s.top -= this.wrapperOffset.top,
                            i === !0 && (i = Math.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)),
                            n === !0 && (n = Math.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)),
                            s.left -= i || 0,
                            s.top -= n || 0,
                            s.left = s.left > 0 ? 0 : s.left < this.maxScrollX ? this.maxScrollX: s.left,
                            s.top = s.top > 0 ? 0 : s.top < this.maxScrollY ? this.maxScrollY: s.top,
                            e = void 0 === e || null === e || "auto" === e ? Math.max(Math.abs(this.x - s.left), Math.abs(this.y - s.top)) : e,
                            this.scrollTo(s.left, s.top, e, o)
                        }
                    },
                    _transitionTime: function(t) {
                        t = t || 0,
                        this.scrollerStyle[a.style.transitionDuration] = t + "ms",
                        !t && a.isBadAndroid && (this.scrollerStyle[a.style.transitionDuration] = "0.001s")
                    },
                    _transitionTimingFunction: function(t) {
                        this.scrollerStyle[a.style.transitionTimingFunction] = t
                    },
                    _translate: function(t, e) {
                        this.options.useTransform ? this.scrollerStyle[a.style.transform] = "translate(" + t + "px," + e + "px)" + this.translateZ: (t = Math.round(t), e = Math.round(e), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = e + "px"),
                        this.x = t,
                        this.y = e
                    },
                    _initEvents: function(t) {
                        var e = t ? a.removeEvent: a.addEvent,
                        i = this.options.bindToWrapper ? this.wrapper: window;
                        e(window, "orientationchange", this),
                        e(window, "resize", this),
                        this.options.click && e(this.wrapper, "click", this, !0),
                        this.options.disableMouse || (e(this.wrapper, "mousedown", this), e(i, "mousemove", this), e(i, "mousecancel", this), e(i, "mouseup", this)),
                        a.hasPointer && !this.options.disablePointer && (e(this.wrapper, a.prefixPointerEvent("pointerdown"), this), e(i, a.prefixPointerEvent("pointermove"), this), e(i, a.prefixPointerEvent("pointercancel"), this), e(i, a.prefixPointerEvent("pointerup"), this)),
                        a.hasTouch && !this.options.disableTouch && (e(this.wrapper, "touchstart", this), e(i, "touchmove", this), e(i, "touchcancel", this), e(i, "touchend", this)),
                        e(this.scroller, "transitionend", this),
                        e(this.scroller, "webkitTransitionEnd", this),
                        e(this.scroller, "oTransitionEnd", this),
                        e(this.scroller, "MSTransitionEnd", this)
                    },
                    getComputedPosition: function() {
                        var t, e, i = window.getComputedStyle(this.scroller, null);
                        return this.options.useTransform ? (i = i[a.style.transform].split(")")[0].split(", "), t = +(i[12] || i[4]), e = +(i[13] || i[5])) : (t = +i.left.replace(/[^-\d.]/g, ""), e = +i.top.replace(/[^-\d.]/g, "")),
                        {
                            x: t,
                            y: e
                        }
                    },
                    _animate: function(t, e, i, n) {
                        function o() {
                            var h, p, f, m = a.getTime();
                            return m >= c ? (r.isAnimating = !1, r._translate(t, e), void(r.resetPosition(r.options.bounceTime) || r._execEvent("scrollEnd"))) : (m = (m - u) / i, f = n(m), h = (t - l) * f + l, p = (e - d) * f + d, r._translate(h, p), void(r.isAnimating && s(o)))
                        }
                        var r = this,
                        l = this.x,
                        d = this.y,
                        u = a.getTime(),
                        c = u + i;
                        this.isAnimating = !0,
                        o()
                    },
                    handleEvent: function(t) {
                        switch (t.type) {
                        case "touchstart":
                        case "pointerdown":
                        case "MSPointerDown":
                        case "mousedown":
                            this._start(t);
                            break;
                        case "touchmove":
                        case "pointermove":
                        case "MSPointerMove":
                        case "mousemove":
                            this._move(t);
                            break;
                        case "touchend":
                        case "pointerup":
                        case "MSPointerUp":
                        case "mouseup":
                        case "touchcancel":
                        case "pointercancel":
                        case "MSPointerCancel":
                        case "mousecancel":
                            this._end(t);
                            break;
                        case "orientationchange":
                        case "resize":
                            this._resize();
                            break;
                        case "transitionend":
                        case "webkitTransitionEnd":
                        case "oTransitionEnd":
                        case "MSTransitionEnd":
                            this._transitionEnd(t);
                            break;
                        case "wheel":
                        case "DOMMouseScroll":
                        case "mousewheel":
                            this._wheel(t);
                            break;
                        case "keydown":
                            this._key(t);
                            break;
                        case "click":
                            t._constructed || (t.preventDefault(), t.stopPropagation())
                        }
                    }
                },
                n.utils = a,
                o.AMUI.iScroll = n,
                e.exports = n
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        12 : [function(t, e) { (function(i) {
                "use strict";
                function n(t, e) {
                    return this.each(function() {
                        var i = o(this),
                        n = i.data("amui.modal"),
                        s = o.extend({},
                        d.DEFAULTS, "object" == typeof t && t);
                        n || i.data("amui.modal", n = new d(this, s)),
                        "string" == typeof t ? n[t] && n[t](e) : n.toggle(t && t.relatedTarget || void 0)
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2),
                a = t(8),
                r = o(document),
                l = s.support.transition,
                d = function(t, e) {
                    this.options = o.extend({},
                    d.DEFAULTS, e || {}),
                    this.$element = o(t),
                    this.$dialog = this.$element.find(".am-modal-dialog"),
                    this.$element.attr("id") || this.$element.attr("id", s.utils.generateGUID("am-modal")),
                    this.isPopup = this.$element.hasClass("am-popup"),
                    this.isActions = this.$element.hasClass("am-modal-actions"),
                    this.isPrompt = this.$element.hasClass("am-modal-prompt"),
                    this.isLoading = this.$element.hasClass("am-modal-loading"),
                    this.active = this.transitioning = this.relatedTarget = null,
                    this.events()
                };
                d.DEFAULTS = {
                    className: {
                        active: "am-modal-active",
                        out: "am-modal-out"
                    },
                    selector: {
                        modal: ".am-modal",
                        active: ".am-modal-active"
                    },
                    closeViaDimmer: !0,
                    cancelable: !0,
                    onConfirm: function() {},
                    onCancel: function() {},
                    height: void 0,
                    width: void 0,
                    duration: 300,
                    transitionEnd: l && l.end + ".modal.amui"
                },
                d.prototype.toggle = function(t) {
                    return this.active ? this.close() : this.open(t)
                },
                d.prototype.open = function(t) {
                    var e = this.$element,
                    i = this.options,
                    n = this.isPopup,
                    s = i.width,
                    r = i.height,
                    d = {};
                    if (!this.active && this.$element.length) {
                        t && (this.relatedTarget = t),
                        this.transitioning && (clearTimeout(e.transitionEndTimmer), e.transitionEndTimmer = null, e.trigger(i.transitionEnd).off(i.transitionEnd)),
                        n && this.$element.show(),
                        this.active = !0,
                        e.trigger(o.Event("open.modal.amui", {
                            relatedTarget: t
                        })),
                        a.open(e),
                        e.show().redraw(),
                        n || this.isActions || (s && (s = parseInt(s, 10), d.width = s + "px", d.marginLeft = -parseInt(s / 2) + "px"), r ? (r = parseInt(r, 10), d.marginTop = -parseInt(r / 2) + "px", this.$dialog.css({
                            height: r + "px"
                        })) : d.marginTop = -parseInt(e.height() / 2, 10) + "px", e.css(d)),
                        e.removeClass(i.className.out).addClass(i.className.active),
                        this.transitioning = 1;
                        var u = function() {
                            e.trigger(o.Event("opened.modal.amui", {
                                relatedTarget: t
                            })),
                            this.transitioning = 0,
                            this.isPrompt && this.$dialog.find("input").eq(0).focus()
                        };
                        return l ? void e.one(i.transitionEnd, o.proxy(u, this)).emulateTransitionEnd(i.duration) : u.call(this)
                    }
                },
                d.prototype.close = function(t) {
                    if (this.active) {
                        var e = this.$element,
                        i = this.options,
                        n = this.isPopup;
                        this.transitioning && (clearTimeout(e.transitionEndTimmer), e.transitionEndTimmer = null, e.trigger(i.transitionEnd).off(i.transitionEnd), a.close(e, !0)),
                        this.$element.trigger(o.Event("close.modal.amui", {
                            relatedTarget: t
                        })),
                        this.transitioning = 1;
                        var s = function() {
                            e.trigger("closed.modal.amui"),
                            n && e.removeClass(i.className.out),
                            e.hide(),
                            this.transitioning = 0,
                            a.close(e, !1),
                            this.active = !1
                        };
                        return e.removeClass(i.className.active).addClass(i.className.out),
                        l ? void e.one(i.transitionEnd, o.proxy(s, this)).emulateTransitionEnd(i.duration) : s.call(this)
                    }
                },
                d.prototype.events = function() {
                    var t = this,
                    e = this.$element,
                    i = e.find(".am-modal-prompt-input"),
                    n = function() {
                        var t = [];
                        return i.each(function() {
                            t.push(o(this).val())
                        }),
                        0 === t.length ? void 0 : 1 === t.length ? t[0] : t
                    };
                    this.options.cancelable && e.on("keyup.modal.amui",
                    function(i) {
                        t.active && 27 === i.which && (e.trigger("cancel.modal.amui"), t.close())
                    }),
                    this.options.closeViaDimmer && !this.isLoading && a.$element.on("click.dimmer.modal.amui",
                    function() {
                        t.close()
                    }),
                    e.find("[data-am-modal-close], .am-modal-btn").on("click.close.modal.amui",
                    function(e) {
                        e.preventDefault(),
                        t.close()
                    }),
                    e.find("[data-am-modal-confirm]").on("click.confirm.modal.amui",
                    function() {
                        e.trigger(o.Event("confirm.modal.amui", {
                            trigger: this
                        }))
                    }),
                    e.find("[data-am-modal-cancel]").on("click.cancel.modal.amui",
                    function() {
                        e.trigger(o.Event("cancel.modal.amui", {
                            trigger: this
                        }))
                    }),
                    e.on("confirm.modal.amui",
                    function(e) {
                        e.data = n(),
                        t.options.onConfirm.call(t, e)
                    }).on("cancel.modal.amui",
                    function(e) {
                        e.data = n(),
                        t.options.onCancel.call(t, e)
                    })
                },
                o.fn.modal = n,
                r.on("click.modal.amui.data-api", "[data-am-modal]",
                function() {
                    var t = o(this),
                    e = s.utils.parseOptions(t.attr("data-am-modal")),
                    i = o(e.target || this.href && this.href.replace(/.*(?=#[^\s]+$)/, "")),
                    a = i.data("amui.modal") ? "toggle": e;
                    n.call(i, a, this)
                }),
                o.AMUI.modal = d,
                e.exports = d
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2,
            8 : 8
        }],
        13 : [function(t, e) { (function(i) {
                "use strict";
                function n(t, e) {
                    return this.each(function() {
                        var i = s(this),
                        n = i.data("amui.offcanvas"),
                        o = s.extend({},
                        "object" == typeof t && t);
                        n || (i.data("amui.offcanvas", n = new d(this, o)), (!t || "object" == typeof t) && n.open(e)),
                        "string" == typeof t && n[t] && n[t](e)
                    })
                }
                var o, s = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                a = t(2),
                r = (t(30), s(window)),
                l = s(document),
                d = function(t, e) {
                    this.$element = s(t),
                    this.options = s.extend({},
                    d.DEFAULTS, e),
                    this.active = null,
                    this.bindEvents()
                };
                d.DEFAULTS = {
                    duration: 300,
                    effect: "overlay"
                },
                d.prototype.open = function() {
                    var t = this,
                    e = this.$element;
                    if (e.length && !e.hasClass("am-active")) {
                        var i = this.options.effect,
                        n = s("html"),
                        a = s("body"),
                        l = e.find(".am-offcanvas-bar").first(),
                        d = l.hasClass("am-offcanvas-bar-flip") ? -1 : 1;
                        l.addClass("am-offcanvas-bar-" + i),
                        o = {
                            x: window.scrollX,
                            y: window.scrollY
                        },
                        e.addClass("am-active"),
                        a.css({
                            width: window.innerWidth,
                            height: r.height()
                        }).addClass("am-offcanvas-page"),
                        "overlay" !== i && a.css({
                            "margin-left": l.outerWidth() * d
                        }).width(),
                        n.css("margin-top", -1 * o.y),
                        setTimeout(function() {
                            l.addClass("am-offcanvas-bar-active").width()
                        },
                        0),
                        e.trigger("open.offcanvas.amui"),
                        this.active = 1,
                        e.on("click.offcanvas.amui",
                        function(e) {
                            var i = s(e.target);
                            i.hasClass("am-offcanvas-bar") || i.parents(".am-offcanvas-bar").first().length || (e.stopImmediatePropagation(), t.close())
                        }),
                        n.on("keydown.offcanvas.amui",
                        function(e) {
                            27 === e.keyCode && t.close()
                        })
                    }
                },
                d.prototype.close = function() {
                    function t() {
                        n.removeClass("am-offcanvas-page").css({
                            width: "",
                            height: "",
                            "margin-left": "",
                            "margin-right": ""
                        }),
                        r.removeClass("am-active"),
                        l.removeClass("am-offcanvas-bar-active"),
                        i.css("margin-top", ""),
                        window.scrollTo(o.x, o.y),
                        r.trigger("closed.offcanvas.amui"),
                        e.active = 0
                    }
                    var e = this,
                    i = s("html"),
                    n = s("body"),
                    r = this.$element,
                    l = r.find(".am-offcanvas-bar").first();
                    r.length && this.active && r.hasClass("am-active") && (r.trigger("close.offcanvas.amui"), a.support.transition ? (setTimeout(function() {
                        l.removeClass("am-offcanvas-bar-active")
                    },
                    0), n.css("margin-left", "").one(a.support.transition.end,
                    function() {
                        t()
                    }).emulateTransitionEnd(this.options.duration)) : t(), r.off("click.offcanvas.amui"), i.off(".offcanvas.amui"))
                },
                d.prototype.bindEvents = function() {
                    var t = this;
                    return l.on("click.offcanvas.amui", '[data-am-dismiss="offcanvas"]',
                    function(e) {
                        e.preventDefault(),
                        t.close()
                    }),
                    r.on("resize.offcanvas.amui orientationchange.offcanvas.amui",
                    function() {
                        t.active && t.close()
                    }),
                    this.$element.hammer().on("swipeleft swipeleft",
                    function(e) {
                        e.preventDefault(),
                        t.close()
                    }),
                    this
                },
                s.fn.offCanvas = n,
                l.on("click.offcanvas.amui", "[data-am-offcanvas]",
                function(t) {
                    t.preventDefault();
                    var e = s(this),
                    i = a.utils.parseOptions(e.data("amOffcanvas")),
                    o = s(i.target || this.href && this.href.replace(/.*(?=#[^\s]+$)/, "")),
                    r = o.data("amui.offcanvas") ? "open": i;
                    n.call(o, r, this)
                }),
                s.AMUI.offcanvas = d,
                e.exports = d
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2,
            30 : 30
        }],
        14 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                o = (t(2),
                function(t) {
                    var e = function(e, i) {
                        this.el = t(e),
                        this.zoomFactor = 1,
                        this.lastScale = 1,
                        this.offset = {
                            x: 0,
                            y: 0
                        },
                        this.options = t.extend({},
                        this.defaults, i),
                        this.setupMarkup(),
                        this.bindEvents(),
                        this.update(),
                        this.enable()
                    },
                    i = function(t, e) {
                        return t + e
                    },
                    n = function(t, e) {
                        return t > e - .01 && e + .01 > t
                    };
                    e.prototype = {
                        defaults: {
                            tapZoomFactor: 2,
                            zoomOutFactor: 1.3,
                            animationDuration: 300,
                            animationInterval: 5,
                            maxZoom: 5,
                            minZoom: .5,
                            lockDragAxis: !1,
                            use2d: !1,
                            zoomStartEventName: "pz_zoomstart",
                            zoomEndEventName: "pz_zoomend",
                            dragStartEventName: "pz_dragstart",
                            dragEndEventName: "pz_dragend",
                            doubleTapEventName: "pz_doubletap"
                        },
                        handleDragStart: function(t) {
                            this.el.trigger(this.options.dragStartEventName),
                            this.stopAnimation(),
                            this.lastDragPosition = !1,
                            this.hasInteraction = !0,
                            this.handleDrag(t)
                        },
                        handleDrag: function(t) {
                            if (this.zoomFactor > 1) {
                                var e = this.getTouches(t)[0];
                                this.drag(e, this.lastDragPosition),
                                this.offset = this.sanitizeOffset(this.offset),
                                this.lastDragPosition = e
                            }
                        },
                        handleDragEnd: function() {
                            this.el.trigger(this.options.dragEndEventName),
                            this.end()
                        },
                        handleZoomStart: function() {
                            this.el.trigger(this.options.zoomStartEventName),
                            this.stopAnimation(),
                            this.lastScale = 1,
                            this.nthZoom = 0,
                            this.lastZoomCenter = !1,
                            this.hasInteraction = !0
                        },
                        handleZoom: function(t, e) {
                            var i = this.getTouchCenter(this.getTouches(t)),
                            n = e / this.lastScale;
                            this.lastScale = e,
                            this.nthZoom += 1,
                            this.nthZoom > 3 && (this.scale(n, i), this.drag(i, this.lastZoomCenter)),
                            this.lastZoomCenter = i
                        },
                        handleZoomEnd: function() {
                            this.el.trigger(this.options.zoomEndEventName),
                            this.end()
                        },
                        handleDoubleTap: function(t) {
                            var e = this.getTouches(t)[0],
                            i = this.zoomFactor > 1 ? 1 : this.options.tapZoomFactor,
                            n = this.zoomFactor,
                            o = function(t) {
                                this.scaleTo(n + t * (i - n), e)
                            }.bind(this);
                            this.hasInteraction || (n > i && (e = this.getCurrentZoomCenter()), this.animate(this.options.animationDuration, this.options.animationInterval, o, this.swing), this.el.trigger(this.options.doubleTapEventName))
                        },
                        sanitizeOffset: function(t) {
                            var e = (this.zoomFactor - 1) * this.getContainerX(),
                            i = (this.zoomFactor - 1) * this.getContainerY(),
                            n = Math.max(e, 0),
                            o = Math.max(i, 0),
                            s = Math.min(e, 0),
                            a = Math.min(i, 0);
                            return {
                                x: Math.min(Math.max(t.x, s), n),
                                y: Math.min(Math.max(t.y, a), o)
                            }
                        },
                        scaleTo: function(t, e) {
                            this.scale(t / this.zoomFactor, e)
                        },
                        scale: function(t, e) {
                            t = this.scaleZoomFactor(t),
                            this.addOffset({
                                x: (t - 1) * (e.x + this.offset.x),
                                y: (t - 1) * (e.y + this.offset.y)
                            })
                        },
                        scaleZoomFactor: function(t) {
                            var e = this.zoomFactor;
                            return this.zoomFactor *= t,
                            this.zoomFactor = Math.min(this.options.maxZoom, Math.max(this.zoomFactor, this.options.minZoom)),
                            this.zoomFactor / e
                        },
                        drag: function(t, e) {
                            e && this.addOffset(this.options.lockDragAxis ? Math.abs(t.x - e.x) > Math.abs(t.y - e.y) ? {
                                x: -(t.x - e.x),
                                y: 0
                            }: {
                                y: -(t.y - e.y),
                                x: 0
                            }: {
                                y: -(t.y - e.y),
                                x: -(t.x - e.x)
                            })
                        },
                        getTouchCenter: function(t) {
                            return this.getVectorAvg(t)
                        },
                        getVectorAvg: function(t) {
                            return {
                                x: t.map(function(t) {
                                    return t.x
                                }).reduce(i) / t.length,
                                y: t.map(function(t) {
                                    return t.y
                                }).reduce(i) / t.length
                            }
                        },
                        addOffset: function(t) {
                            this.offset = {
                                x: this.offset.x + t.x,
                                y: this.offset.y + t.y
                            }
                        },
                        sanitize: function() {
                            this.zoomFactor < this.options.zoomOutFactor ? this.zoomOutAnimation() : this.isInsaneOffset(this.offset) && this.sanitizeOffsetAnimation()
                        },
                        isInsaneOffset: function(t) {
                            var e = this.sanitizeOffset(t);
                            return e.x !== t.x || e.y !== t.y
                        },
                        sanitizeOffsetAnimation: function() {
                            var t = this.sanitizeOffset(this.offset),
                            e = {
                                x: this.offset.x,
                                y: this.offset.y
                            },
                            i = function(i) {
                                this.offset.x = e.x + i * (t.x - e.x),
                                this.offset.y = e.y + i * (t.y - e.y),
                                this.update()
                            }.bind(this);
                            this.animate(this.options.animationDuration, this.options.animationInterval, i, this.swing)
                        },
                        zoomOutAnimation: function() {
                            var t = this.zoomFactor,
                            e = 1,
                            i = this.getCurrentZoomCenter(),
                            n = function(n) {
                                this.scaleTo(t + n * (e - t), i)
                            }.bind(this);
                            this.animate(this.options.animationDuration, this.options.animationInterval, n, this.swing)
                        },
                        updateAspectRatio: function() {
                            this.setContainerY()
                        },
                        getInitialZoomFactor: function() {
                            return this.container[0].offsetWidth / this.el[0].offsetWidth
                        },
                        getAspectRatio: function() {
                            return this.el[0].offsetWidth / this.el[0].offsetHeight
                        },
                        getCurrentZoomCenter: function() {
                            var t = this.container[0].offsetWidth * this.zoomFactor,
                            e = this.offset.x,
                            i = t - e - this.container[0].offsetWidth,
                            n = e / i,
                            o = n * this.container[0].offsetWidth / (n + 1),
                            s = this.container[0].offsetHeight * this.zoomFactor,
                            a = this.offset.y,
                            r = s - a - this.container[0].offsetHeight,
                            l = a / r,
                            d = l * this.container[0].offsetHeight / (l + 1);
                            return 0 === i && (o = this.container[0].offsetWidth),
                            0 === r && (d = this.container[0].offsetHeight),
                            {
                                x: o,
                                y: d
                            }
                        },
                        canDrag: function() {
                            return ! n(this.zoomFactor, 1)
                        },
                        getTouches: function(t) {
                            var e = this.container.offset();
                            return Array.prototype.slice.call(t.touches).map(function(t) {
                                return {
                                    x: t.pageX - e.left,
                                    y: t.pageY - e.top
                                }
                            })
                        },
                        animate: function(t, e, i, n, o) {
                            var s = (new Date).getTime(),
                            a = function() {
                                if (this.inAnimation) {
                                    var r = (new Date).getTime() - s,
                                    l = r / t;
                                    r >= t ? (i(1), o && o(), this.update(), this.stopAnimation(), this.update()) : (n && (l = n(l)), i(l), this.update(), setTimeout(a, e))
                                }
                            }.bind(this);
                            this.inAnimation = !0,
                            a()
                        },
                        stopAnimation: function() {
                            this.inAnimation = !1
                        },
                        swing: function(t) {
                            return - Math.cos(t * Math.PI) / 2 + .5
                        },
                        getContainerX: function() {
                            return window.innerWidth
                        },
                        getContainerY: function() {
                            return window.innerHeight
                        },
                        setContainerY: function() {
                            var t = window.innerHeight;
                            return this.el.css({
                                height: t
                            }),
                            this.container.height(t)
                        },
                        setupMarkup: function() {
                            this.container = t('<div class="pinch-zoom-container"></div>'),
                            this.el.before(this.container),
                            this.container.append(this.el),
                            this.container.css({
                                overflow: "hidden",
                                position: "relative"
                            }),
                            this.el.css({
                                "-webkit-transform-origin": "0% 0%",
                                "-moz-transform-origin": "0% 0%",
                                "-ms-transform-origin": "0% 0%",
                                "-o-transform-origin": "0% 0%",
                                "transform-origin": "0% 0%",
                                position: "absolute"
                            })
                        },
                        end: function() {
                            this.hasInteraction = !1,
                            this.sanitize(),
                            this.update()
                        },
                        bindEvents: function() {
                            o(this.container.get(0), this),
                            t(window).on("resize", this.update.bind(this)),
                            t(this.el).find("img").on("load", this.update.bind(this))
                        },
                        update: function() {
                            this.updatePlaned || (this.updatePlaned = !0, setTimeout(function() {
                                this.updatePlaned = !1,
                                this.updateAspectRatio();
                                var t = this.getInitialZoomFactor() * this.zoomFactor,
                                e = -this.offset.x / t,
                                i = -this.offset.y / t,
                                n = "scale3d(" + t + ", " + t + ",1) translate3d(" + e + "px," + i + "px,0px)",
                                o = "scale(" + t + ", " + t + ") translate(" + e + "px," + i + "px)",
                                s = function() {
                                    this.clone && (this.clone.remove(), delete this.clone)
                                }.bind(this); ! this.options.use2d || this.hasInteraction || this.inAnimation ? (this.is3d = !0, s(), this.el.css({
                                    "-webkit-transform": n,
                                    "-o-transform": o,
                                    "-ms-transform": o,
                                    "-moz-transform": o,
                                    transform: n
                                })) : (this.is3d && (this.clone = this.el.clone(), this.clone.css("pointer-events", "none"), this.clone.appendTo(this.container), setTimeout(s, 200)), this.el.css({
                                    "-webkit-transform": o,
                                    "-o-transform": o,
                                    "-ms-transform": o,
                                    "-moz-transform": o,
                                    transform: o
                                }), this.is3d = !1)
                            }.bind(this), 0))
                        },
                        enable: function() {
                            this.enabled = !0
                        },
                        disable: function() {
                            this.enabled = !1
                        }
                    };
                    var o = function(t, e) {
                        var i = null,
                        n = 0,
                        o = null,
                        s = null,
                        a = function(t, n) {
                            if (i !== t) {
                                if (i && !t) switch (i) {
                                case "zoom":
                                    e.handleZoomEnd(n);
                                    break;
                                case "drag":
                                    e.handleDragEnd(n)
                                }
                                switch (t) {
                                case "zoom":
                                    e.handleZoomStart(n);
                                    break;
                                case "drag":
                                    e.handleDragStart(n)
                                }
                            }
                            i = t
                        },
                        r = function(t) {
                            2 === n ? a("zoom") : 1 === n && e.canDrag() ? a("drag", t) : a(null, t)
                        },
                        l = function(t) {
                            return Array.prototype.slice.call(t).map(function(t) {
                                return {
                                    x: t.pageX,
                                    y: t.pageY
                                }
                            })
                        },
                        d = function(t, e) {
                            var i, n;
                            return i = t.x - e.x,
                            n = t.y - e.y,
                            Math.sqrt(i * i + n * n)
                        },
                        u = function(t, e) {
                            var i = d(t[0], t[1]),
                            n = d(e[0], e[1]);
                            return n / i
                        },
                        c = function(t) {
                            t.stopPropagation(),
                            t.preventDefault()
                        },
                        h = function(t) {
                            var s = (new Date).getTime();
                            if (n > 1 && (o = null), 300 > s - o) switch (c(t), e.handleDoubleTap(t), i) {
                            case "zoom":
                                e.handleZoomEnd(t);
                                break;
                            case "drag":
                                e.handleDragEnd(t)
                            }
                            1 === n && (o = s)
                        },
                        p = !0;
                        t.addEventListener("touchstart",
                        function(t) {
                            e.enabled && (p = !0, n = t.touches.length, h(t))
                        }),
                        t.addEventListener("touchmove",
                        function(t) {
                            if (e.enabled) {
                                if (p) r(t),
                                i && c(t),
                                s = l(t.touches);
                                else {
                                    switch (i) {
                                    case "zoom":
                                        e.handleZoom(t, u(s, l(t.touches)));
                                        break;
                                    case "drag":
                                        e.handleDrag(t)
                                    }
                                    i && (c(t), e.update())
                                }
                                p = !1
                            }
                        }),
                        t.addEventListener("touchend",
                        function(t) {
                            e.enabled && (n = t.touches.length, r(t))
                        })
                    };
                    return e
                });
                n.AMUI.pichzoom = o(n),
                e.exports = o(n)
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        15 : [function(t, e) { (function(i) {
                "use strict";
                function n(t) {
                    return this.each(function() {
                        var e = o(this),
                        i = e.data("amui.popover"),
                        n = o.extend({},
                        s.utils.parseOptions(e.attr("data-am-popover")), "object" == typeof t && t);
                        i || e.data("amui.popover", i = new r(this, n)),
                        "string" == typeof t && i[t] && i[t]()
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2),
                a = o(window),
                r = function(t, e) {
                    this.options = o.extend({},
                    r.DEFAULTS, e || {}),
                    this.$element = o(t),
                    this.active = null,
                    this.$popover = this.options.target && o(this.options.target) || null,
                    this.init(),
                    this.events()
                };
                r.DEFAULTS = {
                    theme: void 0,
                    trigger: "click",
                    content: "",
                    open: !1,
                    target: void 0,
                    tpl: '<div class="am-popover"><div class="am-popover-inner"></div><div class="am-popover-caret"></div></div>'
                },
                r.prototype.init = function() {
                    function t() {
                        i.sizePopover()
                    }
                    var e, i = this,
                    n = this.$element;
                    this.options.target || (this.$popover = this.getPopover(), this.setContent()),
                    e = this.$popover,
                    e.appendTo(o("body")),
                    this.sizePopover(),
                    n.on("open.popover.amui",
                    function() {
                        o(window).on("resize.popover.amui", s.utils.debounce(t, 50))
                    }),
                    n.on("close.popover.amui",
                    function() {
                        o(window).off("resize.popover.amui", t)
                    }),
                    this.options.open && this.open()
                },
                r.prototype.sizePopover = function() {
                    var t = this.$element,
                    e = this.$popover;
                    if (e && e.length) {
                        var i = e.outerWidth(),
                        n = e.outerHeight(),
                        o = e.find(".am-popover-caret"),
                        s = o.outerWidth() / 2 || 8,
                        r = n + 8,
                        l = t.outerWidth(),
                        d = t.outerHeight(),
                        u = t.offset(),
                        c = t[0].getBoundingClientRect(),
                        h = a.height(),
                        p = a.width(),
                        f = 0,
                        m = 0,
                        v = 0,
                        g = 2,
                        w = "top";
                        e.css({
                            left: "",
                            top: ""
                        }).removeClass("am-popover-left am-popover-right am-popover-top am-popover-bottom"),
                        r - g < c.top + g ? f = u.top - r - g: r < h - c.top - c.height ? (w = "bottom", f = u.top + d + s + g) : (w = "middle", f = d / 2 + u.top - n / 2),
                        "top" === w || "bottom" === w ? (m = l / 2 + u.left - i / 2, v = m, 5 > m && (m = 5), m + i > p && (m = p - i - 20), "top" === w && e.addClass("am-popover-top"), "bottom" === w && e.addClass("am-popover-bottom"), v -= m) : "middle" === w && (m = u.left - i - s, e.addClass("am-popover-left"), 5 > m && (m = u.left + l + s, e.removeClass("am-popover-left").addClass("am-popover-right")), m + i > p && (m = p - i - 5, e.removeClass("am-popover-left").addClass("am-popover-right"))),
                        e.css({
                            top: f + 5 + "px",
                            left: m + "px"
                        })
                    }
                },
                r.prototype.toggle = function() {
                    return this[this.active ? "close": "open"]()
                },
                r.prototype.open = function() {
                    var t = this.$popover;
                    this.$element.trigger("open.popover.amui"),
                    this.sizePopover(),
                    t.show().addClass("am-active"),
                    this.active = !0
                },
                r.prototype.close = function() {
                    var t = this.$popover;
                    this.$element.trigger("close.popover.amui"),
                    t.removeClass("am-active").trigger("closed.popover.amui").hide(),
                    this.active = !1
                },
                r.prototype.getPopover = function() {
                    var t = s.utils.generateGUID("am-popover"),
                    e = [];
                    return this.options.theme && o.each(this.options.theme.split(","),
                    function(t, i) {
                        e.push("am-popover-" + o.trim(i))
                    }),
                    o(this.options.tpl).attr("id", t).addClass(e.join(" "))
                },
                r.prototype.setContent = function(t) {
                    t = t || this.options.content,
                    this.$popover && this.$popover.find(".am-popover-inner").empty().html(t)
                },
                r.prototype.events = function() {
                    for (var t = "popover.amui",
                    e = this.options.trigger.split(" "), i = e.length; i--;) {
                        var n = e[i];
                        if ("click" === n) this.$element.on("click." + t, o.proxy(this.toggle, this));
                        else {
                            var s = "hover" == n ? "mouseenter": "focusin",
                            a = "hover" == n ? "mouseleave": "focusout";
                            this.$element.on(s + "." + t, o.proxy(this.open, this)),
                            this.$element.on(a + "." + t, o.proxy(this.close, this))
                        }
                    }
                },
                o.fn.popover = n,
                s.ready(function(t) {
                    o("[data-am-popover]", t).popover()
                }),
                o.AMUI.popover = r,
                e.exports = r
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        16 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                o = (t(2),
                function() {
                    function t(t, e, i) {
                        return e > t ? e: t > i ? i: t
                    }
                    function e(t) {
                        return 100 * ( - 1 + t)
                    }
                    function i(t, i, n) {
                        var o;
                        return o = "translate3d" === a.positionUsing ? {
                            transform: "translate3d(" + e(t) + "%,0,0)"
                        }: "translate" === a.positionUsing ? {
                            transform: "translate(" + e(t) + "%,0)"
                        }: {
                            "margin-left": e(t) + "%"
                        },
                        o.transition = "all " + i + "ms " + n,
                        o
                    }
                    var o = {},
                    s = n("html");
                    o.version = "0.1.6";
                    var a = o.settings = {
                        minimum: .08,
                        easing: "ease",
                        positionUsing: "",
                        speed: 200,
                        trickle: !0,
                        trickleRate: .02,
                        trickleSpeed: 800,
                        showSpinner: !0,
                        parent: "body",
                        barSelector: '[role="nprogress-bar"]',
                        spinnerSelector: '[role="nprogress-spinner"]',
                        template: '<div class="nprogress-bar" role="nprogress-bar"><div class="nprogress-peg"></div></div><div class="nprogress-spinner" role="nprogress-spinner"><div class="nprogress-spinner-icon"></div></div>'
                    };
                    o.configure = function(t) {
                        var e, i;
                        for (e in t) i = t[e],
                        void 0 !== i && t.hasOwnProperty(e) && (a[e] = i);
                        return this
                    },
                    o.status = null,
                    o.set = function(e) {
                        var n = o.isStarted();
                        e = t(e, a.minimum, 1),
                        o.status = 1 === e ? null: e;
                        var s = o.render(!n),
                        d = s.querySelector(a.barSelector),
                        u = a.speed,
                        c = a.easing;
                        return s.offsetWidth,
                        r(function(t) {
                            "" === a.positionUsing && (a.positionUsing = o.getPositioningCSS()),
                            l(d, i(e, u, c)),
                            1 === e ? (l(s, {
                                transition: "none",
                                opacity: 1
                            }), s.offsetWidth, setTimeout(function() {
                                l(s, {
                                    transition: "all " + u + "ms linear",
                                    opacity: 0
                                }),
                                setTimeout(function() {
                                    o.remove(),
                                    t()
                                },
                                u)
                            },
                            u)) : setTimeout(t, u)
                        }),
                        this
                    },
                    o.isStarted = function() {
                        return "number" == typeof o.status
                    },
                    o.start = function() {
                        o.status || o.set(0);
                        var t = function() {
                            setTimeout(function() {
                                o.status && (o.trickle(), t())
                            },
                            a.trickleSpeed)
                        };
                        return a.trickle && t(),
                        this
                    },
                    o.done = function(t) {
                        return t || o.status ? o.inc(.3 + .5 * Math.random()).set(1) : this
                    },
                    o.inc = function(e) {
                        var i = o.status;
                        return i ? ("number" != typeof e && (e = (1 - i) * t(Math.random() * i, .1, .95)), i = t(i + e, 0, .994), o.set(i)) : o.start()
                    },
                    o.trickle = function() {
                        return o.inc(Math.random() * a.trickleRate)
                    },
                    o.render = function(t) {
                        if (o.isRendered()) return document.getElementById("nprogress");
                        s.addClass("nprogress-busy");
                        var i = document.createElement("div");
                        i.id = "nprogress",
                        i.innerHTML = a.template;
                        var r, d = i.querySelector(a.barSelector),
                        u = t ? "-100": e(o.status || 0),
                        c = document.querySelector(a.parent);
                        return l(d, {
                            transition: "all 0 linear",
                            transform: "translate3d(" + u + "%,0,0)"
                        }),
                        a.showSpinner || (r = i.querySelector(a.spinnerSelector), r && n(r).remove()),
                        c != document.body && n(c).addClass("nprogress-custom-parent"),
                        c.appendChild(i),
                        i
                    },
                    o.remove = function() {
                        s.removeClass("nprogress-busy"),
                        n(a.parent).removeClass("nprogress-custom-parent");
                        var t = document.getElementById("nprogress");
                        t && n(t).remove()
                    },
                    o.isRendered = function() {
                        return !! document.getElementById("nprogress")
                    },
                    o.getPositioningCSS = function() {
                        var t = document.body.style,
                        e = "WebkitTransform" in t ? "Webkit": "MozTransform" in t ? "Moz": "msTransform" in t ? "ms": "OTransform" in t ? "O": "";
                        return e + "Perspective" in t ? "translate3d": e + "Transform" in t ? "translate": "margin"
                    };
                    var r = function() {
                        function t() {
                            var i = e.shift();
                            i && i(t)
                        }
                        var e = [];
                        return function(i) {
                            e.push(i),
                            1 == e.length && t()
                        }
                    } (),
                    l = function() {
                        function t(t) {
                            return t.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi,
                            function(t, e) {
                                return e.toUpperCase()
                            })
                        }
                        function e(t) {
                            var e = document.body.style;
                            if (t in e) return t;
                            for (var i, n = o.length,
                            s = t.charAt(0).toUpperCase() + t.slice(1); n--;) if (i = o[n] + s, i in e) return i;
                            return t
                        }
                        function i(i) {
                            return i = t(i),
                            s[i] || (s[i] = e(i))
                        }
                        function n(t, e, n) {
                            e = i(e),
                            t.style[e] = n
                        }
                        var o = ["Webkit", "O", "Moz", "ms"],
                        s = {};
                        return function(t, e) {
                            var i, o, s = arguments;
                            if (2 == s.length) for (i in e) o = e[i],
                            void 0 !== o && e.hasOwnProperty(i) && n(t, i, o);
                            else n(t, s[1], s[2])
                        }
                    } ();
                    return o
                } ());
                n.AMUI.progress = o,
                e.exports = o
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        17 : [function(t, e) { (function(i) {
                "use strict";
                function n(t) {
                    return this.each(function() {
                        var e = o(this),
                        i = e.data("amui.pureview"),
                        n = o.extend({},
                        s.utils.parseOptions(e.data("amPureview")), "object" == typeof t && t);
                        i || e.data("amui.pureview", i = new u(this, n)),
                        "string" == typeof t && i[t]()
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2),
                a = t(14),
                r = t(30),
                l = s.support.animation,
                d = s.support.transition,
                u = function(t, e) {
                    this.$element = o(t),
                    this.$body = o(document.body),
                    this.options = o.extend({},
                    u.DEFAULTS, e),
                    this.$pureview = o(this.options.tpl).attr("id", s.utils.generateGUID("am-pureview")),
                    this.$slides = null,
                    this.transitioning = null,
                    this.scrollbarWidth = 0,
                    this.init()
                };
                u.DEFAULTS = {
                    tpl: '<div class="am-pureview am-pureview-bar-active"><ul class="am-pureview-slider"></ul><ul class="am-pureview-direction"><li class="am-pureview-prev"><a href=""></a></li><li class="am-pureview-next"><a href=""></a></li></ul><ol class="am-pureview-nav"></ol><div class="am-pureview-bar am-active"><span class="am-pureview-title"></span><div class="am-pureview-counter"><span class="am-pureview-current"></span> / <span class="am-pureview-total"></span></div></div><div class="am-pureview-actions am-active"><a href="javascript: void(0)" class="am-icon-chevron-left" data-am-close="pureview"></a></div></div>',
                    className: {
                        prevSlide: "am-pureview-slide-prev",
                        nextSlide: "am-pureview-slide-next",
                        onlyOne: "am-pureview-only",
                        active: "am-active",
                        barActive: "am-pureview-bar-active",
                        activeBody: "am-pureview-active"
                    },
                    selector: {
                        slider: ".am-pureview-slider",
                        close: '[data-am-close="pureview"]',
                        total: ".am-pureview-total",
                        current: ".am-pureview-current",
                        title: ".am-pureview-title",
                        actions: ".am-pureview-actions",
                        bar: ".am-pureview-bar",
                        pinchZoom: ".am-pinch-zoom",
                        nav: ".am-pureview-nav"
                    },
                    shareBtn: !1,
                    toggleToolbar: !0,
                    target: "img",
                    weChatImagePreview: !0
                },
                u.prototype.init = function() {
                    var t = this,
                    e = this.options,
                    i = this.$element,
                    n = this.$pureview;
                    this.refreshSlides(),
                    o("body").append(n),
                    this.$title = n.find(e.selector.title),
                    this.$current = n.find(e.selector.current),
                    this.$bar = n.find(e.selector.bar),
                    this.$actions = n.find(e.selector.actions),
                    e.shareBtn && this.$actions.append('<a href="javascript: void(0)" class="am-icon-share-square-o" data-am-toggle="share"></a>'),
                    this.$element.on("click.pureview.amui", e.target,
                    function(i) {
                        i.preventDefault();
                        var n = t.$images.index(this);
                        e.weChatImagePreview && window.WeixinJSBridge ? window.WeixinJSBridge.invoke("imagePreview", {
                            current: t.imgUrls[n],
                            urls: t.imgUrls
                        }) : t.open(n)
                    }),
                    n.find(".am-pureview-direction").on("click.direction.pureview.amui", "li",
                    function(e) {
                        e.preventDefault(),
                        o(this).is(".am-pureview-prev") ? t.prevSlide() : t.nextSlide()
                    }),
                    n.find(e.selector.nav).on("click.nav.pureview.amui", "li",
                    function() {
                        var e = t.$navItems.index(o(this));
                        t.activate(t.$slides.eq(e))
                    }),
                    n.find(e.selector.close).on("click.close.pureview.amui",
                    function(e) {
                        e.preventDefault(),
                        t.close()
                    }),
                    this.$slider.hammer().on("swipeleft.pureview.amui",
                    function(e) {
                        e.preventDefault(),
                        t.nextSlide()
                    }).on("swiperight.pureview.amui",
                    function(e) {
                        e.preventDefault(),
                        t.prevSlide()
                    }).on("press.pureview.amui",
                    function(i) {
                        i.preventDefault(),
                        e.toggleToolbar && t.toggleToolBar()
                    }),
                    this.$slider.data("hammer").get("swipe").set({
                        direction: r.DIRECTION_HORIZONTAL,
                        velocity: .35
                    }),
                    i.DOMObserve({
                        childList: !0,
                        subtree: !0
                    },
                    function() {}),
                    i.on("changed.dom.amui",
                    function(e) {
                        e.stopPropagation(),
                        t.refreshSlides()
                    }),
                    o(document).on("keydown.pureview.amui", o.proxy(function(t) {
                        var e = t.keyCode;
                        37 == e ? this.prevSlide() : 39 == e ? this.nextSlide() : 27 == e && this.close()
                    },
                    this))
                },
                u.prototype.refreshSlides = function() {
                    this.$images = this.$element.find(this.options.target);
                    var t = this,
                    e = this.options,
                    i = this.$pureview,
                    n = o([]),
                    s = o([]),
                    a = this.$images,
                    r = a.length;
                    this.$slider = i.find(e.selector.slider),
                    this.$nav = i.find(e.selector.nav);
                    var l = "data-am-pureviewed";
                    this.imgUrls = this.imgUrls || [],
                    r && (1 === r && i.addClass(e.className.onlyOne), a.not("[" + l + "]").each(function(e, i) {
                        var a, r;
                        "A" === i.nodeName ? (a = i.href, r = i.title || "") : (a = o(i).data("rel") || i.src, r = o(i).attr("alt") || ""),
                        i.setAttribute(l, "1"),
                        t.imgUrls.push(a),
                        n = n.add(o('<li data-src="' + a + '" data-title="' + r + '"></li>')),
                        s = s.add(o("<li>" + (e + 1) + "</li>"))
                    }), i.find(e.selector.total).text(r), this.$slider.append(n), this.$nav.append(s), this.$navItems = this.$nav.find("li"), this.$slides = this.$slider.find("li"))
                },
                u.prototype.loadImage = function(t, e) {
                    var i = "image-appended";
                    if (!t.data(i)) {
                        var n = o("<img>", {
                            src: t.data("src"),
                            alt: t.data("title")
                        });
                        t.html(n).wrapInner('<div class="am-pinch-zoom"></div>').redraw();
                        var s = t.find(this.options.selector.pinchZoom);
                        s.data("amui.pinchzoom", new a(s[0], {})),
                        t.data("image-appended", !0)
                    }
                    e && e.call(this)
                },
                u.prototype.activate = function(t) {
                    var e = this.options,
                    i = this.$slides,
                    n = i.index(t),
                    a = t.data("title") || "",
                    r = e.className.active;
                    i.find("." + r).is(t) || this.transitioning || (this.loadImage(t,
                    function() {
                        s.utils.imageLoader(t.find("img"),
                        function(t) {
                            o(t).addClass("am-img-loaded")
                        })
                    }), this.transitioning = 1, this.$title.text(a), this.$current.text(n + 1), i.removeClass(), t.addClass(r), i.eq(n - 1).addClass(e.className.prevSlide), i.eq(n + 1).addClass(e.className.nextSlide), this.$navItems.removeClass().eq(n).addClass(e.className.active), d ? t.one(d.end, o.proxy(function() {
                        this.transitioning = 0
                    },
                    this)).emulateTransitionEnd(300) : this.transitioning = 0)
                },
                u.prototype.nextSlide = function() {
                    if (1 !== this.$slides.length) {
                        var t = this.$slides,
                        e = t.filter(".am-active"),
                        i = t.index(e),
                        n = "am-animation-right-spring";
                        i + 1 >= t.length ? l && e.addClass(n).on(l.end,
                        function() {
                            e.removeClass(n)
                        }) : this.activate(t.eq(i + 1))
                    }
                },
                u.prototype.prevSlide = function() {
                    if (1 !== this.$slides.length) {
                        var t = this.$slides,
                        e = t.filter(".am-active"),
                        i = this.$slides.index(e),
                        n = "am-animation-left-spring";
                        0 === i ? l && e.addClass(n).on(l.end,
                        function() {
                            e.removeClass(n)
                        }) : this.activate(t.eq(i - 1))
                    }
                },
                u.prototype.toggleToolBar = function() {
                    this.$pureview.toggleClass(this.options.className.barActive)
                },
                u.prototype.open = function(t) {
                    var e = t || 0;
                    this.checkScrollbar(),
                    this.setScrollbar(),
                    this.activate(this.$slides.eq(e)),
                    this.$pureview.show().redraw().addClass(this.options.className.active),
                    this.$body.addClass(this.options.className.activeBody)
                },
                u.prototype.close = function() {
                    function t() {
                        this.$pureview.hide(),
                        this.$body.removeClass(e.className.activeBody),
                        this.resetScrollbar()
                    }
                    var e = this.options;
                    this.$pureview.removeClass(e.className.active),
                    this.$slides.removeClass(),
                    d ? this.$pureview.one(d.end, o.proxy(t, this)).emulateTransitionEnd(300) : t.call(this)
                },
                u.prototype.checkScrollbar = function() {
                    this.scrollbarWidth = s.utils.measureScrollbar()
                },
                u.prototype.setScrollbar = function() {
                    var t = parseInt(this.$body.css("padding-right") || 0, 10);
                    this.scrollbarWidth && this.$body.css("padding-right", t + this.scrollbarWidth)
                },
                u.prototype.resetScrollbar = function() {
                    this.$body.css("padding-right", "")
                },
                o.fn.pureview = n,
                s.ready(function(t) {
                    o("[data-am-pureview]", t).pureview()
                }),
                o.AMUI.pureview = u,
                e.exports = u
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            14 : 14,
            2 : 2,
            30 : 30
        }],
        18 : [function(t, e) { (function(i) {
                "use strict";
                function n(t) {
                    return this.each(function() {
                        var e = o(this),
                        i = e.data("am.scrollspy"),
                        n = "object" == typeof t && t;
                        i || e.data("am.scrollspy", i = new a(this, n)),
                        "string" == typeof t && i[t]()
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2),
                a = function(t, e) {
                    if (s.support.animation) {
                        this.options = o.extend({},
                        a.DEFAULTS, e),
                        this.$element = o(t);
                        var i = function() {
                            s.utils.rAF.call(window, o.proxy(this.checkView, this))
                        }.bind(this);
                        this.$window = o(window).on("scroll.scrollspy.amui", i).on("resize.scrollspy.amui orientationchange.scrollspy.amui", s.utils.debounce(i, 50)),
                        this.timer = this.inViewState = this.initInView = null,
                        i()
                    }
                };
                a.DEFAULTS = {
                    animation: "fade",
                    className: {
                        inView: "am-scrollspy-inview",
                        init: "am-scrollspy-init"
                    },
                    repeat: !0,
                    delay: 0,
                    topOffset: 0,
                    leftOffset: 0
                },
                a.prototype.checkView = function() {
                    var t = this.$element,
                    e = this.options,
                    i = s.utils.isInView(t, e),
                    n = e.animation ? " am-animation-" + e.animation: "";
                    i && !this.inViewState && (this.timer && clearTimeout(this.timer), this.initInView || (t.addClass(e.className.init), this.offset = t.offset(), this.initInView = !0, t.trigger("init.scrollspy.amui")), this.timer = setTimeout(function() {
                        i && t.addClass(e.className.inView + n).width()
                    },
                    e.delay), this.inViewState = !0, t.trigger("inview.scrollspy.amui")),
                    !i && this.inViewState && e.repeat && (t.removeClass(e.className.inView + n), this.inViewState = !1, t.trigger("outview.scrollspy.amui"))
                },
                a.prototype.check = function() {
                    s.utils.rAF.call(window, o.proxy(this.checkView, this))
                },
                o.fn.scrollspy = n,
                s.ready(function(t) {
                    o("[data-am-scrollspy]", t).each(function() {
                        var t = o(this),
                        e = s.utils.options(t.data("amScrollspy"));
                        t.scrollspy(e)
                    })
                }),
                o.AMUI.scrollspy = a,
                e.exports = a
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        19 : [function(t, e) { (function(i) {
                "use strict";
                function n(t) {
                    return this.each(function() {
                        var e = o(this),
                        i = e.data("amui.scrollspynav"),
                        n = "object" == typeof t && t;
                        i || e.data("amui.scrollspynav", i = new a(this, n)),
                        "string" == typeof t && i[t]()
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2);
                t(22);
                var a = function(t, e) {
                    this.options = o.extend({},
                    a.DEFAULTS, e),
                    this.$element = o(t),
                    this.anchors = [],
                    this.$links = this.$element.find('a[href^="#"]').each(function(t, e) {
                        this.anchors.push(o(e).attr("href"))
                    }.bind(this)),
                    this.$targets = o(this.anchors.join(", "));
                    var i = function() {
                        s.utils.rAF.call(window, o.proxy(this.process, this))
                    }.bind(this);
                    this.$window = o(window).on("scroll.scrollspynav.amui", i).on("resize.scrollspynav.amui orientationchange.scrollspynav.amui", s.utils.debounce(i, 50)),
                    i(),
                    this.scrollProcess()
                };
                a.DEFAULTS = {
                    className: {
                        active: "am-active"
                    },
                    closest: !1,
                    smooth: !0,
                    offsetTop: 0
                },
                a.prototype.process = function() {
                    var t = this.$window.scrollTop(),
                    e = this.options,
                    i = [],
                    n = this.$links,
                    a = this.$targets;
                    if (a.each(function(t, n) {
                        s.utils.isInView(n, e) && i.push(n)
                    }), i.length) {
                        var r;
                        if (o.each(i,
                        function(e, i) {
                            return o(i).offset().top >= t ? (r = o(i), !1) : void 0
                        }), !r) return;
                        e.closest ? (n.closest(e.closest).removeClass(e.className.active), n.filter('a[href="#' + r.attr("id") + '"]').closest(e.closest).addClass(e.className.active)) : n.removeClass(e.className.active).filter('a[href="#' + r.attr("id") + '"]').addClass(e.className.active)
                    }
                },
                a.prototype.scrollProcess = function() {
                    var t = this.$links,
                    e = this.options;
                    e.smooth && t.on("click",
                    function(t) {
                        t.preventDefault();
                        var i = o(this),
                        n = o(i.attr("href"));
                        if (n) {
                            var s = e.offsetTop && !isNaN(parseInt(e.offsetTop)) && parseInt(e.offsetTop) || 0;
                            o(window).smoothScroll({
                                position: n.offset().top - s
                            })
                        }
                    })
                },
                o.fn.scrollspynav = n,
                s.ready(function(t) {
                    o("[data-am-scrollspy-nav]", t).each(function() {
                        var t = o(this),
                        e = s.utils.options(t.data("amScrollspyNav"));
                        n.call(t, e)
                    })
                }),
                o.AMUI.scrollspynav = a,
                e.exports = a
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2,
            22 : 22
        }],
        20 : [function(t, e) { (function(i) {
                "use strict";
                function n(t) {
                    return this.each(function() {
                        var e = o(this),
                        i = e.data("amui.selected"),
                        n = o.extend({},
                        s.utils.parseOptions(e.data("amSelected")), s.utils.parseOptions(e.data("amSelectit")), "object" == typeof t && t); (i || "destroy" !== t) && (i || e.data("amui.selected", i = new a(this, n)), "string" == typeof t && i[t] && i[t]())
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2);
                o.expr[":"].containsNC = function(t, e, i) {
                    return (t.textContent || t.innerText || "").toLowerCase().indexOf((i[3] || "").toLowerCase()) >= 0
                };
                var a = function(t, e) {
                    this.$element = o(t),
                    this.options = o.extend({},
                    a.DEFAULTS, e),
                    this.$originalOptions = this.$element.find("option"),
                    this.multiple = t.multiple,
                    this.$selector = null,
                    this.init()
                };
                a.DEFAULTS = {
                    btnWidth: null,
                    btnSize: null,
                    btnStyle: "default",
                    dropUp: 0,
                    maxHeight: null,
                    noSelectedText: "点击选择...",
                    selectedClass: "am-checked",
                    disabledClass: "am-disabled",
                    searchBox: !1,
                    tpl: '<div class="am-selected am-dropdown <%= dropUp ? \'am-dropdown-up\': \'\' %>" id="<%= id %>" data-am-dropdown>  <button type="button" class="am-selected-btn am-btn am-dropdown-toggle">    <span class="am-selected-status am-fl"></span>    <i class="am-selected-icon am-icon-caret-<%= dropUp ? \'up\' : \'down\' %>"></i>  </button>  <div class="am-selected-content am-dropdown-content">    <h2 class="am-selected-header"><span class="am-icon-chevron-left">返回</span></h2>   <% if (searchBox) { %>   <div class="am-selected-search">     <input type="text" autocomplete="off" class="am-form-field" placeholder="搜索城市名称" />   </div>   <% } %>    <ul class="am-selected-list">      <% for (var i = 0; i < options.length; i++) { %>       <% var option = options[i] %>       <% if (option.header) { %>  <li data-group="<%= option.group %>" class="am-selected-list-header">       <%= option.text %></li>       <% } else { %>       <li class="<%= option.classNames%>"          data-index="<%= option.index %>"          data-group="<%= option.group || 0 %>"          data-value="<%= option.value %>" >         <span class="am-selected-text"><%= option.text %></span>       </li>      <% } %>      <% } %>    </ul>    <div class="am-selected-hint"></div>  </div></div>',
                    listTpl: '<% for (var i = 0; i < options.length; i++) { %>       <% var option = options[i] %>       <% if (option.header) { %>  <li data-group="<%= option.group %>" class="am-selected-list-header">       <%= option.text %></li>       <% } else { %>       <li class="<%= option.classNames %>"          data-index="<%= option.index %>"          data-group="<%= option.group || 0 %>"          data-value="<%= option.value %>" >         <span class="am-selected-text"><%= option.text %></span>       </li>      <% } %>      <% } %>'
                },
                a.prototype.init = function() {
                    var t = this,
                    e = this.$element,
                    i = this.options;
                    e.hide();
                    var n = {
                        id: s.utils.generateGUID("am-selected"),
                        multiple: this.multiple,
                        options: [],
                        searchBox: i.searchBox,
                        dropUp: i.dropUp
                    };
                    this.$selector = o(s.template(this.options.tpl, n)),
                    this.$list = this.$selector.find(".am-selected-list"),
                    this.$searchField = this.$selector.find(".am-selected-search input"),
                    this.$hint = this.$selector.find(".am-selected-hint");
                    var a = this.$selector.find(".am-selected-btn").css({
                        width: this.options.btnWidth
                    }),
                    r = [];
                    i.btnSize && r.push("am-btn-" + i.btnSize),
                    i.btnStyle && r.push("am-btn-" + i.btnStyle),
                    a.addClass(r.join(" ")),
                    this.$selector.dropdown({
                        justify: a
                    }),
                    i.maxHeight && this.$selector.find(".am-selected-list").css({
                        "max-height": i.maxHeight,
                        "overflow-y": "scroll"
                    });
                    var l = [],
                    d = e.attr("minchecked"),
                    u = e.attr("maxchecked");
                    e[0].required && l.push("必选"),
                    (d || u) && (d && l.push("至少选择 " + d + " 项"), u && l.push("至多选择 " + u + " 项")),
                    this.$hint.text(l.join("，")),
                    this.renderOptions(),
                    this.$element.after(this.$selector),
                    this.dropdown = this.$selector.data("amui.dropdown"),
                    this.$status = this.$selector.find(".am-selected-status"),
                    setTimeout(function() {
                        t.syncData()
                    },
                    0),
                    this.bindEvents()
                },
                a.prototype.renderOptions = function() {
                    function t(t, e, o) {
                        var s = "";
                        e.disabled && (s += i.disabledClass),
                        !e.disabled && e.selected && (s += i.selectedClass),
                        n.push({
                            group: o,
                            index: t,
                            classNames: s,
                            text: e.text,
                            value: e.value
                        })
                    }
                    var e = this.$element,
                    i = this.options,
                    n = [],
                    o = e.find("optgroup");
                    this.$originalOptions = this.$element.find("option"),
                    this.multiple || null !== e.val() || (this.$originalOptions.get(0).selected = !0),
                    o.length ? o.each(function(e) {
                        n.push({
                            header: !0,
                            group: e + 1,
                            text: this.label
                        }),
                        o.eq(e).find("option").each(function(i, n) {
                            t(i, n, e)
                        })
                    }) : this.$originalOptions.each(function(e, i) {
                        t(e, i, null)
                    }),
                    this.$list.html(s.template(i.listTpl, {
                        options: n
                    })),
                    this.$shadowOptions = this.$list.find("> li").not(".am-selected-list-header")
                },
                a.prototype.setChecked = function(t) {
                    var e = this.options,
                    i = o(t),
                    n = i.hasClass(e.selectedClass);
                    if (!this.multiple) {
                        if (n) return;
                        this.dropdown.close(),
                        this.$shadowOptions.not(i).removeClass(e.selectedClass)
                    }
                    i.toggleClass(e.selectedClass),
                    this.syncData(t)
                },
                a.prototype.syncData = function(t) {
                    var e = this,
                    i = this.options,
                    n = [],
                    s = o([]);
                    if (this.$shadowOptions.filter("." + i.selectedClass).each(function() {
                        var i = o(this);
                        n.push(i.find(".am-selected-text").text()),
                        t || (s = s.add(e.$originalOptions.filter('[value="' + i.data("value") + '"]').prop("selected", !0)))
                    }), t) {
                        var a = o(t);
                        this.$originalOptions.filter('[value="' + a.data("value") + '"]').prop("selected", a.hasClass(i.selectedClass))
                    } else this.$originalOptions.not(s).prop("selected", !1);
                    this.$element.val() || (n = [i.noSelectedText]),
                    this.$status.text(n.join(", ")),
                    this.$element.trigger("change")
                },
                a.prototype.bindEvents = function() {
                    var t = this,
                    e = "am-selected-list-header",
                    i = s.utils.debounce(function(i) {
                        t.$shadowOptions.not("." + e).hide().filter(':containsNC("' + i.target.value + '")').show()
                    },
                    100);
                    this.$list.on("click", "> li",
                    function() {
                        var i = o(this); ! i.hasClass(t.options.disabledClass) && !i.hasClass(e) && t.setChecked(this)
                    }),
                    this.$searchField.on("keyup.selected.amui", i),
                    this.$selector.on("closed.dropdown.amui",
                    function() {
                        t.$searchField.val(""),
                        t.$shadowOptions.css({
                            display: ""
                        })
                    }),
                    s.support.mutationobserver && (this.observer = new s.support.mutationobserver(function() {
                        t.$element.trigger("changed.selected.amui")
                    }), this.observer.observe(this.$element[0], {
                        childList: !0,
                        attributes: !0,
                        subtree: !0,
                        characterData: !0
                    })),
                    this.$element.on("changed.selected.amui",
                    function() {
                        t.renderOptions(),
                        t.syncData()
                    })
                },
                a.prototype.destroy = function() {
                    this.$element.removeData("amui.selected").show(),
                    this.$selector.remove()
                },
                o.fn.selected = o.fn.selectIt = n,
                s.ready(function(t) {
                    o("[data-am-selected]", t).selectIt()
                }),
                o.AMUI.selected = a,
                e.exports = a
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        21 : [function(t, e) { (function(i) {
                "use strict";
                t(12);
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                o = t(2),
                s = t(31),
                a = document,
                r = n(a),
                l = function(t) {
                    this.options = n.extend({},
                    l.DEFAULTS, t || {}),
                    this.$element = null,
                    this.$wechatQr = null,
                    this.pics = null,
                    this.inited = !1,
                    this.active = !1
                };
                l.DEFAULTS = {
                    sns: ["weibo", "qq", "qzone", "tqq", "wechat", "renren"],
                    title: "分享到",
                    cancel: "取消",
                    closeOnShare: !0,
                    id: o.utils.generateGUID("am-share"),
                    desc: "Hi，孤夜观天象，发现一个不错的西西，分享一下下 ;-)",
                    via: "Amaze UI",
                    tpl: '<div class="am-share am-modal-actions" id="<%= id %>"><h3 class="am-share-title"><%= title %></h3><ul class="am-share-sns am-avg-sm-3"><% for(var i = 0; i < sns.length; i++) {%><li><a href="<%= sns[i].shareUrl %>" data-am-share-to="<%= sns[i].id %>" ><i class="am-icon-<%= sns[i].icon %>"></i><span><%= sns[i].title %></span></a></li><% } %></ul><div class="am-share-footer"><button class="am-btn am-btn-default am-btn-block" data-am-share-close><%= cancel %></button></div></div>'
                },
                l.SNS = {
                    weibo: {
                        title: "新浪微博",
                        url: "http://service.weibo.com/share/share.php",
                        width: 620,
                        height: 450,
                        icon: "weibo"
                    },
                    qq: {
                        title: "QQ 好友",
                        url: "http://connect.qq.com/widget/shareqq/index.html",
                        icon: "qq"
                    },
                    qzone: {
                        title: "QQ 空间",
                        url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
                        icon: "star"
                    },
                    tqq: {
                        title: "腾讯微博",
                        url: "http://v.t.qq.com/share/share.php",
                        icon: "tencent-weibo"
                    },
                    wechat: {
                        title: "微信",
                        url: "[qrcode]",
                        icon: "wechat"
                    },
                    renren: {
                        title: "人人网",
                        url: "http://widget.renren.com/dialog/share",
                        icon: "renren"
                    },
                    douban: {
                        title: "豆瓣",
                        url: "http://www.douban.com/recommend/",
                        icon: "share-alt"
                    },
                    mail: {
                        title: "邮件分享",
                        url: "mailto:",
                        icon: "envelope-o"
                    },
                    sms: {
                        title: "短信分享",
                        url: "sms:",
                        icon: "comment"
                    }
                },
                l.prototype.render = function() {
                    var t = this.options,
                    e = [],
                    i = encodeURIComponent(a.title),
                    s = encodeURIComponent(a.location),
                    r = "?body=" + i + s;
                    return t.sns.forEach(function(n) {
                        if (l.SNS[n]) {
                            var o, a = l.SNS[n];
                            a.id = n,
                            o = "mail" === n ? r + "&subject=" + t.desc: "sms" === n ? r: "?url=" + s + "&title=" + i,
                            a.shareUrl = a.url + o,
                            e.push(a)
                        }
                    }),
                    o.template(t.tpl, n.extend({},
                    t, {
                        sns: e
                    }))
                },
                l.prototype.init = function() {
                    if (!this.inited) {
                        var t = this,
                        e = "[data-am-share-to]";
                        r.ready(n.proxy(function() {
                            n("body").append(this.render()),
                            this.$element = n("#" + this.options.id),
                            this.$element.find("[data-am-share-close]").on("click.share.amui",
                            function() {
                                t.close()
                            })
                        },
                        this)),
                        r.on("click.share.amui", e, n.proxy(function(t) {
                            var i = n(t.target),
                            o = i.is(e) && i || i.parent(e),
                            s = o.attr("data-am-share-to");
                            "mail" !== s && "sms" !== s && (t.preventDefault(), this.shareTo(s, this.setData(s))),
                            this.close()
                        },
                        this)),
                        this.inited = !0
                    }
                },
                l.prototype.open = function() { ! this.inited && this.init(),
                    this.$element && this.$element.modal("open"),
                    this.$element.trigger("open.share.amui"),
                    this.active = !0
                },
                l.prototype.close = function() {
                    this.$element && this.$element.modal("close"),
                    this.$element.trigger("close.share.amui"),
                    this.active = !1
                },
                l.prototype.toggle = function() {
                    this.active ? this.close() : this.open()
                },
                l.prototype.setData = function(t) {
                    if (t) {
                        var e = {
                            url: a.location,
                            title: a.title
                        },
                        i = this.options.desc,
                        n = this.pics || [],
                        o = /^(qzone|qq|tqq)$/;
                        if (o.test(t) && !n.length) {
                            for (var s = a.images,
                            r = 0; r < s.length && 10 > r; r++) !! s[r].src && n.push(encodeURIComponent(s[r].src));
                            this.pics = n
                        }
                        switch (t) {
                        case "qzone":
                            e.desc = i,
                            e.site = this.options.via,
                            e.pics = n.join("|");
                            break;
                        case "qq":
                            e.desc = i,
                            e.site = this.options.via,
                            e.pics = n[0];
                            break;
                        case "tqq":
                            e.pic = n.join("|")
                        }
                        return e
                    }
                },
                l.prototype.shareTo = function(t, e) {
                    var i = l.SNS[t];
                    if (i) {
                        if ("wechat" === t || "weixin" === t) return this.wechatQr();
                        var n = [];
                        for (var o in e) e[o] && n.push(o.toString() + "=" + ("pic" === o || "pics" === o ? e[o] : encodeURIComponent(e[o])));
                        window.open(i.url + "?" + n.join("&"))
                    }
                },
                l.prototype.wechatQr = function() {
                    if (!this.$wechatQr) {
                        var t = o.utils.generateGUID("am-share-wechat"),
                        e = n('<div class="am-modal am-modal-no-btn am-share-wechat-qr"><div class="am-modal-dialog"><div class="am-modal-hd">分享到微信 <a href="" class="am-close am-close-spin" data-am-modal-close>&times;</a> </div><div class="am-modal-bd"><div class="am-share-wx-qr"></div><div class="am-share-wechat-tip">打开微信，点击底部的<em>发现</em>，<br/> 使用<em>扫一扫</em>将网页分享至朋友圈</div></div></div></div>');
                        e.attr("id", t);
                        var i = new s({
                            render: "canvas",
                            correctLevel: 0,
                            text: a.location.href,
                            width: 180,
                            height: 180,
                            background: "#fff",
                            foreground: "#000"
                        });
                        e.find(".am-share-wx-qr").html(i),
                        e.appendTo(n("body")),
                        this.$wechatQr = n("#" + t)
                    }
                    this.$wechatQr.modal("open")
                };
                var d = new l;
                r.on("click.share.amui.data-api", '[data-am-toggle="share"]',
                function(t) {
                    t.preventDefault(),
                    d.toggle()
                }),
                n.AMUI.share = d,
                e.exports = d
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            12 : 12,
            2 : 2,
            31 : 31
        }],
        22 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                o = t(2),
                s = o.utils.rAF,
                a = o.utils.cancelAF,
                r = !1,
                l = function(t, e) {
                    function i(t) {
                        return (t /= .5) < 1 ? .5 * Math.pow(t, 5) : .5 * (Math.pow(t - 2, 5) + 2)
                    }
                    function o() {
                        p.off("touchstart.smoothscroll.amui", y),
                        r = !1
                    }
                    function d(t) {
                        r && (u || (u = t), c = Math.min(1, Math.max((t - u) / w, 0)), h = Math.round(m + g * i(c)), g > 0 && h > f && (h = f), 0 > g && f > h && (h = f), v != h && p.scrollTop(h), v = h, h !== f ? (a(b), b = s(d)) : (a(b), o()))
                    }
                    e = e || {};
                    var u, c, h, p = n(t),
                    f = parseInt(e.position) || l.DEFAULTS.position,
                    m = p.scrollTop(),
                    v = m,
                    g = f - m,
                    w = e.speed || Math.min(750, Math.min(1500, Math.abs(m - f))),
                    y = function() {
                        o()
                    };
                    if (!r && 0 !== g) {
                        p.on("touchstart.smoothscroll.amui", y),
                        r = !0;
                        var b = s(d)
                    }
                };
                l.DEFAULTS = {
                    position: 0
                },
                n.fn.smoothScroll = function(t) {
                    return this.each(function() {
                        new l(this, t)
                    })
                },
                n(document).on("click.smoothScroll.amui.data-api", "[data-am-smooth-scroll]",
                function(t) {
                    t.preventDefault();
                    var e = o.utils.parseOptions(n(this).data("amSmoothScroll"));
                    n(window).smoothScroll(e)
                }),
                e.exports = l
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        23 : [function(t, e) { (function(i) {
                "use strict";
                function n(t) {
                    return this.each(function() {
                        var e = o(this),
                        i = e.data("amui.sticky"),
                        n = "object" == typeof t && t;
                        i || e.data("amui.sticky", i = new a(this, n)),
                        "string" == typeof t && i[t]()
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2),
                a = function(t, e) {
                    var i = this;
                    this.options = o.extend({},
                    a.DEFAULTS, e),
                    this.$element = o(t),
                    this.sticked = null,
                    this.inited = null,
                    this.$holder = void 0,
                    this.$window = o(window).on("scroll.sticky.amui", s.utils.debounce(o.proxy(this.checkPosition, this), 10)).on("resize.sticky.amui orientationchange.sticky.amui", s.utils.debounce(function() {
                        i.reset(!0,
                        function() {
                            i.checkPosition()
                        })
                    },
                    50)).on("load.sticky.amui", o.proxy(this.checkPosition, this)),
                    this.offset = this.$element.offset(),
                    this.init()
                };
                a.DEFAULTS = {
                    top: 0,
                    bottom: 0,
                    animation: "",
                    className: {
                        sticky: "am-sticky",
                        resetting: "am-sticky-resetting",
                        stickyBtm: "am-sticky-bottom",
                        animationRev: "am-animation-reverse"
                    }
                },
                a.prototype.init = function() {
                    var t = this.check();
                    if (!t) return ! 1;
                    var e = this.$element,
                    i = "";
                    o.each(e.css(["marginTop", "marginRight", "marginBottom", "marginLeft"]),
                    function(t, e) {
                        return i += " " + e
                    });
                    var n = o('<div class="am-sticky-placeholder"></div>').css({
                        height: "absolute" != e.css("position") ? e.outerHeight() : "",
                        "float": "none" != e.css("float") ? e.css("float") : "",
                        margin: i
                    });
                    return this.$holder = e.css("margin", 0).wrap(n).parent(),
                    this.inited = 1,
                    !0
                },
                a.prototype.reset = function(t, e) {
                    var i = this.options,
                    n = this.$element,
                    o = i.animation ? " am-animation-" + i.animation: "",
                    a = function() {
                        n.css({
                            position: "",
                            top: "",
                            width: "",
                            left: "",
                            margin: 0
                        }),
                        n.removeClass([o, i.className.animationRev, i.className.sticky, i.className.resetting].join(" ")),
                        this.animating = !1,
                        this.sticked = !1,
                        this.offset = n.offset(),
                        e && e()
                    }.bind(this);
                    n.addClass(i.className.resetting),
                    !t && i.animation && s.support.animation ? (this.animating = !0, n.removeClass(o).one(s.support.animation.end,
                    function() {
                        a()
                    }).width(), n.addClass(o + " " + i.className.animationRev)) : a()
                },
                a.prototype.check = function() {
                    if (!this.$element.is(":visible")) return ! 1;
                    var t = this.options.media;
                    if (t) switch (typeof t) {
                    case "number":
                        if (window.innerWidth < t) return ! 1;
                        break;
                    case "string":
                        if (window.matchMedia && !window.matchMedia(t).matches) return ! 1
                    }
                    return ! 0
                },
                a.prototype.checkPosition = function() {
                    if (!this.inited) {
                        var t = this.init();
                        if (!t) return
                    }
                    var e = this.options,
                    i = this.$window.scrollTop(),
                    n = e.top,
                    o = e.bottom,
                    s = this.$element,
                    a = e.animation ? " am-animation-" + e.animation: "",
                    r = [e.className.sticky, a].join(" ");
                    "function" == typeof o && (o = o(this.$element));
                    var l = i > this.$holder.offset().top; ! this.sticked && l ? s.addClass(r) : this.sticked && !l && this.reset(),
                    this.$holder.height(s.is(":visible") ? s.height() : 0),
                    l && s.css({
                        top: n,
                        left: this.$holder.offset().left,
                        width: this.$holder.width()
                    }),
                    this.sticked = l
                },
                o.fn.sticky = n,
                o(window).on("load",
                function() {
                    o("[data-am-sticky]").each(function() {
                        var t = o(this),
                        e = s.utils.options(t.attr("data-am-sticky"));
                        n.call(t, e)
                    })
                }),
                o.AMUI.sticky = a,
                e.exports = a
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        24 : [function(t, e) { (function(i) {
                "use strict";
                function n(t) {
                    return this.each(function() {
                        var e = o(this),
                        i = e.is(".am-tabs") && e || e.closest(".am-tabs"),
                        n = i.data("amui.tabs"),
                        a = o.extend({},
                        o.isPlainObject(t) ? t: {},
                        s.utils.parseOptions(e.data("amTabs")));
                        n || i.data("amui.tabs", n = new d(i[0], a)),
                        "string" == typeof t && e.is(".am-tabs-nav a") && n[t](e)
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2),
                a = t(30),
                r = s.support.transition,
                l = s.support.animation,
                d = function(t, e) {
                    this.$element = o(t),
                    this.options = o.extend({},
                    d.DEFAULTS, e || {}),
                    this.$tabNav = this.$element.find(this.options.selector.nav),
                    this.$navs = this.$tabNav.find("a"),
                    this.$content = this.$element.find(this.options.selector.content),
                    this.$tabPanels = this.$content.find(this.options.selector.panel),
                    this.transitioning = null,
                    this.init()
                };
                d.DEFAULTS = {
                    selector: {
                        nav: "> .am-tabs-nav",
                        content: "> .am-tabs-bd",
                        panel: "> .am-tab-panel"
                    },
                    className: {
                        active: "am-active"
                    }
                },
                d.prototype.init = function() {
                    var t = this,
                    e = this.options;
                    if (1 !== this.$tabNav.find("> .am-active").length) {
                        var i = this.$tabNav;
                        this.activate(i.children("li").first(), i),
                        this.activate(this.$tabPanels.first(), this.$content)
                    }
                    if (this.$navs.on("click.tabs.amui",
                    function(e) {
                        e.preventDefault(),
                        t.open(o(this))
                    }), !e.noSwipe) {
                        if (!this.$content.length) return this;
                        var n = new a(this.$content[0]);
                        n.get("pan").set({
                            direction: a.DIRECTION_HORIZONTAL,
                            threshold: 120
                        }),
                        n.on("panleft", s.utils.debounce(function(i) {
                            i.preventDefault();
                            var n = o(i.target);
                            n.is(e.selector.panel) || (n = n.closest(e.selector.panel)),
                            n.focus();
                            var s = t.getNextNav(n);
                            s && t.open(s)
                        },
                        100)),
                        n.on("panright", s.utils.debounce(function(i) {
                            i.preventDefault();
                            var n = o(i.target);
                            n.is(e.selector.panel) || (n = n.closest(e.selector.panel));
                            var s = t.getPrevNav(n);
                            s && t.open(s)
                        },
                        100))
                    }
                },
                d.prototype.open = function(t) {
                    if (t && !this.transitioning && !t.parent("li").hasClass("am-active")) {
                        var e = this.$tabNav,
                        i = this.$navs,
                        n = this.$content,
                        s = t.attr("href"),
                        a = /^#.+$/,
                        r = a.test(s) && this.$content.find(s) || this.$tabPanels.eq(i.index(t)),
                        l = e.find(".am-active a")[0],
                        d = o.Event("open.tabs.amui", {
                            relatedTarget: l
                        });
                        t.trigger(d),
                        d.isDefaultPrevented() || (this.activate(t.closest("li"), e), this.activate(r, n,
                        function() {
                            t.trigger({
                                type: "opened.tabs.amui",
                                relatedTarget: l
                            })
                        }))
                    }
                },
                d.prototype.activate = function(t, e, i) {
                    function n() {
                        i && i(),
                        this.transitioning = !1
                    }
                    this.transitioning = !0;
                    var s = e.find("> .am-active"),
                    a = i && r && !!s.length;
                    s.removeClass("am-active am-in"),
                    t.addClass("am-active"),
                    a ? (t.redraw(), t.addClass("am-in")) : t.removeClass("am-fade"),
                    a ? s.one(r.end, o.proxy(n, this)) : o.proxy(n, this)()
                },
                d.prototype.getNextNav = function(t) {
                    var e = this.$tabPanels.index(t),
                    i = "am-animation-right-spring";
                    return e + 1 >= this.$navs.length ? (l && t.addClass(i).on(l.end,
                    function() {
                        t.removeClass(i)
                    }), null) : this.$navs.eq(e + 1)
                },
                d.prototype.getPrevNav = function(t) {
                    var e = this.$tabPanels.index(t),
                    i = "am-animation-left-spring";
                    return 0 === e ? (l && t.addClass(i).on(l.end,
                    function() {
                        t.removeClass(i)
                    }), null) : this.$navs.eq(e - 1)
                },
                o.fn.tabs = n,
                s.ready(function(t) {
                    o("[data-am-tabs]", t).tabs()
                }),
                o.AMUI.tabs = d,
                e.exports = d
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2,
            30 : 30
        }],
        25 : [function(t, e) { (function(i) {
                "use strict";
                function n(t) {
                    return this.each(function() {
                        var e = o(this),
                        i = e.data("amui.ucheck"),
                        n = o.extend({},
                        s.utils.parseOptions(e.data("amUcheck")), "object" == typeof t && t); (i || "destroy" !== t) && (i || e.data("amui.ucheck", i = new a(this, n)), "string" == typeof t && i[t] && i[t](), s.support.touch && e.parent().hover(function() {
                            e.addClass("am-nohover")
                        },
                        function() {
                            e.removeClass("am-nohover")
                        }))
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2),
                a = function(t, e) {
                    this.options = o.extend({},
                    a.DEFAULTS, e),
                    this.$element = o(t),
                    this.init()
                };
                a.DEFAULTS = {
                    checkboxClass: "am-ucheck-checkbox",
                    radioClass: "am-ucheck-radio",
                    checkboxTpl: '<span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>',
                    radioTpl: '<span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>'
                },
                a.prototype.init = function() {
                    var t = this.$element,
                    e = t[0],
                    i = this.options;
                    "checkbox" === e.type ? t.addClass(i.checkboxClass).after(i.checkboxTpl) : "radio" === e.type && t.addClass(i.radioClass).after(i.radioTpl)
                },
                a.prototype.check = function() {
                    this.$element.prop("checked", !0).trigger("change.ucheck.amui").trigger("checked.ucheck.amui")
                },
                a.prototype.uncheck = function() {
                    this.$element.prop("checked", !1).trigger("change.ucheck.amui").trigger("unchecked.ucheck.amui")
                },
                a.prototype.toggle = function() {
                    this.$element.prop("checked",
                    function(t, e) {
                        return ! e
                    }).trigger("change.ucheck.amui").trigger("toggled.ucheck.amui")
                },
                a.prototype.disable = function() {
                    this.$element.prop("disabled", !0).trigger("change.ucheck.amui").trigger("disabled.ucheck.amui")
                },
                a.prototype.enable = function() {
                    this.$element.prop("disabled", !1),
                    this.$element.trigger("change.ucheck.amui").trigger("enabled.ucheck.amui")
                },
                a.prototype.destroy = function() {
                    this.$element.removeData("amui.ucheck").removeClass(this.options.checkboxClass + " " + this.options.radioClass).next(".am-ucheck-icons").remove().end().trigger("destroyed.ucheck.amui")
                },
                o.fn.uCheck = n,
                s.ready(function(t) {
                    o("[data-am-ucheck]", t).uCheck()
                }),
                o.AMUI.uCheck = a,
                e.exports = a
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        26 : [function(t, e) { (function(i) {
                "use strict";
                function n(t) {
                    return this.each(function() {
                        var e = o(this),
                        i = e.data("amui.validator"),
                        n = o.extend({},
                        s.utils.parseOptions(e.data("amValidator")), "object" == typeof t && t);
                        i || e.data("amui.validator", i = new a(this, n)),
                        "string" == typeof t && i[t] && i[t]()
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2),
                a = function(t, e) {
                    this.options = o.extend({},
                    a.DEFAULTS, e),
                    this.options.patterns = o.extend({},
                    a.patterns, this.options.patterns);
                    var i = this.options.locales; ! a.validationMessages[i] && (this.options.locales = "zh_CN"),
                    this.$element = o(t),
                    this.init()
                };
                a.DEFAULTS = {
                    debug: !1,
                    locales: "zh_CN",
                    H5validation: !1,
                    H5inputType: ["email", "url", "number"],
                    patterns: {},
                    patternClassPrefix: "js-pattern-",
                    activeClass: "am-active",
                    inValidClass: "am-field-error",
                    validClass: "am-field-valid",
                    validateOnSubmit: !0,
                    allFields: ":input:visible:not(:submit, :button, :disabled, .am-novalidate)",
                    customEvents: "validate",
                    keyboardFields: ":input:not(:submit, :button, :disabled, .am-novalidate)",
                    keyboardEvents: "focusout, change",
                    activeKeyup: !1,
                    textareaMaxlenthKeyup: !0,
                    pointerFields: 'input[type="range"]:not(:disabled, .am-novalidate), input[type="radio"]:not(:disabled, .am-novalidate), input[type="checkbox"]:not(:disabled, .am-novalidate), select:not(:disabled, .am-novalidate), option:not(:disabled, .am-novalidate)',
                    pointerEvents: "click",
                    onValid: function() {},
                    onInValid: function() {},
                    markValid: function(t) {
                        var e = this.options,
                        i = o(t.field),
                        n = i.closest(".am-form-group");
                        i.addClass(e.validClass).removeClass(e.inValidClass),
                        n.addClass("am-form-success").removeClass("am-form-error"),
                        e.onValid.call(this, t)
                    },
                    markInValid: function(t) {
                        var e = this.options,
                        i = o(t.field),
                        n = i.closest(".am-form-group");
                        i.addClass(e.inValidClass + " " + e.activeClass).removeClass(e.validClass),
                        n.addClass("am-form-error").removeClass("am-form-success"),
                        e.onInValid.call(this, t)
                    },
                    validate: function() {},
                    submit: null
                },
                a.VERSION = "2.0.0",
                a.patterns = {
                    email: /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/,
                    url: /^(https?|ftp):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
                    number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
                    dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
                    integer: /^-?\d+$/
                },
                a.validationMessages = {
                    zh_CN: {
                        valueMissing: "请填写（选择）此字段",
                        customError: {
                            tooShort: "至少填写 %s 个字符",
                            checkedOverflow: "至多选择 %s 项",
                            checkedUnderflow: "至少选择 %s 项"
                        },
                        patternMismatch: "请按照要求的格式填写",
                        rangeOverflow: "请填写小于等于 %s 的值",
                        rangeUnderflow: "请填写大于等于 %s 的值",
                        stepMismatch: "",
                        tooLong: "至多填写 %s 个字符",
                        typeMismatch: "请按照要求的类型填写"
                    }
                },
                a.ERROR_MAP = {
                    tooShort: "minlength",
                    checkedOverflow: "maxchecked",
                    checkedUnderflow: "minchecked",
                    rangeOverflow: "max",
                    rangeUnderflow: "min",
                    tooLong: "maxlength"
                },
                a.prototype.init = function() {
                    function t(t) {
                        var e = t.toString();
                        return e.substring(1, e.length - 1)
                    }
                    function e(t, e, a) {
                        var r = e.split(","),
                        l = function() {
                            i.validate(this)
                        };
                        a && (l = s.utils.debounce(l, a)),
                        o.each(r,
                        function(e, i) {
                            n.on(i + ".validator.amui", t, l)
                        })
                    }
                    var i = this,
                    n = this.$element,
                    a = this.options;
                    return a.H5validation && s.support.formValidation ? !1 : (n.attr("novalidate", "novalidate"), o.each(a.H5inputType,
                    function(e, i) {
                        var o = n.find("input[type=" + i + "]");
                        o.attr("pattern") || o.is("[class*=" + a.patternClassPrefix + "]") || o.attr("pattern", t(a.patterns[i]))
                    }), o.each(a.patterns,
                    function(e, i) {
                        var o = n.find("." + a.patternClassPrefix + e); ! o.attr("pattern") && o.attr("pattern", t(i))
                    }), n.submit(function(t) {
                        if ("function" == typeof a.submit) return a.submit.call(i, t);
                        if (a.validateOnSubmit) {
                            var e = i.isFormValid();
                            return "boolean" === o.type(e) ? e: n.data("amui.checked") ? !0 : (o.when(e).then(function() {
                                n.data("amui.checked", !0).submit()
                            },
                            function() {
                                n.data("amui.checked", !1).find("." + a.inValidClass).eq(0).focus()
                            }), !1)
                        }
                    }), e(":input", a.customEvents), e(a.keyboardFields, a.keyboardEvents), e(a.pointerFields, a.pointerEvents), a.textareaMaxlenthKeyup && e("textarea[maxlength]", "keyup", 50), void(a.activeKeyup && e(".am-active", "keyup", 50)))
                },
                a.prototype.isValid = function(t) {
                    var e = o(t);
                    return void 0 === e.data("validity") && this.validate(t),
                    e.data("validity") && e.data("validity").valid
                },
                a.prototype.validate = function(t) {
                    var e = this,
                    i = this.$element,
                    n = this.options,
                    s = o(t),
                    a = s.data("equalTo");
                    a && s.attr("pattern", "^" + i.find(a).val() + "$");
                    var r = s.attr("pattern") || !1,
                    l = new RegExp(r),
                    d = null,
                    u = null,
                    c = s.is("[type=checkbox]") ? (u = i.find('input[name="' + t.name + '"]')).filter(":checked").length: s.is("[type=radio]") ? (d = this.$element.find('input[name="' + t.name + '"]')).filter(":checked").length > 0 : s.val();
                    s = u && u.length ? u.first() : s;
                    var h = void 0 !== s.attr("required") && "false" !== s.attr("required"),
                    p = parseInt(s.attr("maxlength"), 10),
                    f = parseInt(s.attr("minlength"), 10),
                    m = Number(s.attr("min")),
                    v = Number(s.attr("max")),
                    g = this.createValidity({
                        field: s[0],
                        valid: !0
                    });
                    if (n.debug && window.console && (console.log("Validate: value -> [" + c + ", regex -> [" + l + "], required -> " + h), console.log("Regex test: " + l.test(c) + ", Pattern: " + r)), !isNaN(p) && c.length > p && (g.valid = !1, g.tooLong = !0), !isNaN(f) && c.length < f && (g.valid = !1, g.customError = "tooShort"), !isNaN(m) && Number(c) < m && (g.valid = !1, g.rangeUnderflow = !0), !isNaN(v) && Number(c) > v && (g.valid = !1, g.rangeOverflow = !0), h && !c) g.valid = !1,
                    g.valueMissing = !0;
                    else if ((u || s.is('select[multiple="multiple"]')) && c) {
                        c = u ? c: c.length;
                        var w = parseInt(s.attr("minchecked"), 10),
                        y = parseInt(s.attr("maxchecked"), 10); ! isNaN(w) && w > c && (g.valid = !1, g.customError = "checkedUnderflow"),
                        !isNaN(y) && c > y && (g.valid = !1, g.customError = "checkedOverflow")
                    } else r && !l.test(c) && c && (g.valid = !1, g.patternMismatch = !0);
                    var b, T = function(t) {
                        this.markField(t),
                        s.trigger("validated.field.validator.amui", t).data("validity", t);
                        var i = d || u;
                        i && i.not(s).data("validity", t).each(function() {
                            t.field = this,
                            e.markField(t)
                        })
                    };
                    if ("function" == typeof n.validate && (b = n.validate.call(this, g)), b) {
                        var x = new o.Deferred;
                        return s.data("amui.dfdValidity", x.promise()),
                        o.when(b).always(function(t) {
                            x[t.valid ? "resolve": "reject"](t),
                            T.call(e, t)
                        })
                    }
                    T.call(this, g)
                },
                a.prototype.markField = function(t) {
                    var e = this.options,
                    i = "mark" + (t.valid ? "": "In") + "Valid";
                    e[i] && e[i].call(this, t)
                },
                a.prototype.validateForm = function() {
                    var t = this,
                    e = this.$element,
                    i = this.options,
                    n = e.find(i.allFields),
                    s = [],
                    a = !0,
                    r = [],
                    l = o([]),
                    d = [],
                    u = !1;
                    e.trigger("validate.form.validator.amui");
                    var c = n.filter(function() {
                        var t;
                        if ("INPUT" === this.tagName && "radio" === this.type) {
                            if (t = this.name, s[t] === !0) return ! 1;
                            s[t] = !0
                        }
                        return ! 0
                    });
                    c.each(function() {
                        var i = o(this),
                        n = t.isValid(this),
                        s = i.data("validity");
                        a = !!n && a,
                        r.push(s),
                        n || (l = l.add(o(this), e));
                        var c = i.data("amui.dfdValidity");
                        if (c) d.push(c),
                        u = !0;
                        else {
                            var h = new o.Deferred;
                            d.push(h.promise()),
                            h[n ? "resolve": "reject"](s)
                        }
                    });
                    var h = {
                        valid: a,
                        $invalidFields: l,
                        validity: r,
                        promises: d,
                        async: u
                    };
                    return e.trigger("validated.form.validator.amui", h),
                    h
                },
                a.prototype.isFormValid = function() {
                    var t = this,
                    e = this.validateForm(),
                    i = function(e) {
                        t.$element.trigger(e + ".validator.amui")
                    };
                    if (e.async) {
                        var n = new o.Deferred;
                        return o.when.apply(null, e.promises).then(function() {
                            n.resolve(),
                            i("valid")
                        },
                        function() {
                            n.reject(),
                            i("invalid")
                        }),
                        n.promise()
                    }
                    return e.valid ? (i("valid"), !0) : (e.$invalidFields.first().focus(), i("invalid"), !1)
                },
                a.prototype.createValidity = function(t) {
                    return o.extend({
                        customError: t.customError || !1,
                        patternMismatch: t.patternMismatch || !1,
                        rangeOverflow: t.rangeOverflow || !1,
                        rangeUnderflow: t.rangeUnderflow || !1,
                        stepMismatch: t.stepMismatch || !1,
                        tooLong: t.tooLong || !1,
                        typeMismatch: t.typeMismatch || !1,
                        valid: t.valid || !0,
                        valueMissing: t.valueMissing || !1
                    },
                    t)
                },
                a.prototype.getValidationMessage = function(t) {
                    var e, i, n = a.validationMessages[this.options.locales],
                    s = "%s",
                    r = o(t.field);
                    return (r.is('[type="checkbox"]') || r.is('[type="radio"]')) && (r = this.$element.find("[name=" + r.attr("name") + "]").first()),
                    o.each(t,
                    function(t, i) {
                        return "field" === t || "valid" === t ? t: "customError" === t && i ? (e = i, n = n.customError, !1) : i === !0 ? (e = t, !1) : void 0
                    }),
                    i = n[e] || void 0,
                    i && a.ERROR_MAP[e] && (i = i.replace(s, r.attr(a.ERROR_MAP[e]) || "规定的")),
                    i
                },
                o.fn.validator = n,
                s.ready(function(t) {
                    o("[data-am-validator]", t).validator()
                }),
                o.AMUI.validator = a,
                e.exports = a
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        27 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2);
                var o = {
                    get: function(t) {
                        var e, i = encodeURIComponent(t) + "=",
                        n = document.cookie.indexOf(i),
                        o = null;
                        return n > -1 && (e = document.cookie.indexOf(";", n), -1 == e && (e = document.cookie.length), o = decodeURIComponent(document.cookie.substring(n + i.length, e))),
                        o
                    },
                    set: function(t, e, i, n, o, s) {
                        var a = encodeURIComponent(t) + "=" + encodeURIComponent(e);
                        i instanceof Date && (a += "; expires=" + i.toUTCString()),
                        n && (a += "; path=" + n),
                        o && (a += "; domain=" + o),
                        s && (a += "; secure"),
                        document.cookie = a
                    },
                    unset: function(t, e, i, n) {
                        this.set(t, "", new Date(0), e, i, n)
                    }
                };
                n.AMUI.utils.cookie = o,
                e.exports = o
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        28 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                o = (t(2), "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element),
                s = function() {
                    for (var t, e, i = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], n = 0, o = i.length, s = {}; o > n; n++) if (t = i[n], t && t[1] in document) {
                        for (n = 0, e = t.length; e > n; n++) s[i[0][n]] = t[n];
                        return s
                    }
                    return ! 1
                } (),
                a = {
                    request: function(t) {
                        var e = s.requestFullscreen;
                        t = t || document.documentElement,
                        /5\.1[\.\d]* Safari/.test(navigator.userAgent) ? t[e]() : t[e](o && Element.ALLOW_KEYBOARD_INPUT)
                    },
                    exit: function() {
                        document[s.exitFullscreen]()
                    },
                    toggle: function(t) {
                        this.isFullscreen ? this.exit() : this.request(t)
                    },
                    raw: s
                };
                return s ? (Object.defineProperties(a, {
                    isFullscreen: {
                        get: function() {
                            return !! document[s.fullscreenElement]
                        }
                    },
                    element: {
                        enumerable: !0,
                        get: function() {
                            return document[s.fullscreenElement]
                        }
                    },
                    enabled: {
                        enumerable: !0,
                        get: function() {
                            return !! document[s.fullscreenEnabled]
                        }
                    }
                }), a.VERSION = "2.0.0", n.AMUI.fullscreen = a, void(e.exports = a)) : void(e.exports = !1)
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        29 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                o = t(2);
                o.support.geolocation = window.navigator && window.navigator.geolocation;
                var s = o.support.geolocation,
                a = function(t) {
                    this.options = t || {}
                };
                a.MESSAGES = {
                    unsupportedBrowser: "Browser does not support location services",
                    permissionDenied: "You have rejected access to your location",
                    positionUnavailable: "Unable to determine your location",
                    timeout: "Service timeout has been reached"
                },
                a.ERROR_CODE = {
                    0 : "unsupportedBrowser",
                    1 : "permissionDenied",
                    2 : "positionUnavailable",
                    3 : "timeout"
                },
                a.prototype.get = function(t) {
                    var e = this;
                    t = n.extend({},
                    this.options, t);
                    var i = new n.Deferred;
                    return s ? this.watchID = s.getCurrentPosition(function(t) {
                        i.resolve.call(e, t)
                    },
                    function(t) {
                        i.reject(a.MESSAGES[a.ERROR_CODE[t.code]])
                    },
                    t) : i.reject(a.MESSAGES.unsupportedBrowser),
                    i.promise()
                },
                a.prototype.watch = function(t) {
                    if (s && (t = n.extend({},
                    this.options, t), n.isFunction(t.done))) {
                        this.clearWatch();
                        var e = n.isFunction(t.fail) ? t.fail: null;
                        return this.watchID = s.watchPosition(t.done, e, t),
                        this.watchID
                    }
                },
                a.prototype.clearWatch = function() {
                    s && this.watchID && (s.clearWatch(this.watchID), this.watchID = null)
                },
                n.AMUI.Geolocation = a,
                e.exports = a
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        30 : [function(t, e) { (function(i) {
                "use strict";
                function n(t, e, i) {
                    return setTimeout(d(t, i), e)
                }
                function o(t, e, i) {
                    return Array.isArray(t) ? (s(t, i[e], i), !0) : !1
                }
                function s(t, e, i) {
                    var n;
                    if (t) if (t.forEach) t.forEach(e, i);
                    else if (void 0 !== t.length) for (n = 0; n < t.length;) e.call(i, t[n], n, t),
                    n++;
                    else for (n in t) t.hasOwnProperty(n) && e.call(i, t[n], n, t)
                }
                function a(t, e, i) {
                    for (var n = Object.keys(e), o = 0; o < n.length;)(!i || i && void 0 === t[n[o]]) && (t[n[o]] = e[n[o]]),
                    o++;
                    return t
                }
                function r(t, e) {
                    return a(t, e, !0)
                }
                function l(t, e, i) {
                    var n, o = e.prototype;
                    n = t.prototype = Object.create(o),
                    n.constructor = t,
                    n._super = o,
                    i && a(n, i)
                }
                function d(t, e) {
                    return function() {
                        return t.apply(e, arguments)
                    }
                }
                function u(t, e) {
                    return typeof t == ue ? t.apply(e ? e[0] || void 0 : void 0, e) : t
                }
                function c(t, e) {
                    return void 0 === t ? e: t
                }
                function h(t, e, i) {
                    s(v(e),
                    function(e) {
                        t.addEventListener(e, i, !1)
                    })
                }
                function p(t, e, i) {
                    s(v(e),
                    function(e) {
                        t.removeEventListener(e, i, !1)
                    })
                }
                function f(t, e) {
                    for (; t;) {
                        if (t == e) return ! 0;
                        t = t.parentNode
                    }
                    return ! 1
                }
                function m(t, e) {
                    return t.indexOf(e) > -1
                }
                function v(t) {
                    return t.trim().split(/\s+/g)
                }
                function g(t, e, i) {
                    if (t.indexOf && !i) return t.indexOf(e);
                    for (var n = 0; n < t.length;) {
                        if (i && t[n][i] == e || !i && t[n] === e) return n;
                        n++
                    }
                    return - 1
                }
                function w(t) {
                    return Array.prototype.slice.call(t, 0)
                }
                function y(t, e, i) {
                    for (var n = [], o = [], s = 0; s < t.length;) {
                        var a = e ? t[s][e] : t[s];
                        g(o, a) < 0 && n.push(t[s]),
                        o[s] = a,
                        s++
                    }
                    return i && (n = e ? n.sort(function(t, i) {
                        return t[e] > i[e]
                    }) : n.sort()),
                    n
                }
                function b(t, e) {
                    for (var i, n, o = e[0].toUpperCase() + e.slice(1), s = 0; s < le.length;) {
                        if (i = le[s], n = i ? i + o: e, n in t) return n;
                        s++
                    }
                    return void 0
                }
                function T() {
                    return fe++
                }
                function x(t) {
                    var e = t.ownerDocument;
                    return e.defaultView || e.parentWindow
                }
                function C(t, e) {
                    var i = this;
                    this.manager = t,
                    this.callback = e,
                    this.element = t.element,
                    this.target = t.options.inputTarget,
                    this.domHandler = function(e) {
                        u(t.options.enable, [t]) && i.handler(e)
                    },
                    this.init()
                }
                function E(t) {
                    var e, i = t.options.inputClass;
                    return new(e = i ? i: ge ? _: we ? U: ve ? W: z)(t, S)
                }
                function S(t, e, i) {
                    var n = i.pointers.length,
                    o = i.changedPointers.length,
                    s = e & Ee && n - o === 0,
                    a = e & (ke | Ae) && n - o === 0;
                    i.isFirst = !!s,
                    i.isFinal = !!a,
                    s && (t.session = {}),
                    i.eventType = e,
                    k(t, i),
                    t.emit("hammer.input", i),
                    t.recognize(i),
                    t.session.prevInput = i
                }
                function k(t, e) {
                    var i = t.session,
                    n = e.pointers,
                    o = n.length;
                    i.firstInput || (i.firstInput = F(e)),
                    o > 1 && !i.firstMultiple ? i.firstMultiple = F(e) : 1 === o && (i.firstMultiple = !1);
                    var s = i.firstInput,
                    a = i.firstMultiple,
                    r = a ? a.center: s.center,
                    l = e.center = M(n);
                    e.timeStamp = pe(),
                    e.deltaTime = e.timeStamp - s.timeStamp,
                    e.angle = N(r, l),
                    e.distance = I(r, l),
                    A(i, e),
                    e.offsetDirection = P(e.deltaX, e.deltaY),
                    e.scale = a ? L(a.pointers, n) : 1,
                    e.rotation = a ? O(a.pointers, n) : 0,
                    D(i, e);
                    var d = t.element;
                    f(e.srcEvent.target, d) && (d = e.srcEvent.target),
                    e.target = d
                }
                function A(t, e) {
                    var i = e.center,
                    n = t.offsetDelta || {},
                    o = t.prevDelta || {},
                    s = t.prevInput || {}; (e.eventType === Ee || s.eventType === ke) && (o = t.prevDelta = {
                        x: s.deltaX || 0,
                        y: s.deltaY || 0
                    },
                    n = t.offsetDelta = {
                        x: i.x,
                        y: i.y
                    }),
                    e.deltaX = o.x + (i.x - n.x),
                    e.deltaY = o.y + (i.y - n.y)
                }
                function D(t, e) {
                    var i, n, o, s, a = t.lastInterval || e,
                    r = e.timeStamp - a.timeStamp;
                    if (e.eventType != Ae && (r > Ce || void 0 === a.velocity)) {
                        var l = a.deltaX - e.deltaX,
                        d = a.deltaY - e.deltaY,
                        u = $(r, l, d);
                        n = u.x,
                        o = u.y,
                        i = he(u.x) > he(u.y) ? u.x: u.y,
                        s = P(l, d),
                        t.lastInterval = e
                    } else i = a.velocity,
                    n = a.velocityX,
                    o = a.velocityY,
                    s = a.direction;
                    e.velocity = i,
                    e.velocityX = n,
                    e.velocityY = o,
                    e.direction = s
                }
                function F(t) {
                    for (var e = [], i = 0; i < t.pointers.length;) e[i] = {
                        clientX: ce(t.pointers[i].clientX),
                        clientY: ce(t.pointers[i].clientY)
                    },
                    i++;
                    return {
                        timeStamp: pe(),
                        pointers: e,
                        center: M(e),
                        deltaX: t.deltaX,
                        deltaY: t.deltaY
                    }
                }
                function M(t) {
                    var e = t.length;
                    if (1 === e) return {
                        x: ce(t[0].clientX),
                        y: ce(t[0].clientY)
                    };
                    for (var i = 0,
                    n = 0,
                    o = 0; e > o;) i += t[o].clientX,
                    n += t[o].clientY,
                    o++;
                    return {
                        x: ce(i / e),
                        y: ce(n / e)
                    }
                }
                function $(t, e, i) {
                    return {
                        x: e / t || 0,
                        y: i / t || 0
                    }
                }
                function P(t, e) {
                    return t === e ? De: he(t) >= he(e) ? t > 0 ? Fe: Me: e > 0 ? $e: Pe
                }
                function I(t, e, i) {
                    i || (i = Le);
                    var n = e[i[0]] - t[i[0]],
                    o = e[i[1]] - t[i[1]];
                    return Math.sqrt(n * n + o * o)
                }
                function N(t, e, i) {
                    i || (i = Le);
                    var n = e[i[0]] - t[i[0]],
                    o = e[i[1]] - t[i[1]];
                    return 180 * Math.atan2(o, n) / Math.PI
                }
                function O(t, e) {
                    return N(e[1], e[0], ze) - N(t[1], t[0], ze)
                }
                function L(t, e) {
                    return I(e[0], e[1], ze) / I(t[0], t[1], ze)
                }
                function z() {
                    this.evEl = je,
                    this.evWin = Re,
                    this.allow = !0,
                    this.pressed = !1,
                    C.apply(this, arguments)
                }
                function _() {
                    this.evEl = We,
                    this.evWin = He,
                    C.apply(this, arguments),
                    this.store = this.manager.session.pointerEvents = []
                }
                function j() {
                    this.evTarget = Qe,
                    this.evWin = Ve,
                    this.started = !1,
                    C.apply(this, arguments)
                }
                function R(t, e) {
                    var i = w(t.touches),
                    n = w(t.changedTouches);
                    return e & (ke | Ae) && (i = y(i.concat(n), "identifier", !0)),
                    [i, n]
                }
                function U() {
                    this.evTarget = Ye,
                    this.targetIds = {},
                    C.apply(this, arguments)
                }
                function q(t, e) {
                    var i = w(t.touches),
                    n = this.targetIds;
                    if (e & (Ee | Se) && 1 === i.length) return n[i[0].identifier] = !0,
                    [i, i];
                    var o, s, a = w(t.changedTouches),
                    r = [],
                    l = this.target;
                    if (s = i.filter(function(t) {
                        return f(t.target, l)
                    }), e === Ee) for (o = 0; o < s.length;) n[s[o].identifier] = !0,
                    o++;
                    for (o = 0; o < a.length;) n[a[o].identifier] && r.push(a[o]),
                    e & (ke | Ae) && delete n[a[o].identifier],
                    o++;
                    return r.length ? [y(s.concat(r), "identifier", !0), r] : void 0
                }
                function W() {
                    C.apply(this, arguments);
                    var t = d(this.handler, this);
                    this.touch = new U(this.manager, t),
                    this.mouse = new z(this.manager, t)
                }
                function H(t, e) {
                    this.manager = t,
                    this.set(e)
                }
                function B(t) {
                    if (m(t, ei)) return ei;
                    var e = m(t, ii),
                    i = m(t, ni);
                    return e && i ? ii + " " + ni: e || i ? e ? ii: ni: m(t, ti) ? ti: Ke
                }
                function Q(t) {
                    this.id = T(),
                    this.manager = null,
                    this.options = r(t || {},
                    this.defaults),
                    this.options.enable = c(this.options.enable, !0),
                    this.state = oi,
                    this.simultaneous = {},
                    this.requireFail = []
                }
                function V(t) {
                    return t & di ? "cancel": t & ri ? "end": t & ai ? "move": t & si ? "start": ""
                }
                function X(t) {
                    return t == Pe ? "down": t == $e ? "up": t == Fe ? "left": t == Me ? "right": ""
                }
                function Y(t, e) {
                    var i = e.manager;
                    return i ? i.get(t) : t
                }
                function Z() {
                    Q.apply(this, arguments)
                }
                function G() {
                    Z.apply(this, arguments),
                    this.pX = null,
                    this.pY = null
                }
                function J() {
                    Z.apply(this, arguments)
                }
                function K() {
                    Q.apply(this, arguments),
                    this._timer = null,
                    this._input = null
                }
                function te() {
                    Z.apply(this, arguments)
                }
                function ee() {
                    Z.apply(this, arguments)
                }
                function ie() {
                    Q.apply(this, arguments),
                    this.pTime = !1,
                    this.pCenter = !1,
                    this._timer = null,
                    this._input = null,
                    this.count = 0
                }
                function ne(t, e) {
                    return e = e || {},
                    e.recognizers = c(e.recognizers, ne.defaults.preset),
                    new oe(t, e)
                }
                function oe(t, e) {
                    e = e || {},
                    this.options = r(e, ne.defaults),
                    this.options.inputTarget = this.options.inputTarget || t,
                    this.handlers = {},
                    this.session = {},
                    this.recognizers = [],
                    this.element = t,
                    this.input = E(this),
                    this.touchAction = new H(this, this.options.touchAction),
                    se(this, !0),
                    s(e.recognizers,
                    function(t) {
                        var e = this.add(new t[0](t[1]));
                        t[2] && e.recognizeWith(t[2]),
                        t[3] && e.requireFailure(t[3])
                    },
                    this)
                }
                function se(t, e) {
                    var i = t.element;
                    s(t.options.cssProps,
                    function(t, n) {
                        i.style[b(i.style, n)] = e ? t: ""
                    })
                }
                function ae(t, e) {
                    var i = document.createEvent("Event");
                    i.initEvent(t, !0, !0),
                    i.gesture = e,
                    e.target.dispatchEvent(i)
                }
                var re = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                le = (t(2), ["", "webkit", "moz", "MS", "ms", "o"]),
                de = document.createElement("div"),
                ue = "function",
                ce = Math.round,
                he = Math.abs,
                pe = Date.now,
                fe = 1,
                me = /mobile|tablet|ip(ad|hone|od)|android/i,
                ve = "ontouchstart" in window,
                ge = void 0 !== b(window, "PointerEvent"),
                we = ve && me.test(navigator.userAgent),
                ye = "touch",
                be = "pen",
                Te = "mouse",
                xe = "kinect",
                Ce = 25,
                Ee = 1,
                Se = 2,
                ke = 4,
                Ae = 8,
                De = 1,
                Fe = 2,
                Me = 4,
                $e = 8,
                Pe = 16,
                Ie = Fe | Me,
                Ne = $e | Pe,
                Oe = Ie | Ne,
                Le = ["x", "y"],
                ze = ["clientX", "clientY"];
                C.prototype = {
                    handler: function() {},
                    init: function() {
                        this.evEl && h(this.element, this.evEl, this.domHandler),
                        this.evTarget && h(this.target, this.evTarget, this.domHandler),
                        this.evWin && h(x(this.element), this.evWin, this.domHandler)
                    },
                    destroy: function() {
                        this.evEl && p(this.element, this.evEl, this.domHandler),
                        this.evTarget && p(this.target, this.evTarget, this.domHandler),
                        this.evWin && p(x(this.element), this.evWin, this.domHandler)
                    }
                };
                var _e = {
                    mousedown: Ee,
                    mousemove: Se,
                    mouseup: ke
                },
                je = "mousedown",
                Re = "mousemove mouseup";
                l(z, C, {
                    handler: function(t) {
                        var e = _e[t.type];
                        e & Ee && 0 === t.button && (this.pressed = !0),
                        e & Se && 1 !== t.which && (e = ke),
                        this.pressed && this.allow && (e & ke && (this.pressed = !1), this.callback(this.manager, e, {
                            pointers: [t],
                            changedPointers: [t],
                            pointerType: Te,
                            srcEvent: t
                        }))
                    }
                });
                var Ue = {
                    pointerdown: Ee,
                    pointermove: Se,
                    pointerup: ke,
                    pointercancel: Ae,
                    pointerout: Ae
                },
                qe = {
                    2 : ye,
                    3 : be,
                    4 : Te,
                    5 : xe
                },
                We = "pointerdown",
                He = "pointermove pointerup pointercancel";
                window.MSPointerEvent && (We = "MSPointerDown", He = "MSPointerMove MSPointerUp MSPointerCancel"),
                l(_, C, {
                    handler: function(t) {
                        var e = this.store,
                        i = !1,
                        n = t.type.toLowerCase().replace("ms", ""),
                        o = Ue[n],
                        s = qe[t.pointerType] || t.pointerType,
                        a = s == ye,
                        r = g(e, t.pointerId, "pointerId");
                        o & Ee && (0 === t.button || a) ? 0 > r && (e.push(t), r = e.length - 1) : o & (ke | Ae) && (i = !0),
                        0 > r || (e[r] = t, this.callback(this.manager, o, {
                            pointers: e,
                            changedPointers: [t],
                            pointerType: s,
                            srcEvent: t
                        }), i && e.splice(r, 1))
                    }
                });
                var Be = {
                    touchstart: Ee,
                    touchmove: Se,
                    touchend: ke,
                    touchcancel: Ae
                },
                Qe = "touchstart",
                Ve = "touchstart touchmove touchend touchcancel";
                l(j, C, {
                    handler: function(t) {
                        var e = Be[t.type];
                        if (e === Ee && (this.started = !0), this.started) {
                            var i = R.call(this, t, e);
                            e & (ke | Ae) && i[0].length - i[1].length === 0 && (this.started = !1),
                            this.callback(this.manager, e, {
                                pointers: i[0],
                                changedPointers: i[1],
                                pointerType: ye,
                                srcEvent: t
                            })
                        }
                    }
                });
                var Xe = {
                    touchstart: Ee,
                    touchmove: Se,
                    touchend: ke,
                    touchcancel: Ae
                },
                Ye = "touchstart touchmove touchend touchcancel";
                l(U, C, {
                    handler: function(t) {
                        var e = Xe[t.type],
                        i = q.call(this, t, e);
                        i && this.callback(this.manager, e, {
                            pointers: i[0],
                            changedPointers: i[1],
                            pointerType: ye,
                            srcEvent: t
                        })
                    }
                }),
                l(W, C, {
                    handler: function(t, e, i) {
                        var n = i.pointerType == ye,
                        o = i.pointerType == Te;
                        if (n) this.mouse.allow = !1;
                        else if (o && !this.mouse.allow) return;
                        e & (ke | Ae) && (this.mouse.allow = !0),
                        this.callback(t, e, i)
                    },
                    destroy: function() {
                        this.touch.destroy(),
                        this.mouse.destroy()
                    }
                });
                var Ze = b(de.style, "touchAction"),
                Ge = void 0 !== Ze,
                Je = "compute",
                Ke = "auto",
                ti = "manipulation",
                ei = "none",
                ii = "pan-x",
                ni = "pan-y";
                H.prototype = {
                    set: function(t) {
                        t == Je && (t = this.compute()),
                        Ge && (this.manager.element.style[Ze] = t),
                        this.actions = t.toLowerCase().trim()
                    },
                    update: function() {
                        this.set(this.manager.options.touchAction)
                    },
                    compute: function() {
                        var t = [];
                        return s(this.manager.recognizers,
                        function(e) {
                            u(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
                        }),
                        B(t.join(" "))
                    },
                    preventDefaults: function(t) {
                        if (!Ge) {
                            var e = t.srcEvent,
                            i = t.offsetDirection;
                            if (this.manager.session.prevented) return void e.preventDefault();
                            var n = this.actions,
                            o = m(n, ei),
                            s = m(n, ni),
                            a = m(n, ii);
                            return o || s && i & Ie || a && i & Ne ? this.preventSrc(e) : void 0
                        }
                    },
                    preventSrc: function(t) {
                        this.manager.session.prevented = !0,
                        t.preventDefault()
                    }
                };
                var oi = 1,
                si = 2,
                ai = 4,
                ri = 8,
                li = ri,
                di = 16,
                ui = 32;
                Q.prototype = {
                    defaults: {},
                    set: function(t) {
                        return a(this.options, t),
                        this.manager && this.manager.touchAction.update(),
                        this
                    },
                    recognizeWith: function(t) {
                        if (o(t, "recognizeWith", this)) return this;
                        var e = this.simultaneous;
                        return t = Y(t, this),
                        e[t.id] || (e[t.id] = t, t.recognizeWith(this)),
                        this
                    },
                    dropRecognizeWith: function(t) {
                        return o(t, "dropRecognizeWith", this) ? this: (t = Y(t, this), delete this.simultaneous[t.id], this)
                    },
                    requireFailure: function(t) {
                        if (o(t, "requireFailure", this)) return this;
                        var e = this.requireFail;
                        return t = Y(t, this),
                        -1 === g(e, t) && (e.push(t), t.requireFailure(this)),
                        this
                    },
                    dropRequireFailure: function(t) {
                        if (o(t, "dropRequireFailure", this)) return this;
                        t = Y(t, this);
                        var e = g(this.requireFail, t);
                        return e > -1 && this.requireFail.splice(e, 1),
                        this
                    },
                    hasRequireFailures: function() {
                        return this.requireFail.length > 0
                    },
                    canRecognizeWith: function(t) {
                        return !! this.simultaneous[t.id]
                    },
                    emit: function(t) {
                        function e(e) {
                            i.manager.emit(i.options.event + (e ? V(n) : ""), t)
                        }
                        var i = this,
                        n = this.state;
                        ri > n && e(!0),
                        e(),
                        n >= ri && e(!0)
                    },
                    tryEmit: function(t) {
                        return this.canEmit() ? this.emit(t) : void(this.state = ui)
                    },
                    canEmit: function() {
                        for (var t = 0; t < this.requireFail.length;) {
                            if (! (this.requireFail[t].state & (ui | oi))) return ! 1;
                            t++
                        }
                        return ! 0
                    },
                    recognize: function(t) {
                        var e = a({},
                        t);
                        return u(this.options.enable, [this, e]) ? (this.state & (li | di | ui) && (this.state = oi), this.state = this.process(e), void(this.state & (si | ai | ri | di) && this.tryEmit(e))) : (this.reset(), void(this.state = ui))
                    },
                    process: function() {},
                    getTouchAction: function() {},
                    reset: function() {}
                },
                l(Z, Q, {
                    defaults: {
                        pointers: 1
                    },
                    attrTest: function(t) {
                        var e = this.options.pointers;
                        return 0 === e || t.pointers.length === e
                    },
                    process: function(t) {
                        var e = this.state,
                        i = t.eventType,
                        n = e & (si | ai),
                        o = this.attrTest(t);
                        return n && (i & Ae || !o) ? e | di: n || o ? i & ke ? e | ri: e & si ? e | ai: si: ui
                    }
                }),
                l(G, Z, {
                    defaults: {
                        event: "pan",
                        threshold: 10,
                        pointers: 1,
                        direction: Oe
                    },
                    getTouchAction: function() {
                        var t = this.options.direction,
                        e = [];
                        return t & Ie && e.push(ni),
                        t & Ne && e.push(ii),
                        e
                    },
                    directionTest: function(t) {
                        var e = this.options,
                        i = !0,
                        n = t.distance,
                        o = t.direction,
                        s = t.deltaX,
                        a = t.deltaY;
                        return o & e.direction || (e.direction & Ie ? (o = 0 === s ? De: 0 > s ? Fe: Me, i = s != this.pX, n = Math.abs(t.deltaX)) : (o = 0 === a ? De: 0 > a ? $e: Pe, i = a != this.pY, n = Math.abs(t.deltaY))),
                        t.direction = o,
                        i && n > e.threshold && o & e.direction
                    },
                    attrTest: function(t) {
                        return Z.prototype.attrTest.call(this, t) && (this.state & si || !(this.state & si) && this.directionTest(t))
                    },
                    emit: function(t) {
                        this.pX = t.deltaX,
                        this.pY = t.deltaY;
                        var e = X(t.direction);
                        e && this.manager.emit(this.options.event + e, t),
                        this._super.emit.call(this, t)
                    }
                }),
                l(J, Z, {
                    defaults: {
                        event: "pinch",
                        threshold: 0,
                        pointers: 2
                    },
                    getTouchAction: function() {
                        return [ei]
                    },
                    attrTest: function(t) {
                        return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & si)
                    },
                    emit: function(t) {
                        if (this._super.emit.call(this, t), 1 !== t.scale) {
                            var e = t.scale < 1 ? "in": "out";
                            this.manager.emit(this.options.event + e, t)
                        }
                    }
                }),
                l(K, Q, {
                    defaults: {
                        event: "press",
                        pointers: 1,
                        time: 500,
                        threshold: 5
                    },
                    getTouchAction: function() {
                        return [Ke]
                    },
                    process: function(t) {
                        var e = this.options,
                        i = t.pointers.length === e.pointers,
                        o = t.distance < e.threshold,
                        s = t.deltaTime > e.time;
                        if (this._input = t, !o || !i || t.eventType & (ke | Ae) && !s) this.reset();
                        else if (t.eventType & Ee) this.reset(),
                        this._timer = n(function() {
                            this.state = li,
                            this.tryEmit()
                        },
                        e.time, this);
                        else if (t.eventType & ke) return li;
                        return ui
                    },
                    reset: function() {
                        clearTimeout(this._timer)
                    },
                    emit: function(t) {
                        this.state === li && (t && t.eventType & ke ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = pe(), this.manager.emit(this.options.event, this._input)))
                    }
                }),
                l(te, Z, {
                    defaults: {
                        event: "rotate",
                        threshold: 0,
                        pointers: 2
                    },
                    getTouchAction: function() {
                        return [ei]
                    },
                    attrTest: function(t) {
                        return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & si)
                    }
                }),
                l(ee, Z, {
                    defaults: {
                        event: "swipe",
                        threshold: 10,
                        velocity: .65,
                        direction: Ie | Ne,
                        pointers: 1
                    },
                    getTouchAction: function() {
                        return G.prototype.getTouchAction.call(this)
                    },
                    attrTest: function(t) {
                        var e, i = this.options.direction;
                        return i & (Ie | Ne) ? e = t.velocity: i & Ie ? e = t.velocityX: i & Ne && (e = t.velocityY),
                        this._super.attrTest.call(this, t) && i & t.direction && t.distance > this.options.threshold && he(e) > this.options.velocity && t.eventType & ke
                    },
                    emit: function(t) {
                        var e = X(t.direction);
                        e && this.manager.emit(this.options.event + e, t),
                        this.manager.emit(this.options.event, t)
                    }
                }),
                l(ie, Q, {
                    defaults: {
                        event: "tap",
                        pointers: 1,
                        taps: 1,
                        interval: 300,
                        time: 250,
                        threshold: 2,
                        posThreshold: 10
                    },
                    getTouchAction: function() {
                        return [ti]
                    },
                    process: function(t) {
                        var e = this.options,
                        i = t.pointers.length === e.pointers,
                        o = t.distance < e.threshold,
                        s = t.deltaTime < e.time;
                        if (this.reset(), t.eventType & Ee && 0 === this.count) return this.failTimeout();
                        if (o && s && i) {
                            if (t.eventType != ke) return this.failTimeout();
                            var a = this.pTime ? t.timeStamp - this.pTime < e.interval: !0,
                            r = !this.pCenter || I(this.pCenter, t.center) < e.posThreshold;
                            this.pTime = t.timeStamp,
                            this.pCenter = t.center,
                            r && a ? this.count += 1 : this.count = 1,
                            this._input = t;
                            var l = this.count % e.taps;
                            if (0 === l) return this.hasRequireFailures() ? (this._timer = n(function() {
                                this.state = li,
                                this.tryEmit()
                            },
                            e.interval, this), si) : li
                        }
                        return ui
                    },
                    failTimeout: function() {
                        return this._timer = n(function() {
                            this.state = ui
                        },
                        this.options.interval, this),
                        ui
                    },
                    reset: function() {
                        clearTimeout(this._timer)
                    },
                    emit: function() {
                        this.state == li && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
                    }
                }),
                ne.VERSION = "2.0.4",
                ne.defaults = {
                    domEvents: !1,
                    touchAction: Je,
                    enable: !0,
                    inputTarget: null,
                    inputClass: null,
                    preset: [[te, {
                        enable: !1
                    }], [J, {
                        enable: !1
                    },
                    ["rotate"]], [ee, {
                        direction: Ie
                    }], [G, {
                        direction: Ie
                    },
                    ["swipe"]], [ie], [ie, {
                        event: "doubletap",
                        taps: 2
                    },
                    ["tap"]], [K]],
                    cssProps: {
                        userSelect: "none",
                        touchSelect: "none",
                        touchCallout: "none",
                        contentZooming: "none",
                        userDrag: "none",
                        tapHighlightColor: "rgba(0,0,0,0)"
                    }
                };
                var ci = 1,
                hi = 2;
                oe.prototype = {
                    set: function(t) {
                        return a(this.options, t),
                        t.touchAction && this.touchAction.update(),
                        t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()),
                        this
                    },
                    stop: function(t) {
                        this.session.stopped = t ? hi: ci
                    },
                    recognize: function(t) {
                        var e = this.session;
                        if (!e.stopped) {
                            this.touchAction.preventDefaults(t);
                            var i, n = this.recognizers,
                            o = e.curRecognizer; (!o || o && o.state & li) && (o = e.curRecognizer = null);
                            for (var s = 0; s < n.length;) i = n[s],
                            e.stopped === hi || o && i != o && !i.canRecognizeWith(o) ? i.reset() : i.recognize(t),
                            !o && i.state & (si | ai | ri) && (o = e.curRecognizer = i),
                            s++
                        }
                    },
                    get: function(t) {
                        if (t instanceof Q) return t;
                        for (var e = this.recognizers,
                        i = 0; i < e.length; i++) if (e[i].options.event == t) return e[i];
                        return null
                    },
                    add: function(t) {
                        if (o(t, "add", this)) return this;
                        var e = this.get(t.options.event);
                        return e && this.remove(e),
                        this.recognizers.push(t),
                        t.manager = this,
                        this.touchAction.update(),
                        t
                    },
                    remove: function(t) {
                        if (o(t, "remove", this)) return this;
                        var e = this.recognizers;
                        return t = this.get(t),
                        e.splice(g(e, t), 1),
                        this.touchAction.update(),
                        this
                    },
                    on: function(t, e) {
                        var i = this.handlers;
                        return s(v(t),
                        function(t) {
                            i[t] = i[t] || [],
                            i[t].push(e)
                        }),
                        this
                    },
                    off: function(t, e) {
                        var i = this.handlers;
                        return s(v(t),
                        function(t) {
                            e ? i[t].splice(g(i[t], e), 1) : delete i[t]
                        }),
                        this
                    },
                    emit: function(t, e) {
                        this.options.domEvents && ae(t, e);
                        var i = this.handlers[t] && this.handlers[t].slice();
                        if (i && i.length) {
                            e.type = t,
                            e.preventDefault = function() {
                                e.srcEvent.preventDefault()
                            };
                            for (var n = 0; n < i.length;) i[n](e),
                            n++
                        }
                    },
                    destroy: function() {
                        this.element && se(this, !1),
                        this.handlers = {},
                        this.session = {},
                        this.input.destroy(),
                        this.element = null
                    }
                },
                a(ne, {
                    INPUT_START: Ee,
                    INPUT_MOVE: Se,
                    INPUT_END: ke,
                    INPUT_CANCEL: Ae,
                    STATE_POSSIBLE: oi,
                    STATE_BEGAN: si,
                    STATE_CHANGED: ai,
                    STATE_ENDED: ri,
                    STATE_RECOGNIZED: li,
                    STATE_CANCELLED: di,
                    STATE_FAILED: ui,
                    DIRECTION_NONE: De,
                    DIRECTION_LEFT: Fe,
                    DIRECTION_RIGHT: Me,
                    DIRECTION_UP: $e,
                    DIRECTION_DOWN: Pe,
                    DIRECTION_HORIZONTAL: Ie,
                    DIRECTION_VERTICAL: Ne,
                    DIRECTION_ALL: Oe,
                    Manager: oe,
                    Input: C,
                    TouchAction: H,
                    TouchInput: U,
                    MouseInput: z,
                    PointerEventInput: _,
                    TouchMouseInput: W,
                    SingleTouchInput: j,
                    Recognizer: Q,
                    AttrRecognizer: Z,
                    Tap: ie,
                    Pan: G,
                    Swipe: ee,
                    Pinch: J,
                    Rotate: te,
                    Press: K,
                    on: h,
                    off: p,
                    each: s,
                    merge: r,
                    extend: a,
                    inherit: l,
                    bindFn: d,
                    prefixed: b
                }),
                function(t, e) {
                    function i(i, n) {
                        var o = t(i);
                        o.data("hammer") || o.data("hammer", new e(o[0], n))
                    }
                    t.fn.hammer = function(t) {
                        return this.each(function() {
                            i(this, t)
                        })
                    },
                    e.Manager.prototype.emit = function(e) {
                        return function(i, n) {
                            e.call(this, i, n),
                            t(this.element).trigger({
                                type: i,
                                gesture: n
                            })
                        }
                    } (e.Manager.prototype.emit)
                } (re, ne),
                re.AMUI.Hammer = ne,
                e.exports = ne
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        31 : [function(t, e) { (function(i) {
                function n(t) {
                    return 128 > t ? [t] : 2048 > t ? (c0 = 192 + (t >> 6), c1 = 128 + (63 & t), [c0, c1]) : (c0 = 224 + (t >> 12), c1 = 128 + (t >> 6 & 63), c2 = 128 + (63 & t), [c0, c1, c2])
                }
                function o(t) {
                    for (var e = [], i = 0; i < t.length; i++) for (var o = t.charCodeAt(i), s = n(o), a = 0; a < s.length; a++) e.push(s[a]);
                    return e
                }
                function s(t, e) {
                    this.typeNumber = -1,
                    this.errorCorrectLevel = e,
                    this.modules = null,
                    this.moduleCount = 0,
                    this.dataCache = null,
                    this.rsBlocks = null,
                    this.totalDataCount = -1,
                    this.data = t,
                    this.utf8bytes = o(t),
                    this.make()
                }
                function a(t, e) {
                    if (void 0 == t.length) throw new Error(t.length + "/" + e);
                    for (var i = 0; i < t.length && 0 == t[i];) i++;
                    this.num = new Array(t.length - i + e);
                    for (var n = 0; n < t.length - i; n++) this.num[n] = t[n + i]
                }
                function r() {
                    this.buffer = new Array,
                    this.length = 0
                }
                function n(t) {
                    return 128 > t ? [t] : 2048 > t ? (c0 = 192 + (t >> 6), c1 = 128 + (63 & t), [c0, c1]) : (c0 = 224 + (t >> 12), c1 = 128 + (t >> 6 & 63), c2 = 128 + (63 & t), [c0, c1, c2])
                }
                function o(t) {
                    for (var e = [], i = 0; i < t.length; i++) for (var o = t.charCodeAt(i), s = n(o), a = 0; a < s.length; a++) e.push(s[a]);
                    return e
                }
                function s(t, e) {
                    this.typeNumber = -1,
                    this.errorCorrectLevel = e,
                    this.modules = null,
                    this.moduleCount = 0,
                    this.dataCache = null,
                    this.rsBlocks = null,
                    this.totalDataCount = -1,
                    this.data = t,
                    this.utf8bytes = o(t),
                    this.make()
                }
                function a(t, e) {
                    if (void 0 == t.length) throw new Error(t.length + "/" + e);
                    for (var i = 0; i < t.length && 0 == t[i];) i++;
                    this.num = new Array(t.length - i + e);
                    for (var n = 0; n < t.length - i; n++) this.num[n] = t[n + i]
                }
                function r() {
                    this.buffer = new Array,
                    this.length = 0
                }
                var d = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2);
                var u = [],
                c = function(t) {
                    "string" == typeof t && (t = {
                        text: t
                    }),
                    this.options = d.extend({},
                    {
                        text: "",
                        render: "",
                        width: 256,
                        height: 256,
                        correctLevel: 3,
                        background: "#ffffff",
                        foreground: "#000000"
                    },
                    t);
                    for (var e = null,
                    i = 0,
                    n = u.length; n > i; i++) if (u[i].text == this.options.text && u[i].text.correctLevel == this.options.correctLevel) {
                        e = u[i].obj;
                        break
                    }
                    if (i == n && (e = new s(this.options.text, this.options.correctLevel), u.push({
                        text: this.options.text,
                        correctLevel: this.options.correctLevel,
                        obj: e
                    })), this.options.render) switch (this.options.render) {
                    case "canvas":
                        return this.createCanvas(e);
                    case "table":
                        return this.createTable(e);
                    case "svg":
                        return this.createSVG(e);
                    default:
                        return this.createDefault(e)
                    }
                    return this.createDefault(e)
                };
                c.prototype.createDefault = function(t) {
                    var e = document.createElement("canvas");
                    return e.getContext ? this.createCanvas(t) : document.createElementNS && document.createElementNS(SVG_NS, "svg").createSVGRect ? this.createSVG(t) : this.createTable(t)
                },
                c.prototype.createCanvas = function(t) {
                    var e = document.createElement("canvas");
                    e.width = this.options.width,
                    e.height = this.options.height;
                    for (var i = e.getContext("2d"), n = (this.options.width / t.getModuleCount()).toPrecision(4), o = this.options.height / t.getModuleCount().toPrecision(4), s = 0; s < t.getModuleCount(); s++) for (var a = 0; a < t.getModuleCount(); a++) {
                        i.fillStyle = t.modules[s][a] ? this.options.foreground: this.options.background;
                        var r = Math.ceil((a + 1) * n) - Math.floor(a * n),
                        l = Math.ceil((s + 1) * n) - Math.floor(s * n);
                        i.fillRect(Math.round(a * n), Math.round(s * o), r, l)
                    }
                    return e
                },
                c.prototype.createTable = function(t) {
                    var e = [];
                    e.push('<table style="border:0px; margin:0px; padding:0px; border-collapse:collapse; background-color: ' + this.options.background + ';">');
                    var i = -1,
                    n = -1,
                    o = -1,
                    s = -1;
                    i = o = Math.floor(this.options.width / t.getModuleCount()),
                    n = s = Math.floor(this.options.height / t.getModuleCount()),
                    0 >= o && (i = t.getModuleCount() < 80 ? 2 : 1),
                    0 >= s && (n = t.getModuleCount() < 80 ? 2 : 1),
                    foreTd = '<td style="border:0px; margin:0px; padding:0px; width:' + i + "px; background-color: " + this.options.foreground + '"></td>',
                    backTd = '<td style="border:0px; margin:0px; padding:0px; width:' + i + "px; background-color: " + this.options.background + '"></td>',
                    l = t.getModuleCount();
                    for (var a = 0; l > a; a++) {
                        e.push('<tr style="border:0px; margin:0px; padding:0px; height: ' + n + 'px">');
                        for (var r = 0; l > r; r++) e.push(t.modules[a][r] ? foreTd: backTd);
                        e.push("</tr>")
                    }
                    e.push("</table>");
                    var d = document.createElement("span");
                    return d.innerHTML = e.join(""),
                    d.firstChild
                },
                c.prototype.createSVG = function(t) {
                    for (var e, i, n, o, s = t.getModuleCount(), a = this.options.height / this.options.width, r = '<svg xmlns="http://www.w3.org/2000/svg" width="' + this.options.width + 'px" height="' + this.options.height + 'px" viewbox="0 0 ' + 10 * s + " " + 10 * s * a + '">', l = "<path ", u = ' style="stroke-width:0.5;stroke:' + this.options.foreground + ";fill:" + this.options.foreground + ';"></path>', c = ' style="stroke-width:0.5;stroke:' + this.options.background + ";fill:" + this.options.background + ';"></path>', h = 0; s > h; h++) for (var p = 0; s > p; p++) e = 10 * p,
                    n = 10 * h * a,
                    i = 10 * (p + 1),
                    o = 10 * (h + 1) * a,
                    r += l + 'd="M ' + e + "," + n + " L " + i + "," + n + " L " + i + "," + o + " L " + e + "," + o + ' Z"',
                    r += t.modules[h][p] ? u: c;
                    return r += "</svg>",
                    d(r)[0]
                },
                s.prototype = {
                    constructor: s,
                    getModuleCount: function() {
                        return this.moduleCount
                    },
                    make: function() {
                        this.getRightType(),
                        this.dataCache = this.createData(),
                        this.createQrcode()
                    },
                    makeImpl: function(t) {
                        this.moduleCount = 4 * this.typeNumber + 17,
                        this.modules = new Array(this.moduleCount);
                        for (var e = 0; e < this.moduleCount; e++) this.modules[e] = new Array(this.moduleCount);
                        this.setupPositionProbePattern(0, 0),
                        this.setupPositionProbePattern(this.moduleCount - 7, 0),
                        this.setupPositionProbePattern(0, this.moduleCount - 7),
                        this.setupPositionAdjustPattern(),
                        this.setupTimingPattern(),
                        this.setupTypeInfo(!0, t),
                        this.typeNumber >= 7 && this.setupTypeNumber(!0),
                        this.mapData(this.dataCache, t)
                    },
                    setupPositionProbePattern: function(t, e) {
                        for (var i = -1; 7 >= i; i++) if (! ( - 1 >= t + i || this.moduleCount <= t + i)) for (var n = -1; 7 >= n; n++) - 1 >= e + n || this.moduleCount <= e + n || (this.modules[t + i][e + n] = i >= 0 && 6 >= i && (0 == n || 6 == n) || n >= 0 && 6 >= n && (0 == i || 6 == i) || i >= 2 && 4 >= i && n >= 2 && 4 >= n ? !0 : !1)
                    },
                    createQrcode: function() {
                        for (var t = 0,
                        e = 0,
                        i = null,
                        n = 0; 8 > n; n++) {
                            this.makeImpl(n);
                            var o = f.getLostPoint(this); (0 == n || t > o) && (t = o, e = n, i = this.modules)
                        }
                        this.modules = i,
                        this.setupTypeInfo(!1, e),
                        this.typeNumber >= 7 && this.setupTypeNumber(!1)
                    },
                    setupTimingPattern: function() {
                        for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0, null == this.modules[6][t] && (this.modules[6][t] = t % 2 == 0))
                    },
                    setupPositionAdjustPattern: function() {
                        for (var t = f.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++) for (var i = 0; i < t.length; i++) {
                            var n = t[e],
                            o = t[i];
                            if (null == this.modules[n][o]) for (var s = -2; 2 >= s; s++) for (var a = -2; 2 >= a; a++) this.modules[n + s][o + a] = -2 == s || 2 == s || -2 == a || 2 == a || 0 == s && 0 == a ? !0 : !1
                        }
                    },
                    setupTypeNumber: function(t) {
                        for (var e = f.getBCHTypeNumber(this.typeNumber), i = 0; 18 > i; i++) {
                            var n = !t && 1 == (e >> i & 1);
                            this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = n,
                            this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = n
                        }
                    },
                    setupTypeInfo: function(t, e) {
                        for (var i = h[this.errorCorrectLevel] << 3 | e, n = f.getBCHTypeInfo(i), o = 0; 15 > o; o++) {
                            var s = !t && 1 == (n >> o & 1);
                            6 > o ? this.modules[o][8] = s: 8 > o ? this.modules[o + 1][8] = s: this.modules[this.moduleCount - 15 + o][8] = s;
                            var s = !t && 1 == (n >> o & 1);
                            8 > o ? this.modules[8][this.moduleCount - o - 1] = s: 9 > o ? this.modules[8][15 - o - 1 + 1] = s: this.modules[8][15 - o - 1] = s
                        }
                        this.modules[this.moduleCount - 8][8] = !t
                    },
                    createData: function() {
                        var t = new r,
                        e = this.typeNumber > 9 ? 16 : 8;
                        t.put(4, 4),
                        t.put(this.utf8bytes.length, e);
                        for (var i = 0,
                        n = this.utf8bytes.length; n > i; i++) t.put(this.utf8bytes[i], 8);
                        for (t.length + 4 <= 8 * this.totalDataCount && t.put(0, 4); t.length % 8 != 0;) t.putBit(!1);
                        for (;;) {
                            if (t.length >= 8 * this.totalDataCount) break;
                            if (t.put(s.PAD0, 8), t.length >= 8 * this.totalDataCount) break;
                            t.put(s.PAD1, 8)
                        }
                        return this.createBytes(t)
                    },
                    createBytes: function(t) {
                        for (var e = 0,
                        i = 0,
                        n = 0,
                        o = this.rsBlock.length / 3,
                        s = new Array,
                        r = 0; o > r; r++) for (var l = this.rsBlock[3 * r + 0], d = this.rsBlock[3 * r + 1], u = this.rsBlock[3 * r + 2], c = 0; l > c; c++) s.push([u, d]);
                        for (var h = new Array(s.length), p = new Array(s.length), m = 0; m < s.length; m++) {
                            var v = s[m][0],
                            g = s[m][1] - v;
                            i = Math.max(i, v),
                            n = Math.max(n, g),
                            h[m] = new Array(v);
                            for (var r = 0; r < h[m].length; r++) h[m][r] = 255 & t.buffer[r + e];
                            e += v;
                            var w = f.getErrorCorrectPolynomial(g),
                            y = new a(h[m], w.getLength() - 1),
                            b = y.mod(w);
                            p[m] = new Array(w.getLength() - 1);
                            for (var r = 0; r < p[m].length; r++) {
                                var T = r + b.getLength() - p[m].length;
                                p[m][r] = T >= 0 ? b.get(T) : 0
                            }
                        }
                        for (var x = new Array(this.totalDataCount), C = 0, r = 0; i > r; r++) for (var m = 0; m < s.length; m++) r < h[m].length && (x[C++] = h[m][r]);
                        for (var r = 0; n > r; r++) for (var m = 0; m < s.length; m++) r < p[m].length && (x[C++] = p[m][r]);
                        return x
                    },
                    mapData: function(t, e) {
                        for (var i = -1,
                        n = this.moduleCount - 1,
                        o = 7,
                        s = 0,
                        a = this.moduleCount - 1; a > 0; a -= 2) for (6 == a && a--;;) {
                            for (var r = 0; 2 > r; r++) if (null == this.modules[n][a - r]) {
                                var l = !1;
                                s < t.length && (l = 1 == (t[s] >>> o & 1));
                                var d = f.getMask(e, n, a - r);
                                d && (l = !l),
                                this.modules[n][a - r] = l,
                                o--,
                                -1 == o && (s++, o = 7)
                            }
                            if (n += i, 0 > n || this.moduleCount <= n) {
                                n -= i,
                                i = -i;
                                break
                            }
                        }
                    }
                },
                s.PAD0 = 236,
                s.PAD1 = 17;
                for (var h = [1, 0, 3, 2], p = {
                    PATTERN000: 0,
                    PATTERN001: 1,
                    PATTERN010: 2,
                    PATTERN011: 3,
                    PATTERN100: 4,
                    PATTERN101: 5,
                    PATTERN110: 6,
                    PATTERN111: 7
                },
                f = {
                    PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
                    G15: 1335,
                    G18: 7973,
                    G15_MASK: 21522,
                    getBCHTypeInfo: function(t) {
                        for (var e = t << 10; f.getBCHDigit(e) - f.getBCHDigit(f.G15) >= 0;) e ^= f.G15 << f.getBCHDigit(e) - f.getBCHDigit(f.G15);
                        return (t << 10 | e) ^ f.G15_MASK
                    },
                    getBCHTypeNumber: function(t) {
                        for (var e = t << 12; f.getBCHDigit(e) - f.getBCHDigit(f.G18) >= 0;) e ^= f.G18 << f.getBCHDigit(e) - f.getBCHDigit(f.G18);
                        return t << 12 | e
                    },
                    getBCHDigit: function(t) {
                        for (var e = 0; 0 != t;) e++,
                        t >>>= 1;
                        return e
                    },
                    getPatternPosition: function(t) {
                        return f.PATTERN_POSITION_TABLE[t - 1]
                    },
                    getMask: function(t, e, i) {
                        switch (t) {
                        case p.PATTERN000:
                            return (e + i) % 2 == 0;
                        case p.PATTERN001:
                            return e % 2 == 0;
                        case p.PATTERN010:
                            return i % 3 == 0;
                        case p.PATTERN011:
                            return (e + i) % 3 == 0;
                        case p.PATTERN100:
                            return (Math.floor(e / 2) + Math.floor(i / 3)) % 2 == 0;
                        case p.PATTERN101:
                            return e * i % 2 + e * i % 3 == 0;
                        case p.PATTERN110:
                            return (e * i % 2 + e * i % 3) % 2 == 0;
                        case p.PATTERN111:
                            return (e * i % 3 + (e + i) % 2) % 2 == 0;
                        default:
                            throw new Error("bad maskPattern:" + t)
                        }
                    },
                    getErrorCorrectPolynomial: function(t) {
                        for (var e = new a([1], 0), i = 0; t > i; i++) e = e.multiply(new a([1, m.gexp(i)], 0));
                        return e
                    },
                    getLostPoint: function(t) {
                        for (var e = t.getModuleCount(), i = 0, n = 0, o = 0; e > o; o++) for (var s = 0,
                        a = t.modules[o][0], r = 0; e > r; r++) {
                            var l = t.modules[o][r];
                            if (e - 6 > r && l && !t.modules[o][r + 1] && t.modules[o][r + 2] && t.modules[o][r + 3] && t.modules[o][r + 4] && !t.modules[o][r + 5] && t.modules[o][r + 6] && (e - 10 > r ? t.modules[o][r + 7] && t.modules[o][r + 8] && t.modules[o][r + 9] && t.modules[o][r + 10] && (i += 40) : r > 3 && t.modules[o][r - 1] && t.modules[o][r - 2] && t.modules[o][r - 3] && t.modules[o][r - 4] && (i += 40)), e - 1 > o && e - 1 > r) {
                                var d = 0;
                                l && d++,
                                t.modules[o + 1][r] && d++,
                                t.modules[o][r + 1] && d++,
                                t.modules[o + 1][r + 1] && d++,
                                (0 == d || 4 == d) && (i += 3)
                            }
                            a ^ l ? s++:(a = l, s >= 5 && (i += 3 + s - 5), s = 1),
                            l && n++
                        }
                        for (var r = 0; e > r; r++) for (var s = 0,
                        a = t.modules[0][r], o = 0; e > o; o++) {
                            var l = t.modules[o][r];
                            e - 6 > o && l && !t.modules[o + 1][r] && t.modules[o + 2][r] && t.modules[o + 3][r] && t.modules[o + 4][r] && !t.modules[o + 5][r] && t.modules[o + 6][r] && (e - 10 > o ? t.modules[o + 7][r] && t.modules[o + 8][r] && t.modules[o + 9][r] && t.modules[o + 10][r] && (i += 40) : o > 3 && t.modules[o - 1][r] && t.modules[o - 2][r] && t.modules[o - 3][r] && t.modules[o - 4][r] && (i += 40)),
                            a ^ l ? s++:(a = l, s >= 5 && (i += 3 + s - 5), s = 1)
                        }
                        var u = Math.abs(100 * n / e / e - 50) / 5;
                        return i += 10 * u
                    }
                },
                m = {
                    glog: function(t) {
                        if (1 > t) throw new Error("glog(" + t + ")");
                        return m.LOG_TABLE[t]
                    },
                    gexp: function(t) {
                        for (; 0 > t;) t += 255;
                        for (; t >= 256;) t -= 255;
                        return m.EXP_TABLE[t]
                    },
                    EXP_TABLE: new Array(256),
                    LOG_TABLE: new Array(256)
                },
                v = 0; 8 > v; v++) m.EXP_TABLE[v] = 1 << v;
                for (var v = 8; 256 > v; v++) m.EXP_TABLE[v] = m.EXP_TABLE[v - 4] ^ m.EXP_TABLE[v - 5] ^ m.EXP_TABLE[v - 6] ^ m.EXP_TABLE[v - 8];
                for (var v = 0; 255 > v; v++) m.LOG_TABLE[m.EXP_TABLE[v]] = v;
                a.prototype = {
                    get: function(t) {
                        return this.num[t]
                    },
                    getLength: function() {
                        return this.num.length
                    },
                    multiply: function(t) {
                        for (var e = new Array(this.getLength() + t.getLength() - 1), i = 0; i < this.getLength(); i++) for (var n = 0; n < t.getLength(); n++) e[i + n] ^= m.gexp(m.glog(this.get(i)) + m.glog(t.get(n)));
                        return new a(e, 0)
                    },
                    mod: function(t) {
                        var e = this.getLength(),
                        i = t.getLength();
                        if (0 > e - i) return this;
                        for (var n = new Array(e), o = 0; e > o; o++) n[o] = this.get(o);
                        for (; n.length >= i;) {
                            for (var s = m.glog(n[0]) - m.glog(t.get(0)), o = 0; o < t.getLength(); o++) n[o] ^= m.gexp(m.glog(t.get(o)) + s);
                            for (; 0 == n[0];) n.shift()
                        }
                        return new a(n, 0)
                    }
                };
                var g = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
                s.prototype.getRightType = function() {
                    for (var t = 1; 41 > t; t++) {
                        var e = g[4 * (t - 1) + this.errorCorrectLevel];
                        if (void 0 == e) throw new Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + this.errorCorrectLevel);
                        for (var i = e.length / 3,
                        n = 0,
                        o = 0; i > o; o++) {
                            var s = e[3 * o + 0],
                            a = e[3 * o + 2];
                            n += a * s
                        }
                        var r = t > 9 ? 2 : 1;
                        if (this.utf8bytes.length + r < n || 40 == t) {
                            this.typeNumber = t,
                            this.rsBlock = e,
                            this.totalDataCount = n;
                            break
                        }
                    }
                },
                r.prototype = {
                    get: function(t) {
                        var e = Math.floor(t / 8);
                        return this.buffer[e] >>> 7 - t % 8 & 1
                    },
                    put: function(t, e) {
                        for (var i = 0; e > i; i++) this.putBit(t >>> e - i - 1 & 1)
                    },
                    putBit: function(t) {
                        var e = Math.floor(this.length / 8);
                        this.buffer.length <= e && this.buffer.push(0),
                        t && (this.buffer[e] |= 128 >>> this.length % 8),
                        this.length++
                    }
                },
                s.prototype = {
                    constructor: s,
                    getModuleCount: function() {
                        return this.moduleCount
                    },
                    make: function() {
                        this.getRightType(),
                        this.dataCache = this.createData(),
                        this.createQrcode()
                    },
                    makeImpl: function(t) {
                        this.moduleCount = 4 * this.typeNumber + 17,
                        this.modules = new Array(this.moduleCount);
                        for (var e = 0; e < this.moduleCount; e++) this.modules[e] = new Array(this.moduleCount);
                        this.setupPositionProbePattern(0, 0),
                        this.setupPositionProbePattern(this.moduleCount - 7, 0),
                        this.setupPositionProbePattern(0, this.moduleCount - 7),
                        this.setupPositionAdjustPattern(),
                        this.setupTimingPattern(),
                        this.setupTypeInfo(!0, t),
                        this.typeNumber >= 7 && this.setupTypeNumber(!0),
                        this.mapData(this.dataCache, t)
                    },
                    setupPositionProbePattern: function(t, e) {
                        for (var i = -1; 7 >= i; i++) if (! ( - 1 >= t + i || this.moduleCount <= t + i)) for (var n = -1; 7 >= n; n++) - 1 >= e + n || this.moduleCount <= e + n || (this.modules[t + i][e + n] = i >= 0 && 6 >= i && (0 == n || 6 == n) || n >= 0 && 6 >= n && (0 == i || 6 == i) || i >= 2 && 4 >= i && n >= 2 && 4 >= n ? !0 : !1)
                    },
                    createQrcode: function() {
                        for (var t = 0,
                        e = 0,
                        i = null,
                        n = 0; 8 > n; n++) {
                            this.makeImpl(n);
                            var o = f.getLostPoint(this); (0 == n || t > o) && (t = o, e = n, i = this.modules)
                        }
                        this.modules = i,
                        this.setupTypeInfo(!1, e),
                        this.typeNumber >= 7 && this.setupTypeNumber(!1)
                    },
                    setupTimingPattern: function() {
                        for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0, null == this.modules[6][t] && (this.modules[6][t] = t % 2 == 0))
                    },
                    setupPositionAdjustPattern: function() {
                        for (var t = f.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++) for (var i = 0; i < t.length; i++) {
                            var n = t[e],
                            o = t[i];
                            if (null == this.modules[n][o]) for (var s = -2; 2 >= s; s++) for (var a = -2; 2 >= a; a++) this.modules[n + s][o + a] = -2 == s || 2 == s || -2 == a || 2 == a || 0 == s && 0 == a ? !0 : !1
                        }
                    },
                    setupTypeNumber: function(t) {
                        for (var e = f.getBCHTypeNumber(this.typeNumber), i = 0; 18 > i; i++) {
                            var n = !t && 1 == (e >> i & 1);
                            this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = n,
                            this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = n
                        }
                    },
                    setupTypeInfo: function(t, e) {
                        for (var i = h[this.errorCorrectLevel] << 3 | e, n = f.getBCHTypeInfo(i), o = 0; 15 > o; o++) {
                            var s = !t && 1 == (n >> o & 1);
                            6 > o ? this.modules[o][8] = s: 8 > o ? this.modules[o + 1][8] = s: this.modules[this.moduleCount - 15 + o][8] = s;
                            var s = !t && 1 == (n >> o & 1);
                            8 > o ? this.modules[8][this.moduleCount - o - 1] = s: 9 > o ? this.modules[8][15 - o - 1 + 1] = s: this.modules[8][15 - o - 1] = s
                        }
                        this.modules[this.moduleCount - 8][8] = !t
                    },
                    createData: function() {
                        var t = new r,
                        e = this.typeNumber > 9 ? 16 : 8;
                        t.put(4, 4),
                        t.put(this.utf8bytes.length, e);
                        for (var i = 0,
                        n = this.utf8bytes.length; n > i; i++) t.put(this.utf8bytes[i], 8);
                        for (t.length + 4 <= 8 * this.totalDataCount && t.put(0, 4); t.length % 8 != 0;) t.putBit(!1);
                        for (;;) {
                            if (t.length >= 8 * this.totalDataCount) break;
                            if (t.put(s.PAD0, 8), t.length >= 8 * this.totalDataCount) break;
                            t.put(s.PAD1, 8)
                        }
                        return this.createBytes(t)
                    },
                    createBytes: function(t) {
                        for (var e = 0,
                        i = 0,
                        n = 0,
                        o = this.rsBlock.length / 3,
                        s = new Array,
                        r = 0; o > r; r++) for (var l = this.rsBlock[3 * r + 0], d = this.rsBlock[3 * r + 1], u = this.rsBlock[3 * r + 2], c = 0; l > c; c++) s.push([u, d]);
                        for (var h = new Array(s.length), p = new Array(s.length), m = 0; m < s.length; m++) {
                            var v = s[m][0],
                            g = s[m][1] - v;
                            i = Math.max(i, v),
                            n = Math.max(n, g),
                            h[m] = new Array(v);
                            for (var r = 0; r < h[m].length; r++) h[m][r] = 255 & t.buffer[r + e];
                            e += v;
                            var w = f.getErrorCorrectPolynomial(g),
                            y = new a(h[m], w.getLength() - 1),
                            b = y.mod(w);
                            p[m] = new Array(w.getLength() - 1);
                            for (var r = 0; r < p[m].length; r++) {
                                var T = r + b.getLength() - p[m].length;
                                p[m][r] = T >= 0 ? b.get(T) : 0
                            }
                        }
                        for (var x = new Array(this.totalDataCount), C = 0, r = 0; i > r; r++) for (var m = 0; m < s.length; m++) r < h[m].length && (x[C++] = h[m][r]);
                        for (var r = 0; n > r; r++) for (var m = 0; m < s.length; m++) r < p[m].length && (x[C++] = p[m][r]);
                        return x
                    },
                    mapData: function(t, e) {
                        for (var i = -1,
                        n = this.moduleCount - 1,
                        o = 7,
                        s = 0,
                        a = this.moduleCount - 1; a > 0; a -= 2) for (6 == a && a--;;) {
                            for (var r = 0; 2 > r; r++) if (null == this.modules[n][a - r]) {
                                var l = !1;
                                s < t.length && (l = 1 == (t[s] >>> o & 1));
                                var d = f.getMask(e, n, a - r);
                                d && (l = !l),
                                this.modules[n][a - r] = l,
                                o--,
                                -1 == o && (s++, o = 7)
                            }
                            if (n += i, 0 > n || this.moduleCount <= n) {
                                n -= i,
                                i = -i;
                                break
                            }
                        }
                    }
                },
                s.PAD0 = 236,
                s.PAD1 = 17;
                for (var h = [1, 0, 3, 2], p = {
                    PATTERN000: 0,
                    PATTERN001: 1,
                    PATTERN010: 2,
                    PATTERN011: 3,
                    PATTERN100: 4,
                    PATTERN101: 5,
                    PATTERN110: 6,
                    PATTERN111: 7
                },
                f = {
                    PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
                    G15: 1335,
                    G18: 7973,
                    G15_MASK: 21522,
                    getBCHTypeInfo: function(t) {
                        for (var e = t << 10; f.getBCHDigit(e) - f.getBCHDigit(f.G15) >= 0;) e ^= f.G15 << f.getBCHDigit(e) - f.getBCHDigit(f.G15);
                        return (t << 10 | e) ^ f.G15_MASK
                    },
                    getBCHTypeNumber: function(t) {
                        for (var e = t << 12; f.getBCHDigit(e) - f.getBCHDigit(f.G18) >= 0;) e ^= f.G18 << f.getBCHDigit(e) - f.getBCHDigit(f.G18);
                        return t << 12 | e
                    },
                    getBCHDigit: function(t) {
                        for (var e = 0; 0 != t;) e++,
                        t >>>= 1;
                        return e
                    },
                    getPatternPosition: function(t) {
                        return f.PATTERN_POSITION_TABLE[t - 1]
                    },
                    getMask: function(t, e, i) {
                        switch (t) {
                        case p.PATTERN000:
                            return (e + i) % 2 == 0;
                        case p.PATTERN001:
                            return e % 2 == 0;
                        case p.PATTERN010:
                            return i % 3 == 0;
                        case p.PATTERN011:
                            return (e + i) % 3 == 0;
                        case p.PATTERN100:
                            return (Math.floor(e / 2) + Math.floor(i / 3)) % 2 == 0;
                        case p.PATTERN101:
                            return e * i % 2 + e * i % 3 == 0;
                        case p.PATTERN110:
                            return (e * i % 2 + e * i % 3) % 2 == 0;
                        case p.PATTERN111:
                            return (e * i % 3 + (e + i) % 2) % 2 == 0;
                        default:
                            throw new Error("bad maskPattern:" + t)
                        }
                    },
                    getErrorCorrectPolynomial: function(t) {
                        for (var e = new a([1], 0), i = 0; t > i; i++) e = e.multiply(new a([1, m.gexp(i)], 0));
                        return e
                    },
                    getLostPoint: function(t) {
                        for (var e = t.getModuleCount(), i = 0, n = 0, o = 0; e > o; o++) for (var s = 0,
                        a = t.modules[o][0], r = 0; e > r; r++) {
                            var l = t.modules[o][r];
                            if (e - 6 > r && l && !t.modules[o][r + 1] && t.modules[o][r + 2] && t.modules[o][r + 3] && t.modules[o][r + 4] && !t.modules[o][r + 5] && t.modules[o][r + 6] && (e - 10 > r ? t.modules[o][r + 7] && t.modules[o][r + 8] && t.modules[o][r + 9] && t.modules[o][r + 10] && (i += 40) : r > 3 && t.modules[o][r - 1] && t.modules[o][r - 2] && t.modules[o][r - 3] && t.modules[o][r - 4] && (i += 40)), e - 1 > o && e - 1 > r) {
                                var d = 0;
                                l && d++,
                                t.modules[o + 1][r] && d++,
                                t.modules[o][r + 1] && d++,
                                t.modules[o + 1][r + 1] && d++,
                                (0 == d || 4 == d) && (i += 3)
                            }
                            a ^ l ? s++:(a = l, s >= 5 && (i += 3 + s - 5), s = 1),
                            l && n++
                        }
                        for (var r = 0; e > r; r++) for (var s = 0,
                        a = t.modules[0][r], o = 0; e > o; o++) {
                            var l = t.modules[o][r];
                            e - 6 > o && l && !t.modules[o + 1][r] && t.modules[o + 2][r] && t.modules[o + 3][r] && t.modules[o + 4][r] && !t.modules[o + 5][r] && t.modules[o + 6][r] && (e - 10 > o ? t.modules[o + 7][r] && t.modules[o + 8][r] && t.modules[o + 9][r] && t.modules[o + 10][r] && (i += 40) : o > 3 && t.modules[o - 1][r] && t.modules[o - 2][r] && t.modules[o - 3][r] && t.modules[o - 4][r] && (i += 40)),
                            a ^ l ? s++:(a = l, s >= 5 && (i += 3 + s - 5), s = 1)
                        }
                        var u = Math.abs(100 * n / e / e - 50) / 5;
                        return i += 10 * u
                    }
                },
                m = {
                    glog: function(t) {
                        if (1 > t) throw new Error("glog(" + t + ")");
                        return m.LOG_TABLE[t]
                    },
                    gexp: function(t) {
                        for (; 0 > t;) t += 255;
                        for (; t >= 256;) t -= 255;
                        return m.EXP_TABLE[t]
                    },
                    EXP_TABLE: new Array(256),
                    LOG_TABLE: new Array(256)
                },
                v = 0; 8 > v; v++) m.EXP_TABLE[v] = 1 << v;
                for (var v = 8; 256 > v; v++) m.EXP_TABLE[v] = m.EXP_TABLE[v - 4] ^ m.EXP_TABLE[v - 5] ^ m.EXP_TABLE[v - 6] ^ m.EXP_TABLE[v - 8];
                for (var v = 0; 255 > v; v++) m.LOG_TABLE[m.EXP_TABLE[v]] = v;
                a.prototype = {
                    get: function(t) {
                        return this.num[t]
                    },
                    getLength: function() {
                        return this.num.length
                    },
                    multiply: function(t) {
                        for (var e = new Array(this.getLength() + t.getLength() - 1), i = 0; i < this.getLength(); i++) for (var n = 0; n < t.getLength(); n++) e[i + n] ^= m.gexp(m.glog(this.get(i)) + m.glog(t.get(n)));
                        return new a(e, 0)
                    },
                    mod: function(t) {
                        var e = this.getLength(),
                        i = t.getLength();
                        if (0 > e - i) return this;
                        for (var n = new Array(e), o = 0; e > o; o++) n[o] = this.get(o);
                        for (; n.length >= i;) {
                            for (var s = m.glog(n[0]) - m.glog(t.get(0)), o = 0; o < t.getLength(); o++) n[o] ^= m.gexp(m.glog(t.get(o)) + s);
                            for (; 0 == n[0];) n.shift()
                        }
                        return new a(n, 0)
                    }
                },
                g = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]],
                s.prototype.getRightType = function() {
                    for (var t = 1; 41 > t; t++) {
                        var e = g[4 * (t - 1) + this.errorCorrectLevel];
                        if (void 0 == e) throw new Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + this.errorCorrectLevel);
                        for (var i = e.length / 3,
                        n = 0,
                        o = 0; i > o; o++) {
                            var s = e[3 * o + 0],
                            a = e[3 * o + 2];
                            n += a * s
                        }
                        var r = t > 9 ? 2 : 1;
                        if (this.utf8bytes.length + r < n || 40 == t) {
                            this.typeNumber = t,
                            this.rsBlock = e,
                            this.totalDataCount = n;
                            break
                        }
                    }
                },
                r.prototype = {
                    get: function(t) {
                        var e = Math.floor(t / 8);
                        return this.buffer[e] >>> 7 - t % 8 & 1
                    },
                    put: function(t, e) {
                        for (var i = 0; e > i; i++) this.putBit(t >>> e - i - 1 & 1)
                    },
                    putBit: function(t) {
                        var e = Math.floor(this.length / 8);
                        this.buffer.length <= e && this.buffer.push(0),
                        t && (this.buffer[e] |= 128 >>> this.length % 8),
                        this.length++
                    }
                },
                d.AMUI.qrcode = c,
                e.exports = c
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        32 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    try {
                        return l in r && r[l]
                    } catch(t) {
                        return ! 1
                    }
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2);
                var s, a = {},
                r = window,
                l = "localStorage";
                a.disabled = !1,
                a.version = "1.3.17",
                a.set = function() {},
                a.get = function() {},
                a.has = function(t) {
                    return void 0 !== a.get(t)
                },
                a.remove = function() {},
                a.clear = function() {},
                a.transact = function(t, e, i) {
                    null == i && (i = e, e = null),
                    null == e && (e = {});
                    var n = a.get(t, e);
                    i(n),
                    a.set(t, n)
                },
                a.getAll = function() {},
                a.forEach = function() {},
                a.serialize = function(t) {
                    return JSON.stringify(t)
                },
                a.deserialize = function(t) {
                    if ("string" != typeof t) return void 0;
                    try {
                        return JSON.parse(t)
                    } catch(e) {
                        return t || void 0
                    }
                },
                n() && (s = r[l], a.set = function(t, e) {
                    return void 0 === e ? a.remove(t) : (s.setItem(t, a.serialize(e)), e)
                },
                a.get = function(t, e) {
                    var i = a.deserialize(s.getItem(t));
                    return void 0 === i ? e: i
                },
                a.remove = function(t) {
                    s.removeItem(t)
                },
                a.clear = function() {
                    s.clear()
                },
                a.getAll = function() {
                    var t = {};
                    return a.forEach(function(e, i) {
                        t[e] = i
                    }),
                    t
                },
                a.forEach = function(t) {
                    for (var e = 0; e < s.length; e++) {
                        var i = s.key(e);
                        t(i, a.get(i))
                    }
                });
                try {
                    var d = "__storeJs__";
                    a.set(d, d),
                    a.get(d) != d && (a.disabled = !0),
                    a.remove(d)
                } catch(u) {
                    a.disabled = !0
                }
                a.enabled = !a.disabled,
                o.AMUI = o.AMUI || {},
                o.AMUI.store = a,
                e.exports = a
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        33 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    var t = o('[data-am-widget="accordion"]'),
                    e = {
                        item: ".am-accordion-item",
                        title: ".am-accordion-title",
                        body: ".am-accordion-bd",
                        disabled: ".am-disabled"
                    };
                    t.each(function(t, i) {
                        var n = s.utils.parseOptions(o(i).attr("data-am-accordion")),
                        a = o(i).find(e.title);
                        a.on("click.accordion.amui",
                        function() {
                            var t = o(this).next(e.body),
                            s = o(this).parent(e.item),
                            a = t.data("amui.collapse");
                            s.is(e.disabled) || (s.toggleClass("am-active"), a ? t.collapse("toggle") : t.collapse(), !n.multiple && o(i).children(".am-active").not(s).not(e.disabled).removeClass("am-active").find(e.body + ".am-in").collapse("close"))
                        })
                    })
                }
                t(2),
                t(6);
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = o.AMUI;
                o(n),
                e.exports = o.AMUI.accordion = {
                    VERSION: "2.1.0",
                    init: n
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2,
            6 : 6
        }],
        34 : [function(t, e) {
            "use strict";
            e.exports = {
                VERSION: "2.0.1"
            }
        },
        {}],
        35 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    var t = o(".ds-thread"),
                    e = t.parent('[data-am-widget="duoshuo"]').attr("data-ds-short-name"),
                    i = ("https:" == document.location.protocol ? "https:": "http:") + "//static.duoshuo.com/embed.js";
                    if (t.length && e && (window.duoshuoQuery = {
                        short_name: e
                    },
                    !o('script[src="' + i + '"]').length)) {
                        var n = o("<script>", {
                            async: !0,
                            type: "text/javascript",
                            src: i,
                            charset: "utf-8"
                        });
                        o("body").append(n)
                    }
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                o(window).on("load", n),
                e.exports = o.AMUI.duoshuo = {
                    VERSION: "2.0.1",
                    init: n
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        36 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    o(".am-figure").each(function(t, e) {
                        var i, n = s.utils.parseOptions(o(e).attr("data-am-figure")),
                        a = o(e);
                        if (n.pureview) if ("auto" === n.pureview) {
                            var r = o.isImgZoomAble(a.find("img")[0]);
                            r && a.pureview()
                        } else a.addClass("am-figure-zoomable").pureview();
                        i = a.data("amui.pureview"),
                        i && a.on("click", ":not(img)",
                        function() {
                            i.open(0)
                        })
                    })
                }
                t(2),
                t(17);
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = o.AMUI;
                o.isImgZoomAble = function(t) {
                    var e = new Image;
                    e.src = t.src;
                    var i = o(t).width() < e.width;
                    return i && o(t).closest(".am-figure").addClass("am-figure-zoomable"),
                    i
                },
                o(window).on("load", n),
                e.exports = o.AMUI.figure = {
                    VERSION: "2.0.3",
                    init: n
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            17 : 17,
            2 : 2
        }],
        37 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    o(".am-footer-ysp").on("click",
                    function() {
                        o("#am-footer-modal").modal()
                    });
                    var t = s.utils.parseOptions(o(".am-footer").data("amFooter"));
                    t.addToHS && a(),
                    o('[data-rel="desktop"]').on("click",
                    function(t) {
                        t.preventDefault(),
                        window.AMPlatform ? window.AMPlatform.util.goDesktop() : (r.set("allmobilize", "desktop", "", "/"), window.location = window.location)
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2);
                t(12);
                var a = t(3),
                r = t(27);
                o(n),
                e.exports = o.AMUI.footer = {
                    VERSION: "3.1.2",
                    init: n
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            12 : 12,
            2 : 2,
            27 : 27,
            3 : 3
        }],
        38 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    var t = o('[data-am-widget="gallery"]');
                    t.each(function() {
                        var t = s.utils.parseOptions(o(this).attr("data-am-gallery"));
                        t.pureview && ("object" == typeof t.pureview ? o(this).pureview(t.pureview) : o(this).pureview())
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                t(17);
                var s = o.AMUI;
                o(n),
                e.exports = o.AMUI.gallery = {
                    VERSION: "3.0.0",
                    init: n
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            17 : 17,
            2 : 2
        }],
        39 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    function t() {
                        i[(n.scrollTop() > 50 ? "add": "remove") + "Class"]("am-active")
                    }
                    var e = o('[data-am-widget="gotop"]'),
                    i = e.filter(".am-gotop-fixed"),
                    n = o(window);
                    e.data("init") || (e.find("a").on("click",
                    function(t) {
                        t.preventDefault(),
                        n.smoothScroll()
                    }), t(), n.on("scroll.gotop.amui", o.AMUI.utils.debounce(t, 100)), e.data("init", !0))
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                t(22),
                o(n),
                e.exports = o.AMUI.gotop = {
                    VERSION: "4.0.2",
                    init: n
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2,
            22 : 22
        }],
        40 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    o('[data-am-widget="header"]').each(function() {
                        return o(this).hasClass("am-header-fixed") ? (o("body").addClass("am-with-fixed-header"), !1) : void 0
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                o(n),
                e.exports = o.AMUI.header = {
                    VERSION: "2.0.0",
                    init: n
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        41 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                e.exports = n.AMUI.intro = {
                    VERSION: "4.0.2",
                    init: function() {}
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        42 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                e.exports = n.AMUI.listNews = {
                    VERSION: "4.0.0",
                    init: function() {}
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        43 : [function(t, e) { (function(i) {
                function n(t) {
                    var e = s("<script />", {
                        id: "am-map-api-0"
                    });
                    s("body").append(e),
                    e.on("load",
                    function() {
                        console.log("load");
                        var e = s("<script/>", {
                            id: "am-map-api-1"
                        });
                        s("body").append(e),
                        e.on("load",
                        function() {
                            var e = document.createElement("script");
                            e.textContent = "(" + t.toString() + ")();",
                            s("body")[0].appendChild(e)
                        }).attr("src", "http://api.map.baidu.com/getscript?type=quick&file=feature&ak=WVAXZ05oyNRXS5egLImmentg&t=20140109092002")
                    }).attr("src", "http://api.map.baidu.com/getscript?type=quick&file=api&ak=WVAXZ05oyNRXS5egLImmentg&t=20140109092002")
                }
                function o() {
                    var t = document.querySelector(".am-map"),
                    e = 116.331398,
                    i = 39.897445,
                    n = t.getAttribute("data-name"),
                    o = t.getAttribute("data-address"),
                    s = t.getAttribute("data-longitude") || e,
                    a = t.getAttribute("data-latitude") || i,
                    r = t.getAttribute("data-setZoom") || 17,
                    l = t.getAttribute("data-icon"),
                    d = new BMap.Map("bd-map"),
                    u = new BMap.Point(s, a);
                    d.centerAndZoom(u, r),
                    t.getAttribute("data-zoomControl") && d.addControl(new BMap.ZoomControl),
                    t.getAttribute("data-scaleControl") && d.addControl(new BMap.ScaleControl);
                    var c = new BMap.Marker(u);
                    l && c.setIcon(new BMap.Icon(l, new BMap.Size(40, 40)));
                    var h = {
                        width: 200,
                        title: n
                    },
                    p = new BMap.InfoWindow("地址：" + o, h),
                    f = new BMap.Geocoder;
                    s == e && a == i ? f.getPoint(o,
                    function(t) {
                        t && (d.centerAndZoom(t, r), c.setPosition(t), d.addOverlay(c), d.openInfoWindow(p, t))
                    },
                    "") : f.getLocation(u,
                    function() {
                        d.centerAndZoom(u, r),
                        c.setPosition(u),
                        d.addOverlay(c),
                        o ? d.openInfoWindow(p, u) : d.openInfoWindow(new BMap.InfoWindow(o, h), u)
                    })
                }
                var s = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2);
                var a = function() {
                    s(".am-map").length && n(o)
                };
                s(a),
                e.exports = s.AMUI.map = {
                    VERSION: "2.0.2",
                    init: a
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        44 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    if (o("#mechat").length) {
                        var t = o('[data-am-widget="mechat"]'),
                        e = t.data("am-mechat-unitid"),
                        i = o("<script>", {
                            charset: "utf-8",
                            src: "http://mechatim.com/js/unit/button.js?id=" + e
                        });
                        o("body").append(i)
                    }
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                o(window).on("load", n),
                e.exports = o.AMUI.mechat = {
                    VERSION: "2.0.1",
                    init: n
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        45 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                t(13),
                t(6);
                var o = t(11),
                s = function() {
                    var t = n('[data-am-widget="menu"]');
                    t.find(".am-menu-nav .am-parent > a").on("click",
                    function(t) {
                        t.preventDefault();
                        var e = n(this),
                        i = e.parent(),
                        o = e.next(".am-menu-sub");
                        i.toggleClass("am-open"),
                        o.collapse("toggle"),
                        i.siblings(".am-parent").removeClass("am-open").children(".am-menu-sub.am-in").collapse("close")
                    }),
                    t.filter("[data-am-menu-collapse]").find("> .am-menu-toggle").on("click",
                    function(t) {
                        t.preventDefault();
                        var e = n(this),
                        i = e.next(".am-menu-nav");
                        e.toggleClass("am-active"),
                        i.collapse("toggle")
                    }),
                    t.filter("[data-am-menu-offcanvas]").find("> .am-menu-toggle").on("click",
                    function(t) {
                        t.preventDefault();
                        var e = n(this),
                        i = e.next(".am-offcanvas");
                        e.toggleClass("am-active"),
                        i.offCanvas("open")
                    });
                    var e = '.am-offcanvas[data-dismiss-on="click"]',
                    i = n(e);
                    i.find("a").not(".am-parent>a").on("click",
                    function() {
                        n(this).parents(e).offCanvas("close")
                    }),
                    t.filter(".am-menu-one").each(function(t) {
                        var e, i = n(this),
                        s = n('<div class="am-menu-nav-sub-wrap"></div>'),
                        a = 0,
                        r = i.find(".am-menu-nav"),
                        l = r.children("li");
                        l.filter(".am-parent").each(function(t) {
                            n(this).attr("data-rel", "#am-menu-sub-" + t),
                            n(this).find(".am-menu-sub").attr("id", "am-menu-sub-" + t).appendTo(s)
                        }),
                        i.append(s),
                        r.wrap('<div class="am-menu-nav-wrap" id="am-menu-' + t + '">'),
                        l.each(function() {
                            a += parseFloat(n(this).css("width"))
                        }),
                        r.width(a);
                        var d = new o("#am-menu-" + t, {
                            eventPassthrough: !0,
                            scrollX: !0,
                            scrollY: !1,
                            preventDefault: !1
                        });
                        l.on("click",
                        function() {
                            var t = n(this);
                            t.addClass("am-active").siblings().removeClass("am-active"),
                            s.find(".am-menu-sub.am-in").collapse("close"),
                            t.is(".am-parent") ? !t.hasClass(".am-open") && s.find(t.attr("data-rel")).collapse("open") : t.siblings().removeClass("am-open"),
                            void 0 === e && (e = n(this).index() ? 0 : 1);
                            var o, a = n(this).index() > e,
                            l = n(this)[a ? "next": "prev"](),
                            u = l.offset() || n(this).offset(),
                            c = i.offset(),
                            h = parseInt(i.css("padding-left")); (a ? u.left + u.width > c.left + c.width: u.left < c.left) && (o = r.offset(), d.scrollTo(a ? c.width - u.left + o.left - u.width - h: o.left - u.left, 0, 400)),
                            e = n(this).index()
                        }),
                        i.on("touchmove",
                        function(t) {
                            t.preventDefault()
                        })
                    })
                };
                n(s),
                e.exports = n.AMUI.menu = {
                    VERSION: "4.0.3",
                    init: s
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            11 : 11,
            13 : 13,
            2 : 2,
            6 : 6
        }],
        46 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    function t() {
                        u.append(b),
                        u.find("li").not(".am-navbar-more").slice(i() - 1).appendTo(y),
                        n.append(y)
                    }
                    function e() {
                        return i() >= h ? (b.hide(), void y.find("li").insertBefore(b)) : (!n.find(".am-navbar-actions").length && t(), b.show(), void(u.find("li").length < i() ? y.find("li").slice(0, i() - u.find("li").length).insertBefore(b) : u.find("li").length > i() && (y.find("li").length ? u.find("li").not(b).slice(i() - 1).insertBefore(y.find("li").first()) : u.find("li").not(b).slice(i() - 1).appendTo(y))))
                    }
                    function i() {
                        return Math.floor((l.width() - m) / f)
                    }
                    var n = o('[data-am-widget="navbar"]');
                    if (n.length) {
                        var l = o(window),
                        d = o("body"),
                        u = n.find(".am-navbar-nav"),
                        c = n.find("li"),
                        h = c.length,
                        p = u.attr("class") && parseInt(u.attr("class").match(/am-avg-sm-(\d+)/)[1]) || 3,
                        f = 60,
                        m = 16,
                        v = c.filter("[data-am-navbar-share]"),
                        g = c.filter("[data-am-navbar-qrcode]"),
                        w = "am-active",
                        y = o('<ul class="am-navbar-actions"></ul>', {
                            id: r.utils.generateGUID("am-navbar-actions")
                        }),
                        b = o('<li class="am-navbar-labels am-navbar-more"><a href="javascript: void(0);"><span class="am-icon-angle-up"></span><span class="am-navbar-label">更多</span></a></li>');
                        if ("fixed" == n.css("position") && d.addClass("am-with-fixed-navbar"), g.length) {
                            var T = "am-navbar-qrcode";
                            if (C = o("#" + T), !C.length) {
                                var x = g.attr("data-am-navbar-qrcode"),
                                C = o('<div class="am-modal am-modal-no-btn" id=""><div class="am-modal-dialog"><div class="am-modal-bd"></div></div></div>', {
                                    id: T
                                }),
                                E = C.find(".am-modal-bd");
                                if (x) E.html('<img src="' + x + '"/>');
                                else {
                                    var S = new a({
                                        render: "canvas",
                                        correctLevel: 0,
                                        text: window.location.href,
                                        width: 200,
                                        height: 200,
                                        background: "#fff",
                                        foreground: "#000"
                                    });
                                    E.html(S)
                                }
                                d.append(C)
                            }
                            g.on("click",
                            function(t) {
                                t.preventDefault(),
                                C.modal()
                            })
                        }
                        h > p && h > i() && t(),
                        n.on("click.navbar.amui", ".am-navbar-more",
                        function(t) {
                            t.preventDefault(),
                            b[y.hasClass(w) ? "removeClass": "addClass"](w),
                            y.toggleClass(w)
                        }),
                        v.length && v.on("click.navbar.amui",
                        function(t) {
                            t.preventDefault(),
                            s.toggle()
                        }),
                        l.on("resize.navbar.amui orientationchange.navbar.amui", r.utils.debounce(e, 150))
                    }
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                t(12);
                var s = t(21),
                a = t(31),
                r = o.AMUI;
                o(n),
                e.exports = o.AMUI.navbar = {
                    VERSION: "2.0.2",
                    init: n
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            12 : 12,
            2 : 2,
            21 : 21,
            31 : 31
        }],
        47 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                e.exports = n.AMUI.pagination = {
                    VERSION: "3.0.1"
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        48 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    var t = o('[data-am-widget="paragraph"]');
                    t.each(function(t) {
                        var e = o(this),
                        i = a.utils.parseOptions(e.attr("data-am-paragraph")),
                        n = t;
                        i.pureview && e.pureview(),
                        i.tableScrollable && e.find("table").each(function(t) {
                            o(this).width() > o(window).width() && o(this).scrollTable(n + "-" + t)
                        })
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                t(17);
                var s = t(11),
                a = o.AMUI;
                o.fn.scrollTable = function(t) {
                    var e, i = o(this);
                    i.wrap('<div class="am-paragraph-table-container" id="am-paragraph-table-' + t + '"><div class="am-paragraph-table-scroller"></div></div>'),
                    e = i.parent(),
                    e.width(i.width()),
                    e.height(i.height()),
                    new s("#am-paragraph-table-" + t, {
                        eventPassthrough: !0,
                        scrollX: !0,
                        scrollY: !1,
                        preventDefault: !1
                    })
                },
                o(window).on("load", n),
                e.exports = o.AMUI.paragraph = {
                    VERSION: "2.0.1",
                    init: n
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            11 : 11,
            17 : 17,
            2 : 2
        }],
        49 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    var t = o('[data-am-widget="slider"]');
                    t.not(".am-slider-manual").each(function(t, e) {
                        var i = s.utils.parseOptions(o(e).attr("data-am-slider"));
                        o(e).flexslider(i)
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                t(10);
                var s = o.AMUI;
                o(n),
                e.exports = o.AMUI.slider = {
                    VERSION: "3.0.1",
                    init: n
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            10 : 10,
            2 : 2
        }],
        50 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    o('[data-am-widget="tabs"]').each(function() {
                        var t = o(this).data("amTabsNoswipe") ? {
                            noSwipe: 1
                        }: {};
                        o(this).tabs(t)
                    })
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                t(24),
                o(n),
                e.exports = o.AMUI.tab = {
                    VERSION: "4.0.1",
                    init: n
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2,
            24 : 24
        }],
        51 : [function(t, e) { (function(i) {
                "use strict";
                var n = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null;
                t(2),
                e.exports = n.AMUI.titlebar = {
                    VERSION: "4.0.1"
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }],
        52 : [function(t, e) { (function(i) {
                "use strict";
                function n() {
                    var t = o('[data-am-widget="wechatpay"]');
                    return a ? void t.on("click", ".am-wechatpay-btn",
                    function(t) {
                        t.preventDefault();
                        var e = s.utils.parseOptions(o(this).parent().data("wechatPay"));
                        return window.wx ? void wx.checkJsApi({
                            jsApiList: ["chooseWXPay"],
                            success: function(t) {
                                t.checkResult.chooseWXPay ? wx.chooseWXPay(e) : alert("微信版本不支持支付接口或没有开启！")
                            },
                            fail: function() {
                                alert("调用 checkJsApi 接口时发生错误!")
                            }
                        }) : void alert("没有微信 JS SDK")
                    }) : (t.hide(), !1)
                }
                var o = "undefined" != typeof window ? window.jQuery: "undefined" != typeof i ? i.jQuery: null,
                s = t(2),
                a = window.navigator.userAgent.indexOf("MicroMessenger") > -1,
                r = n;
                o(r),
                e.exports = o.AMUI.pay = {
                    VERSION: "1.0.0",
                    init: r
                }
            }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
        },
        {
            2 : 2
        }]
    },
    {},
    [1])(1)
});; !
function() {
    var n = this,
    t = n._,
    r = {},
    e = Array.prototype,
    u = Object.prototype,
    i = Function.prototype,
    a = e.push,
    o = e.slice,
    c = e.concat,
    l = u.toString,
    f = u.hasOwnProperty,
    s = e.forEach,
    p = e.map,
    v = e.reduce,
    h = e.reduceRight,
    d = e.filter,
    g = e.every,
    m = e.some,
    y = e.indexOf,
    b = e.lastIndexOf,
    x = Array.isArray,
    _ = Object.keys,
    w = i.bind,
    j = function(n) {
        return n instanceof j ? n: this instanceof j ? void(this._wrapped = n) : new j(n)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = j), exports._ = j) : n._ = j,
    j.VERSION = "1.5.0";
    var A = j.each = j.forEach = function(n, t, e) {
        if (null != n) if (s && n.forEach === s) n.forEach(t, e);
        else if (n.length === +n.length) {
            for (var u = 0,
            i = n.length; i > u; u++) if (t.call(e, n[u], u, n) === r) return
        } else for (var a in n) if (j.has(n, a) && t.call(e, n[a], a, n) === r) return
    };
    j.map = j.collect = function(n, t, r) {
        var e = [];
        return null == n ? e: p && n.map === p ? n.map(t, r) : (A(n,
        function(n, u, i) {
            e.push(t.call(r, n, u, i))
        }), e)
    };
    var E = "Reduce of empty array with no initial value";
    j.reduce = j.foldl = j.inject = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), v && n.reduce === v) return e && (t = j.bind(t, e)),
        u ? n.reduce(t, r) : n.reduce(t);
        if (A(n,
        function(n, i, a) {
            u ? r = t.call(e, r, n, i, a) : (r = n, u = !0)
        }), !u) throw new TypeError(E);
        return r
    },
    j.reduceRight = j.foldr = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), h && n.reduceRight === h) return e && (t = j.bind(t, e)),
        u ? n.reduceRight(t, r) : n.reduceRight(t);
        var i = n.length;
        if (i !== +i) {
            var a = j.keys(n);
            i = a.length
        }
        if (A(n,
        function(o, c, l) {
            c = a ? a[--i] : --i,
            u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0)
        }), !u) throw new TypeError(E);
        return r
    },
    j.find = j.detect = function(n, t, r) {
        var e;
        return O(n,
        function(n, u, i) {
            return t.call(r, n, u, i) ? (e = n, !0) : void 0
        }),
        e
    },
    j.filter = j.select = function(n, t, r) {
        var e = [];
        return null == n ? e: d && n.filter === d ? n.filter(t, r) : (A(n,
        function(n, u, i) {
            t.call(r, n, u, i) && e.push(n)
        }), e)
    },
    j.reject = function(n, t, r) {
        return j.filter(n,
        function(n, e, u) {
            return ! t.call(r, n, e, u)
        },
        r)
    },
    j.every = j.all = function(n, t, e) {
        t || (t = j.identity);
        var u = !0;
        return null == n ? u: g && n.every === g ? n.every(t, e) : (A(n,
        function(n, i, a) {
            return (u = u && t.call(e, n, i, a)) ? void 0 : r
        }), !!u)
    };
    var O = j.some = j.any = function(n, t, e) {
        t || (t = j.identity);
        var u = !1;
        return null == n ? u: m && n.some === m ? n.some(t, e) : (A(n,
        function(n, i, a) {
            return u || (u = t.call(e, n, i, a)) ? r: void 0
        }), !!u)
    };
    j.contains = j.include = function(n, t) {
        return null == n ? !1 : y && n.indexOf === y ? -1 != n.indexOf(t) : O(n,
        function(n) {
            return n === t
        })
    },
    j.invoke = function(n, t) {
        var r = o.call(arguments, 2),
        e = j.isFunction(t);
        return j.map(n,
        function(n) {
            return (e ? t: n[t]).apply(n, r)
        })
    },
    j.pluck = function(n, t) {
        return j.map(n,
        function(n) {
            return n[t]
        })
    },
    j.where = function(n, t, r) {
        return j.isEmpty(t) ? r ? void 0 : [] : j[r ? "find": "filter"](n,
        function(n) {
            for (var r in t) if (t[r] !== n[r]) return ! 1;
            return ! 0
        })
    },
    j.findWhere = function(n, t) {
        return j.where(n, t, !0)
    },
    j.max = function(n, t, r) {
        if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535) return Math.max.apply(Math, n);
        if (!t && j.isEmpty(n)) return - 1 / 0;
        var e = {
            computed: -1 / 0,
            value: -1 / 0
        };
        return A(n,
        function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            a > e.computed && (e = {
                value: n,
                computed: a
            })
        }),
        e.value
    },
    j.min = function(n, t, r) {
        if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535) return Math.min.apply(Math, n);
        if (!t && j.isEmpty(n)) return 1 / 0;
        var e = {
            computed: 1 / 0,
            value: 1 / 0
        };
        return A(n,
        function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            a < e.computed && (e = {
                value: n,
                computed: a
            })
        }),
        e.value
    },
    j.shuffle = function(n) {
        var t, r = 0,
        e = [];
        return A(n,
        function(n) {
            t = j.random(r++),
            e[r - 1] = e[t],
            e[t] = n
        }),
        e
    };
    var F = function(n) {
        return j.isFunction(n) ? n: function(t) {
            return t[n]
        }
    };
    j.sortBy = function(n, t, r) {
        var e = F(t);
        return j.pluck(j.map(n,
        function(n, t, u) {
            return {
                value: n,
                index: t,
                criteria: e.call(r, n, t, u)
            }
        }).sort(function(n, t) {
            var r = n.criteria,
            e = t.criteria;
            if (r !== e) {
                if (r > e || void 0 === r) return 1;
                if (e > r || void 0 === e) return - 1
            }
            return n.index < t.index ? -1 : 1
        }), "value")
    };
    var k = function(n, t, r, e) {
        var u = {},
        i = F(null == t ? j.identity: t);
        return A(n,
        function(t, a) {
            var o = i.call(r, t, a, n);
            e(u, o, t)
        }),
        u
    };
    j.groupBy = function(n, t, r) {
        return k(n, t, r,
        function(n, t, r) { (j.has(n, t) ? n[t] : n[t] = []).push(r)
        })
    },
    j.countBy = function(n, t, r) {
        return k(n, t, r,
        function(n, t) {
            j.has(n, t) || (n[t] = 0),
            n[t]++
        })
    },
    j.sortedIndex = function(n, t, r, e) {
        r = null == r ? j.identity: F(r);
        for (var u = r.call(e, t), i = 0, a = n.length; a > i;) {
            var o = i + a >>> 1;
            r.call(e, n[o]) < u ? i = o + 1 : a = o
        }
        return i
    },
    j.toArray = function(n) {
        return n ? j.isArray(n) ? o.call(n) : n.length === +n.length ? j.map(n, j.identity) : j.values(n) : []
    },
    j.size = function(n) {
        return null == n ? 0 : n.length === +n.length ? n.length: j.keys(n).length
    },
    j.first = j.head = j.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : o.call(n, 0, t)
    },
    j.initial = function(n, t, r) {
        return o.call(n, 0, n.length - (null == t || r ? 1 : t))
    },
    j.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0))
    },
    j.rest = j.tail = j.drop = function(n, t, r) {
        return o.call(n, null == t || r ? 1 : t)
    },
    j.compact = function(n) {
        return j.filter(n, j.identity)
    };
    var R = function(n, t, r) {
        return t && j.every(n, j.isArray) ? c.apply(r, n) : (A(n,
        function(n) {
            j.isArray(n) || j.isArguments(n) ? t ? a.apply(r, n) : R(n, t, r) : r.push(n)
        }), r)
    };
    j.flatten = function(n, t) {
        return R(n, t, [])
    },
    j.without = function(n) {
        return j.difference(n, o.call(arguments, 1))
    },
    j.uniq = j.unique = function(n, t, r, e) {
        j.isFunction(t) && (e = r, r = t, t = !1);
        var u = r ? j.map(n, r, e) : n,
        i = [],
        a = [];
        return A(u,
        function(r, e) { (t ? e && a[a.length - 1] === r: j.contains(a, r)) || (a.push(r), i.push(n[e]))
        }),
        i
    },
    j.union = function() {
        return j.uniq(j.flatten(arguments, !0))
    },
    j.intersection = function(n) {
        var t = o.call(arguments, 1);
        return j.filter(j.uniq(n),
        function(n) {
            return j.every(t,
            function(t) {
                return j.indexOf(t, n) >= 0
            })
        })
    },
    j.difference = function(n) {
        var t = c.apply(e, o.call(arguments, 1));
        return j.filter(n,
        function(n) {
            return ! j.contains(t, n)
        })
    },
    j.zip = function() {
        return j.unzip.apply(j, o.call(arguments))
    },
    j.unzip = function() {
        for (var n = j.max(j.pluck(arguments, "length").concat(0)), t = new Array(n), r = 0; n > r; r++) t[r] = j.pluck(arguments, "" + r);
        return t
    },
    j.object = function(n, t) {
        if (null == n) return {};
        for (var r = {},
        e = 0,
        u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    },
    j.indexOf = function(n, t, r) {
        if (null == n) return - 1;
        var e = 0,
        u = n.length;
        if (r) {
            if ("number" != typeof r) return e = j.sortedIndex(n, t),
            n[e] === t ? e: -1;
            e = 0 > r ? Math.max(0, u + r) : r
        }
        if (y && n.indexOf === y) return n.indexOf(t, r);
        for (; u > e; e++) if (n[e] === t) return e;
        return - 1
    },
    j.lastIndexOf = function(n, t, r) {
        if (null == n) return - 1;
        var e = null != r;
        if (b && n.lastIndexOf === b) return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
        for (var u = e ? r: n.length; u--;) if (n[u] === t) return u;
        return - 1
    },
    j.range = function(n, t, r) {
        arguments.length <= 1 && (t = n || 0, n = 0),
        r = arguments[2] || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = new Array(e); e > u;) i[u++] = n,
        n += r;
        return i
    };
    var M = function() {};
    j.bind = function(n, t) {
        var r, e;
        if (w && n.bind === w) return w.apply(n, o.call(arguments, 1));
        if (!j.isFunction(n)) throw new TypeError;
        return r = o.call(arguments, 2),
        e = function() {
            if (! (this instanceof e)) return n.apply(t, r.concat(o.call(arguments)));
            M.prototype = n.prototype;
            var u = new M;
            M.prototype = null;
            var i = n.apply(u, r.concat(o.call(arguments)));
            return Object(i) === i ? i: u
        }
    },
    j.partial = function(n) {
        var t = o.call(arguments, 1);
        return function() {
            return n.apply(this, t.concat(o.call(arguments)))
        }
    },
    j.bindAll = function(n) {
        var t = o.call(arguments, 1);
        if (0 === t.length) throw new Error("bindAll must be passed function names");
        return A(t,
        function(t) {
            n[t] = j.bind(n[t], n)
        }),
        n
    },
    j.memoize = function(n, t) {
        var r = {};
        return t || (t = j.identity),
        function() {
            var e = t.apply(this, arguments);
            return j.has(r, e) ? r[e] : r[e] = n.apply(this, arguments)
        }
    },
    j.delay = function(n, t) {
        var r = o.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r)
        },
        t)
    },
    j.defer = function(n) {
        return j.delay.apply(j, [n, 1].concat(o.call(arguments, 1)))
    },
    j.throttle = function(n, t, r) {
        var e, u, i, a = null,
        o = 0;
        r || (r = {});
        var c = function() {
            o = new Date,
            a = null,
            i = n.apply(e, u)
        };
        return function() {
            var l = new Date;
            o || r.leading !== !1 || (o = l);
            var f = t - (l - o);
            return e = this,
            u = arguments,
            0 >= f ? (clearTimeout(a), a = null, o = l, i = n.apply(e, u)) : a || r.trailing === !1 || (a = setTimeout(c, f)),
            i
        }
    },
    j.debounce = function(n, t, r) {
        var e, u = null;
        return function() {
            var i = this,
            a = arguments,
            o = function() {
                u = null,
                r || (e = n.apply(i, a))
            },
            c = r && !u;
            return clearTimeout(u),
            u = setTimeout(o, t),
            c && (e = n.apply(i, a)),
            e
        }
    },
    j.once = function(n) {
        var t, r = !1;
        return function() {
            return r ? t: (r = !0, t = n.apply(this, arguments), n = null, t)
        }
    },
    j.wrap = function(n, t) {
        return function() {
            var r = [n];
            return a.apply(r, arguments),
            t.apply(this, r)
        }
    },
    j.compose = function() {
        var n = arguments;
        return function() {
            for (var t = arguments,
            r = n.length - 1; r >= 0; r--) t = [n[r].apply(this, t)];
            return t[0]
        }
    },
    j.after = function(n, t) {
        return function() {
            return--n < 1 ? t.apply(this, arguments) : void 0
        }
    },
    j.keys = _ ||
    function(n) {
        if (n !== Object(n)) throw new TypeError("Invalid object");
        var t = [];
        for (var r in n) j.has(n, r) && t.push(r);
        return t
    },
    j.values = function(n) {
        var t = [];
        for (var r in n) j.has(n, r) && t.push(n[r]);
        return t
    },
    j.pairs = function(n) {
        var t = [];
        for (var r in n) j.has(n, r) && t.push([r, n[r]]);
        return t
    },
    j.invert = function(n) {
        var t = {};
        for (var r in n) j.has(n, r) && (t[n[r]] = r);
        return t
    },
    j.functions = j.methods = function(n) {
        var t = [];
        for (var r in n) j.isFunction(n[r]) && t.push(r);
        return t.sort()
    },
    j.extend = function(n) {
        return A(o.call(arguments, 1),
        function(t) {
            if (t) for (var r in t) n[r] = t[r]
        }),
        n
    },
    j.pick = function(n) {
        var t = {},
        r = c.apply(e, o.call(arguments, 1));
        return A(r,
        function(r) {
            r in n && (t[r] = n[r])
        }),
        t
    },
    j.omit = function(n) {
        var t = {},
        r = c.apply(e, o.call(arguments, 1));
        for (var u in n) j.contains(r, u) || (t[u] = n[u]);
        return t
    },
    j.defaults = function(n) {
        return A(o.call(arguments, 1),
        function(t) {
            if (t) for (var r in t) void 0 === n[r] && (n[r] = t[r])
        }),
        n
    },
    j.clone = function(n) {
        return j.isObject(n) ? j.isArray(n) ? n.slice() : j.extend({},
        n) : n
    },
    j.tap = function(n, t) {
        return t(n),
        n
    };
    var S = function(n, t, r, e) {
        if (n === t) return 0 !== n || 1 / n == 1 / t;
        if (null == n || null == t) return n === t;
        n instanceof j && (n = n._wrapped),
        t instanceof j && (t = t._wrapped);
        var u = l.call(n);
        if (u != l.call(t)) return ! 1;
        switch (u) {
        case "[object String]":
            return n == String(t);
        case "[object Number]":
            return n != +n ? t != +t: 0 == n ? 1 / n == 1 / t: n == +t;
        case "[object Date]":
        case "[object Boolean]":
            return + n == +t;
        case "[object RegExp]":
            return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase
        }
        if ("object" != typeof n || "object" != typeof t) return ! 1;
        for (var i = r.length; i--;) if (r[i] == n) return e[i] == t;
        var a = n.constructor,
        o = t.constructor;
        if (a !== o && !(j.isFunction(a) && a instanceof a && j.isFunction(o) && o instanceof o)) return ! 1;
        r.push(n),
        e.push(t);
        var c = 0,
        f = !0;
        if ("[object Array]" == u) {
            if (c = n.length, f = c == t.length) for (; c--&&(f = S(n[c], t[c], r, e)););
        } else {
            for (var s in n) if (j.has(n, s) && (c++, !(f = j.has(t, s) && S(n[s], t[s], r, e)))) break;
            if (f) {
                for (s in t) if (j.has(t, s) && !c--) break;
                f = !c
            }
        }
        return r.pop(),
        e.pop(),
        f
    };
    j.isEqual = function(n, t) {
        return S(n, t, [], [])
    },
    j.isEmpty = function(n) {
        if (null == n) return ! 0;
        if (j.isArray(n) || j.isString(n)) return 0 === n.length;
        for (var t in n) if (j.has(n, t)) return ! 1;
        return ! 0
    },
    j.isElement = function(n) {
        return ! (!n || 1 !== n.nodeType)
    },
    j.isArray = x ||
    function(n) {
        return "[object Array]" == l.call(n)
    },
    j.isObject = function(n) {
        return n === Object(n)
    },
    A(["Arguments", "Function", "String", "Number", "Date", "RegExp"],
    function(n) {
        j["is" + n] = function(t) {
            return l.call(t) == "[object " + n + "]"
        }
    }),
    j.isArguments(arguments) || (j.isArguments = function(n) {
        return ! (!n || !j.has(n, "callee"))
    }),
    "function" != typeof / . / &&(j.isFunction = function(n) {
        return "function" == typeof n
    }),
    j.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    },
    j.isNaN = function(n) {
        return j.isNumber(n) && n != +n
    },
    j.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" == l.call(n)
    },
    j.isNull = function(n) {
        return null === n
    },
    j.isUndefined = function(n) {
        return void 0 === n
    },
    j.has = function(n, t) {
        return f.call(n, t)
    },
    j.noConflict = function() {
        return n._ = t,
        this
    },
    j.identity = function(n) {
        return n
    },
    j.times = function(n, t, r) {
        for (var e = Array(Math.max(0, n)), u = 0; n > u; u++) e[u] = t.call(r, u);
        return e
    },
    j.random = function(n, t) {
        return null == t && (t = n, n = 0),
        n + Math.floor(Math.random() * (t - n + 1))
    };
    var I = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    I.unescape = j.invert(I.escape);
    var T = {
        escape: new RegExp("[" + j.keys(I.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + j.keys(I.unescape).join("|") + ")", "g")
    };
    j.each(["escape", "unescape"],
    function(n) {
        j[n] = function(t) {
            return null == t ? "": ("" + t).replace(T[n],
            function(t) {
                return I[n][t]
            })
        }
    }),
    j.result = function(n, t) {
        if (null == n) return void 0;
        var r = n[t];
        return j.isFunction(r) ? r.call(n) : r
    },
    j.mixin = function(n) {
        A(j.functions(n),
        function(t) {
            var r = j[t] = n[t];
            j.prototype[t] = function() {
                var n = [this._wrapped];
                return a.apply(n, arguments),
                D.call(this, r.apply(j, n))
            }
        })
    };
    var N = 0;
    j.uniqueId = function(n) {
        var t = ++N + "";
        return n ? n + t: t
    },
    j.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var q = /(.)^/,
    B = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    },
    z = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    j.template = function(n, t, r) {
        var e;
        r = j.defaults({},
        r, j.templateSettings);
        var u = new RegExp([(r.escape || q).source, (r.interpolate || q).source, (r.evaluate || q).source].join("|") + "|$", "g"),
        i = 0,
        a = "__p+='";
        n.replace(u,
        function(t, r, e, u, o) {
            return a += n.slice(i, o).replace(z,
            function(n) {
                return "\\" + B[n]
            }),
            r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"),
            e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"),
            u && (a += "';\n" + u + "\n__p+='"),
            i = o + t.length,
            t
        }),
        a += "';\n",
        r.variable || (a = "with(obj||{}){\n" + a + "}\n"),
        a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            e = new Function(r.variable || "obj", "_", a)
        } catch(o) {
            throw o.source = a,
            o
        }
        if (t) return e(t, j);
        var c = function(n) {
            return e.call(this, n, j)
        };
        return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}",
        c
    },
    j.chain = function(n) {
        return j(n).chain()
    };
    var D = function(n) {
        return this._chain ? j(n).chain() : n
    };
    j.mixin(j),
    A(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
    function(n) {
        var t = e[n];
        j.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments),
            "shift" != n && "splice" != n || 0 !== r.length || delete r[0],
            D.call(this, r)
        }
    }),
    A(["concat", "join", "slice"],
    function(n) {
        var t = e[n];
        j.prototype[n] = function() {
            return D.call(this, t.apply(this._wrapped, arguments))
        }
    }),
    j.extend(j.prototype, {
        chain: function() {
            return this._chain = !0,
            this
        },
        value: function() {
            return this._wrapped
        }
    })
}.call(this);; !
function(t, e) {
    if ("function" == typeof define && define.amd) define(["underscore", "jquery", "exports"],
    function(i, n, s) {
        t.Backbone = e(t, s, i, n)
    });
    else if ("undefined" != typeof exports) {
        var i = require("underscore");
        e(t, exports, i)
    } else t.Backbone = e(t, {},
    t._, t.jQuery || t.Zepto || t.ender || t.$)
} (this,
function(t, e, i, n) {
    {
        var s = t.Backbone,
        r = [],
        a = (r.push, r.slice);
        r.splice
    }
    e.VERSION = "1.1.2",
    e.$ = n,
    e.noConflict = function() {
        return t.Backbone = s,
        this
    },
    e.emulateHTTP = !1,
    e.emulateJSON = !1;
    var o = e.Events = {
        on: function(t, e, i) {
            if (!u(this, "on", t, [e, i]) || !e) return this;
            this._events || (this._events = {});
            var n = this._events[t] || (this._events[t] = []);
            return n.push({
                callback: e,
                context: i,
                ctx: i || this
            }),
            this
        },
        once: function(t, e, n) {
            if (!u(this, "once", t, [e, n]) || !e) return this;
            var s = this,
            r = i.once(function() {
                s.off(t, r),
                e.apply(this, arguments)
            });
            return r._callback = e,
            this.on(t, r, n)
        },
        off: function(t, e, n) {
            var s, r, a, o, h, c, l, d;
            if (!this._events || !u(this, "off", t, [e, n])) return this;
            if (!t && !e && !n) return this._events = void 0,
            this;
            for (o = t ? [t] : i.keys(this._events), h = 0, c = o.length; c > h; h++) if (t = o[h], a = this._events[t]) {
                if (this._events[t] = s = [], e || n) for (l = 0, d = a.length; d > l; l++) r = a[l],
                (e && e !== r.callback && e !== r.callback._callback || n && n !== r.context) && s.push(r);
                s.length || delete this._events[t]
            }
            return this
        },
        trigger: function(t) {
            if (!this._events) return this;
            var e = a.call(arguments, 1);
            if (!u(this, "trigger", t, e)) return this;
            var i = this._events[t],
            n = this._events.all;
            return i && c(i, e),
            n && c(n, arguments),
            this
        },
        stopListening: function(t, e, n) {
            var s = this._listeningTo;
            if (!s) return this;
            var r = !e && !n;
            n || "object" != typeof e || (n = this),
            t && ((s = {})[t._listenId] = t);
            for (var a in s) t = s[a],
            t.off(e, n, this),
            (r || i.isEmpty(t._events)) && delete this._listeningTo[a];
            return this
        }
    },
    h = /\s+/,
    u = function(t, e, i, n) {
        if (!i) return ! 0;
        if ("object" == typeof i) {
            for (var s in i) t[e].apply(t, [s, i[s]].concat(n));
            return ! 1
        }
        if (h.test(i)) {
            for (var r = i.split(h), a = 0, o = r.length; o > a; a++) t[e].apply(t, [r[a]].concat(n));
            return ! 1
        }
        return ! 0
    },
    c = function(t, e) {
        var i, n = -1,
        s = t.length,
        r = e[0],
        a = e[1],
        o = e[2];
        switch (e.length) {
        case 0:
            for (; ++n < s;)(i = t[n]).callback.call(i.ctx);
            return;
        case 1:
            for (; ++n < s;)(i = t[n]).callback.call(i.ctx, r);
            return;
        case 2:
            for (; ++n < s;)(i = t[n]).callback.call(i.ctx, r, a);
            return;
        case 3:
            for (; ++n < s;)(i = t[n]).callback.call(i.ctx, r, a, o);
            return;
        default:
            for (; ++n < s;)(i = t[n]).callback.apply(i.ctx, e);
            return
        }
    },
    l = {
        listenTo: "on",
        listenToOnce: "once"
    };
    i.each(l,
    function(t, e) {
        o[e] = function(e, n, s) {
            var r = this._listeningTo || (this._listeningTo = {}),
            a = e._listenId || (e._listenId = i.uniqueId("l"));
            return r[a] = e,
            s || "object" != typeof n || (s = this),
            e[t](n, s, this),
            this
        }
    }),
    o.bind = o.on,
    o.unbind = o.off,
    i.extend(e, o);
    var d = e.Model = function(t, e) {
        var n = t || {};
        e || (e = {}),
        this.cid = i.uniqueId("c"),
        this.attributes = {},
        e.collection && (this.collection = e.collection),
        e.parse && (n = this.parse(n, e) || {}),
        n = i.defaults({},
        n, i.result(this, "defaults")),
        this.set(n, e),
        this.changed = {},
        this.initialize.apply(this, arguments)
    };
    i.extend(d.prototype, o, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return i.clone(this.attributes)
        },
        sync: function() {
            return e.sync.apply(this, arguments)
        },
        get: function(t) {
            return this.attributes[t]
        },
        escape: function(t) {
            return i.escape(this.get(t))
        },
        has: function(t) {
            return null != this.get(t)
        },
        set: function(t, e, n) {
            var s, r, a, o, h, u, c, l;
            if (null == t) return this;
            if ("object" == typeof t ? (r = t, n = e) : (r = {})[t] = e, n || (n = {}), !this._validate(r, n)) return ! 1;
            a = n.unset,
            h = n.silent,
            o = [],
            u = this._changing,
            this._changing = !0,
            u || (this._previousAttributes = i.clone(this.attributes), this.changed = {}),
            l = this.attributes,
            c = this._previousAttributes,
            this.idAttribute in r && (this.id = r[this.idAttribute]);
            for (s in r) e = r[s],
            i.isEqual(l[s], e) || o.push(s),
            i.isEqual(c[s], e) ? delete this.changed[s] : this.changed[s] = e,
            a ? delete l[s] : l[s] = e;
            if (!h) {
                o.length && (this._pending = n);
                for (var d = 0,
                f = o.length; f > d; d++) this.trigger("change:" + o[d], this, l[o[d]], n)
            }
            if (u) return this;
            if (!h) for (; this._pending;) n = this._pending,
            this._pending = !1,
            this.trigger("change", this, n);
            return this._pending = !1,
            this._changing = !1,
            this
        },
        unset: function(t, e) {
            return this.set(t, void 0, i.extend({},
            e, {
                unset: !0
            }))
        },
        clear: function(t) {
            var e = {};
            for (var n in this.attributes) e[n] = void 0;
            return this.set(e, i.extend({},
            t, {
                unset: !0
            }))
        },
        hasChanged: function(t) {
            return null == t ? !i.isEmpty(this.changed) : i.has(this.changed, t)
        },
        changedAttributes: function(t) {
            if (!t) return this.hasChanged() ? i.clone(this.changed) : !1;
            var e, n = !1,
            s = this._changing ? this._previousAttributes: this.attributes;
            for (var r in t) i.isEqual(s[r], e = t[r]) || ((n || (n = {}))[r] = e);
            return n
        },
        previous: function(t) {
            return null != t && this._previousAttributes ? this._previousAttributes[t] : null
        },
        previousAttributes: function() {
            return i.clone(this._previousAttributes)
        },
        fetch: function(t) {
            t = t ? i.clone(t) : {},
            void 0 === t.parse && (t.parse = !0);
            var e = this,
            n = t.success;
            return t.success = function(i) {
                return e.set(e.parse(i, t), t) ? (n && n(e, i, t), void e.trigger("sync", e, i, t)) : !1
            },
            U(this, t),
            this.sync("read", this, t)
        },
        save: function(t, e, n) {
            var s, r, a, o = this.attributes;
            if (null == t || "object" == typeof t ? (s = t, n = e) : (s = {})[t] = e, n = i.extend({
                validate: !0
            },
            n), s && !n.wait) {
                if (!this.set(s, n)) return ! 1
            } else if (!this._validate(s, n)) return ! 1;
            s && n.wait && (this.attributes = i.extend({},
            o, s)),
            void 0 === n.parse && (n.parse = !0);
            var h = this,
            u = n.success;
            return n.success = function(t) {
                h.attributes = o;
                var e = h.parse(t, n);
                return n.wait && (e = i.extend(s || {},
                e)),
                i.isObject(e) && !h.set(e, n) ? !1 : (u && u(h, t, n), void h.trigger("sync", h, t, n))
            },
            U(this, n),
            r = this.isNew() ? "create": n.patch ? "patch": "update",
            "patch" === r && (n.attrs = s),
            a = this.sync(r, this, n),
            s && n.wait && (this.attributes = o),
            a
        },
        destroy: function(t) {
            t = t ? i.clone(t) : {};
            var e = this,
            n = t.success,
            s = function() {
                e.trigger("destroy", e, e.collection, t)
            };
            if (t.success = function(i) { (t.wait || e.isNew()) && s(),
                n && n(e, i, t),
                e.isNew() || e.trigger("sync", e, i, t)
            },
            this.isNew()) return t.success(),
            !1;
            U(this, t);
            var r = this.sync("delete", this, t);
            return t.wait || s(),
            r
        },
        url: function() {
            var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || j();
            return this.isNew() ? t: t.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
        },
        parse: function(t) {
            return t
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return ! this.has(this.idAttribute)
        },
        isValid: function(t) {
            return this._validate({},
            i.extend(t || {},
            {
                validate: !0
            }))
        },
        _validate: function(t, e) {
            if (!e.validate || !this.validate) return ! 0;
            t = i.extend({},
            this.attributes, t);
            var n = this.validationError = this.validate(t, e) || null;
            return n ? (this.trigger("invalid", this, n, i.extend(e, {
                validationError: n
            })), !1) : !0
        }
    });
    var f = ["keys", "values", "pairs", "invert", "pick", "omit"];
    i.each(f,
    function(t) {
        d.prototype[t] = function() {
            var e = a.call(arguments);
            return e.unshift(this.attributes),
            i[t].apply(i, e)
        }
    });
    var p = e.Collection = function(t, e) {
        e || (e = {}),
        e.model && (this.model = e.model),
        void 0 !== e.comparator && (this.comparator = e.comparator),
        this._reset(),
        this.initialize.apply(this, arguments),
        t && this.reset(t, i.extend({
            silent: !0
        },
        e))
    },
    g = {
        add: !0,
        remove: !0,
        merge: !0
    },
    v = {
        add: !0,
        remove: !1
    };
    i.extend(p.prototype, o, {
        model: d,
        initialize: function() {},
        toJSON: function(t) {
            return this.map(function(e) {
                return e.toJSON(t)
            })
        },
        sync: function() {
            return e.sync.apply(this, arguments)
        },
        add: function(t, e) {
            return this.set(t, i.extend({
                merge: !1
            },
            e, v))
        },
        remove: function(t, e) {
            var n = !i.isArray(t);
            t = n ? [t] : i.clone(t),
            e || (e = {});
            var s, r, a, o;
            for (s = 0, r = t.length; r > s; s++) o = t[s] = this.get(t[s]),
            o && (delete this._byId[o.id], delete this._byId[o.cid], a = this.indexOf(o), this.models.splice(a, 1), this.length--, e.silent || (e.index = a, o.trigger("remove", o, this, e)), this._removeReference(o, e));
            return n ? t[0] : t
        },
        set: function(t, e) {
            e = i.defaults({},
            e, g),
            e.parse && (t = this.parse(t, e));
            var n = !i.isArray(t);
            t = n ? t ? [t] : [] : i.clone(t);
            var s, r, a, o, h, u, c, l = e.at,
            f = this.model,
            p = this.comparator && null == l && e.sort !== !1,
            v = i.isString(this.comparator) ? this.comparator: null,
            m = [],
            y = [],
            _ = {},
            b = e.add,
            w = e.merge,
            x = e.remove,
            E = !p && b && x ? [] : !1;
            for (s = 0, r = t.length; r > s; s++) {
                if (h = t[s] || {},
                a = h instanceof d ? o = h: h[f.prototype.idAttribute || "id"], u = this.get(a)) x && (_[u.cid] = !0),
                w && (h = h === o ? o.attributes: h, e.parse && (h = u.parse(h, e)), u.set(h, e), p && !c && u.hasChanged(v) && (c = !0)),
                t[s] = u;
                else if (b) {
                    if (o = t[s] = this._prepareModel(h, e), !o) continue;
                    m.push(o),
                    this._addReference(o, e)
                }
                o = u || o,
                !E || !o.isNew() && _[o.id] || E.push(o),
                _[o.id] = !0
            }
            if (x) {
                for (s = 0, r = this.length; r > s; ++s) _[(o = this.models[s]).cid] || y.push(o);
                y.length && this.remove(y, e)
            }
            if (m.length || E && E.length) if (p && (c = !0), this.length += m.length, null != l) for (s = 0, r = m.length; r > s; s++) this.models.splice(l + s, 0, m[s]);
            else {
                E && (this.models.length = 0);
                var k = E || m;
                for (s = 0, r = k.length; r > s; s++) this.models.push(k[s])
            }
            if (c && this.sort({
                silent: !0
            }), !e.silent) {
                for (s = 0, r = m.length; r > s; s++)(o = m[s]).trigger("add", o, this, e); (c || E && E.length) && this.trigger("sort", this, e)
            }
            return n ? t[0] : t
        },
        reset: function(t, e) {
            e || (e = {});
            for (var n = 0,
            s = this.models.length; s > n; n++) this._removeReference(this.models[n], e);
            return e.previousModels = this.models,
            this._reset(),
            t = this.add(t, i.extend({
                silent: !0
            },
            e)),
            e.silent || this.trigger("reset", this, e),
            t
        },
        push: function(t, e) {
            return this.add(t, i.extend({
                at: this.length
            },
            e))
        },
        pop: function(t) {
            var e = this.at(this.length - 1);
            return this.remove(e, t),
            e
        },
        unshift: function(t, e) {
            return this.add(t, i.extend({
                at: 0
            },
            e))
        },
        shift: function(t) {
            var e = this.at(0);
            return this.remove(e, t),
            e
        },
        slice: function() {
            return a.apply(this.models, arguments)
        },
        get: function(t) {
            return null == t ? void 0 : this._byId[t] || this._byId[t.id] || this._byId[t.cid]
        },
        at: function(t) {
            return this.models[t]
        },
        where: function(t, e) {
            return i.isEmpty(t) ? e ? void 0 : [] : this[e ? "find": "filter"](function(e) {
                for (var i in t) if (t[i] !== e.get(i)) return ! 1;
                return ! 0
            })
        },
        findWhere: function(t) {
            return this.where(t, !0)
        },
        sort: function(t) {
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            return t || (t = {}),
            i.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(i.bind(this.comparator, this)),
            t.silent || this.trigger("sort", this, t),
            this
        },
        pluck: function(t) {
            return i.invoke(this.models, "get", t)
        },
        fetch: function(t) {
            t = t ? i.clone(t) : {},
            void 0 === t.parse && (t.parse = !0);
            var e = t.success,
            n = this;
            return t.success = function(i) {
                var s = t.reset ? "reset": "set";
                n[s](i, t),
                e && e(n, i, t),
                n.trigger("sync", n, i, t)
            },
            U(this, t),
            this.sync("read", this, t)
        },
        create: function(t, e) {
            if (e = e ? i.clone(e) : {},
            !(t = this._prepareModel(t, e))) return ! 1;
            e.wait || this.add(t, e);
            var n = this,
            s = e.success;
            return e.success = function(t, i) {
                e.wait && n.add(t, e),
                s && s(t, i, e)
            },
            t.save(null, e),
            t
        },
        parse: function(t) {
            return t
        },
        clone: function() {
            return new this.constructor(this.models)
        },
        _reset: function() {
            this.length = 0,
            this.models = [],
            this._byId = {}
        },
        _prepareModel: function(t, e) {
            if (t instanceof d) return t;
            e = e ? i.clone(e) : {},
            e.collection = this;
            var n = new this.model(t, e);
            return n.validationError ? (this.trigger("invalid", this, n.validationError, e), !1) : n
        },
        _addReference: function(t) {
            this._byId[t.cid] = t,
            null != t.id && (this._byId[t.id] = t),
            t.collection || (t.collection = this),
            t.on("all", this._onModelEvent, this)
        },
        _removeReference: function(t) {
            this === t.collection && delete t.collection,
            t.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(t, e, i, n) { ("add" !== t && "remove" !== t || i === this) && ("destroy" === t && this.remove(e, n), e && t === "change:" + e.idAttribute && (delete this._byId[e.previous(e.idAttribute)], null != e.id && (this._byId[e.id] = e)), this.trigger.apply(this, arguments))
        }
    });
    var m = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
    i.each(m,
    function(t) {
        p.prototype[t] = function() {
            var e = a.call(arguments);
            return e.unshift(this.models),
            i[t].apply(i, e)
        }
    });
    var y = ["groupBy", "countBy", "sortBy", "indexBy"];
    i.each(y,
    function(t) {
        p.prototype[t] = function(e, n) {
            var s = i.isFunction(e) ? e: function(t) {
                return t.get(e)
            };
            return i[t](this.models, s, n)
        }
    });
    var _ = e.View = function(t) {
        this.cid = i.uniqueId("view"),
        t || (t = {}),
        i.extend(this, i.pick(t, w)),
        this._ensureElement(),
        this.initialize.apply(this, arguments),
        this.delegateEvents()
    },
    b = /^(\S+)\s*(.*)$/,
    w = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    i.extend(_.prototype, o, {
        tagName: "div",
        $: function(t) {
            return this.$el.find(t)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            return this.$el.remove(),
            this.stopListening(),
            this
        },
        setElement: function(t, i) {
            return this.$el && this.undelegateEvents(),
            this.$el = t instanceof e.$ ? t: e.$(t),
            this.el = this.$el[0],
            i !== !1 && this.delegateEvents(),
            this
        },
        delegateEvents: function(t) {
            if (!t && !(t = i.result(this, "events"))) return this;
            this.undelegateEvents();
            for (var e in t) {
                var n = t[e];
                if (i.isFunction(n) || (n = this[t[e]]), n) {
                    var s = e.match(b),
                    r = s[1],
                    a = s[2];
                    n = i.bind(n, this),
                    r += ".delegateEvents" + this.cid,
                    "" === a ? this.$el.on(r, n) : this.$el.on(r, a, n)
                }
            }
            return this
        },
        undelegateEvents: function() {
            return this.$el.off(".delegateEvents" + this.cid),
            this
        },
        _ensureElement: function() {
            if (this.el) this.setElement(i.result(this, "el"), !1);
            else {
                var t = i.extend({},
                i.result(this, "attributes"));
                this.id && (t.id = i.result(this, "id")),
                this.className && (t["class"] = i.result(this, "className"));
                var n = e.$("<" + i.result(this, "tagName") + ">").attr(t);
                this.setElement(n, !1)
            }
        }
    }),
    e.sync = function(t, n, s) {
        var r = E[t];
        i.defaults(s || (s = {}), {
            emulateHTTP: e.emulateHTTP,
            emulateJSON: e.emulateJSON
        });
        var a = {
            type: r,
            dataType: "json"
        };
        if (s.url || (a.url = i.result(n, "url") || j()), null != s.data || !n || "create" !== t && "update" !== t && "patch" !== t || (a.contentType = "application/json", a.data = JSON.stringify(s.attrs || n.toJSON(s))), s.emulateJSON && (a.contentType = "application/x-www-form-urlencoded", a.data = a.data ? {
            model: a.data
        }: {}), s.emulateHTTP && ("PUT" === r || "DELETE" === r || "PATCH" === r)) {
            a.type = "POST",
            s.emulateJSON && (a.data._method = r);
            var o = s.beforeSend;
            s.beforeSend = function(t) {
                return t.setRequestHeader("X-HTTP-Method-Override", r),
                o ? o.apply(this, arguments) : void 0
            }
        }
        "GET" === a.type || s.emulateJSON || (a.processData = !1),
        "PATCH" === a.type && x && (a.xhr = function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        });
        var h = s.xhr = e.ajax(i.extend(a, s));
        return n.trigger("request", n, h, s),
        h
    };
    var x = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
    E = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    e.ajax = function() {
        return e.$.ajax.apply(e.$, arguments)
    };
    var k = e.Router = function(t) {
        t || (t = {}),
        t.routes && (this.routes = t.routes),
        this._bindRoutes(),
        this.initialize.apply(this, arguments)
    },
    T = /\((.*?)\)/g,
    $ = /(\(\?)?:\w+/g,
    S = /\*\w+/g,
    H = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    i.extend(k.prototype, o, {
        initialize: function() {},
        route: function(t, n, s) {
            i.isRegExp(t) || (t = this._routeToRegExp(t)),
            i.isFunction(n) && (s = n, n = ""),
            s || (s = this[n]);
            var r = this;
            return e.history.route(t,
            function(i) {
                var a = r._extractParameters(t, i);
                r.execute(s, a),
                r.trigger.apply(r, ["route:" + n].concat(a)),
                r.trigger("route", n, a),
                e.history.trigger("route", r, n, a)
            }),
            this
        },
        execute: function(t, e) {
            t && t.apply(this, e)
        },
        navigate: function(t, i) {
            return e.history.navigate(t, i),
            this
        },
        _bindRoutes: function() {
            if (this.routes) {
                this.routes = i.result(this, "routes");
                for (var t, e = i.keys(this.routes); null != (t = e.pop());) this.route(t, this.routes[t])
            }
        },
        _routeToRegExp: function(t) {
            return t = t.replace(H, "\\$&").replace(T, "(?:$1)?").replace($,
            function(t, e) {
                return e ? t: "([^/?]+)"
            }).replace(S, "([^?]*?)"),
            new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
        },
        _extractParameters: function(t, e) {
            var n = t.exec(e).slice(1);
            return i.map(n,
            function(t, e) {
                return e === n.length - 1 ? t || null: t ? decodeURIComponent(t) : null
            })
        }
    });
    var A = e.History = function() {
        this.handlers = [],
        i.bindAll(this, "checkUrl"),
        "undefined" != typeof window && (this.location = window.location, this.history = window.history)
    },
    I = /^[#\/]|\s+$/g,
    N = /^\/+|\/+$/g,
    R = /msie [\w.]+/,
    O = /\/$/,
    P = /#.*$/;
    A.started = !1,
    i.extend(A.prototype, o, {
        interval: 50,
        atRoot: function() {
            return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
        },
        getHash: function(t) {
            var e = (t || this).location.href.match(/#(.*)$/);
            return e ? e[1] : ""
        },
        getFragment: function(t, e) {
            if (null == t) if (this._hasPushState || !this._wantsHashChange || e) {
                t = decodeURI(this.location.pathname + this.location.search);
                var i = this.root.replace(O, "");
                t.indexOf(i) || (t = t.slice(i.length))
            } else t = this.getHash();
            return t.replace(I, "")
        },
        start: function(t) {
            if (A.started) throw new Error("Backbone.history has already been started");
            A.started = !0,
            this.options = i.extend({
                root: "/"
            },
            this.options, t),
            this.root = this.options.root,
            this._wantsHashChange = this.options.hashChange !== !1,
            this._wantsPushState = !!this.options.pushState,
            this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var n = this.getFragment(),
            s = document.documentMode,
            r = R.exec(navigator.userAgent.toLowerCase()) && (!s || 7 >= s);
            if (this.root = ("/" + this.root + "/").replace(N, "/"), r && this._wantsHashChange) {
                var a = e.$('<iframe src="javascript:0" tabindex="-1">');
                this.iframe = a.hide().appendTo("body")[0].contentWindow,
                this.navigate(n)
            }
            this._hasPushState ? e.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !r ? e.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)),
            this.fragment = n;
            var o = this.location;
            if (this._wantsHashChange && this._wantsPushState) {
                if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0),
                this.location.replace(this.root + "#" + this.fragment),
                !0;
                this._hasPushState && this.atRoot() && o.hash && (this.fragment = this.getHash().replace(I, ""), this.history.replaceState({},
                document.title, this.root + this.fragment))
            }
            return this.options.silent ? void 0 : this.loadUrl()
        },
        stop: function() {
            e.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl),
            this._checkUrlInterval && clearInterval(this._checkUrlInterval),
            A.started = !1
        },
        route: function(t, e) {
            this.handlers.unshift({
                route: t,
                callback: e
            })
        },
        checkUrl: function() {
            var t = this.getFragment();
            return t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe))),
            t === this.fragment ? !1 : (this.iframe && this.navigate(t), void this.loadUrl())
        },
        loadUrl: function(t) {
            return t = this.fragment = this.getFragment(t),
            i.any(this.handlers,
            function(e) {
                return e.route.test(t) ? (e.callback(t), !0) : void 0
            })
        },
        navigate: function(t, e) {
            if (!A.started) return ! 1;
            e && e !== !0 || (e = {
                trigger: !!e
            });
            var i = this.root + (t = this.getFragment(t || ""));
            if (t = t.replace(P, ""), this.fragment !== t) {
                if (this.fragment = t, "" === t && "/" !== i && (i = i.slice(0, -1)), this._hasPushState) this.history[e.replace ? "replaceState": "pushState"]({},
                document.title, i);
                else {
                    if (!this._wantsHashChange) return this.location.assign(i);
                    this._updateHash(this.location, t, e.replace),
                    this.iframe && t !== this.getFragment(this.getHash(this.iframe)) && (e.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, t, e.replace))
                }
                return e.trigger ? this.loadUrl(t) : void 0
            }
        },
        _updateHash: function(t, e, i) {
            if (i) {
                var n = t.href.replace(/(javascript:|#).*$/, "");
                t.replace(n + "#" + e)
            } else t.hash = "#" + e
        }
    }),
    e.history = new A;
    var C = function(t, e) {
        var n, s = this;
        n = t && i.has(t, "constructor") ? t.constructor: function() {
            return s.apply(this, arguments)
        },
        i.extend(n, s, e);
        var r = function() {
            this.constructor = n
        };
        return r.prototype = s.prototype,
        n.prototype = new r,
        t && i.extend(n.prototype, t),
        n.__super__ = s.prototype,
        n
    };
    d.extend = p.extend = k.extend = _.extend = A.extend = C;
    var j = function() {
        throw new Error('A "url" property or function must be specified')
    },
    U = function(t, e) {
        var i = e.error;
        e.error = function(n) {
            i && i(t, n, e),
            t.trigger("error", t, n, e)
        }
    };
    return e
});;
"object" != typeof JSON && (JSON = {}),
function() {
    "use strict";
    function f(t) {
        return 10 > t ? "0" + t: t
    }
    function quote(t) {
        return escapable.lastIndex = 0,
        escapable.test(t) ? '"' + t.replace(escapable,
        function(t) {
            var e = meta[t];
            return "string" == typeof e ? e: "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice( - 4)
        }) + '"': '"' + t + '"'
    }
    function str(t, e) {
        var n, r, o, f, u, i = gap,
        p = e[t];
        switch (p && "object" == typeof p && "function" == typeof p.toJSON && (p = p.toJSON(t)), "function" == typeof rep && (p = rep.call(e, t, p)), typeof p) {
        case "string":
            return quote(p);
        case "number":
            return isFinite(p) ? String(p) : "null";
        case "boolean":
        case "null":
            return String(p);
        case "object":
            if (!p) return "null";
            if (gap += indent, u = [], "[object Array]" === Object.prototype.toString.apply(p)) {
                for (f = p.length, n = 0; f > n; n += 1) u[n] = str(n, p) || "null";
                return o = 0 === u.length ? "[]": gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + i + "]": "[" + u.join(",") + "]",
                gap = i,
                o
            }
            if (rep && "object" == typeof rep) for (f = rep.length, n = 0; f > n; n += 1)"string" == typeof rep[n] && (r = rep[n], o = str(r, p), o && u.push(quote(r) + (gap ? ": ": ":") + o));
            else for (r in p) Object.prototype.hasOwnProperty.call(p, r) && (o = str(r, p), o && u.push(quote(r) + (gap ? ": ": ":") + o));
            return o = 0 === u.length ? "{}": gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + i + "}": "{" + u.join(",") + "}",
            gap = i,
            o
        }
    }
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
    },
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    });
    var cx, escapable, gap, indent, meta, rep;
    "function" != typeof JSON.stringify && (escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    },
    JSON.stringify = function(t, e, n) {
        var r;
        if (gap = "", indent = "", "number" == typeof n) for (r = 0; n > r; r += 1) indent += " ";
        else "string" == typeof n && (indent = n);
        if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify");
        return str("", {
            "": t
        })
    }),
    "function" != typeof JSON.parse && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function(text, reviver) {
        function walk(t, e) {
            var n, r, o = t[e];
            if (o && "object" == typeof o) for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (r = walk(o, n), void 0 !== r ? o[n] = r: delete o[n]);
            return reviver.call(t, e, o)
        }
        var j;
        if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx,
        function(t) {
            return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice( - 4)
        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"),
        "function" == typeof reviver ? walk({
            "": j
        },
        "") : j;
        throw new SyntaxError("JSON.parse")
    })
} ();; !
function(e) {
    var a = e.bandeng || {};
    a.api = {
        basePath: "http://www.bandenghui.com",
        baseStaticPath: "http://s3.bandenghui.com",
        baseFilePath: "http://f.bandenghui.com/"
    },
    a.ucAPI = {
        isLogin: "/user/login/get_loginer"
    },
    a.formDate = function(e) {
        var a = new Date(1e3 * e),
        t = a.getFullYear(),
        n = a.getMonth() + 1,
        o = a.getDay(),
        r = a.getHours(),
        i = a.getMinutes();
        return 10 > n && (n = "0" + n),
        10 > o && (o = "0" + o),
        10 > r && (r = "0" + r),
        10 > i && (i = "0" + i),
        "" + t + "-" + n + "-" + o + " " + r + ":" + i
    },
    a.getYMD = function(e) {
        var a = e.getMonth() + 1,
        t = e.getDate();
        return a = 10 > a ? "0" + a: a,
        t = 10 > t ? "0" + t: t,
        e.getFullYear() + "-" + a + "-" + t
    },
    a.getHHMM = function(e) {
        var a = e.getHours(),
        t = e.getMinutes();
        return a = 10 > a ? "0" + a: a,
        t = 10 > t ? "0" + t: t,
        a + ":" + t
    },
    a.isLogin = function(e) {
        $.ajax({
            url: a.api.basePath + a.ucAPI.isLogin,
            type: "post",
            dataType: "json",
            async: !1,
            success: function(a) {
                e("ok" == a.status ? a.data: !1)
            }
        })
    },
    a.exitLogin = function() {
        location.href = a.api.basePath + "/user/login/out_login"
    },
    a.notifier = function() {
        return {
            info: function(e, a, t, n, o) {
                var r = '<div class="am-modal" tabindex="-1" id="J-tipMsg" style="width:' + t + "; margin-left:" + n + '"><div class="am-modal-dialog"><div class="am-modal-hd">' + (e || "提示信息") + '<a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a></div><div class="am-modal-bd" style="padding:40px 15px;">' + a + '</div></div><div class="am-modal-footer"><a href="javascript:void(0)" class="btn-confirm" data-am-modal-confirm>确定</a></div></div>';
                $("body").append(r),
                $("#J-tipMsg").modal({
                    relatedTarget: this,
                    closeViaDimmer: !1,
                    onConfirm: function() {
                        o && o(),
                        $("#J-tipMsg").modal("close"),
                        setTimeout(function() {
                            $("#J-confirm").remove()
                        },
                        300)
                    }
                }),
                $("#J-tipMsg").on("closed.modal.amui",
                function() {
                    $("#J-tipMsg").remove()
                })
            },
            modal: function(e, a, t) {
                $("body").append(e),
                $(a).modal({
                    relatedTarget: this,
                    closeViaDimmer: !1,
                    onConfirm: function() {
                        t && t(),
                        $(a).modal("close"),
                        setTimeout(function() {
                            $("#J-confirm").remove()
                        },
                        300)
                    }
                }),
                $(a).on("closed.modal.amui",
                function() {
                    $(a).remove()
                })
            },
            confirm: function(e, a, t, n, o) {
                var r = '<div class="am-modal" tabindex="-1" id="J-confirm" style="width:' + t + "; margin-left:" + n + '"><div class="am-modal-dialog"><div class="am-modal-hd">' + (e || "提示信息") + '<a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a></div><div class="am-modal-bd" style="padding:40px 15px;">' + a + '</div></div><div class="am-modal-footer"><a href="javascript:void(0)" class="btn-cancel" data-am-modal-close>取消</a><a href="javascript:void(0)" class="btn-confirm" data-am-modal-confirm>确定</a></div></div>';
                $("body").append(r),
                $("#J-confirm").modal({
                    relatedTarget: this,
                    onConfirm: function() {
                        o && o(),
                        $("#J-confirm").modal("close"),
                        setTimeout(function() {
                            $("#J-confirm").remove()
                        },
                        300)
                    }
                }),
                $("#J-confirm").on("closed.modal.amui",
                function() {
                    $("#J-confirm").remove()
                })
            }
        }
    } (),
    a.tiptype = function(e, a) {
        var t = $(a.obj),
        n = t.parents(".row-option");
        t.length && ("&nbsp;" == e ? ($(a.obj).parents(".row-option").find(".tip-error").remove(), $(a.obj).parents(".row-option").find(".tip-success").remove()) : ($(a.obj).parents(".row-option").find(".tip-error").remove(), $(a.obj).parents(".row-option").find(".tip-success").remove(), 3 == a.type && $('<div class="tip-error">' + e + "</div>").appendTo(n), 2 == a.type && $('<div class="tip-success">' + e + "</div>").appendTo(n)))
    },
    jQuery.easing.jswing = jQuery.easing.swing,
    jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(e, a, t, n, o) {
            return jQuery.easing[jQuery.easing.def](e, a, t, n, o)
        },
        easeInQuad: function(e, a, t, n, o) {
            return n * (a /= o) * a + t
        },
        easeOutQuad: function(e, a, t, n, o) {
            return - n * (a /= o) * (a - 2) + t
        },
        easeInOutQuad: function(e, a, t, n, o) {
            return (a /= o / 2) < 1 ? n / 2 * a * a + t: -n / 2 * (--a * (a - 2) - 1) + t
        },
        easeInCubic: function(e, a, t, n, o) {
            return n * (a /= o) * a * a + t
        },
        easeOutCubic: function(e, a, t, n, o) {
            return n * ((a = a / o - 1) * a * a + 1) + t
        },
        easeInOutCubic: function(e, a, t, n, o) {
            return (a /= o / 2) < 1 ? n / 2 * a * a * a + t: n / 2 * ((a -= 2) * a * a + 2) + t
        },
        easeInQuart: function(e, a, t, n, o) {
            return n * (a /= o) * a * a * a + t
        },
        easeOutQuart: function(e, a, t, n, o) {
            return - n * ((a = a / o - 1) * a * a * a - 1) + t
        },
        easeInOutQuart: function(e, a, t, n, o) {
            return (a /= o / 2) < 1 ? n / 2 * a * a * a * a + t: -n / 2 * ((a -= 2) * a * a * a - 2) + t
        },
        easeInQuint: function(e, a, t, n, o) {
            return n * (a /= o) * a * a * a * a + t
        },
        easeOutQuint: function(e, a, t, n, o) {
            return n * ((a = a / o - 1) * a * a * a * a + 1) + t
        },
        easeInOutQuint: function(e, a, t, n, o) {
            return (a /= o / 2) < 1 ? n / 2 * a * a * a * a * a + t: n / 2 * ((a -= 2) * a * a * a * a + 2) + t
        },
        easeInSine: function(e, a, t, n, o) {
            return - n * Math.cos(a / o * (Math.PI / 2)) + n + t
        },
        easeOutSine: function(e, a, t, n, o) {
            return n * Math.sin(a / o * (Math.PI / 2)) + t
        },
        easeInOutSine: function(e, a, t, n, o) {
            return - n / 2 * (Math.cos(Math.PI * a / o) - 1) + t
        },
        easeInExpo: function(e, a, t, n, o) {
            return 0 == a ? t: n * Math.pow(2, 10 * (a / o - 1)) + t
        },
        easeOutExpo: function(e, a, t, n, o) {
            return a == o ? t + n: n * ( - Math.pow(2, -10 * a / o) + 1) + t
        },
        easeInOutExpo: function(e, a, t, n, o) {
            return 0 == a ? t: a == o ? t + n: (a /= o / 2) < 1 ? n / 2 * Math.pow(2, 10 * (a - 1)) + t: n / 2 * ( - Math.pow(2, -10 * --a) + 2) + t
        },
        easeInCirc: function(e, a, t, n, o) {
            return - n * (Math.sqrt(1 - (a /= o) * a) - 1) + t
        },
        easeOutCirc: function(e, a, t, n, o) {
            return n * Math.sqrt(1 - (a = a / o - 1) * a) + t
        },
        easeInOutCirc: function(e, a, t, n, o) {
            return (a /= o / 2) < 1 ? -n / 2 * (Math.sqrt(1 - a * a) - 1) + t: n / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + t
        },
        easeInElastic: function(e, a, t, n, o) {
            var r = 1.70158,
            i = 0,
            s = n;
            if (0 == a) return t;
            if (1 == (a /= o)) return t + n;
            if (i || (i = .3 * o), s < Math.abs(n)) {
                s = n;
                var r = i / 4
            } else var r = i / (2 * Math.PI) * Math.asin(n / s);
            return - (s * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a * o - r) * Math.PI / i)) + t
        },
        easeOutElastic: function(e, a, t, n, o) {
            var r = 1.70158,
            i = 0,
            s = n;
            if (0 == a) return t;
            if (1 == (a /= o)) return t + n;
            if (i || (i = .3 * o), s < Math.abs(n)) {
                s = n;
                var r = i / 4
            } else var r = i / (2 * Math.PI) * Math.asin(n / s);
            return s * Math.pow(2, -10 * a) * Math.sin(2 * (a * o - r) * Math.PI / i) + n + t
        },
        easeInOutElastic: function(e, a, t, n, o) {
            var r = 1.70158,
            i = 0,
            s = n;
            if (0 == a) return t;
            if (2 == (a /= o / 2)) return t + n;
            if (i || (i = .3 * o * 1.5), s < Math.abs(n)) {
                s = n;
                var r = i / 4
            } else var r = i / (2 * Math.PI) * Math.asin(n / s);
            return 1 > a ? -.5 * s * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a * o - r) * Math.PI / i) + t: s * Math.pow(2, -10 * (a -= 1)) * Math.sin(2 * (a * o - r) * Math.PI / i) * .5 + n + t
        },
        easeInBack: function(e, a, t, n, o, r) {
            return void 0 == r && (r = 1.70158),
            n * (a /= o) * a * ((r + 1) * a - r) + t
        },
        easeOutBack: function(e, a, t, n, o, r) {
            return void 0 == r && (r = 1.70158),
            n * ((a = a / o - 1) * a * ((r + 1) * a + r) + 1) + t
        },
        easeInOutBack: function(e, a, t, n, o, r) {
            return void 0 == r && (r = 1.70158),
            (a /= o / 2) < 1 ? n / 2 * a * a * (((r *= 1.525) + 1) * a - r) + t: n / 2 * ((a -= 2) * a * (((r *= 1.525) + 1) * a + r) + 2) + t
        },
        easeInBounce: function(e, a, t, n, o) {
            return n - jQuery.easing.easeOutBounce(e, o - a, 0, n, o) + t
        },
        easeOutBounce: function(e, a, t, n, o) {
            return (a /= o) < 1 / 2.75 ? 7.5625 * n * a * a + t: 2 / 2.75 > a ? n * (7.5625 * (a -= 1.5 / 2.75) * a + .75) + t: 2.5 / 2.75 > a ? n * (7.5625 * (a -= 2.25 / 2.75) * a + .9375) + t: n * (7.5625 * (a -= 2.625 / 2.75) * a + .984375) + t
        },
        easeInOutBounce: function(e, a, t, n, o) {
            return o / 2 > a ? .5 * jQuery.easing.easeInBounce(e, 2 * a, 0, n, o) + t: .5 * jQuery.easing.easeOutBounce(e, 2 * a - o, 0, n, o) + .5 * n + t
        }
    }),
    !
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof module && module.exports ? require("jquery") : jQuery)
    } (function(e) {
        function a(a) {
            var t = {},
            n = /^jQuery\d+$/;
            return e.each(a.attributes,
            function(e, a) {
                a.specified && !n.test(a.name) && (t[a.name] = a.value)
            }),
            t
        }
        function t(a, t) {
            var n = this,
            r = e(n);
            if (n.value == r.attr("placeholder") && r.hasClass(p.customClass)) if (r.data("placeholder-password")) {
                if (r = r.hide().nextAll('input[type="password"]:first').show().attr("id", r.removeAttr("id").data("placeholder-id")), a === !0) return r[0].value = t;
                r.focus()
            } else n.value = "",
            r.removeClass(p.customClass),
            n == o() && n.select()
        }
        function n() {
            var n, o = this,
            r = e(o),
            i = this.id;
            if ("" === o.value) {
                if ("password" === o.type) {
                    if (!r.data("placeholder-textinput")) {
                        try {
                            n = r.clone().prop({
                                type: "text"
                            })
                        } catch(s) {
                            n = e("<input>").attr(e.extend(a(this), {
                                type: "text"
                            }))
                        }
                        n.removeAttr("name").data({
                            "placeholder-password": r,
                            "placeholder-id": i
                        }).bind("focus.placeholder", t),
                        r.data({
                            "placeholder-textinput": n,
                            "placeholder-id": i
                        }).before(n)
                    }
                    r = r.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", i).show()
                }
                r.addClass(p.customClass),
                r[0].value = r.attr("placeholder")
            } else r.removeClass(p.customClass)
        }
        function o() {
            try {
                return document.activeElement
            } catch(e) {}
        }
        var r, i, s = "[object OperaMini]" == Object.prototype.toString.call(window.operamini),
        u = "placeholder" in document.createElement("input") && !s,
        d = "placeholder" in document.createElement("textarea") && !s,
        c = e.valHooks,
        l = e.propHooks;
        if (u && d) i = e.fn.placeholder = function() {
            return this
        },
        i.input = i.textarea = !0;
        else {
            var p = {};
            i = e.fn.placeholder = function(a) {
                var o = {
                    customClass: "placeholder"
                };
                p = e.extend({},
                o, a);
                var r = this;
                return r.filter((u ? "textarea": ":input") + "[placeholder]").not("." + p.customClass).bind({
                    "focus.placeholder": t,
                    "blur.placeholder": n
                }).data("placeholder-enabled", !0).trigger("blur.placeholder"),
                r
            },
            i.input = u,
            i.textarea = d,
            r = {
                get: function(a) {
                    var t = e(a),
                    n = t.data("placeholder-password");
                    return n ? n[0].value: t.data("placeholder-enabled") && t.hasClass(p.customClass) ? "": a.value
                },
                set: function(a, r) {
                    var i = e(a),
                    s = i.data("placeholder-password");
                    return s ? s[0].value = r: i.data("placeholder-enabled") ? ("" === r ? (a.value = r, a != o() && n.call(a)) : i.hasClass(p.customClass) ? t.call(a, !0, r) || (a.value = r) : a.value = r, i) : a.value = r
                }
            },
            u || (c.input = r, l.value = r),
            d || (c.textarea = r, l.value = r),
            e(function() {
                e(document).delegate("form", "submit.placeholder",
                function() {
                    var a = e("." + p.customClass, this).each(t);
                    setTimeout(function() {
                        a.each(n)
                    },
                    10)
                })
            }),
            e(window).bind("beforeunload.placeholder",
            function() {
                e("." + p.customClass).each(function() {
                    this.value = ""
                })
            })
        }
    }),
    e.bandeng = a,
    $(document.body).ready(function() {
        var e = $(".h-user"),
        a = e.find(".u-menu");
        e.delegate(".u-vatar,.u-menu", "mouseenter",
        function() {
            a.stop(),
            a.fadeIn(200)
        }),
        e.delegate(".u-vatar,.u-menu", "mouseleave",
        function() {
            a.stop(),
            a.fadeOut(200)
        }),
        $("input, textarea").placeholder(),
        $(".wx-tabs").delegate("a", "click",
        function(e) {
            e.preventDefault();
            var a = $(this),
            t = a.index(),
            n = $(".wx-content");
            a.addClass("on"),
            a.siblings("a").removeClass("on"),
            n.find("p").hide(),
            n.find("p").eq(t).show()
        });
        var t = 0,
        n = 0;
        $(window).scrollTop() >= 55 && $("#bd-header").removeClass("p-header-show").addClass("p-header-hide"),
        $(window).scrollTop() < 55 && $("#bd-header").removeClass("p-header-hide").addClass("p-header-show"),
        $(window).scroll(function() {
            n = $(window).scrollTop(),
            t > n ? $(window).scrollTop() < 55 && ($("#bd-header").removeClass("p-header-hide").addClass("p-header-show"), $(".bd-wraper").css({
                marginTop: "55px"
            })) : $(window).scrollTop() >= 55 && ($("#bd-header").removeClass("p-header-show").addClass("p-header-hide"), $(".bd-wraper").css({
                marginTop: "0px"
            })),
            setTimeout(function() {
                t = n
            },
            0)
        })
    })
} (window);