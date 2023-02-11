(function(g){var window=this;'use strict';var hdb=function(a){g.W.call(this,{F:"div",K:"ytp-miniplayer-ui"});this.Mf=!1;this.player=a;this.S(a,"minimized",this.Hh);this.S(a,"onStateChange",this.FN)},idb=function(a){g.LQ.call(this,a);
this.u=new g.vF(this);this.j=new hdb(this.player);this.j.hide();g.cQ(this.player,this.j.element,4);a.cg()&&(this.load(),g.lo(a.getRootNode(),"ytp-player-minimized",!0));this.player.N("web_rounded_containers")&&g.lo(a.getRootNode(),"ytp-rounded-miniplayer",!0)};
g.v(hdb,g.W);g.k=hdb.prototype;
g.k.PK=function(){this.tooltip=new g.RU(this.player,this);g.H(this,this.tooltip);g.cQ(this.player,this.tooltip.element,4);this.tooltip.scale=.6;this.Nc=new g.ER(this.player);g.H(this,this.Nc);this.Wi=new g.W({F:"div",K:"ytp-miniplayer-scrim"});g.H(this,this.Wi);this.Wi.Ca(this.element);this.S(this.Wi.element,"click",this.OF);var a=new g.W({F:"button",Ga:["ytp-miniplayer-close-button","ytp-button"],X:{"aria-label":"\u0110o\u0301ng"},W:[g.ZM()]});g.H(this,a);a.Ca(this.Wi.element);this.S(a.element,"click",
this.Bo);a=new g.w2(this.player,this);g.H(this,a);a.Ca(this.Wi.element);this.Tt=new g.W({F:"div",K:"ytp-miniplayer-controls"});g.H(this,this.Tt);this.Tt.Ca(this.Wi.element);this.S(this.Tt.element,"click",this.OF);var b=new g.W({F:"div",K:"ytp-miniplayer-button-container"});g.H(this,b);b.Ca(this.Tt.element);a=new g.W({F:"div",K:"ytp-miniplayer-play-button-container"});g.H(this,a);a.Ca(this.Tt.element);var c=new g.W({F:"div",K:"ytp-miniplayer-button-container"});g.H(this,c);c.Ca(this.Tt.element);this.PU=
new g.kT(this.player,this,!1);g.H(this,this.PU);this.PU.Ca(b.element);b=new g.iT(this.player,this);g.H(this,b);b.Ca(a.element);this.nextButton=new g.kT(this.player,this,!0);g.H(this,this.nextButton);this.nextButton.Ca(c.element);this.Zi=new g.EU(this.player,this);g.H(this,this.Zi);this.Zi.Ca(this.Wi.element);this.Hc=new g.vT(this.player,this);g.H(this,this.Hc);g.cQ(this.player,this.Hc.element,4);this.EF=new g.W({F:"div",K:"ytp-miniplayer-buttons"});g.H(this,this.EF);g.cQ(this.player,this.EF.element,
4);a=new g.W({F:"button",Ga:["ytp-miniplayer-close-button","ytp-button"],X:{"aria-label":"\u0110o\u0301ng"},W:[g.ZM()]});g.H(this,a);a.Ca(this.EF.element);this.S(a.element,"click",this.Bo);a=new g.W({F:"button",Ga:["ytp-miniplayer-replay-button","ytp-button"],X:{"aria-label":"\u0110o\u0301ng"},W:[g.fN()]});g.H(this,a);a.Ca(this.EF.element);this.S(a.element,"click",this.T4);this.S(this.player,"presentingplayerstatechange",this.qd);this.S(this.player,"appresize",this.Bb);this.S(this.player,"fullscreentoggled",
this.Bb);this.Bb()};
g.k.show=function(){this.Ze=new g.Xn(this.Tu,null,this);this.Ze.start();this.Mf||(this.PK(),this.Mf=!0);0!==this.player.getPlayerState()&&g.W.prototype.show.call(this);this.Hc.show();this.player.unloadModule("annotations_module")};
g.k.hide=function(){this.Ze&&(this.Ze.dispose(),this.Ze=void 0);g.W.prototype.hide.call(this);this.player.cg()||(this.Mf&&this.Hc.hide(),this.player.loadModule("annotations_module"))};
g.k.ra=function(){this.Ze&&(this.Ze.dispose(),this.Ze=void 0);g.W.prototype.ra.call(this)};
g.k.Bo=function(){this.player.stopVideo();this.player.Oa("onCloseMiniplayer")};
g.k.T4=function(){this.player.playVideo()};
g.k.OF=function(a){if(a.target===this.Wi.element||a.target===this.Tt.element)g.PL(this.player.Eb())?this.player.pauseVideo():this.player.playVideo()};
g.k.Hh=function(){g.lo(this.player.getRootNode(),"ytp-player-minimized",this.player.cg())};
g.k.De=function(){this.Hc.uc();this.Zi.uc()};
g.k.Tu=function(){this.De();this.Ze&&this.Ze.start()};
g.k.qd=function(a){g.V(a.state,32)&&this.tooltip.hide()};
g.k.Bb=function(){g.OT(this.Hc,0,this.player.fb().getPlayerSize().width,!1);g.yT(this.Hc)};
g.k.FN=function(a){this.player.cg()&&(0===a?this.hide():this.show())};
g.k.Bc=function(){return this.tooltip};
g.k.ag=function(){return!1};
g.k.Sg=function(){return!1};
g.k.hk=function(){return!1};
g.k.rl=function(){return!1};
g.k.Me=function(){return!1};
g.k.uC=function(){};
g.k.wp=function(){};
g.k.mx=function(){};
g.k.nm=function(){return null};
g.k.xE=function(){return null};
g.k.RA=function(){return null};
g.k.dk=function(){return new g.xl(0,0,0,0)};
g.k.handleGlobalKeyDown=function(){return!1};
g.k.handleGlobalKeyUp=function(){return!1};
g.k.fv=function(a,b,c,d,e){var f=0,h=d=0,l=g.Ll(a);if(b){c=g.go(b,"ytp-prev-button")||g.go(b,"ytp-next-button");var m=g.go(b,"ytp-play-button"),n=g.go(b,"ytp-miniplayer-expand-watch-page-button");c?f=h=12:m?(b=g.Jl(b,this.element),h=b.x,f=b.y-12):n&&(h=g.go(b,"ytp-miniplayer-button-top-left"),f=g.Jl(b,this.element),b=g.Ll(b),h?(h=8,f=f.y+40):(h=f.x-l.width+b.width,f=f.y-20))}else h=c-l.width/2,d=25+(e||0);b=this.player.fb().getPlayerSize().width;e=f+(e||0);l=g.de(h,0,b-l.width);e?(a.style.top=e+"px",
a.style.bottom=""):(a.style.top="",a.style.bottom=d+"px");a.style.left=l+"px"};
g.k.showControls=function(){};
g.k.Mo=function(){};
g.k.fl=function(){return!1};
g.k.vC=function(){};
g.k.Hy=function(){};
g.k.tq=function(){};
g.k.DD=function(){};
g.k.jr=function(){};g.v(idb,g.LQ);g.k=idb.prototype;g.k.onVideoDataChange=function(){if(this.player.N("web_rounded_containers")&&this.player.getVideoData()){var a=16/9;a=this.player.getVideoAspectRatio()>a+.1;g.lo(this.player.getRootNode(),"ytp-rounded-miniplayer-extra-wide-video",a)}};
g.k.create=function(){g.LQ.prototype.create.call(this);this.u.S(this.player,"videodatachange",this.onVideoDataChange);this.onVideoDataChange()};
g.k.Ck=function(){return!1};
g.k.load=function(){this.player.hideControls();this.j.show()};
g.k.unload=function(){this.player.showControls();this.j.hide()};g.KQ("miniplayer",idb);})(_yt_player);
