
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";
import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Text "mo:base/Text";

actor {
 
public type UserRole = {
    user_Prin:Principal;
    role:Nat64;
  };

  public type OrgRegistration = {
    orgname:Text;
    email:Text;
    orgloc:Text;
    aboutorg:Text;
    phno:Nat64;
    role:Nat64;
    prin:Principal;
  };

  var org_reg = HashMap.HashMap<Principal , OrgRegistration>(0 , Principal.equal , Principal.hash);
  var roles = HashMap.HashMap<Principal , UserRole>(0 , Principal.equal , Principal.hash );

  public shared query func check_role(user_Prin:Principal): async Text{
    var answer = roles.get(user_Prin);
    switch(answer) {
      case(?found) { 
        if(found.role == 1){
          return "you are an Organization";
        }else{
          return "you are a Student";
        }
       };
      case(null) { 
        return "you are not registered" 
      };
    };
  };

  public func set_org_registration(details:OrgRegistration):async Text{
    var check = roles.get(details.prin);
    switch(check) {
      case(null) { 
        org_reg.put(details.prin , details);
        var userRole = {
          user_Prin = details.prin;
          role = details.role;
        };
        roles.put(details.prin , userRole);
        return "successfully registered";
        };
      case(?found) {
        if(found.role == 1){
          return "you already registered as Organization";
        }else{
          return "you already registered as Student";
        }
       };
    };
  };


  public shared query func get_Org_Registration(prin:Principal) : async ?OrgRegistration {
   var get_org= org_reg.get(prin);
   switch(get_org) {
        case(null) { 
          return null;
        };
        case(?found) { 
          return get_org;
        };
    };
  };

   public type StdRegistration = {
    name:Text;
    rollno:Text;
    email:Text;
    dob:Text;
    collegeName:Text;
    address:Text;
    prin:Principal;
    role:Nat64;
  };

  var std_reg = HashMap.HashMap<Principal ,StdRegistration>(0 , Principal.equal , Principal.hash);

  public func set_std_registration(details:StdRegistration):async Text {
    var check = roles.get(details.prin);
    switch(check) {
      case(?found) { 
         if(found.role == 1){
          return "you already registered as organization";
        }else{
          return "you already registered as student";
        }
       };
      case(null) { 
        std_reg.put(details.prin , details);
         var userRole = {
          user_Prin = details.prin;
          role = details.role;
        };
        roles.put(details.prin , userRole);
        return "successfully registered";
       };
    };
  };

    public shared query func get_std_details(prin:Principal):async ?StdRegistration{
      var get_student =std_reg.get(prin);
      switch(get_student) {
        case(null) { 
          return null;
         };
        case(?found) { 
          return get_student;
         };
      };
    };


  public type stdCourse ={
    name: Text;
    rollno:Text;
    coursenm: Text;
    start_dt: Text;
    end_date: Text;
    course_details:Text;
    cert_name: Text;
    cert_img: Blob;
    prin: Principal;
  };

  var std_course : [stdCourse] = [];

  public func SetCourse(course_det:stdCourse):async Text {
    std_course := Array.append<stdCourse>(std_course , [course_det]);
    return "OK";
  };

  public shared query func getCourse(prin:Principal): async ?stdCourse{
    return Array.find<stdCourse>(std_course , func x=x.prin == prin);
  };

  public type Login ={
    std_prin: Principal;
    std_rollno: Text;
    org_prin: Principal;
  };

  var login_info : [Login] = [];

  public func Set_login_info(info_det:Login):async Text {
    login_info := Array.append<Login>(login_info , [info_det]);
    return "OK";
  };
  
  public shared query func get_login_info(org_prin:Principal): async ?Login{
    return Array.find<Login>(login_info , func x=x.org_prin == org_prin);
  };


};
