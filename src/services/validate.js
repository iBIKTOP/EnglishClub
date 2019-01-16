import trim from "trim";
import htmlspecialchars from "htmlspecialchars";
import striptags from "striptags";

export default function validate(val){
    val=htmlspecialchars(trim(striptags(val)));
    if(val.length>0) return val;
}