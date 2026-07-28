/* ==========================================
   CEEZIX Utility Library
========================================== */

const Utils = {

    version: "1.0.0",

    $(selector){

        return document.querySelector(selector);

    },

    $$(selector){

        return [...document.querySelectorAll(selector)];

    },

    create(tag,className=""){

        const el=document.createElement(tag);

        if(className){

            el.className=className;

        }

        return el;

    },

    id(){

        return crypto.randomUUID();

    },

    random(min,max){

        return Math.floor(

            Math.random()*(max-min+1)

        )+min;

    },

    delay(ms){

        return new Promise(resolve=>{

            setTimeout(resolve,ms);

        });

    },

    formatDate(date=new Date()){

        return date.toLocaleDateString();

    },

    formatTime(date=new Date()){

        return date.toLocaleTimeString([],{

            hour:"2-digit",

            minute:"2-digit"

        });

    },

    capitalize(text){

        if(!text) return "";

        return text.charAt(0)

            .toUpperCase()

            +text.slice(1);

    },

    copy(text){

        navigator.clipboard

            .writeText(text)

            .then(()=>{

                Utils.toast("Copied");

            });

    },

    toast(message,type="info"){

        const toast=$("#toast");

        if(!toast) return;

        toast.innerText=message;

        toast.className="toast show "+type;

        clearTimeout(toast.timer);

        toast.timer=setTimeout(()=>{

            toast.className="toast";

        },2500);

    },

    loading(show=true){

        const loader=$("#loading");

        if(!loader) return;

        loader.style.display=

            show?"flex":"none";

    },

    online(){

        return navigator.onLine;

    },

    device(){

        return{

            mobile:/Android|iPhone|iPad/i

                .test(navigator.userAgent),

            touch:

                navigator.maxTouchPoints>0,

            width:window.innerWidth,

            height:window.innerHeight

        };

    }

};

const $=Utils.$;

const $$=Utils.$$;

window.Utils=Utils;
