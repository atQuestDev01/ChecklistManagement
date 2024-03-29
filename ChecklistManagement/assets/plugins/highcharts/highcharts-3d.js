/*
 Highcharts JS v5.0.10 (2017-03-31)

 3D features for Highcharts JS

 @license: www.highcharts.com/license
*/
(function (E) { "object" === typeof module && module.exports ? module.exports = E : E(Highcharts) })(function (E) {
    (function (a) {
        var q = a.deg2rad, k = a.pick; a.perspective = function (p, n, u) {
            var m = n.options.chart.options3d, g = u ? n.inverted : !1, h = n.plotWidth / 2, r = n.plotHeight / 2, e = m.depth / 2, f = k(m.depth, 1) * k(m.viewDistance, 0), d = n.scale3d || 1, b = q * m.beta * (g ? -1 : 1), m = q * m.alpha * (g ? -1 : 1), c = Math.cos(m), w = Math.cos(-b), x = Math.sin(m), y = Math.sin(-b); u || (h += n.plotLeft, r += n.plotTop); return a.map(p, function (b) {
                var a, m; m = (g ? b.y : b.x) - h; var n = (g ?
                b.x : b.y) - r, k = (b.z || 0) - e; a = w * m - y * k; b = -x * y * m + c * n - w * x * k; m = c * y * m + x * n + c * w * k; n = 0 < f && f < Number.POSITIVE_INFINITY ? f / (m + e + f) : 1; a = a * n * d + h; b = b * n * d + r; return { x: g ? b : a, y: g ? a : b, z: m * d + e }
            })
        }; a.pointCameraDistance = function (a, n) { var p = n.options.chart.options3d, m = n.plotWidth / 2; n = n.plotHeight / 2; p = k(p.depth, 1) * k(p.viewDistance, 0) + p.depth; return Math.sqrt(Math.pow(m - a.plotX, 2) + Math.pow(n - a.plotY, 2) + Math.pow(p - a.plotZ, 2)) }
    })(E); (function (a) {
        function q(b) {
            var d = 0, l, C; for (l = 0; l < b.length; l++) C = (l + 1) % b.length, d += b[l].x * b[C].y -
            b[C].x * b[l].y; return d / 2
        } function k(b) { var d = 0, l; for (l = 0; l < b.length; l++) d += b[l].z; return b.length ? d / b.length : 0 } function p(b, d, l, C, a, c, e, f) {
            var g = [], H = c - a; return c > a && c - a > Math.PI / 2 + .0001 ? (g = g.concat(p(b, d, l, C, a, a + Math.PI / 2, e, f)), g = g.concat(p(b, d, l, C, a + Math.PI / 2, c, e, f))) : c < a && a - c > Math.PI / 2 + .0001 ? (g = g.concat(p(b, d, l, C, a, a - Math.PI / 2, e, f)), g = g.concat(p(b, d, l, C, a - Math.PI / 2, c, e, f))) : ["C", b + l * Math.cos(a) - l * t * H * Math.sin(a) + e, d + C * Math.sin(a) + C * t * H * Math.cos(a) + f, b + l * Math.cos(c) + l * t * H * Math.sin(c) + e, d + C * Math.sin(c) -
            C * t * H * Math.cos(c) + f, b + l * Math.cos(c) + e, d + C * Math.sin(c) + f]
        } var n = Math.cos, u = Math.PI, m = Math.sin, g = a.animObject, h = a.charts, r = a.color, e = a.defined, f = a.deg2rad, d = a.each, b = a.extend, c = a.inArray, w = a.map, x = a.merge, y = a.perspective, F = a.pick, A = a.SVGElement, G = a.SVGRenderer, B = a.wrap, t = 4 * (Math.sqrt(2) - 1) / 3 / (u / 2); G.prototype.toLinePath = function (b, a) { var c = []; d(b, function (b) { c.push("L", b.x, b.y) }); b.length && (c[0] = "M", a && c.push("Z")); return c }; G.prototype.cuboid = function (b) {
            var d = this.g(), c = d.destroy; b = this.cuboidPath(b);
            d.attr({ "stroke-linejoin": "round" }); d.front = this.path(b[0]).attr({ "class": "highcharts-3d-front", zIndex: b[3] }).add(d); d.top = this.path(b[1]).attr({ "class": "highcharts-3d-top", zIndex: b[4] }).add(d); d.side = this.path(b[2]).attr({ "class": "highcharts-3d-side", zIndex: b[5] }).add(d); d.fillSetter = function (b) { this.front.attr({ fill: b }); this.top.attr({ fill: r(b).brighten(.1).get() }); this.side.attr({ fill: r(b).brighten(-.1).get() }); this.color = b; return this }; d.opacitySetter = function (b) {
                this.front.attr({ opacity: b });
                this.top.attr({ opacity: b }); this.side.attr({ opacity: b }); return this
            }; d.attr = function (b, d) { if ("string" === typeof b && "undefined" !== typeof d) { var c = b; b = {}; b[c] = d } if (b.shapeArgs || e(b.x)) b = this.renderer.cuboidPath(b.shapeArgs || b), this.front.attr({ d: b[0], zIndex: b[3] }), this.top.attr({ d: b[1], zIndex: b[4] }), this.side.attr({ d: b[2], zIndex: b[5] }); else return a.SVGElement.prototype.attr.call(this, b); return this }; d.animate = function (b, d, c) {
                e(b.x) && e(b.y) ? (b = this.renderer.cuboidPath(b), this.front.attr({ zIndex: b[3] }).animate({ d: b[0] },
                d, c), this.top.attr({ zIndex: b[4] }).animate({ d: b[1] }, d, c), this.side.attr({ zIndex: b[5] }).animate({ d: b[2] }, d, c), this.attr({ zIndex: -b[6] })) : b.opacity ? (this.front.animate(b, d, c), this.top.animate(b, d, c), this.side.animate(b, d, c)) : A.prototype.animate.call(this, b, d, c); return this
            }; d.destroy = function () { this.front.destroy(); this.top.destroy(); this.side.destroy(); return c.call(this) }; d.attr({ zIndex: -b[6] }); return d
        }; G.prototype.cuboidPath = function (b) {
            function d(b) { return m[b] } var c = b.x, a = b.y, e = b.z, f = b.height,
            g = b.width, r = b.depth, m = [{ x: c, y: a, z: e }, { x: c + g, y: a, z: e }, { x: c + g, y: a + f, z: e }, { x: c, y: a + f, z: e }, { x: c, y: a + f, z: e + r }, { x: c + g, y: a + f, z: e + r }, { x: c + g, y: a, z: e + r }, { x: c, y: a, z: e + r }], m = y(m, h[this.chartIndex], b.insidePlotArea), e = function (b, c) { var a = []; b = w(b, d); c = w(c, d); 0 > q(b) ? a = b : 0 > q(c) && (a = c); return a }; b = e([3, 2, 1, 0], [7, 6, 5, 4]); c = [4, 5, 2, 3]; a = e([1, 6, 7, 0], c); e = e([1, 2, 5, 6], [0, 7, 4, 3]); return [this.toLinePath(b, !0), this.toLinePath(a, !0), this.toLinePath(e, !0), k(b), k(a), k(e), 9E9 * k(w(c, d))]
        }; a.SVGRenderer.prototype.arc3d = function (a) {
            function e(b) {
                var d =
                !1, a = {}; b = x(b); for (var e in b) -1 !== c(e, n) && (a[e] = b[e], delete b[e], d = !0); return d ? a : !1
            } var l = this.g(), m = l.renderer, n = "x y r innerR start end".split(" "); a = x(a); a.alpha *= f; a.beta *= f; l.top = m.path(); l.side1 = m.path(); l.side2 = m.path(); l.inn = m.path(); l.out = m.path(); l.onAdd = function () { var b = l.parentGroup, a = l.attr("class"); l.top.add(l); d(["out", "inn", "side1", "side2"], function (d) { l[d].addClass(a + " highcharts-3d-side").add(b) }) }; l.setPaths = function (b) {
                var d = l.renderer.arc3dPath(b), a = 100 * d.zTop; l.attribs = b; l.top.attr({
                    d: d.top,
                    zIndex: d.zTop
                }); l.inn.attr({ d: d.inn, zIndex: d.zInn }); l.out.attr({ d: d.out, zIndex: d.zOut }); l.side1.attr({ d: d.side1, zIndex: d.zSide1 }); l.side2.attr({ d: d.side2, zIndex: d.zSide2 }); l.zIndex = a; l.attr({ zIndex: a }); b.center && (l.top.setRadialReference(b.center), delete b.center)
            }; l.setPaths(a); l.fillSetter = function (b) { var d = r(b).brighten(-.1).get(); this.fill = b; this.side1.attr({ fill: d }); this.side2.attr({ fill: d }); this.inn.attr({ fill: d }); this.out.attr({ fill: d }); this.top.attr({ fill: b }); return this }; d(["opacity", "translateX",
            "translateY", "visibility"], function (b) { l[b + "Setter"] = function (b, a) { l[a] = b; d(["out", "inn", "side1", "side2", "top"], function (d) { l[d].attr(a, b) }) } }); B(l, "attr", function (d, a) { var c; "object" === typeof a && (c = e(a)) && (b(l.attribs, c), l.setPaths(l.attribs)); return d.apply(this, [].slice.call(arguments, 1)) }); B(l, "animate", function (b, d, a, c) {
                var l, f = this.attribs, m; delete d.center; delete d.z; delete d.depth; delete d.alpha; delete d.beta; m = g(F(a, this.renderer.globalAnimation)); m.duration && (l = e(d), d.dummy = 1, l && (m.step =
                function (b, d) { function a(b) { return f[b] + (F(l[b], f[b]) - f[b]) * d.pos } "dummy" === d.prop && d.elem.setPaths(x(f, { x: a("x"), y: a("y"), r: a("r"), innerR: a("innerR"), start: a("start"), end: a("end") })) }), a = m); return b.call(this, d, a, c)
            }); l.destroy = function () { this.top.destroy(); this.out.destroy(); this.inn.destroy(); this.side1.destroy(); this.side2.destroy(); A.prototype.destroy.call(this) }; l.hide = function () { this.top.hide(); this.out.hide(); this.inn.hide(); this.side1.hide(); this.side2.hide() }; l.show = function () {
                this.top.show();
                this.out.show(); this.inn.show(); this.side1.show(); this.side2.show()
            }; return l
        }; G.prototype.arc3dPath = function (b) {
            function d(b) { b %= 2 * Math.PI; b > Math.PI && (b = 2 * Math.PI - b); return b } var a = b.x, c = b.y, e = b.start, f = b.end - .00001, g = b.r, r = b.innerR, w = b.depth, h = b.alpha, k = b.beta, x = Math.cos(e), q = Math.sin(e); b = Math.cos(f); var y = Math.sin(f), v = g * Math.cos(k), g = g * Math.cos(h), t = r * Math.cos(k), B = r * Math.cos(h), r = w * Math.sin(k), z = w * Math.sin(h), w = ["M", a + v * x, c + g * q], w = w.concat(p(a, c, v, g, e, f, 0, 0)), w = w.concat(["L", a + t * b, c + B * y]), w =
            w.concat(p(a, c, t, B, f, e, 0, 0)), w = w.concat(["Z"]), F = 0 < k ? Math.PI / 2 : 0, k = 0 < h ? 0 : Math.PI / 2, F = e > -F ? e : f > -F ? -F : e, D = f < u - k ? f : e < u - k ? u - k : f, A = 2 * u - k, h = ["M", a + v * n(F), c + g * m(F)], h = h.concat(p(a, c, v, g, F, D, 0, 0)); f > A && e < A ? (h = h.concat(["L", a + v * n(D) + r, c + g * m(D) + z]), h = h.concat(p(a, c, v, g, D, A, r, z)), h = h.concat(["L", a + v * n(A), c + g * m(A)]), h = h.concat(p(a, c, v, g, A, f, 0, 0)), h = h.concat(["L", a + v * n(f) + r, c + g * m(f) + z]), h = h.concat(p(a, c, v, g, f, A, r, z)), h = h.concat(["L", a + v * n(A), c + g * m(A)]), h = h.concat(p(a, c, v, g, A, D, 0, 0))) : f > u - k && e < u - k && (h = h.concat(["L",
            a + v * Math.cos(D) + r, c + g * Math.sin(D) + z]), h = h.concat(p(a, c, v, g, D, f, r, z)), h = h.concat(["L", a + v * Math.cos(f), c + g * Math.sin(f)]), h = h.concat(p(a, c, v, g, f, D, 0, 0))); h = h.concat(["L", a + v * Math.cos(D) + r, c + g * Math.sin(D) + z]); h = h.concat(p(a, c, v, g, D, F, r, z)); h = h.concat(["Z"]); k = ["M", a + t * x, c + B * q]; k = k.concat(p(a, c, t, B, e, f, 0, 0)); k = k.concat(["L", a + t * Math.cos(f) + r, c + B * Math.sin(f) + z]); k = k.concat(p(a, c, t, B, f, e, r, z)); k = k.concat(["Z"]); x = ["M", a + v * x, c + g * q, "L", a + v * x + r, c + g * q + z, "L", a + t * x + r, c + B * q + z, "L", a + t * x, c + B * q, "Z"]; a = ["M", a + v * b,
            c + g * y, "L", a + v * b + r, c + g * y + z, "L", a + t * b + r, c + B * y + z, "L", a + t * b, c + B * y, "Z"]; y = Math.atan2(z, -r); c = Math.abs(f + y); b = Math.abs(e + y); e = Math.abs((e + f) / 2 + y); c = d(c); b = d(b); e = d(e); e *= 1E5; f = 1E5 * b; c *= 1E5; return { top: w, zTop: 1E5 * Math.PI + 1, out: h, zOut: Math.max(e, f, c), inn: k, zInn: Math.max(e, f, c), side1: x, zSide1: .99 * c, side2: a, zSide2: .99 * f }
        }
    })(E); (function (a) {
        function q(a, e) {
            var f = a.plotLeft, d = a.plotWidth + f, b = a.plotTop, c = a.plotHeight + b, g = f + a.plotWidth / 2, h = b + a.plotHeight / 2, r = Number.MAX_VALUE, m = -Number.MAX_VALUE, k = Number.MAX_VALUE,
            n = -Number.MAX_VALUE, q, t = 1; q = [{ x: f, y: b, z: 0 }, { x: f, y: b, z: e }]; p([0, 1], function (b) { q.push({ x: d, y: q[b].y, z: q[b].z }) }); p([0, 1, 2, 3], function (b) { q.push({ x: q[b].x, y: c, z: q[b].z }) }); q = u(q, a, !1); p(q, function (b) { r = Math.min(r, b.x); m = Math.max(m, b.x); k = Math.min(k, b.y); n = Math.max(n, b.y) }); f > r && (t = Math.min(t, 1 - Math.abs((f + g) / (r + g)) % 1)); d < m && (t = Math.min(t, (d - g) / (m - g))); b > k && (t = 0 > k ? Math.min(t, (b + h) / (-k + b + h)) : Math.min(t, 1 - (b + h) / (k + h) % 1)); c < n && (t = Math.min(t, Math.abs((c - h) / (n - h)))); return t
        } var k = a.Chart, p = a.each, n = a.merge,
        u = a.perspective, m = a.pick, g = a.wrap; k.prototype.is3d = function () { return this.options.chart.options3d && this.options.chart.options3d.enabled }; k.prototype.propsRequireDirtyBox.push("chart.options3d"); k.prototype.propsRequireUpdateSeries.push("chart.options3d"); a.wrap(a.Chart.prototype, "isInsidePlot", function (a) { return this.is3d() || a.apply(this, [].slice.call(arguments, 1)) }); var h = a.getOptions(); n(!0, h, {
            chart: {
                options3d: {
                    enabled: !1, alpha: 0, beta: 0, depth: 100, fitToPlot: !0, viewDistance: 25, frame: {
                        bottom: { size: 1 },
                        side: { size: 1 }, back: { size: 1 }
                    }
                }
            }
        }); g(k.prototype, "setClassName", function (a) { a.apply(this, [].slice.call(arguments, 1)); this.is3d() && (this.container.className += " highcharts-3d-chart") }); a.wrap(a.Chart.prototype, "setChartSize", function (a) {
            var e = this.options.chart.options3d; a.apply(this, [].slice.call(arguments, 1)); if (this.is3d()) {
                var f = this.inverted, d = this.clipBox, b = this.margin; d[f ? "y" : "x"] = -(b[3] || 0); d[f ? "x" : "y"] = -(b[0] || 0); d[f ? "height" : "width"] = this.chartWidth + (b[3] || 0) + (b[1] || 0); d[f ? "width" : "height"] =
                this.chartHeight + (b[0] || 0) + (b[2] || 0); this.scale3d = 1; !0 === e.fitToPlot && (this.scale3d = q(this, e.depth))
            }
        }); g(k.prototype, "redraw", function (a) { this.is3d() && (this.isDirtyBox = !0); a.apply(this, [].slice.call(arguments, 1)) }); g(k.prototype, "renderSeries", function (a) { var e = this.series.length; if (this.is3d()) for (; e--;) a = this.series[e], a.translate(), a.render(); else a.call(this) }); k.prototype.retrieveStacks = function (a) {
            var e = this.series, f = {}, d, b = 1; p(this.series, function (c) {
                d = m(c.options.stack, a ? 0 : e.length - 1 - c.index);
                f[d] ? f[d].series.push(c) : (f[d] = { series: [c], position: b }, b++)
            }); f.totalStacks = b + 1; return f
        }
    })(E); (function (a) {
        var q, k = a.Axis, p = a.Chart, n = a.each, u = a.extend, m = a.merge, g = a.perspective, h = a.pick, r = a.splat, e = a.Tick, f = a.wrap; f(k.prototype, "setOptions", function (a, b) { a.call(this, b); this.chart.is3d() && "colorAxis" !== this.coll && (a = this.options, a.tickWidth = h(a.tickWidth, 0), a.gridLineWidth = h(a.gridLineWidth, 1)) }); f(k.prototype, "render", function (a) {
            a.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d() && "colorAxis" !==
            this.coll) {
                var b = this.chart, c = b.renderer, d = b.options.chart.options3d, e = d.frame, f = e.bottom, g = e.back, e = e.side, h = d.depth, k = this.height, m = this.width, r = this.left, n = this.top; this.isZAxis || (this.horiz ? (g = { x: r, y: n + (b.xAxis[0].opposite ? -f.size : k), z: 0, width: m, height: f.size, depth: h, insidePlotArea: !1 }, this.bottomFrame ? this.bottomFrame.animate(g) : (this.bottomFrame = c.cuboid(g).attr({ "class": "highcharts-3d-frame highcharts-3d-frame-bottom", zIndex: b.yAxis[0].reversed && 0 < d.alpha ? 4 : -1 }).add(), this.bottomFrame.attr({
                    fill: f.color ||
                    "none", stroke: f.color || "none"
                }))) : (d = { x: r + (b.yAxis[0].opposite ? 0 : -e.size), y: n + (b.xAxis[0].opposite ? -f.size : 0), z: h, width: m + e.size, height: k + f.size, depth: g.size, insidePlotArea: !1 }, this.backFrame ? this.backFrame.animate(d) : (this.backFrame = c.cuboid(d).attr({ "class": "highcharts-3d-frame highcharts-3d-frame-back", zIndex: -3 }).add(), this.backFrame.attr({ fill: g.color || "none", stroke: g.color || "none" })), b = {
                    x: r + (b.yAxis[0].opposite ? m : -e.size), y: n + (b.xAxis[0].opposite ? -f.size : 0), z: 0, width: e.size, height: k + f.size,
                    depth: h, insidePlotArea: !1
                }, this.sideFrame ? this.sideFrame.animate(b) : (this.sideFrame = c.cuboid(b).attr({ "class": "highcharts-3d-frame highcharts-3d-frame-side", zIndex: -2 }).add(), this.sideFrame.attr({ fill: e.color || "none", stroke: e.color || "none" }))))
            }
        }); f(k.prototype, "getPlotLinePath", function (a) {
            var b = a.apply(this, [].slice.call(arguments, 1)); if (!this.chart.is3d() || "colorAxis" === this.coll || null === b) return b; var c = this.chart, d = c.options.chart.options3d, c = this.isZAxis ? c.plotWidth : d.depth, d = this.opposite;
            this.horiz && (d = !d); b = [this.swapZ({ x: b[1], y: b[2], z: d ? c : 0 }), this.swapZ({ x: b[1], y: b[2], z: c }), this.swapZ({ x: b[4], y: b[5], z: c }), this.swapZ({ x: b[4], y: b[5], z: d ? 0 : c })]; b = g(b, this.chart, !1); return b = this.chart.renderer.toLinePath(b, !1)
        }); f(k.prototype, "getLinePath", function (a) { return this.chart.is3d() ? [] : a.apply(this, [].slice.call(arguments, 1)) }); f(k.prototype, "getPlotBandPath", function (a) {
            if (!this.chart.is3d() || "colorAxis" === this.coll) return a.apply(this, [].slice.call(arguments, 1)); var b = arguments, c = b[1],
            b = this.getPlotLinePath(b[2]); (c = this.getPlotLinePath(c)) && b ? c.push("L", b[10], b[11], "L", b[7], b[8], "L", b[4], b[5], "L", b[1], b[2]) : c = null; return c
        }); f(e.prototype, "getMarkPath", function (a) { var b = a.apply(this, [].slice.call(arguments, 1)); if (!this.axis.chart.is3d() || "colorAxis" === this.coll) return b; b = [this.axis.swapZ({ x: b[1], y: b[2], z: 0 }), this.axis.swapZ({ x: b[4], y: b[5], z: 0 })]; b = g(b, this.axis.chart, !1); return b = ["M", b[0].x, b[0].y, "L", b[1].x, b[1].y] }); f(e.prototype, "getLabelPosition", function (a) {
            var b = a.apply(this,
            [].slice.call(arguments, 1)); this.axis.chart.is3d() && "colorAxis" !== this.coll && (b = g([this.axis.swapZ({ x: b.x, y: b.y, z: 0 })], this.axis.chart, !1)[0]); return b
        }); a.wrap(k.prototype, "getTitlePosition", function (a) { var b = this.chart.is3d() && "colorAxis" !== this.coll, c, d; b && (d = this.axisTitleMargin, this.axisTitleMargin = 0); c = a.apply(this, [].slice.call(arguments, 1)); b && (c = g([this.swapZ({ x: c.x, y: c.y, z: 0 })], this.chart, !1)[0], c[this.horiz ? "y" : "x"] += (this.horiz ? 1 : -1) * (this.opposite ? -1 : 1) * d, this.axisTitleMargin = d); return c });
        f(k.prototype, "drawCrosshair", function (a) { var b = arguments; this.chart.is3d() && b[2] && (b[2] = { plotX: b[2].plotXold || b[2].plotX, plotY: b[2].plotYold || b[2].plotY }); a.apply(this, [].slice.call(b, 1)) }); f(k.prototype, "destroy", function (a) { n(["backFrame", "bottomFrame", "sideFrame"], function (b) { this[b] && (this[b] = this[b].destroy()) }, this); a.apply(this, [].slice.call(arguments, 1)) }); k.prototype.swapZ = function (a, b) {
            if (this.isZAxis) {
                b = b ? 0 : this.chart.plotLeft; var c = this.chart; return {
                    x: b + (c.yAxis[0].opposite ? a.z : c.xAxis[0].width -
                    a.z), y: a.y, z: a.x - b
                }
            } return a
        }; q = a.ZAxis = function () { this.init.apply(this, arguments) }; u(q.prototype, k.prototype); u(q.prototype, {
            isZAxis: !0, setOptions: function (a) { a = m({ offset: 0, lineWidth: 0 }, a); k.prototype.setOptions.call(this, a); this.coll = "zAxis" }, setAxisSize: function () { k.prototype.setAxisSize.call(this); this.width = this.len = this.chart.options.chart.options3d.depth; this.right = this.chart.chartWidth - this.width - this.left }, getSeriesExtremes: function () {
                var a = this, b = a.chart; a.hasVisibleSeries = !1; a.dataMin =
                a.dataMax = a.ignoreMinPadding = a.ignoreMaxPadding = null; a.buildStacks && a.buildStacks(); n(a.series, function (c) { if (c.visible || !b.options.chart.ignoreHiddenSeries) a.hasVisibleSeries = !0, c = c.zData, c.length && (a.dataMin = Math.min(h(a.dataMin, c[0]), Math.min.apply(null, c)), a.dataMax = Math.max(h(a.dataMax, c[0]), Math.max.apply(null, c))) })
            }
        }); f(p.prototype, "getAxes", function (a) { var b = this, c = this.options, c = c.zAxis = r(c.zAxis || {}); a.call(this); b.is3d() && (this.zAxis = [], n(c, function (a, c) { a.index = c; a.isX = !0; (new q(b, a)).setScale() })) })
    })(E);
    (function (a) {
        function q(a) { var e = a.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && (e.stroke = this.options.edgeColor || e.fill, e["stroke-width"] = u(this.options.edgeWidth, 1)); return e } function k(a) { if (this.chart.is3d()) { var e = this.chart.options.plotOptions.column.grouping; void 0 === e || e || void 0 === this.group.zIndex || this.zIndexSet || (this.group.attr({ zIndex: 10 * this.group.zIndex }), this.zIndexSet = !0) } a.apply(this, [].slice.call(arguments, 1)) } var p = a.each, n = a.perspective, u = a.pick, m = a.Series, g = a.seriesTypes,
        h = a.svg; a = a.wrap; a(g.column.prototype, "translate", function (a) { a.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) { var e = this.chart, f = this.options, d = f.depth || 25, b = (f.stacking ? f.stack || 0 : this._i) * (d + (f.groupZPadding || 1)); !1 !== f.grouping && (b = 0); b += f.groupZPadding || 1; p(this.data, function (a) { if (null !== a.y) { var c = a.shapeArgs, f = a.tooltipPos; a.shapeType = "cuboid"; c.z = b; c.depth = d; c.insidePlotArea = !0; f = n([{ x: f[0], y: f[1], z: b }], e, !0)[0]; a.tooltipPos = [f.x, f.y] } }); this.z = b } }); a(g.column.prototype, "animate",
        function (a) {
            if (this.chart.is3d()) { var e = arguments[1], f = this.yAxis, d = this, b = this.yAxis.reversed; h && (e ? p(d.data, function (a) { null !== a.y && (a.height = a.shapeArgs.height, a.shapey = a.shapeArgs.y, a.shapeArgs.height = 1, b || (a.shapeArgs.y = a.stackY ? a.plotY + f.translate(a.stackY) : a.plotY + (a.negative ? -a.height : a.height))) }) : (p(d.data, function (a) { null !== a.y && (a.shapeArgs.height = a.height, a.shapeArgs.y = a.shapey, a.graphic && a.graphic.animate(a.shapeArgs, d.options.animation)) }), this.drawDataLabels(), d.animate = null)) } else a.apply(this,
            [].slice.call(arguments, 1))
        }); a(g.column.prototype, "init", function (a) { a.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) { var e = this.options, f = e.grouping, d = e.stacking, b = u(this.yAxis.options.reversedStacks, !0), c = 0; if (void 0 === f || f) { f = this.chart.retrieveStacks(d); c = e.stack || 0; for (d = 0; d < f[c].series.length && f[c].series[d] !== this; d++); c = 10 * (f.totalStacks - f[c].position) + (b ? d : -d); this.xAxis.reversed || (c = 10 * f.totalStacks - c) } e.zIndex = c } }); a(g.column.prototype, "pointAttribs", q); g.columnrange && a(g.columnrange.prototype,
        "pointAttribs", q); a(m.prototype, "alignDataLabel", function (a) { if (this.chart.is3d() && ("column" === this.type || "columnrange" === this.type)) { var e = arguments[4], f = { x: e.x, y: e.y, z: this.z }, f = n([f], this.chart, !0)[0]; e.x = f.x; e.y = f.y } a.apply(this, [].slice.call(arguments, 1)) }); g.columnrange && a(g.columnrange.prototype, "drawPoints", k); a(g.column.prototype, "drawPoints", k)
    })(E); (function (a) {
        var q = a.deg2rad, k = a.each, p = a.pick, n = a.seriesTypes, u = a.svg; a = a.wrap; a(n.pie.prototype, "translate", function (a) {
            a.apply(this, [].slice.call(arguments,
            1)); if (this.chart.is3d()) { var g = this, h = g.options, m = h.depth || 0, e = g.chart.options.chart.options3d, f = e.alpha, d = e.beta, b = h.stacking ? (h.stack || 0) * m : g._i * m, b = b + m / 2; !1 !== h.grouping && (b = 0); k(g.data, function (a) { var c = a.shapeArgs; a.shapeType = "arc3d"; c.z = b; c.depth = .75 * m; c.alpha = f; c.beta = d; c.center = g.center; c = (c.end + c.start) / 2; a.slicedTranslation = { translateX: Math.round(Math.cos(c) * h.slicedOffset * Math.cos(f * q)), translateY: Math.round(Math.sin(c) * h.slicedOffset * Math.cos(f * q)) } }) }
        }); a(n.pie.prototype.pointClass.prototype,
        "haloPath", function (a) { var g = arguments; return this.series.chart.is3d() ? [] : a.call(this, g[1]) }); a(n.pie.prototype, "pointAttribs", function (a, g, h) { a = a.call(this, g, h); h = this.options; this.chart.is3d() && (a.stroke = h.edgeColor || g.color || this.color, a["stroke-width"] = p(h.edgeWidth, 1)); return a }); a(n.pie.prototype, "drawPoints", function (a) { a.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && k(this.points, function (a) { var g = a.graphic; if (g) g[a.y && a.visible ? "show" : "hide"]() }) }); a(n.pie.prototype, "drawDataLabels",
        function (a) { if (this.chart.is3d()) { var g = this.chart.options.chart.options3d; k(this.data, function (a) { var h = a.shapeArgs, e = h.r, f = (h.start + h.end) / 2, d = a.labelPos, b = -e * (1 - Math.cos((h.alpha || g.alpha) * q)) * Math.sin(f), c = e * (Math.cos((h.beta || g.beta) * q) - 1) * Math.cos(f); k([0, 2, 4], function (a) { d[a] += c; d[a + 1] += b }) }) } a.apply(this, [].slice.call(arguments, 1)) }); a(n.pie.prototype, "addPoint", function (a) { a.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && this.update(this.userOptions, !0) }); a(n.pie.prototype, "animate",
        function (a) { if (this.chart.is3d()) { var g = arguments[1], h = this.options.animation, k = this.center, e = this.group, f = this.markerGroup; u && (!0 === h && (h = {}), g ? (e.oldtranslateX = e.translateX, e.oldtranslateY = e.translateY, g = { translateX: k[0], translateY: k[1], scaleX: .001, scaleY: .001 }, e.attr(g), f && (f.attrSetters = e.attrSetters, f.attr(g))) : (g = { translateX: e.oldtranslateX, translateY: e.oldtranslateY, scaleX: 1, scaleY: 1 }, e.animate(g, h), f && f.animate(g, h), this.animate = null)) } else a.apply(this, [].slice.call(arguments, 1)) })
    })(E);
    (function (a) {
        var q = a.perspective, k = a.pick, p = a.Point, n = a.seriesTypes, u = a.wrap; u(n.scatter.prototype, "translate", function (a) {
            a.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) {
                var g = this.chart, h = k(this.zAxis, g.options.zAxis[0]), m = [], e, f, d; for (d = 0; d < this.data.length; d++) e = this.data[d], f = h.isLog && h.val2lin ? h.val2lin(e.z) : e.z, e.plotZ = h.translate(f), e.isInside = e.isInside ? f >= h.min && f <= h.max : !1, m.push({ x: e.plotX, y: e.plotY, z: e.plotZ }); g = q(m, g, !0); for (d = 0; d < this.data.length; d++) e = this.data[d], h =
                g[d], e.plotXold = e.plotX, e.plotYold = e.plotY, e.plotZold = e.plotZ, e.plotX = h.x, e.plotY = h.y, e.plotZ = h.z
            }
        }); u(n.scatter.prototype, "init", function (a, g, h) {
            g.is3d() && (this.axisTypes = ["xAxis", "yAxis", "zAxis"], this.pointArrayMap = ["x", "y", "z"], this.parallelArrays = ["x", "y", "z"], this.directTouch = !0); a = a.apply(this, [g, h]); this.chart.is3d() && (this.tooltipOptions.pointFormat = this.userOptions.tooltip ? this.userOptions.tooltip.pointFormat || "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e" :
            "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e"); return a
        }); u(n.scatter.prototype, "pointAttribs", function (k, g) { var h = k.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && g && (h.zIndex = a.pointCameraDistance(g, this.chart)); return h }); u(p.prototype, "applyOptions", function (a) { var g = a.apply(this, [].slice.call(arguments, 1)); this.series.chart.is3d() && void 0 === g.z && (g.z = 0); return g })
    })(E); (function (a) {
        var q = a.Axis, k = a.SVGRenderer,
        p = a.VMLRenderer; p && (a.setOptions({ animate: !1 }), p.prototype.cuboid = k.prototype.cuboid, p.prototype.cuboidPath = k.prototype.cuboidPath, p.prototype.toLinePath = k.prototype.toLinePath, p.prototype.createElement3D = k.prototype.createElement3D, p.prototype.arc3d = function (a) { a = k.prototype.arc3d.call(this, a); a.css({ zIndex: a.zIndex }); return a }, a.VMLRenderer.prototype.arc3dPath = a.SVGRenderer.prototype.arc3dPath, a.wrap(q.prototype, "render", function (a) {
            a.apply(this, [].slice.call(arguments, 1)); this.sideFrame && (this.sideFrame.css({ zIndex: 0 }),
            this.sideFrame.front.attr({ fill: this.sideFrame.color })); this.bottomFrame && (this.bottomFrame.css({ zIndex: 1 }), this.bottomFrame.front.attr({ fill: this.bottomFrame.color })); this.backFrame && (this.backFrame.css({ zIndex: 0 }), this.backFrame.front.attr({ fill: this.backFrame.color }))
        }))
    })(E)
});