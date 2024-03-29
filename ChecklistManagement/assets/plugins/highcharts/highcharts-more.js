/*
 Highcharts JS v5.0.10 (2017-03-31)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (y) { "object" === typeof module && module.exports ? module.exports = y : y(Highcharts) })(function (y) {
    (function (a) {
        function p(a, b) { this.init(a, b) } var r = a.CenteredSeriesMixin, v = a.each, m = a.extend, k = a.merge, h = a.splat; m(p.prototype, {
            coll: "pane", init: function (a, b) { this.chart = b; this.background = []; b.pane.push(this); this.setOptions(a) }, setOptions: function (a) { this.options = k(this.defaultOptions, this.chart.angular ? { background: {} } : void 0, a) }, render: function () {
                var a = this.options, b = this.options.background, d = this.chart.renderer;
                this.group || (this.group = d.g("pane-group").attr({ zIndex: a.zIndex || 0 }).add()); this.updateCenter(); if (b) for (b = h(b), a = Math.max(b.length, this.background.length || 0), d = 0; d < a; d++) b[d] ? this.renderBackground(k(this.defaultBackgroundOptions, b[d]), d) : this.background[d] && (this.background[d] = this.background[d].destroy(), this.background.splice(d, 1))
            }, renderBackground: function (a, b) {
                var d = "animate"; this.background[b] || (this.background[b] = this.chart.renderer.path().add(this.group), d = "attr"); this.background[b][d]({
                    d: this.axis.getPlotBandPath(a.from,
                    a.to, a)
                }).attr({ fill: a.backgroundColor, stroke: a.borderColor, "stroke-width": a.borderWidth, "class": "highcharts-pane " + (a.className || "") })
            }, defaultOptions: { center: ["50%", "50%"], size: "85%", startAngle: 0 }, defaultBackgroundOptions: { shape: "circle", borderWidth: 1, borderColor: "#cccccc", backgroundColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, "#ffffff"], [1, "#e6e6e6"]] }, from: -Number.MAX_VALUE, innerRadius: 0, to: Number.MAX_VALUE, outerRadius: "105%" }, updateCenter: function (a) {
                this.center = (a || this.axis || {}).center =
                r.getCenter.call(this)
            }, update: function (a, b) { k(!0, this.options, a); this.setOptions(this.options); this.render(); v(this.chart.axes, function (d) { d.pane === this && (d.pane = null, d.update({}, b)) }, this) }
        }); a.Pane = p
    })(y); (function (a) {
        var p = a.each, r = a.extend, v = a.map, m = a.merge, k = a.noop, h = a.pick, t = a.pInt, b = a.wrap, d, e, g = a.Axis.prototype; a = a.Tick.prototype; d = { getOffset: k, redraw: function () { this.isDirty = !1 }, render: function () { this.isDirty = !1 }, setScale: k, setCategories: k, setTitle: k }; e = {
            defaultRadialGaugeOptions: {
                labels: {
                    align: "center",
                    x: 0, y: null
                }, minorGridLineWidth: 0, minorTickInterval: "auto", minorTickLength: 10, minorTickPosition: "inside", minorTickWidth: 1, tickLength: 10, tickPosition: "inside", tickWidth: 2, title: { rotation: 0 }, zIndex: 2
            }, defaultRadialXOptions: { gridLineWidth: 1, labels: { align: null, distance: 15, x: 0, y: null }, maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0 }, defaultRadialYOptions: { gridLineInterpolation: "circle", labels: { align: "right", x: -3, y: -2 }, showLastLabel: !1, title: { x: 4, text: null, rotation: 90 } }, setOptions: function (c) {
                c =
                this.options = m(this.defaultOptions, this.defaultRadialOptions, c); c.plotBands || (c.plotBands = [])
            }, getOffset: function () { g.getOffset.call(this); this.chart.axisOffset[this.side] = 0 }, getLinePath: function (c, b) {
                c = this.center; var d = this.chart, f = h(b, c[2] / 2 - this.offset); this.isCircular || void 0 !== b ? b = this.chart.renderer.symbols.arc(this.left + c[0], this.top + c[1], f, f, { start: this.startAngleRad, end: this.endAngleRad, open: !0, innerR: 0 }) : (b = this.postTranslate(this.angleRad, f), b = ["M", c[0] + d.plotLeft, c[1] + d.plotTop, "L", b.x,
                b.y]); return b
            }, setAxisTranslation: function () { g.setAxisTranslation.call(this); this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0) }, beforeSetTickPositions: function () {
                if (this.autoConnect = this.isCircular && void 0 === h(this.userMax, this.options.max) && this.endAngleRad - this.startAngleRad === 2 * Math.PI) this.max += this.categories && 1 || this.pointRange || this.closestPointRange ||
                0
            }, setAxisSize: function () { g.setAxisSize.call(this); this.isRadial && (this.pane.updateCenter(this), this.isCircular && (this.sector = this.endAngleRad - this.startAngleRad), this.len = this.width = this.height = this.center[2] * h(this.sector, 1) / 2) }, getPosition: function (c, b) { return this.postTranslate(this.isCircular ? this.translate(c) : this.angleRad, h(this.isCircular ? b : this.translate(c), this.center[2] / 2) - this.offset) }, postTranslate: function (c, b) {
                var d = this.chart, f = this.center; c = this.startAngleRad + c; return {
                    x: d.plotLeft +
                    f[0] + Math.cos(c) * b, y: d.plotTop + f[1] + Math.sin(c) * b
                }
            }, getPlotBandPath: function (c, b, d) {
                var f = this.center, n = this.startAngleRad, a = f[2] / 2, e = [h(d.outerRadius, "100%"), d.innerRadius, h(d.thickness, 10)], g = Math.min(this.offset, 0), u = /%$/, k, m = this.isCircular; "polygon" === this.options.gridLineInterpolation ? f = this.getPlotLinePath(c).concat(this.getPlotLinePath(b, !0)) : (c = Math.max(c, this.min), b = Math.min(b, this.max), m || (e[0] = this.translate(c), e[1] = this.translate(b)), e = v(e, function (c) { u.test(c) && (c = t(c, 10) * a / 100); return c }),
                "circle" !== d.shape && m ? (c = n + this.translate(c), b = n + this.translate(b)) : (c = -Math.PI / 2, b = 1.5 * Math.PI, k = !0), e[0] -= g, e[2] -= g, f = this.chart.renderer.symbols.arc(this.left + f[0], this.top + f[1], e[0], e[0], { start: Math.min(c, b), end: Math.max(c, b), innerR: h(e[1], e[0] - e[2]), open: k })); return f
            }, getPlotLinePath: function (c, b) {
                var d = this, f = d.center, e = d.chart, a = d.getPosition(c), g, t, h; d.isCircular ? h = ["M", f[0] + e.plotLeft, f[1] + e.plotTop, "L", a.x, a.y] : "circle" === d.options.gridLineInterpolation ? (c = d.translate(c)) && (h = d.getLinePath(0,
                c)) : (p(e.xAxis, function (c) { c.pane === d.pane && (g = c) }), h = [], c = d.translate(c), f = g.tickPositions, g.autoConnect && (f = f.concat([f[0]])), b && (f = [].concat(f).reverse()), p(f, function (b, d) { t = g.getPosition(b, c); h.push(d ? "L" : "M", t.x, t.y) })); return h
            }, getTitlePosition: function () { var c = this.center, b = this.chart, d = this.options.title; return { x: b.plotLeft + c[0] + (d.x || 0), y: b.plotTop + c[1] - { high: .5, middle: .25, low: 0 }[d.align] * c[2] + (d.y || 0) } }
        }; b(g, "init", function (c, b, a) {
            var f = b.angular, n = b.polar, g = a.isX, t = f && g, x, k = b.options,
            p = this.pane = b.pane[a.pane || 0], z = p.options; if (f) { if (r(this, t ? d : e), x = !g) this.defaultRadialOptions = this.defaultRadialGaugeOptions } else n && (r(this, e), this.defaultRadialOptions = (x = g) ? this.defaultRadialXOptions : m(this.defaultYAxisOptions, this.defaultRadialYOptions)); f || n ? (this.isRadial = !0, b.inverted = !1, k.chart.zoomType = null) : this.isRadial = !1; x && (p.axis = this); c.call(this, b, a); t || !f && !n || (c = this.options, this.angleRad = (c.angle || 0) * Math.PI / 180, this.startAngleRad = (z.startAngle - 90) * Math.PI / 180, this.endAngleRad =
            (h(z.endAngle, z.startAngle + 360) - 90) * Math.PI / 180, this.offset = c.offset || 0, this.isCircular = x)
        }); b(g, "autoLabelAlign", function (b) { if (!this.isRadial) return b.apply(this, [].slice.call(arguments, 1)) }); b(a, "getPosition", function (b, d, e, a, l) { var c = this.axis; return c.getPosition ? c.getPosition(e) : b.call(this, d, e, a, l) }); b(a, "getLabelPosition", function (b, d, e, a, l, g, t, k, u) {
            var c = this.axis, f = g.y, n = 20, q = g.align, w = (c.translate(this.pos) + c.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360; c.isRadial ? (b = c.getPosition(this.pos,
            c.center[2] / 2 + h(g.distance, -25)), "auto" === g.rotation ? a.attr({ rotation: w }) : null === f && (f = c.chart.renderer.fontMetrics(a.styles.fontSize).b - a.getBBox().height / 2), null === q && (c.isCircular ? (this.label.getBBox().width > c.len * c.tickInterval / (c.max - c.min) && (n = 0), q = w > n && w < 180 - n ? "left" : w > 180 + n && w < 360 - n ? "right" : "center") : q = "center", a.attr({ align: q })), b.x += g.x, b.y += f) : b = b.call(this, d, e, a, l, g, t, k, u); return b
        }); b(a, "getMarkPath", function (b, d, e, a, l, g, t) {
            var c = this.axis; c.isRadial ? (b = c.getPosition(this.pos, c.center[2] /
            2 + a), d = ["M", d, e, "L", b.x, b.y]) : d = b.call(this, d, e, a, l, g, t); return d
        })
    })(y); (function (a) {
        var p = a.each, r = a.noop, v = a.pick, m = a.Series, k = a.seriesType, h = a.seriesTypes; k("arearange", "area", { lineWidth: 1, marker: null, threshold: null, tooltip: { pointFormat: '\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e' }, trackByArea: !0, dataLabels: { align: null, verticalAlign: null, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 }, states: { hover: { halo: !1 } } },
        {
            pointArrayMap: ["low", "high"], dataLabelCollections: ["dataLabel", "dataLabelUpper"], toYData: function (a) { return [a.low, a.high] }, pointValKey: "low", deferTranslatePolar: !0, highToXY: function (a) { var b = this.chart, d = this.xAxis.postTranslate(a.rectPlotX, this.yAxis.len - a.plotHigh); a.plotHighX = d.x - b.plotLeft; a.plotHigh = d.y - b.plotTop }, translate: function () {
                var a = this, b = a.yAxis, d = !!a.modifyValue; h.area.prototype.translate.apply(a); p(a.points, function (e) {
                    var g = e.low, c = e.high, f = e.plotY; null === c || null === g ? e.isNull = !0 :
                    (e.plotLow = f, e.plotHigh = b.translate(d ? a.modifyValue(c, e) : c, 0, 1, 0, 1), d && (e.yBottom = e.plotHigh))
                }); this.chart.polar && p(this.points, function (b) { a.highToXY(b) })
            }, getGraphPath: function (a) {
                var b = [], d = [], e, g = h.area.prototype.getGraphPath, c, f, n; n = this.options; var w = this.chart.polar && !1 !== n.connectEnds, l = n.step; a = a || this.points; for (e = a.length; e--;) c = a[e], c.isNull || w || a[e + 1] && !a[e + 1].isNull || d.push({ plotX: c.plotX, plotY: c.plotY, doCurve: !1 }), f = {
                    polarPlotY: c.polarPlotY, rectPlotX: c.rectPlotX, yBottom: c.yBottom,
                    plotX: v(c.plotHighX, c.plotX), plotY: c.plotHigh, isNull: c.isNull
                }, d.push(f), b.push(f), c.isNull || w || a[e - 1] && !a[e - 1].isNull || d.push({ plotX: c.plotX, plotY: c.plotY, doCurve: !1 }); a = g.call(this, a); l && (!0 === l && (l = "left"), n.step = { left: "right", center: "center", right: "left" }[l]); b = g.call(this, b); d = g.call(this, d); n.step = l; n = [].concat(a, b); this.chart.polar || "M" !== d[0] || (d[0] = "L"); this.graphPath = n; this.areaPath = this.areaPath.concat(a, d); n.isArea = !0; n.xMap = a.xMap; this.areaPath.xMap = a.xMap; return n
            }, drawDataLabels: function () {
                var a =
                this.data, b = a.length, d, e = [], g = m.prototype, c = this.options.dataLabels, f = c.align, n = c.verticalAlign, w = c.inside, l, q, h = this.chart.inverted; if (c.enabled || this._hasPointLabels) {
                    for (d = b; d--;) if (l = a[d]) q = w ? l.plotHigh < l.plotLow : l.plotHigh > l.plotLow, l.y = l.high, l._plotY = l.plotY, l.plotY = l.plotHigh, e[d] = l.dataLabel, l.dataLabel = l.dataLabelUpper, l.below = q, h ? f || (c.align = q ? "right" : "left") : n || (c.verticalAlign = q ? "top" : "bottom"), c.x = c.xHigh, c.y = c.yHigh; g.drawDataLabels && g.drawDataLabels.apply(this, arguments); for (d = b; d--;) if (l =
                    a[d]) q = w ? l.plotHigh < l.plotLow : l.plotHigh > l.plotLow, l.dataLabelUpper = l.dataLabel, l.dataLabel = e[d], l.y = l.low, l.plotY = l._plotY, l.below = !q, h ? f || (c.align = q ? "left" : "right") : n || (c.verticalAlign = q ? "bottom" : "top"), c.x = c.xLow, c.y = c.yLow; g.drawDataLabels && g.drawDataLabels.apply(this, arguments)
                } c.align = f; c.verticalAlign = n
            }, alignDataLabel: function () { h.column.prototype.alignDataLabel.apply(this, arguments) }, setStackedPoints: r, getSymbol: r, drawPoints: r
        })
    })(y); (function (a) {
        var p = a.seriesType; p("areasplinerange", "arearange",
        null, { getPointSpline: a.seriesTypes.spline.prototype.getPointSpline })
    })(y); (function (a) {
        var p = a.defaultPlotOptions, r = a.each, v = a.merge, m = a.noop, k = a.pick, h = a.seriesType, t = a.seriesTypes.column.prototype; h("columnrange", "arearange", v(p.column, p.arearange, { lineWidth: 1, pointRange: null }), {
            translate: function () {
                var b = this, d = b.yAxis, a = b.xAxis, g = a.startAngleRad, c, f = b.chart, n = b.xAxis.isRadial, w; t.translate.apply(b); r(b.points, function (e) {
                    var l = e.shapeArgs, h = b.options.minPointLength, x, u; e.plotHigh = w = d.translate(e.high,
                    0, 1, 0, 1); e.plotLow = e.plotY; u = w; x = k(e.rectPlotY, e.plotY) - w; Math.abs(x) < h ? (h -= x, x += h, u -= h / 2) : 0 > x && (x *= -1, u -= x); n ? (c = e.barX + g, e.shapeType = "path", e.shapeArgs = { d: b.polarArc(u + x, u, c, c + e.pointWidth) }) : (l.height = x, l.y = u, e.tooltipPos = f.inverted ? [d.len + d.pos - f.plotLeft - u - x / 2, a.len + a.pos - f.plotTop - l.x - l.width / 2, x] : [a.left - f.plotLeft + l.x + l.width / 2, d.pos - f.plotTop + u + x / 2, x])
                })
            }, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], drawGraph: m, crispCol: t.crispCol, drawPoints: t.drawPoints, drawTracker: t.drawTracker,
            getColumnMetrics: t.getColumnMetrics, animate: function () { return t.animate.apply(this, arguments) }, polarArc: function () { return t.polarArc.apply(this, arguments) }, pointAttribs: t.pointAttribs
        })
    })(y); (function (a) {
        var p = a.each, r = a.isNumber, v = a.merge, m = a.pick, k = a.pInt, h = a.Series, t = a.seriesType, b = a.TrackerMixin; t("gauge", "line", { dataLabels: { enabled: !0, defer: !1, y: 15, borderRadius: 3, crop: !1, verticalAlign: "top", zIndex: 2, borderWidth: 1, borderColor: "#cccccc" }, dial: {}, pivot: {}, tooltip: { headerFormat: "" }, showInLegend: !1 },
        {
            angular: !0, directTouch: !0, drawGraph: a.noop, fixedBox: !0, forceDL: !0, noSharedTooltip: !0, trackerGroups: ["group", "dataLabelsGroup"], translate: function () {
                var b = this.yAxis, a = this.options, g = b.center; this.generatePoints(); p(this.points, function (c) {
                    var d = v(a.dial, c.dial), e = k(m(d.radius, 80)) * g[2] / 200, w = k(m(d.baseLength, 70)) * e / 100, l = k(m(d.rearLength, 10)) * e / 100, q = d.baseWidth || 3, h = d.topWidth || 1, x = a.overshoot, u = b.startAngleRad + b.translate(c.y, null, null, null, !0); r(x) ? (x = x / 180 * Math.PI, u = Math.max(b.startAngleRad -
                    x, Math.min(b.endAngleRad + x, u))) : !1 === a.wrap && (u = Math.max(b.startAngleRad, Math.min(b.endAngleRad, u))); u = 180 * u / Math.PI; c.shapeType = "path"; c.shapeArgs = { d: d.path || ["M", -l, -q / 2, "L", w, -q / 2, e, -h / 2, e, h / 2, w, q / 2, -l, q / 2, "z"], translateX: g[0], translateY: g[1], rotation: u }; c.plotX = g[0]; c.plotY = g[1]
                })
            }, drawPoints: function () {
                var b = this, a = b.yAxis.center, g = b.pivot, c = b.options, f = c.pivot, n = b.chart.renderer; p(b.points, function (d) {
                    var a = d.graphic, f = d.shapeArgs, e = f.d, g = v(c.dial, d.dial); a ? (a.animate(f), f.d = e) : (d.graphic = n[d.shapeType](f).attr({
                        rotation: f.rotation,
                        zIndex: 1
                    }).addClass("highcharts-dial").add(b.group), d.graphic.attr({ stroke: g.borderColor || "none", "stroke-width": g.borderWidth || 0, fill: g.backgroundColor || "#000000" }))
                }); g ? g.animate({ translateX: a[0], translateY: a[1] }) : (b.pivot = n.circle(0, 0, m(f.radius, 5)).attr({ zIndex: 2 }).addClass("highcharts-pivot").translate(a[0], a[1]).add(b.group), b.pivot.attr({ "stroke-width": f.borderWidth || 0, stroke: f.borderColor || "#cccccc", fill: f.backgroundColor || "#000000" }))
            }, animate: function (b) {
                var d = this; b || (p(d.points, function (b) {
                    var c =
                    b.graphic; c && (c.attr({ rotation: 180 * d.yAxis.startAngleRad / Math.PI }), c.animate({ rotation: b.shapeArgs.rotation }, d.options.animation))
                }), d.animate = null)
            }, render: function () { this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup); h.prototype.render.call(this); this.group.clip(this.chart.clipRect) }, setData: function (b, a) { h.prototype.setData.call(this, b, !1); this.processData(); this.generatePoints(); m(a, !0) && this.chart.redraw() }, drawTracker: b && b.drawTrackerPoint
        },
        { setState: function (b) { this.state = b } })
    })(y); (function (a) {
        var p = a.each, r = a.noop, v = a.pick, m = a.seriesType, k = a.seriesTypes; m("boxplot", "column", {
            threshold: null, tooltip: { pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e' }, whiskerLength: "50%", fillColor: "#ffffff", lineWidth: 1,
            medianWidth: 2, states: { hover: { brightness: -.3 } }, whiskerWidth: 2
        }, {
            pointArrayMap: ["low", "q1", "median", "q3", "high"], toYData: function (a) { return [a.low, a.q1, a.median, a.q3, a.high] }, pointValKey: "high", pointAttribs: function (a) { var h = this.options, b = a && a.color || this.color; return { fill: a.fillColor || h.fillColor || b, stroke: h.lineColor || b, "stroke-width": h.lineWidth || 0 } }, drawDataLabels: r, translate: function () {
                var a = this.yAxis, m = this.pointArrayMap; k.column.prototype.translate.apply(this); p(this.points, function (b) {
                    p(m,
                    function (d) { null !== b[d] && (b[d + "Plot"] = a.translate(b[d], 0, 1, 0, 1)) })
                })
            }, drawPoints: function () {
                var a = this, k = a.options, b = a.chart.renderer, d, e, g, c, f, n, w = 0, l, q, m, x, u = !1 !== a.doQuartiles, r, z = a.options.whiskerLength; p(a.points, function (h) {
                    var A = h.graphic, p = A ? "animate" : "attr", t = h.shapeArgs, y = {}, D = {}, H = {}, I = h.color || a.color; void 0 !== h.plotY && (l = t.width, q = Math.floor(t.x), m = q + l, x = Math.round(l / 2), d = Math.floor(u ? h.q1Plot : h.lowPlot), e = Math.floor(u ? h.q3Plot : h.lowPlot), g = Math.floor(h.highPlot), c = Math.floor(h.lowPlot),
                    A || (h.graphic = A = b.g("point").add(a.group), h.stem = b.path().addClass("highcharts-boxplot-stem").add(A), z && (h.whiskers = b.path().addClass("highcharts-boxplot-whisker").add(A)), u && (h.box = b.path(void 0).addClass("highcharts-boxplot-box").add(A)), h.medianShape = b.path(void 0).addClass("highcharts-boxplot-median").add(A)), y.stroke = h.stemColor || k.stemColor || I, y["stroke-width"] = v(h.stemWidth, k.stemWidth, k.lineWidth), y.dashstyle = h.stemDashStyle || k.stemDashStyle, h.stem.attr(y), z && (D.stroke = h.whiskerColor || k.whiskerColor ||
                    I, D["stroke-width"] = v(h.whiskerWidth, k.whiskerWidth, k.lineWidth), h.whiskers.attr(D)), u && (A = a.pointAttribs(h), h.box.attr(A)), H.stroke = h.medianColor || k.medianColor || I, H["stroke-width"] = v(h.medianWidth, k.medianWidth, k.lineWidth), h.medianShape.attr(H), n = h.stem.strokeWidth() % 2 / 2, w = q + x + n, h.stem[p]({ d: ["M", w, e, "L", w, g, "M", w, d, "L", w, c] }), u && (n = h.box.strokeWidth() % 2 / 2, d = Math.floor(d) + n, e = Math.floor(e) + n, q += n, m += n, h.box[p]({ d: ["M", q, e, "L", q, d, "L", m, d, "L", m, e, "L", q, e, "z"] })), z && (n = h.whiskers.strokeWidth() % 2 /
                    2, g += n, c += n, r = /%$/.test(z) ? x * parseFloat(z) / 100 : z / 2, h.whiskers[p]({ d: ["M", w - r, g, "L", w + r, g, "M", w - r, c, "L", w + r, c] })), f = Math.round(h.medianPlot), n = h.medianShape.strokeWidth() % 2 / 2, f += n, h.medianShape[p]({ d: ["M", q, f, "L", m, f] }))
                })
            }, setStackedPoints: r
        })
    })(y); (function (a) {
        var p = a.each, r = a.noop, v = a.seriesType, m = a.seriesTypes; v("errorbar", "boxplot", {
            color: "#000000", grouping: !1, linkedTo: ":previous", tooltip: { pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e' },
            whiskerWidth: null
        }, { type: "errorbar", pointArrayMap: ["low", "high"], toYData: function (a) { return [a.low, a.high] }, pointValKey: "high", doQuartiles: !1, drawDataLabels: m.arearange ? function () { var a = this.pointValKey; m.arearange.prototype.drawDataLabels.call(this); p(this.data, function (h) { h.y = h[a] }) } : r, getColumnMetrics: function () { return this.linkedParent && this.linkedParent.columnMetrics || m.column.prototype.getColumnMetrics.call(this) } })
    })(y); (function (a) {
        var p = a.correctFloat, r = a.isNumber, v = a.pick, m = a.Point, k = a.Series,
        h = a.seriesType, t = a.seriesTypes; h("waterfall", "column", { dataLabels: { inside: !0 }, lineWidth: 1, lineColor: "#333333", dashStyle: "dot", borderColor: "#333333", states: { hover: { lineWidthPlus: 0 } } }, {
            pointValKey: "y", translate: function () {
                var b = this.options, a = this.yAxis, e, g, c, f, n, h, l, q, k, m, u = v(b.minPointLength, 5), r = u / 2, z = b.threshold, y = b.stacking, B; t.column.prototype.translate.apply(this); q = k = z; g = this.points; e = 0; for (b = g.length; e < b; e++) c = g[e], l = this.processedYData[e], f = c.shapeArgs, n = y && a.stacks[(this.negStacks && l < z ? "-" :
                "") + this.stackKey], B = this.getStackIndicator(B, c.x, this.index), m = n ? n[c.x].points[B.key] : [0, l], c.isSum ? c.y = p(l) : c.isIntermediateSum && (c.y = p(l - k)), h = Math.max(q, q + c.y) + m[0], f.y = a.toPixels(h, !0), c.isSum ? (f.y = a.toPixels(m[1], !0), f.height = Math.min(a.toPixels(m[0], !0), a.len) - f.y) : c.isIntermediateSum ? (f.y = a.toPixels(m[1], !0), f.height = Math.min(a.toPixels(k, !0), a.len) - f.y, k = m[1]) : (f.height = 0 < l ? a.toPixels(q, !0) - f.y : a.toPixels(q, !0) - a.toPixels(q - l, !0), q += n && n[c.x] ? n[c.x].total : l), 0 > f.height && (f.y += f.height, f.height *=
                -1), c.plotY = f.y = Math.round(f.y) - this.borderWidth % 2 / 2, f.height = Math.max(Math.round(f.height), .001), c.yBottom = f.y + f.height, f.height <= u && !c.isNull ? (f.height = u, f.y -= r, c.plotY = f.y, c.minPointLengthOffset = 0 > c.y ? -r : r) : c.minPointLengthOffset = 0, f = c.plotY + (c.negative ? f.height : 0), this.chart.inverted ? c.tooltipPos[0] = a.len - f : c.tooltipPos[1] = f
            }, processData: function (b) {
                var a = this.yData, e = this.options.data, g, c = a.length, f, n, h, l, q, m; n = f = h = l = this.options.threshold || 0; for (m = 0; m < c; m++) q = a[m], g = e && e[m] ? e[m] : {}, "sum" ===
                q || g.isSum ? a[m] = p(n) : "intermediateSum" === q || g.isIntermediateSum ? a[m] = p(f) : (n += q, f += q), h = Math.min(n, h), l = Math.max(n, l); k.prototype.processData.call(this, b); this.options.stacking || (this.dataMin = h, this.dataMax = l)
            }, toYData: function (b) { return b.isSum ? 0 === b.x ? null : "sum" : b.isIntermediateSum ? 0 === b.x ? null : "intermediateSum" : b.y }, pointAttribs: function (b, a) { var d = this.options.upColor; d && !b.options.color && (b.color = 0 < b.y ? d : null); b = t.column.prototype.pointAttribs.call(this, b, a); delete b.dashstyle; return b }, getGraphPath: function () {
                return ["M",
                0, 0]
            }, getCrispPath: function () { var b = this.data, a = b.length, e = this.graph.strokeWidth() + this.borderWidth, e = Math.round(e) % 2 / 2, g = [], c, f, n; for (n = 1; n < a; n++) f = b[n].shapeArgs, c = b[n - 1].shapeArgs, f = ["M", c.x + c.width, c.y + b[n - 1].minPointLengthOffset + e, "L", f.x, c.y + b[n - 1].minPointLengthOffset + e], 0 > b[n - 1].y && (f[2] += c.height, f[5] += c.height), g = g.concat(f); return g }, drawGraph: function () { k.prototype.drawGraph.call(this); this.graph.attr({ d: this.getCrispPath() }) }, setStackedPoints: function () {
                var b = this.options, a, e; k.prototype.setStackedPoints.apply(this,
                arguments); a = this.stackedYData ? this.stackedYData.length : 0; for (e = 1; e < a; e++) b.data[e].isSum || b.data[e].isIntermediateSum || (this.stackedYData[e] += this.stackedYData[e - 1])
            }, getExtremes: function () { if (this.options.stacking) return k.prototype.getExtremes.apply(this, arguments) }
        }, { getClassName: function () { var b = m.prototype.getClassName.call(this); this.isSum ? b += " highcharts-sum" : this.isIntermediateSum && (b += " highcharts-intermediate-sum"); return b }, isValid: function () { return r(this.y, !0) || this.isSum || this.isIntermediateSum } })
    })(y);
    (function (a) {
        var p = a.Series, r = a.seriesType, v = a.seriesTypes; r("polygon", "scatter", { marker: { enabled: !1, states: { hover: { enabled: !1 } } }, stickyTracking: !1, tooltip: { followPointer: !0, pointFormat: "" }, trackByArea: !0 }, {
            type: "polygon", getGraphPath: function () { for (var a = p.prototype.getGraphPath.call(this), k = a.length + 1; k--;) (k === a.length || "M" === a[k]) && 0 < k && a.splice(k, 0, "z"); return this.areaPath = a }, drawGraph: function () { this.options.fillColor = this.color; v.area.prototype.drawGraph.call(this) }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawTracker: p.prototype.drawTracker, setStackedPoints: a.noop
        })
    })(y); (function (a) {
        var p = a.arrayMax, r = a.arrayMin, v = a.Axis, m = a.color, k = a.each, h = a.isNumber, t = a.noop, b = a.pick, d = a.pInt, e = a.Point, g = a.Series, c = a.seriesType, f = a.seriesTypes; c("bubble", "scatter", {
            dataLabels: { formatter: function () { return this.point.z }, inside: !0, verticalAlign: "middle" }, marker: { lineColor: null, lineWidth: 1, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5 } } },
            tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, turboThreshold: 0, zThreshold: 0, zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"], parallelArrays: ["x", "y", "z"], trackerGroups: ["markerGroup", "dataLabelsGroup"], bubblePadding: !0, zoneAxis: "z", directTouch: !0, pointAttribs: function (a, c) { var d = b(this.options.marker.fillOpacity, .5); a = g.prototype.pointAttribs.call(this, a, c); 1 !== d && (a.fill = m(a.fill).setOpacity(d).get("rgba")); return a }, getRadii: function (b, a, c, d) {
                var f, e, g, n = this.zData, h = [], l = this.options, q =
                "width" !== l.sizeBy, k = l.zThreshold, m = a - b; e = 0; for (f = n.length; e < f; e++) g = n[e], l.sizeByAbsoluteValue && null !== g && (g = Math.abs(g - k), a = Math.max(a - k, Math.abs(b - k)), b = 0), null === g ? g = null : g < b ? g = c / 2 - 1 : (g = 0 < m ? (g - b) / m : .5, q && 0 <= g && (g = Math.sqrt(g)), g = Math.ceil(c + g * (d - c)) / 2), h.push(g); this.radii = h
            }, animate: function (b) {
                var a = this.options.animation; b || (k(this.points, function (b) { var c = b.graphic, d; c && c.width && (d = { x: c.x, y: c.y, width: c.width, height: c.height }, c.attr({ x: b.plotX, y: b.plotY, width: 1, height: 1 }), c.animate(d, a)) }),
                this.animate = null)
            }, translate: function () { var b, c = this.data, d, e, g = this.radii; f.scatter.prototype.translate.call(this); for (b = c.length; b--;) d = c[b], e = g ? g[b] : 0, h(e) && e >= this.minPxSize / 2 ? (d.marker = a.extend(d.marker, { radius: e, width: 2 * e, height: 2 * e }), d.dlBox = { x: d.plotX - e, y: d.plotY - e, width: 2 * e, height: 2 * e }) : d.shapeArgs = d.plotY = d.dlBox = void 0 }, alignDataLabel: f.column.prototype.alignDataLabel, buildKDTree: t, applyZones: t
        }, {
            haloPath: function (b) {
                return e.prototype.haloPath.call(this, 0 === b ? 0 : (this.marker ? this.marker.radius ||
                0 : 0) + b)
            }, ttBelow: !1
        }); v.prototype.beforePadding = function () {
            var a = this, c = this.len, f = this.chart, e = 0, g = c, m = this.isXAxis, t = m ? "xData" : "yData", v = this.min, y = {}, J = Math.min(f.plotWidth, f.plotHeight), B = Number.MAX_VALUE, E = -Number.MAX_VALUE, F = this.max - v, C = c / F, G = []; k(this.series, function (c) {
                var e = c.options; !c.bubblePadding || !c.visible && f.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, G.push(c), m && (k(["minSize", "maxSize"], function (b) { var a = e[b], c = /%$/.test(a), a = d(a); y[b] = c ? J * a / 100 : a }), c.minPxSize = y.minSize,
                c.maxPxSize = Math.max(y.maxSize, y.minSize), c = c.zData, c.length && (B = b(e.zMin, Math.min(B, Math.max(r(c), !1 === e.displayNegative ? e.zThreshold : -Number.MAX_VALUE))), E = b(e.zMax, Math.max(E, p(c))))))
            }); k(G, function (b) { var c = b[t], d = c.length, f; m && b.getRadii(B, E, b.minPxSize, b.maxPxSize); if (0 < F) for (; d--;) h(c[d]) && a.dataMin <= c[d] && c[d] <= a.dataMax && (f = b.radii[d], e = Math.min((c[d] - v) * C - f, e), g = Math.max((c[d] - v) * C + f, g)) }); G.length && 0 < F && !this.isLog && (g -= c, C *= (c + e - g) / c, k([["min", "userMin", e], ["max", "userMax", g]], function (c) {
                void 0 ===
                b(a.options[c[0]], a[c[1]]) && (a[c[0]] += c[2] / C)
            }))
        }
    })(y); (function (a) {
        function p(b, a) { var d = this.chart, g = this.options.animation, c = this.group, f = this.markerGroup, h = this.xAxis.center, k = d.plotLeft, l = d.plotTop; d.polar ? d.renderer.isSVG && (!0 === g && (g = {}), a ? (b = { translateX: h[0] + k, translateY: h[1] + l, scaleX: .001, scaleY: .001 }, c.attr(b), f && f.attr(b)) : (b = { translateX: k, translateY: l, scaleX: 1, scaleY: 1 }, c.animate(b, g), f && f.animate(b, g), this.animate = null)) : b.call(this, a) } var r = a.each, v = a.pick, m = a.seriesTypes, k = a.wrap, h =
        a.Series.prototype, t = a.Pointer.prototype; h.searchPointByAngle = function (b) { var a = this.chart, e = this.xAxis.pane.center; return this.searchKDTree({ clientX: 180 + -180 / Math.PI * Math.atan2(b.chartX - e[0] - a.plotLeft, b.chartY - e[1] - a.plotTop) }) }; h.getConnectors = function (b, a, e, g) {
            var c, d, h, k, l, m, p, r; d = g ? 1 : 0; c = 0 <= a && a <= b.length - 1 ? a : 0 > a ? b.length - 1 + a : 0; a = 0 > c - 1 ? b.length - (1 + d) : c - 1; d = c + 1 > b.length - 1 ? d : c + 1; h = b[a]; d = b[d]; k = h.plotX; h = h.plotY; l = d.plotX; m = d.plotY; d = b[c].plotX; c = b[c].plotY; k = (1.5 * d + k) / 2.5; h = (1.5 * c + h) / 2.5; l = (1.5 *
            d + l) / 2.5; p = (1.5 * c + m) / 2.5; m = Math.sqrt(Math.pow(k - d, 2) + Math.pow(h - c, 2)); r = Math.sqrt(Math.pow(l - d, 2) + Math.pow(p - c, 2)); k = Math.atan2(h - c, k - d); p = Math.PI / 2 + (k + Math.atan2(p - c, l - d)) / 2; Math.abs(k - p) > Math.PI / 2 && (p -= Math.PI); k = d + Math.cos(p) * m; h = c + Math.sin(p) * m; l = d + Math.cos(Math.PI + p) * r; p = c + Math.sin(Math.PI + p) * r; d = { rightContX: l, rightContY: p, leftContX: k, leftContY: h, plotX: d, plotY: c }; e && (d.prevPointCont = this.getConnectors(b, a, !1, g)); return d
        }; k(h, "buildKDTree", function (b) {
            this.chart.polar && (this.kdByAngle ? this.searchPoint =
            this.searchPointByAngle : this.options.findNearestPointBy = "xy"); b.apply(this)
        }); h.toXY = function (b) { var a, e = this.chart, g = b.plotX; a = b.plotY; b.rectPlotX = g; b.rectPlotY = a; a = this.xAxis.postTranslate(b.plotX, this.yAxis.len - a); b.plotX = b.polarPlotX = a.x - e.plotLeft; b.plotY = b.polarPlotY = a.y - e.plotTop; this.kdByAngle ? (e = (g / Math.PI * 180 + this.xAxis.pane.options.startAngle) % 360, 0 > e && (e += 360), b.clientX = e) : b.clientX = b.plotX }; m.spline && (k(m.spline.prototype, "getPointSpline", function (a, d, e, g) {
            this.chart.polar ? g ? (a = this.getConnectors(d,
            g, !0, this.connectEnds), a = ["C", a.prevPointCont.rightContX, a.prevPointCont.rightContY, a.leftContX, a.leftContY, a.plotX, a.plotY]) : a = ["M", e.plotX, e.plotY] : a = a.call(this, d, e, g); return a
        }), m.areasplinerange && (m.areasplinerange.prototype.getPointSpline = m.spline.prototype.getPointSpline)); k(h, "translate", function (a) { var b = this.chart; a.call(this); if (b.polar && (this.kdByAngle = b.tooltip && b.tooltip.shared, !this.preventPostTranslate)) for (a = this.points, b = a.length; b--;) this.toXY(a[b]) }); k(h, "getGraphPath", function (a,
        d) { var b = this, g, c, f; if (this.chart.polar) { d = d || this.points; for (g = 0; g < d.length; g++) if (!d[g].isNull) { c = g; break } !1 !== this.options.connectEnds && void 0 !== c && (this.connectEnds = !0, d.splice(d.length, 0, d[c]), f = !0); r(d, function (a) { void 0 === a.polarPlotY && b.toXY(a) }) } g = a.apply(this, [].slice.call(arguments, 1)); f && d.pop(); return g }); k(h, "animate", p); m.column && (m = m.column.prototype, m.polarArc = function (a, d, e, g) {
            var b = this.xAxis.center, f = this.yAxis.len; return this.chart.renderer.symbols.arc(b[0], b[1], f - d, null, {
                start: e,
                end: g, innerR: f - v(a, f)
            })
        }, k(m, "animate", p), k(m, "translate", function (a) { var b = this.xAxis, e = b.startAngleRad, g, c, f; this.preventPostTranslate = !0; a.call(this); if (b.isRadial) for (g = this.points, f = g.length; f--;) c = g[f], a = c.barX + e, c.shapeType = "path", c.shapeArgs = { d: this.polarArc(c.yBottom, c.plotY, a, a + c.pointWidth) }, this.toXY(c), c.tooltipPos = [c.plotX, c.plotY], c.ttBelow = c.plotY > b.center[1] }), k(m, "alignDataLabel", function (a, d, e, g, c, f) {
            this.chart.polar ? (a = d.rectPlotX / Math.PI * 180, null === g.align && (g.align = 20 < a && 160 >
            a ? "left" : 200 < a && 340 > a ? "right" : "center"), null === g.verticalAlign && (g.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle"), h.alignDataLabel.call(this, d, e, g, c, f)) : a.call(this, d, e, g, c, f)
        })); k(t, "getCoordinates", function (a, d) {
            var b = this.chart, g = { xAxis: [], yAxis: [] }; b.polar ? r(b.axes, function (a) { var c = a.isXAxis, e = a.center, h = d.chartX - e[0] - b.plotLeft, e = d.chartY - e[1] - b.plotTop; g[c ? "xAxis" : "yAxis"].push({ axis: a, value: a.translate(c ? Math.PI - Math.atan2(h, e) : Math.sqrt(Math.pow(h, 2) + Math.pow(e, 2)), !0) }) }) :
            g = a.call(this, d); return g
        }); k(a.Chart.prototype, "getAxes", function (b) { this.pane || (this.pane = []); r(a.splat(this.options.pane), function (b) { new a.Pane(b, this) }, this); b.call(this) }); k(a.Chart.prototype, "drawChartBox", function (a) { a.call(this); r(this.pane, function (a) { a.render() }) }); k(a.Chart.prototype, "get", function (b, d) { return a.find(this.pane, function (a) { return a.options.id === d }) || b.call(this, d) })
    })(y)
});