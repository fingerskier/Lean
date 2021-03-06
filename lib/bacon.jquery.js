!function () {
    var a, b, c, d = [].slice;
    c = function (a, b) {
        var c, e, f, g, h, i, j, k, l, m, n, o;
        return i = function (a) {
            return a
        }, l = function (a) {
            return a.length > 0
        }, g = function (a, b, c) {
            var d, e, f;
            for (e = 0, f = a.length; f > e; e++)d = a[e], b = c(b, d);
            return b
        }, k = function (b) {
            return b instanceof a.Property
        }, h = 0, j = 1, f = function (a, b) {
            return a === b
        }, m = function (a) {
            return function (b, c) {
                return!b.initial && a(b.value, c.value)
            }
        }, e = a.Model = a.$.Model = function (b) {
            var d, g, h, k, l, p, q, r;
            return l = j++, g = f, p = 0, k = new a.Bus, q = new a.Bus, d = void 0, r = a.update({initial: !0}, [k],function (a, b) {
                var c, d, e, f, g, h;
                return h = a.value, g = b.source, d = b.f, f = d(h), e = [l], c = f !== h, {source: g, value: f, modStack: e, changed: c}
            }, [q],function (a, b) {
                return b
            }).skipDuplicates(m(g)).changes().toProperty(), h = r.map(".value").skipDuplicates(g), h.onValue(function (a) {
                return d = a
            }), h.id = l, h.addSyncSource = function (b) {
                return q.plug(b.filter(function (b) {
                    return b.changed && !a._.contains(b.modStack, l)
                }).doAction(function () {
                        return a.Model.syncCount++
                    }).map(function (a) {
                        return n(a, "modStack", a.modStack.concat([l]))
                    }).map(function (a) {
                        return o.set(a, h.syncConverter(o.get(a)))
                    }))
            }, h.apply = function (a) {
                return k.plug(a.toEventStream().map(function (b) {
                    return{source: a, f: b}
                })), r.changes().filter(function (b) {
                    return b.source !== a
                }).map(function (a) {
                        return a.value
                    })
            }, h.addSource = function (a) {
                return h.apply(a.map(function (a) {
                    return function () {
                        return a
                    }
                }))
            }, h.modify = function (b) {
                return h.apply(a.once(b))
            }, h.set = function (a) {
                return h.modify(function () {
                    return a
                })
            }, h.get = function () {
                return d
            }, h.syncEvents = function () {
                return r.toEventStream()
            }, h.bind = function (a) {
                return this.addSyncSource(a.syncEvents()), a.addSyncSource(this.syncEvents())
            }, h.onValue(), arguments.length >= 1 && h.set(b), h.lens = function (a) {
                var b;
                return a = c(a), b = e(), this.addSyncSource(h.sampledBy(b.syncEvents(), function (b, c) {
                    return o.set(c, a.set(b, c.value))
                })), b.addSyncSource(this.syncEvents().map(function (b) {
                    return o.set(b, a.get(b.value))
                })), b
            }, h.syncConverter = i, h
        }, a.Model.syncCount = 0, e.combine = function (a) {
            var b, d, f, g, h, i;
            if ("object" != typeof a)return e(a);
            if (k(a))return a;
            b = a instanceof Array ? [] : {}, h = e(b);
            for (d in a)i = a[d], f = c.objectLens(d), g = h.lens(f), g.bind(e.combine(i));
            return h
        }, a.Binding = a.$.Binding = function (b) {
            var c, d, e, f, g, h, i;
            return f = b.initValue, e = b.get, c = b.events, i = b.set, g = c.map(e), null != f ? i(f) : f = e(), h = a.Model(f), d = h.addSource(g), d.assign(i), h
        }, c = a.Lens = a.$.Lens = function (a) {
            return"object" == typeof a ? a : c.objectLens(a)
        }, c.id = c({get: function (a) {
            return a
        }, set: function (a, b) {
            return b
        }}), c.objectLens = function (a) {
            var b, d;
            return d = function (a) {
                return c({get: function (b) {
                    return b[a]
                }, set: function (b, c) {
                    return n(b, a, c)
                }})
            }, b = a.split(".").filter(l), c.compose.apply(c, b.map(d))
        }, c.compose = function () {
            var a, b;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], b = function (a, b) {
                return c({get: function (c) {
                    return b.get(a.get(c))
                }, set: function (c, d) {
                    var e, f;
                    return e = a.get(c), f = b.set(e, d), a.set(c, f)
                }})
            }, g(a, c.id, b)
        }, o = c.objectLens("value"), n = function (a, b, c) {
            var d, e, f;
            d = a instanceof Array ? [] : {};
            for (e in a)f = a[e], d[e] = f;
            return null != b && (d[b] = c), d
        }, b.fn.asEventStream = a.$.asEventStream, a.$.textFieldValue = function (b, c) {
            var d, e, f;
            return f = function () {
                return b.val()
            }, d = function () {
                return a.interval(50).take(10).map(f).filter(l).take(1)
            }, e = b.asEventStream("keyup input").merge(b.asEventStream("cut paste").delay(1)).merge(d()), a.Binding({initValue: c, get: f, events: e, set: function (a) {
                return b.val(a)
            }})
        }, a.$.checkBoxValue = function (b, c) {
            return a.Binding({initValue: c, get: function () {
                return b.is(":checked")
            }, events: b.asEventStream("change"), set: function (a) {
                return b.attr("checked", a)
            }})
        }, a.$.selectValue = function (b, c) {
            return a.Binding({initValue: c, get: function () {
                return b.val()
            }, events: b.asEventStream("change"), set: function (a) {
                return b.val(a)
            }})
        }, a.$.radioGroupValue = function (c, d) {
            return a.Binding({initValue: d, get: function () {
                return c.filter(":checked").first().val()
            }, events: c.asEventStream("change"), set: function (a) {
                return c.each(function (c, d) {
                    return d.value === a ? b(d).attr("checked", !0) : b(d).removeAttr("checked")
                })
            }})
        }, a.$.checkBoxGroupValue = function (c, d) {
            return a.Binding({initValue: d, get: function () {
                return c.filter(":checked").map(function (a, c) {
                    return b(c).val()
                }).toArray()
            }, events: c.asEventStream("change"), set: function (a) {
                return c.each(function (c, d) {
                    return b(d).attr("checked", a.indexOf(b(d).val()) >= 0)
                })
            }})
        }, a.$.ajax = function (c, d) {
            return a.fromPromise(b.ajax(c), d)
        }, a.$.ajaxGet = function (b, c, d, e) {
            return a.$.ajax({url: b, dataType: d, data: c}, e)
        }, a.$.ajaxGetJSON = function (b, c, d) {
            return a.$.ajax({url: b, dataType: "json", data: c}, d)
        }, a.$.ajaxPost = function (b, c, d, e) {
            return a.$.ajax({url: b, dataType: d, data: c, type: "POST"}, e)
        }, a.$.ajaxGetScript = function (b, c) {
            return a.$.ajax({url: b, dataType: "script"}, c)
        }, a.$.lazyAjax = function (b) {
            return a.once(b).flatMap(a.$.ajax)
        }, a.Observable.prototype.ajax = function () {
            return this.flatMapLatest(a.$.ajax)
        }, b.fn.extend({keydownE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["keydown"].concat(d.call(a)))
        }, keyupE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["keyup"].concat(d.call(a)))
        }, keypressE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["keypress"].concat(d.call(a)))
        }, clickE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["click"].concat(d.call(a)))
        }, dblclickE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["dblclick"].concat(d.call(a)))
        }, mousedownE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["mousedown"].concat(d.call(a)))
        }, mouseupE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["mouseup"].concat(d.call(a)))
        }, mouseenterE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["mouseenter"].concat(d.call(a)))
        }, mouseleaveE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["mouseleave"].concat(d.call(a)))
        }, mousemoveE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["mousemove"].concat(d.call(a)))
        }, mouseoutE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["mouseout"].concat(d.call(a)))
        }, mouseoverE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["mouseover"].concat(d.call(a)))
        }, resizeE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["resize"].concat(d.call(a)))
        }, scrollE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["scroll"].concat(d.call(a)))
        }, selectE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["select"].concat(d.call(a)))
        }, changeE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["change"].concat(d.call(a)))
        }, submitE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["submit"].concat(d.call(a)))
        }, blurE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["blur"].concat(d.call(a)))
        }, focusE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["focus"].concat(d.call(a)))
        }, focusinE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["focusin"].concat(d.call(a)))
        }, focusoutE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["focusout"].concat(d.call(a)))
        }, loadE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["load"].concat(d.call(a)))
        }, unloadE: function () {
            var a;
            return a = 1 <= arguments.length ? d.call(arguments, 0) : [], this.asEventStream.apply(this, ["unload"].concat(d.call(a)))
        }}), b.fn.extend({animateE: function () {
            var b;
            return b = 1 <= arguments.length ? d.call(arguments, 0) : [], a.fromPromise(this.animate.apply(this, b).promise())
        }, showE: function () {
            var b;
            return b = 1 <= arguments.length ? d.call(arguments, 0) : [], a.fromPromise(this.show.apply(this, b).promise())
        }, hideE: function () {
            var b;
            return b = 1 <= arguments.length ? d.call(arguments, 0) : [], a.fromPromise(this.hide.apply(this, b).promise())
        }, toggleE: function () {
            var b;
            return b = 1 <= arguments.length ? d.call(arguments, 0) : [], a.fromPromise(this.toggle.apply(this, b).promise())
        }, fadeInE: function () {
            var b;
            return b = 1 <= arguments.length ? d.call(arguments, 0) : [], a.fromPromise(this.fadeIn.apply(this, b).promise())
        }, fadeOutE: function () {
            var b;
            return b = 1 <= arguments.length ? d.call(arguments, 0) : [], a.fromPromise(this.fadeOut.apply(this, b).promise())
        }, fadeToE: function () {
            var b;
            return b = 1 <= arguments.length ? d.call(arguments, 0) : [], a.fromPromise(this.fadeTo.apply(this, b).promise())
        }, fadeToggleE: function () {
            var b;
            return b = 1 <= arguments.length ? d.call(arguments, 0) : [], a.fromPromise(this.fadeToggle.apply(this, b).promise())
        }, slideDownE: function () {
            var b;
            return b = 1 <= arguments.length ? d.call(arguments, 0) : [], a.fromPromise(this.slideDown.apply(this, b).promise())
        }, slideUpE: function () {
            var b;
            return b = 1 <= arguments.length ? d.call(arguments, 0) : [], a.fromPromise(this.slideUp.apply(this, b).promise())
        }, slideToggleE: function () {
            var b;
            return b = 1 <= arguments.length ? d.call(arguments, 0) : [], a.fromPromise(this.slideToggle.apply(this, b).promise())
        }}), a.$
    }, "undefined" != typeof module && null !== module ? (b = require("baconjs"), a = require("jquery"), module.exports = c(b, a)) : "function" == typeof define && define.amd ? define(["bacon", "jquery"], c) : c(this.Bacon, this.$)
}.call(this);