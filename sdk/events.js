var coinTracker=function(r){"use strict";var n=function(){return(n=Object.assign||function(r){for(var n,t=1,e=arguments.length;t<e;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(r[o]=n[o]);return r}).apply(this,arguments)};function t(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return console.log.apply(console,["COIN Tracker"].concat(r))}var e,o,c,i,a,p,u,s,d,l,f,k=window,h=document;function v(r){var n=d.createElement("img");n.style.position="absolute",n.style.top="-1000px",n.style.left="-1000px",n.style.opacity="0",n.src=r,function r(n){d.body?d.body.appendChild(n):d.addEventListener("readystatechange",function(){return r(n)})}(n)}var g=function(r){var n=r.w,t=r.withOptions,e=r.trackEvent;function o(r){r.__tracked||(e(t(r)),r.__tracked=!0,c(r))}n.coinTracker=n.coinTracker||[];var c=n.coinTracker.push.bind(n.coinTracker);return n.coinTracker.push=o,n.coinTracker.forEach(o),n.coinTracker}({w:k,withOptions:(o=(e={w:k,d:h,logger:t,parser:function(r){return r?r.split(/&|;/g).map(function(r){return r.split("=")}).reduce(function(r,n){return r[n[0]]=n[1],r},{}):{}}}).d,c=e.w,i=e.parser,a=e.logger,p=i(o.cookie),u=i(c.location.search.replace(/^\?/,"")),a({fromCookie:p,fromQuery:u}),function(r){return n({},p,u,r)}),trackEvent:(d=(s={w:k,d:h,apiUri:"https://t.coinapp.co",logger:t}).d,l=s.apiUri,f=s.logger,function(r){if(r)switch(f("Track event",r),r&&r.event){case"click":return function(r){r.drop_id&&v(l+"/drop/click/"+r.drop_id)}(r);case"convert":return function(r){r.drop_id&&v(l+"/drop/convert/"+r.drop_id)}(r)}})}),y=g.forEach.bind(g),w=g.push.bind(g);return r.coinTracker=g,r.forEach=y,r.push=w,r}({});
