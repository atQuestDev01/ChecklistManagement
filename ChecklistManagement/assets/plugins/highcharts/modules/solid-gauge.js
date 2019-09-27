/*
  Highcharts JS v5.0.10 (2017-03-31)
 Solid angular gauge module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(l){"object"===typeof module&&module.exports?module.exports=l:l(Highcharts)})(function(l){(function(f){var l=f.pInt,u=f.pick,m=f.each,v=f.isNumber,w=f.wrap,n;w(f.Renderer.prototype.symbols,"arc",function(a,c,e,d,f,g){a=a(c,e,d,f,g);g.rounded&&(d=((g.r||d)-g.innerR)/2,g=["A",d,d,0,1,1,a[12],a[13]],a.splice.apply(a,[a.length-1,0].concat(["A",d,d,0,1,1,a[1],a[2]])),a.splice.apply(a,[11,3].concat(g)));return a});n={initDataClasses:function(a){var c=this,e=this.chart,d,t=0,g=this.options;this.dataClasses=
d=[];m(a.dataClasses,function(h,b){h=f.merge(h);d.push(h);h.color||("category"===g.dataClassColor?(b=e.options.colors,h.color=b[t++],t===b.length&&(t=0)):h.color=c.tweenColors(f.color(g.minColor),f.color(g.maxColor),b/(a.dataClasses.length-1)))})},initStops:function(a){this.stops=a.stops||[[0,this.options.minColor],[1,this.options.maxColor]];m(this.stops,function(a){a.color=f.color(a[1])})},toColor:function(a,c){var e=this.stops,d,f,g=this.dataClasses,h,b;if(g)for(b=g.length;b--;){if(h=g[b],d=h.from,
e=h.to,(void 0===d||a>=d)&&(void 0===e||a<=e)){f=h.color;c&&(c.dataClass=b);break}}else{this.isLog&&(a=this.val2lin(a));a=1-(this.max-a)/(this.max-this.min);for(b=e.length;b--&&!(a>e[b][0]););d=e[b]||e[b+1];e=e[b+1]||d;a=1-(e[0]-a)/(e[0]-d[0]||1);f=this.tweenColors(d.color,e.color,a)}return f},tweenColors:function(a,c,e){var d;c.rgba.length&&a.rgba.length?(a=a.rgba,c=c.rgba,d=1!==c[3]||1!==a[3],a=(d?"rgba(":"rgb(")+Math.round(c[0]+(a[0]-c[0])*(1-e))+","+Math.round(c[1]+(a[1]-c[1])*(1-e))+","+Math.round(c[2]+
(a[2]-c[2])*(1-e))+(d?","+(c[3]+(a[3]-c[3])*(1-e)):"")+")"):a=c.input||"none";return a}};m(["fill","stroke"],function(a){f.Fx.prototype[a+"Setter"]=function(){this.elem.attr(a,n.tweenColors(f.color(this.start),f.color(this.end),this.pos),null,!0)}});f.seriesType("solidgauge","gauge",{colorByPoint:!0},{translate:function(){var a=this.yAxis;f.extend(a,n);!a.dataClasses&&a.options.dataClasses&&a.initDataClasses(a.options);a.initStops(a.options);f.seriesTypes.gauge.prototype.translate.call(this)},drawPoints:function(){var a=
this,c=a.yAxis,e=c.center,d=a.options,t=a.chart.renderer,g=d.overshoot,h=v(g)?g/180*Math.PI:0,b;v(d.threshold)&&(b=c.startAngleRad+c.translate(d.threshold,null,null,null,!0));this.thresholdAngleRad=u(b,c.startAngleRad);m(a.points,function(b){var g=b.graphic,k=c.startAngleRad+c.translate(b.y,null,null,null,!0),m=l(u(b.options.radius,d.radius,100))*e[2]/200,p=l(u(b.options.innerRadius,d.innerRadius,60))*e[2]/200,q=c.toColor(b.y,b),r=Math.min(c.startAngleRad,c.endAngleRad),n=Math.max(c.startAngleRad,
c.endAngleRad);"none"===q&&(q=b.color||a.color||"none");"none"!==q&&(b.color=q);k=Math.max(r-h,Math.min(n+h,k));!1===d.wrap&&(k=Math.max(r,Math.min(n,k)));r=Math.min(k,a.thresholdAngleRad);k=Math.max(k,a.thresholdAngleRad);k-r>2*Math.PI&&(k=r+2*Math.PI);b.shapeArgs=p={x:e[0],y:e[1],r:m,innerR:p,start:r,end:k,rounded:d.rounded};b.startR=m;g?(b=p.d,g.animate(f.extend({fill:q},p)),b&&(p.d=b)):b.graphic=t.arc(p).addClass("highcharts-point").attr({fill:q,"sweep-flag":0}).add(a.group)})},animate:function(a){a||
(this.startAngleRad=this.thresholdAngleRad,f.seriesTypes.pie.prototype.animate.call(this,a))}})})(l)});
