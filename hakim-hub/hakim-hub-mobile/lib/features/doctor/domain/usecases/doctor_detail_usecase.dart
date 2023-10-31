import 'package:dartz/dartz.dart';
import 'package:hakim_hub_mobile/core/error/failures.dart';
import 'package:hakim_hub_mobile/features/doctor/domain/repositories/doctor_detail_repository.dart';

import '../entities/doctor_detail.dart';

class GetDoctorDetail {
  final DoctorDetailRepository doctorDetailRepository;
  GetDoctorDetail({required this.doctorDetailRepository});

  Future<Either<Failure, DoctorDetail>> call(String id) async {
    return await doctorDetailRepository.getDoctorDetail(id);
  }
}
