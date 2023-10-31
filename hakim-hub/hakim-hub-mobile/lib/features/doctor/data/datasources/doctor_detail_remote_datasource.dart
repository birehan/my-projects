import 'dart:convert';
import 'package:hakim_hub_mobile/core/error/exception.dart';
import 'package:hakim_hub_mobile/features/doctor/data/models/doctor_detail_model.dart';
import 'package:http/http.dart' as http;
import 'package:hakim_hub_mobile/core/utils/base_url.dart';

abstract class DoctorDetailRemoteDataSource {
  Future<DoctorDetailModel> getDoctorDetail(String id);
}

class DoctorDetailRemoteDataSourceImpl implements DoctorDetailRemoteDataSource {
  final http.Client client;
  final uriString =
      'https://hakim-hub.onrender.com/api/DoctorProfiles/02fb54e9-ebbf-48a5-acdf-12c0d51ec264';
  String baseUrl = getBaseUrl();

  DoctorDetailRemoteDataSourceImpl({required this.client});

  @override
  Future<DoctorDetailModel> getDoctorDetail(String id) async {
    final response = await client.get(
      Uri.parse("${baseUrl}/DoctorProfiles/${id}"),
      headers: {
        'Content-Type': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      final jsonResponse = json.decode(response.body);
      return DoctorDetailModel.fromJson(jsonResponse["value"]);
    } else {
      throw ServerException();
    }
  }
}
