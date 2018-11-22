// bindEvent
function bindEvent () {
  // tab 切换
  $(".tab-title").find("span").on("mouseover", function () {
    var index = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");

    if (!$(this).parent().siblings(".tab-content").length) {
      $(this).parent().parent().siblings(".tab-content").find(".tab-item").eq(index).addClass("active").siblings().removeClass("active");
    } else {
      $(this).parent().siblings(".tab-content").find(".tab-item").eq(index).addClass("active").siblings().removeClass("active");
    }

    // 视频区块切换 暂停播放视频
    if ($(this).parent().siblings(".tab-content").find(".tab-item").eq(0).hasClass("home-video_list-item")) {
      $(".home-video").each(function() {
        $(this).siblings(".home-video_play").show();
        $(this)[0].pause();
      })

      $(".home-video_list-container").on("mouseover mouseout", function (event) {
        if (event.type == "mouseover") {
          $(this).addClass("video-hover");
        } else if (event.type == "mouseout") {
          $(this).removeClass("video-hover");
        }
      })
    }
  })

  // 网站战车导航栏切换
  $(".chariot-left_nav").find("li a").on("click", function () {
    var index = $(this).parent().index();

    $(this).parent().addClass("active-li").siblings().removeClass("active-li");
    $(".guide-tab_container").find(".tab-item").eq(index).addClass("active").siblings().removeClass("active");
    

    // 游戏下载页 游戏壁纸和游戏精彩截图，切换tab时，更新图片预览的图片列表
    if ($(".guide-tab_container").find(".tab-item").eq(index).attr("data-type")) {
      var html = $(".guide-tab_container").find(".tab-item").eq(index).find(".game-wallpapers-imgs img").clone();
      $(".game-wallpapers-mask-content-list-img").empty().append(html);
    }

    // 如果是战车百科页面增加攻击防御动画
    $(".tab-item").eq(index).find(".chariot-encyclopedia-actual-item").each(function () {
      var _this = this;
      var width = $(this).attr("data-width");

      setTimeout(() => {
        $(_this).css("width", width);
      }, 50);
    })
  })

  // 战车百科上下滑动动画
  $(".chariot-left_top").on("click", function () {
    if (!$(this).siblings(".chariot-left_nav-container").hasClass("active")) {
      return false;
    }

    $(this).hide().siblings(".chariot-left_nav-container").removeClass("active");
    $(".chariot-left_bottom").fadeIn();
  })

  $(".chariot-left_bottom").on("click", function () {
    if ($(this).siblings(".chariot-left_nav-container").hasClass("active")) {
      return false;
    }
    $(this).hide().siblings(".chariot-left_nav-container").addClass("active");
    $(".chariot-left_top").fadeIn();
  })

  // 首页视频动画
  $(".home-video_list-container").on("mouseover mouseout", function (event) {
    if (event.type == "mouseover") {
      $(this).addClass("video-hover");
    } else if (event.type == "mouseout") {
      $(this).removeClass("video-hover");
    }
  })

  // 首页轮播图 左右控制按钮动画
  $(".home-flexslider_middle").hover(function () {
    $(".home-flexslider_middle .flex-next").css("opacity","1")
    $(".home-flexslider_middle .flex-prev").css("opacity","1")
  }, function () {
    $(".home-flexslider_middle .flex-next").css("opacity","0")
    $(".home-flexslider_middle .flex-prev").css("opacity","0")
  })

  // 首页图片预览
  $(".home-list_image-list").find(".preview-img").on("click", function () {
    var imgSrc = $(this).parent().attr("data-bigimgsrc");
    preview(imgSrc);
  })

  // 排行榜
  $(".rank-select_selected").on("click", function () {
    $(this).parent().siblings(".rank-select").find("ul").removeClass("rank-select_item-active");
    $(this).parent().siblings(".rank-select").find("img").attr("src", "images/down.png");
    if ($(this).siblings("ul").hasClass("rank-select_item-active")) {
      $(this).children("img").attr("src", "images/down.png");
      $(this).siblings("ul").removeClass("rank-select_item-active");
      return false;
    }

    $(this).children("img").attr("src", "images/down-active.png");
    $(this).siblings("ul").addClass("rank-select_item-active");

    return false;
  })

  // 排行榜下拉框赋值
  $(".rank-select_item").children("li").on("click", function () {
    var selectItem = $(this).html();
    if ($(".rank-select").find(".type").html() === $(this).html() || $(".rank-select").find(".num").html() === $(this).html()) {
      $(this).parent().removeClass("rank-select_item-active");
      return false;
    };
  
    $(this).parent().siblings(".rank-select_selected").find("span").html(selectItem);
    $(this).parent().removeClass("rank-select_item-active");

    // ajax请求
    var type = $(".rank-select").find(".type").html();
    var num = $(".rank-select").find(".num").html();

    console.log(type, num)
  })

  // 事件冒泡
  $(document).on("click", function () {
    $(".item-list").removeClass("item-list_active");
    $(".rank-select").each(function () {
      $(this).find("img").attr("src", "images/down.png");
      $(this).find(".rank-select_item").removeClass("rank-select_item-active");
    })
  })

  // 王者战车
  $(".chariot-icon").hover(function () {
    var hoverImg = $(this).find("img").attr("data-src");
    var img = $(this).find("img").attr("src");
    $(this).addClass("active").find("img").attr({
      src: hoverImg,
      "data-src": img
    });
  }, function () {    
    var hoverImg = $(this).find("img").attr("src");
    var img = $(this).find("img").attr("data-src");
    $(this).removeClass("active").find("img").attr({
      src: img,
      "data-src": hoverImg
    });
  })

  // 首页下载按钮hover事件
  $(".download-container").children("a").hover(function () {
    var hoverSrc = $(this).find("img").attr("data-src");
    var src = $(this).find("img").attr("src");
    $(this).find("img").attr("data-src", src);
    $(this).find("img").attr("src", hoverSrc);
  }, function () {
    var hoverSrc = $(this).find("img").attr("data-src");
    var src = $(this).find("img").attr("src")
    $(this).find("img").attr("data-src", src);
    $(this).find("img").attr("src", hoverSrc);
  })

  // 首页向下浮动按钮
  $(".home-banner_bottom").on("click", function () {
    var height = $(".home-list ").offset().top - 100;
    
    $('html ,body').animate({scrollTop: height},'slow')
  })
}

// 王者战车页面 游戏截图轮播
function slide () {
  $(".game-wallpapers-imgs_wallpaper").find("img").on("click", function () {
    var index = $(this).index();
    $(".game-wallpapers-imgs_wallpaper").attr("data-index", index);
    $(".game-wallpapers-mask-content-list-img img").eq(index).addClass("active").siblings().removeClass("active");
    $(".game-wallpapers-mask").addClass("active");
  });

  $(".game-wallpapers-imgs_screenshot").find("img").on("click", function () {
    var index = $(this).index();
    $(".game-wallpapers-imgs_screenshot").attr("data-index", index);
    $(".game-wallpapers-mask-content-list-img img").eq(index).addClass("active").siblings().removeClass("active");
    $(".game-wallpapers-mask").addClass("active");
  });

  // 点击关闭按钮
  $(".game-wallpapers-mask-close img").on("click", function () {
    $(".game-wallpapers-mask").removeClass("active");
  })

  // 点击关闭按钮
  $(".game-wallpapers-mask-close img").on("click", function () {
    $(".game-wallpapers-mask").removeClass("active");
  })

  // 点击左右轮播
  $(".game-wallpapers-mask-content-list-next img").on("click", function () {
    var wrap = $(".game-wallpapers-imgs_wallpaper");
    $(".tab-item").each(function () {
      if ($(this).attr("data-type") && $(this).hasClass("active")) {
        if ($(this).attr("data-type") === "2") {
          wrap = $(".game-wallpapers-imgs_screenshot");
        }
      }
    })

    var len = $(".game-wallpapers-mask-content-list-img img").length;
    var index = parseInt(wrap.attr("data-index"));
    if (index === len - 1) {
      return false;
    }

    wrap.attr("data-index", index + 1);
    $(".game-wallpapers-mask-content-list-img img").eq(index + 1).addClass("active").siblings().removeClass("active");
  })

  $(".game-wallpapers-mask-content-list-pre img").on("click", function () {
    var wrap = $(".game-wallpapers-imgs_wallpaper");
    $(".tab-item").each(function () {
      if ($(this).attr("data-type") && $(this).hasClass("active")) {
        if ($(this).attr("data-type") === "2") {
          wrap = $(".game-wallpapers-imgs_screenshot");
        }
      }
    })

    var index = parseInt(wrap.attr("data-index"));

    if (index === 0) {
      return false;
    }

    wrap.attr("data-index", index - 1);
    $(".game-wallpapers-mask-content-list-img img").eq(index - 1).addClass("active").siblings().removeClass("active");
  })
}

/**
 * 图片预览
 * 
 * @param {string} src 
 */
function preview (src) { 
  var html = '<div class="image-viewer">' +
        '<div class="image-box clearfix">' +
          '<img class="image" src="' + src + '">' + 
          '<img class="close" title="关闭预览" src="images/yxxz_yxbz_qhicon3.png">' +
        '</div>' +
      '</div>';
  $("body").append(html);

  setTimeout(function () {
    $(".image-viewer").addClass("image-viewer-active");
  }, 20)

  $(".image-viewer").find(".close").on("click", function () {
    $(".image-viewer").removeClass("image-viewer-active");
    setTimeout(function () {
      $(".image-viewer").remove();
    }, 300)
  })
}

// 函数节流
function debounce(func) {
  var timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, 500) //返回计时器 ID
  }
}


 
// 王者中心的js
function center () {
  var slider = $(".center-flexslider_big").flexslider({
    animation: 'slide',
    slideshow: false,
    direction: "vertical",
    animationLoop: false,
    directionNav: false,
    controlNav: true,
    mousewheel: true,
    slideshowSpeed: 4000,
    manualControls: ".center-slide_nav li",
    after: function (slide) {
      if (slide.currentSlide === 4) {
        slide.next();
      }
    }
  });

  $(".slide-flexslider_min").each(function (index) {
    var list = [];
    $(this).find(".slideMin img").each(function () {
      list.push($(this).attr("src"));
    })

    var html = '<div class="slide-bottom">' +
        '<img class="prev' + index + '" src="' + list[list.length - 1] + '" />' +
        '<img class="next' + index + '" src="' + list[1] + '" />' +
        '</div>';
    $(this).parent().append(html);

    $(this).flexslider({
      selector: '.slideMin li',
      slideshow: true,
      directionNav: true,
      controlNav: true,
      slideshowSpeed: 4000,
      pauseOnAction: false,
      animationSpeed: 0,
      after: function (slide) {
        // 切换左右图片
        var list = [];
        slide.find("li img").each(function () {
          list.push($(this).attr("src"));
        })
        if (slide.currentSlide === 0) {
          slide.siblings(".slide-bottom").find("img").eq(0).attr("src", list[list.length - 1]);
          slide.siblings(".slide-bottom").find("img").eq(1).attr("src", list[1]);
        } else if (slide.currentSlide === list.length - 1) {
          slide.siblings(".slide-bottom").find("img").eq(1).attr("src", list[0]);
          slide.siblings(".slide-bottom").find("img").eq(0).attr("src", list[slide.currentSlide - 1]);
        } else {
          slide.siblings(".slide-bottom").find("img").eq(0).attr("src", list[slide.currentSlide - 1]).fadeIn();
          slide.siblings(".slide-bottom").find("img").eq(1).attr("src", list[slide.currentSlide + 1]).fadeIn();
        }

        // 切换左侧文字
        slide.parent().siblings(".slide-content-left").find(".slide-content-left-item")
          .eq(slide.currentSlide).addClass("active").siblings().removeClass("active");
      }
    });
  })

  // 下载
  $(".center-download").find("a").hover(function () {
    var hoverSrc = $(this).find("img").attr("data-src");
    var src = $(this).find("img").attr("src");
    $(this).find("img").attr("data-src", src);
    $(this).find("img").attr("src", hoverSrc);
  }, function () {
    var hoverSrc = $(this).find("img").attr("data-src");
    var src = $(this).find("img").attr("src")
    $(this).find("img").attr("data-src", src);
    $(this).find("img").attr("src", hoverSrc);
  })
}

// 顶部新闻 文字滚动
function textSlider () {
  setInterval(function () {
    $(".header-top_news").animate({
      marginTop: "-50px"
      }, 800, function() {
        $(this).css({ marginTop: "0px" }).find("a:first").appendTo(this);
      }
    );
  }, 3000)
}

$(window).ready(function () {
  bindEvent();

  $("#center").length && center();

  $(".game-download").length && slide();

  // 首页轮播图
  $(".home-flexslider_top").length && $(".home-flexslider_top").flexslider({
    animation: 'slide',
    slideshow: true,
    directionNav: false,
    controlNav: true,
    slideshowSpeed: 4000,
    pauseOnAction: false
  });

  $(".home-flexslider_top").length && $(".home-flexslider_middle").flexslider({
    slideshowSpeed: 4000,
    controlNav: false,
    slideshow: true,
    pauseOnAction: false
  });

    function getTop(){
        var top = $(document).scrollTop();
        if(top>500){
            $(".sidebar").addClass('act')
        }else{
            $(".sidebar").removeClass('act')
        }
        setTimeout(getTop);
    }
    getTop();
    $(".side-go-top").on("click",function () {
        $(document).scrollTop(0)
    })
    $(".side-btn").on("click",function () {
        if($('.sidebar').hasClass('sidebar-open')) {
            $(".sidebar").removeClass('sidebar-open')
        }else {
            $(".sidebar").addClass('sidebar-open')
        }
    })

  // 战车百科
  $("#chariot").length && $(".tab-item").eq(0).find(".chariot-encyclopedia-actual-item").each(function () {
    var _this = this;
    var width = $(this).attr("data-width");

    setTimeout(() => {
      $(_this).css("width", width);
    }, 300);
  })

  $(".header-top_news").length && textSlider();
})