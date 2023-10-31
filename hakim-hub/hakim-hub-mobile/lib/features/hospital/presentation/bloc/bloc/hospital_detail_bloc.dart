import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/filter_doctor_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/usecases/get_doctor_by_filter.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/usecases/get_hospital_detail.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/usecases/get_hospitals_by_filter.dart';

import '../../../domain/entities/filter_hospital_domain.dart';
import '../../../domain/entities/hospital_detail_domain.dart';

part 'hospital_detail_event.dart';
part 'hospital_detail_state.dart';

class HospitalDetailBloc
    extends Bloc<HospitalDetailEvent, HospitalDetailState> {
  final GetDoctorByFilter getDoctorByFilter;
  final GetHospitalDetail getHospitalDetail;

  HospitalDetailBloc({required this.getDoctorByFilter,required this.getHospitalDetail})
      : super(HospitalDetailInitial()) {
        
    on<HospitalDetailEvent>((event, emit) {});

    on<HospitalDetailGetEvent>((event, emit) async {
      emit(DetailHospitalLoading());
      await getHospitalDetail(event.id).then((value) {
        value.fold((l) => emit(DetailHospitalError(message: l.toString())),
            (r){
              print("return from bloc");
              print(r);
              print("after return from bloc");
              return emit(DetailHospitalSuccess(institutionDetailDomain: r));
            } );
      });
    });

    on<DoctorFilterEvent>((event, emit) async {
      emit(DetailHospitalLoading());
      await getDoctorByFilter(event.filter).then((value) {
        value.fold((l) => emit(DetailHospitalError(message: l.toString())),
            (r) {
              event.institutionDetailDomain.doctors = r;
              return emit(DetailHospitalSuccess(institutionDetailDomain: event.institutionDetailDomain)); }
            );
      });
    });
  }
}
