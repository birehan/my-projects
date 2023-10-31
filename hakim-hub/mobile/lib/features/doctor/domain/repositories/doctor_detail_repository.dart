import 'package:dartz/dartz.dart';
import 'package:hakim_hub_mobile/core/error/failures.dart';
import 'package:hakim_hub_mobile/features/doctor/data/models/doctor_detail_model.dart';

import '../entities/doctor_detail.dart';

abstract class DoctorDetailRepository {
  Future<Either<Failure, DoctorDetail>> getDoctorDetail(String id);
}
