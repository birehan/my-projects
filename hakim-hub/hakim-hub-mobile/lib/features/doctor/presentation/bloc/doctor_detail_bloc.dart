import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/usecases/doctor_detail_usecase.dart';

import '../../../../core/error/failures.dart';
import '../../domain/entities/doctor_detail.dart';

part 'doctor_detail_event.dart';
part 'doctor_detail_state.dart';

class DoctorDetailBloc extends Bloc<DoctorDetailEvent, DoctorDetailState> {
  final GetDoctorDetail getDoctorDetail;

  DoctorDetailState doctorDetailSuccessOrFailure(
      Either<Failure, DoctorDetail> data) {
    return data.fold(
      (error) => DoctorDetailFailureState(error: error),
      (success) => DoctorDetailSuccessState(doctorDetail: success),
    );
  }

  void _getDoctorDetail(
      GetDoctorDetailEvent event, Emitter<DoctorDetailState> emit) async {
    emit(DoctorDetailLoadingState());
    print("loaadinf");
    final result = await getDoctorDetail(event.doctorDetailId);
    emit(doctorDetailSuccessOrFailure(result));
  }

  DoctorDetailBloc({
    required this.getDoctorDetail,
  }) : super(DoctorDetailInitialState()) {
    on<GetDoctorDetailEvent>(_getDoctorDetail);
  }
}
