$(document).ready(function() {





    $(".bd-login").on("click", ".opt-tit",
        function() {
            var e = $(this),
                t = e.parents(".item-opt"),
                n = e.siblings(".mod-input");
            n.focus(),
                t.addClass("item-opt-active"),
                t.addClass("item-opt-focus")
        }),
        $(".bd-login").on("focus", ".mod-input",
            function() {
                var e = $(this),
                    t = e.parents(".item-opt");
                t.addClass("item-opt-active"),
                    t.addClass("item-opt-focus")
            }),
        $(".bd-login").on("blur", ".mod-input",
            function() {
                var e = $(this),
                    t = e.parents(".item-opt");
                return e.val() ? (t.removeClass("item-opt-focus"), !1) : (t.removeClass("item-opt-active"), void t.removeClass("item-opt-focus"))
            })
});