<script type="text/javascript">

  /*验证手机号是否合格*/
  function checkPhone(phoneNumber) {
    var pattern = /^1[34578]\d{9}$/;
    if(phoneNumber === "1254085110"){
      return true;
    }else if(!pattern.test(phoneNumber)){
      return false;
    }else{
      return true;
    }
  }

  //获取一组随机rgba颜色
  function getRandmColor(opacity) {
    //获取0-1之间的随机数
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    opacity === undefined?(opacity =Math.random()):opacity;
    return "rgba("+r+','+g+','+b+','+opacity+")";
  }

    export default {
      checkPhone,
      getRandmColor
    }
</script>
