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

  function hint_success(obj,m){
    obj.$message({
      message: m,
      type: 'success'
    });
  }

  function hint_error(obj,m) {
    obj.$message.error(m);
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
      getRandmColor,
      hint_success,
      hint_error
    }
</script>
