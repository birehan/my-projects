import '../../domain/entities/hospital_address_domain.dart';

class AddressModel extends AddressDomain {
  AddressModel({
    required String country,
    required String region,
    required String zone,
    required String woreda,
    required String city,
    required String subCity,
    required double longitude,
    required double latitude,
    required String summary,
    required String id,
  }) : super(
            city: city,
            country: country,
            id: id,
            latitude: latitude,
            longitude: longitude,
            region: region,
            subCity: subCity,
            summary: summary,
            woreda: woreda,
            zone: zone);

  factory AddressModel.fromJson(Map<String, dynamic> json) {
    return AddressModel(
      country: json['country'] ?? "country",
      region: json['region'] ?? "region",
      zone: json['zone'] ?? "zone",
      woreda: json['woreda'] ?? "woreda",
      city: json['city'] ?? "city",
      subCity: json['subCity'] ?? "subCity",
      longitude: json['longitude'] ?? 0.0,
      latitude: json['latitude'] ?? 0.0,
      summary: json['summary'] ?? "address summary",
      id: json['id'] ?? "id",
    );
  }
  Map<String, dynamic> toJson() {
    return {
      'country': country,
      'region': region,
      'zone': zone,
      'woreda': woreda,
      'city': city,
      'subCity': subCity,
      'longitude': longitude,
      'latitude': latitude,
      'summary': summary,
      'id': id,
    };
  }
}
