(()=>{ // ipinfo.io 需要 token 暂时忽略
	extInfos = undefined;
})();

(()=>{ // 附加 style
	// 暂时隐藏语言选择
	var style = document.createElement('style');
	style.innerHTML = `
.select_language_wrap { display: none !important; }
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

(()=>{ // 悬浮按钮增加 WhatsApp Email
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