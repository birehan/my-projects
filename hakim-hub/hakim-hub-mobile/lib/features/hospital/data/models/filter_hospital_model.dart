

import 'package:hakim_hub_mobile/features/hospital/domain/entities/filter_hospital_domain.dart';

class FilterHospitalModel extends FilterHospitalDomain{
  

  FilterHospitalModel({required int activeFor, required bool openNow, required List<String> services}):super(operationYears : activeFor, openStatus: openNow, services: services);
  
  toJson() {
    return {
      'openNow': openStatus,
      'activeFor': operationYears,
      'services': services
    };
  }
}