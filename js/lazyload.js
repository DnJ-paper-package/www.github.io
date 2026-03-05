location.hostname !== 'www.paper-package.com' && (()=>{
    // wrap img src setter
    const originalDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');

    Object.defineProperty(HTMLImageElement.prototype, 'src', {
    set(value) {
        // 在这里对 value 做你想要的替换
        let newValue = value
            .replace(location.hostname, 'www.paper-package.com');
        if (!newValue.startsWith('//') && newValue.startsWith('/'))
            newValue = '//www.paper-package.com' + newValue;
        
        //console.log(`原始 src: ${value}, 修改后 src: ${newValue}`);

        // 调用原来的 setter 来继续加载图片
        originalDescriptor.set.call(this, newValue);
    },
    get() {
        return originalDescriptor.get.call(this);
    },
    configurable: true,
    enumerable: true,
    });

    // 修正 img[rel]
    $('img[rel]').each(function() {
        let relValue = $(this).attr('rel');
        // 自定义处理逻辑，比如替换某些字符
        let newValue = relValue.replace(location.hostname, 'www.paper-package.com');
        $(this).attr('rel', newValue);
    });

    // 删掉表单功能
    $('#floatAd').children().first().remove();
    $('.contact_btn').filter('a').remove();
    $('.content_box').children().last().remove();
    creatDialog = ()=>{};
    $('#header_index').find('.gnb_navi').children().last().remove();
    $('form').filter(function () {
        return Array.from(this.attributes).some(attr =>
            attr.value && attr.value.toLowerCase().includes('contactnow')
        );
    }).remove();

    // 删掉 a标签 中的 skype 和 contactnow
    $('a').each(function () {
	    if ( this.outerHTML.toLowerCase().includes('skype')
		  || this.outerHTML.toLowerCase().includes('contactnow')
		) {
            $(this).remove();
        }
    });

	// 删掉 Miss. Wang
	if (location.href.includes('contactus')) {
		const rows = document.querySelectorAll("tbody tr");
		
		let deleting = false;
		
		rows.forEach(row => {
		    const td = row.querySelector("td");
		
		    if (td && td.textContent.trim() === "Miss. Wang") {
		        deleting = true;
		    }
		
		    if (deleting) {
		        const isDivider = row.querySelector("td[colspan='2']");
		        row.remove();
		        if (isDivider) {
		            deleting = false;
		        }
		    }
		});
	}

    // 首页轮播图片修正
    $('.main_image').find('span').each(function () {
        let style = $(this).attr('style');

        if (style && style.includes(location.hostname)) {
            const map = {
                'cl35747921': 'cl35747921-corrugated_paper_packaging_box',
                'cl35747996': 'cl35747996-custom_paper_packaging_box',
                'cl35748110': 'cl35748110-paperboard_packaging_box',
            };
            const key = Object.keys(map).find(k=>style.includes(k));
            if (!key) return;
            const reg = new RegExp(`${location.hostname}/photo/${key}-.*\\.jpg`);
            let newStyle = style.replace(
                reg,
                `www.paper-package.com/photo/${map[key]}.jpg`
            );

            $(this).attr('style', newStyle);
        }
    });
})();

!document.cookie.includes('exclude_me=20d36b44d6bae6e5b4df620b5e260a67')
&& (() => {
    let script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-117P8R4BLC";
    //script.type = 'text/javascript';
    script.async = true;
    document.documentElement.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-117P8R4BLC');

    script = document.createElement('script');
    script.src = "/js/human_verify.js";
    script.async = true;
    document.documentElement.appendChild(script);
})();

location.hostname === 'www.paper-package.com'
&& (() => {
    const now = Date.now();
    setTimeout(() => {
        if (extInfos && !extInfos.err && !extInfos.ipinfoTime) {
            extInfos.ipinfoTime = now;
            localStorage.setItem('extInfos', JSON.stringify(extInfos));
        }
        if (!extInfos || extInfos.err || now - extInfos.ipinfoTime > 1000 * 3600)
            $.get("https://ipinfo.io", function (response) {
                extInfos = response;
                extInfos.ipinfoTime = now;
                localStorage.setItem('extInfos', JSON.stringify(extInfos));
                extInfos.visitTime = now;
            }, "json").fail(function (jqXHR, status, error) {
                if (extInfos && !extInfos.err) {
                    extInfos.visitTime = now;
                    return;
                };
                extInfos = { err: JSON.stringify(jqXHR) };
                localStorage.setItem('extInfos', JSON.stringify(extInfos));
                extInfos.visitTime = now;
            })
        else {
            extInfos.visitTime = now;
        }
    }, 3000);
})();

(() => { // 附加 style
    var style = document.createElement('style');
    style.innerHTML = `
// 暂时隐藏语言选择
//.select_language_wrap { display: none !important; }
.mobile_site { display: none !important; }
#formbutton-button {
	padding: 0px !important;
	height: 0px !important;
}
#floatAd { cursor: pointer; }
.n_contact_box_2 .l_msy {
    height: unset;
}
.f_foot_all dl dd p:before {
    content: "\\25AA";
}
`;
    document.head.appendChild(style);
})();

(() => { // 悬浮按钮增加 WhatsApp Email
    $('body').append(`
<style type='text/css'>
	#floatAd {
		right: 0px !important;
	}
	#wmkc {
/*
        position: fixed;
        right: 5px;
        top: 40%;
        transform: translateY(-50%);
        font-family: var(--fontfamily, Arial);
        z-index: 9999
*/
		margin-top: 5px;
		border: 1px solid #ddd;
    }
    #wmkc * {
        box-sizing: border-box;
        font-size: 12px;
        line-height: 1.1
    }

    .wmkc-list {
        padding: 0;
        //border: 1px solid #eee;
        background-color: #fff;
        //max-width: 78px;
        border-radius: 4px;
        margin: 0
    }

    .wmkc-icon {
        display: inline-block;
        background: url(https://img01.v15cdn.com/iconfloat/wmkc-ico23.webp) no-repeat;
        width: 28px;
        height: 28px;
        //transform: scale(.8)
    }

    .wmkc-list>li {
        width: 100%;
        border-top: 1px solid #eee;
        list-style: none;
        text-align: center;
        padding: 2px 0 4px;
        transition: all .2s ease-in-out
    }

    .wmkc-list>li>a>p {
        margin: 0;
        transform: scale(.9);
        text-transform: capitalize
    }

    .wmkc-list>li a {
        color: #555;
        text-decoration: none;
        display: block;
        padding: 0 2px
    }

    .wmkc-wechat-img {
        position: absolute;
        right: calc(100% - 1px);
        bottom: 0;
        width: 120px;
        text-align: center;
        padding: 10px 10px 6px;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 4px;
        transform: scale(0);
        transform-origin: right bottom
    }

    .wmkc-wechat-img img {
        display: block;
        max-width: 100%;
        max-height: 100%
    }

    .wmkc-wechat-img p {
        margin: 4px 0 0;
        transform: scale(.9);
        word-break: break-all
    }

    .wmkc-wechat-img em {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url(https://img01.v15cdn.com/iconfloat/wmkc-ico23.webp) -76px -8px/99px no-repeat;
        vertical-align: middle;
        margin-right: 4px
    }

    .wmkc-list>li:hover .wmkc-wechat-img {
        transition: transform .4s;
        transform: scale(1)
    }

    .wmkc-list>li:hover,
    .wmkc-list>li:hover+li {
        border-color: transparent
    }

    .wmkc-email .wmkc-icon {
        background-position: -8px -6px
    }

    .wmkc-whatsapp .wmkc-icon {
        background-position: -52px -50px
    }

    .wmkc-skype .wmkc-icon {
        background-position: -52px -6px
    }

    .wmkc-wechat .wmkc-icon {
        background-position: -144px -10px
    }

    .wmkc-vkontakte .wmkc-icon {
        background-position: -143px -92px
    }

    .wmkc-list li:hover a {
        color: #fff
    }

    .wmkc-email:hover {
        background-color: #f90
    }

    .wmkc-whatsapp:hover {
        background-color: #25d366
    }

    .wmkc-skype:hover {
        background-color: #0091df
    }

    .wmkc-wechat:hover {
        background-color: #07c160
    }

    .wmkc-vkontakte:hover {
        background-color: #07f
    }

    .wmkc-teams:hover {
        background-color: #5252bd
    }

    .wmkc-email:hover .wmkc-icon {
        background-position: -96px -6px
    }

    .wmkc-whatsapp:hover .wmkc-icon {
        background-position: -52px -94px
    }

    .wmkc-skype:hover .wmkc-icon {
        background-position: -96px -50px
    }

    .wmkc-wechat:hover .wmkc-icon {
        background-position: -144px -62px
    }

    .wmkc-vkontakte:hover .wmkc-icon {
        background-position: -96px -92px
    }

    .wmkc-list>li:first-child {
        border-radius: 4px 4px 0 0;
        border: 0
    }

    .wmkc-list>li:last-child {
        border-radius: 0 0 4px 4px
    }

    .wmkc-teams .wmkc-icon {
        display: inline-block;
        background: url(https://img01.v15cdn.com/iconfloat/23/teams.webp) no-repeat center;
        width: 28px;
        height: 28px;
        background-size: 28px
    }

    .wmkc-teams:hover .wmkc-icon {
        background-image: url(https://img01.v15cdn.com/iconfloat/23/teams-w.webp)
    }

    @media (max-width:768px) {
        #wmkc {
            display: none
        }
    }
</style>
`);
    $('#floatAd').append(`
<div id='wmkc'>
    <ul class='wmkc-list'>
        <li class='wmkc-whatsapp'><a href='https://api.whatsapp.com/send?l=en&phone=8613027910809' target='_blank'
                rel='nofollow' title='Jill:8613027910809' id='F8'><i class='wmkc-icon'></i>
                <p>Jill</p>
            </a></li>
        <li class='wmkc-email'><a href='mailto:sales@paper-package.com' target='_blank' rel='nofollow'
                title='sales@paper-package.com' id='F9'><i class='wmkc-icon'></i>
                <p>E-Mail</p>
            </a></li>
    </ul>
</div>
`);
})();