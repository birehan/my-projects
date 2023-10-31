import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:hakim_hub_mobile/core/utils/icons.dart';
import 'package:hakim_hub_mobile/core/utils/pixle_to_percent.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/hospital_detail_domain.dart';
import 'package:hakim_hub_mobile/features/hospital/presentation/widgets/overview_tab_widgets/hospital_card.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'map_box.dart';
import 'package:expandable_text/expandable_text.dart';

import 'map_utils.dart';

class OverviewTab extends StatefulWidget {
  final InstitutionDetailDomain institutionDetailDomain;

  OverviewTab({Key? key, required this.institutionDetailDomain})
      : super(key: key);

  @override
  _OverviewTabState createState() => _OverviewTabState();
}

class _OverviewTabState extends State<OverviewTab> {
  int _selectedIndex = -1;
  bool _isExpanded = false;

  void _onButtonPressed(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
          left: pixleToPercent(30, 'width').w,
          right: pixleToPercent(30, 'width').w,
          top: pixleToPercent(25, 'height').h,
          bottom: pixleToPercent(25, 'height').h),
      child: SingleChildScrollView(
        physics: BouncingScrollPhysics(),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(
              height: pixleToPercent(340, 'height').h,
              width: pixleToPercent(382, 'width').w,
              child: Stack(children: [
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: Container(
                    height: pixleToPercent(254, 'height').h,
                    width: pixleToPercent(382, 'width').w,
                    decoration: BoxDecoration(
                        borderRadius:
                            const BorderRadius.all(Radius.circular(10)),
                        image: DecorationImage(
                          image: NetworkImage(
                              widget.institutionDetailDomain.bannerUrl),
                          fit: BoxFit.cover,
                          onError: (exception, stackTrace) {
                            const AssetImage(
                              'assets/images/black_lion.png',
                            );
                          },
                        )),
                  ),
                ),
                Positioned(
                  top: pixleToPercent(214, 'height').h,
                  left: pixleToPercent(30, 'width').w,
                  right: pixleToPercent(30, 'width').w,
                  child: HospitalCard(
                    institutionDetailDomain: widget.institutionDetailDomain,
                    latitude: widget.institutionDetailDomain.address.latitude,
                    longitude: widget.institutionDetailDomain.address.longitude,
                  ),
                ),
              ]),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Text(
                  'Hospital Description',
                  style:
                      TextStyle(fontSize: 18.sp, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            SizedBox(
              height: pixleToPercent(30, 'height').h,
            ),
            Text(
              widget.institutionDetailDomain.summary,
              style: TextStyle(
                fontSize: 15.sp,
              ),
            ),
            ExpandableText(
              widget.institutionDetailDomain.summary,
              maxLines: 8,
              expanded: _isExpanded,
              style: TextStyle(fontSize: 16.sp, color: Colors.black54),
              expandText: 'See More',
              collapseText: 'See Less',
              linkColor: Colors.blue,
              onExpandedChanged: (value) {
                setState(() {
                  _isExpanded = value;
                });
              },
            ),
            SizedBox(height: pixleToPercent(30, 'height').h),
            Container(
              width: pixleToPercent(400, 'width').w,
              height: pixleToPercent(300, 'height').h,
              child: MapBoxWidget(
                latitude: widget.institutionDetailDomain.address.latitude,
                longitude: widget.institutionDetailDomain.address.longitude,
              ),
            ),
            SizedBox(height: pixleToPercent(50, 'height').h),
            Row(
              children: [
                Text(
                  'Services We Provide',
                  style: TextStyle(
                    fontSize: 18.sp,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            SizedBox(height: pixleToPercent(15, 'height').h),
            SizedBox(
              height: 210,
              width: pixleToPercent(382, 'width').w,
              child: ListView.separated(
                separatorBuilder: (BuildContext context, int index) =>
                    const Divider(),
                itemCount: widget.institutionDetailDomain.services.length,
                itemBuilder: (BuildContext context, int index) {
                  return Container(
                    padding: const EdgeInsets.all(5),
                    height: pixleToPercent(30, 'height').h,
                    decoration: BoxDecoration(
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey.withOpacity(0.07),
                          spreadRadius: 1,
                          blurRadius: 5,
                          offset: const Offset(0, 3),
                        ),
                      ],
                    ),
                    child: Row(
                      children: [
                        Image.asset("assets/images/right_icon.png"),
                        const SizedBox(
                          width: 9,
                        ),
                        Text(
                          widget.institutionDetailDomain.services[index],
                          style: TextStyle(
                            fontSize: 12,
                          ),
                          maxLines: 2,
                        )
                      ],
                    ),
                  );
                },
              ),
            ),
            SizedBox(height: pixleToPercent(50, 'height').h),
            Row(
              children: [
                clock,
                SizedBox(width: pixleToPercent(10, 'width').w),
                const Text(
                  "Available 24 hrs  5 days a week",
                  style: TextStyle(fontSize: 15, color: Colors.black54),
                ),
              ],
            ),
            SizedBox(height: pixleToPercent(20, 'height').h),
            Row(
              children: [
                location,
                SizedBox(width: pixleToPercent(10, 'width').w),
                SizedBox(
                  width: pixleToPercent(300, 'width').w,
                  child: Text(widget.institutionDetailDomain.address.summary,
                      maxLines: 2,
                      style:
                          const TextStyle(fontSize: 15, color: Colors.black54)),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.only(
                top: 8,
              ),
              child: TextButton(
                onPressed: () async {
                  Position position = await Geolocator.getCurrentPosition(
                    desiredAccuracy: LocationAccuracy.high,
                  );

                  await openMap(
                    hospitalLatitude:
                        widget.institutionDetailDomain.address.latitude,
                    hospitalLongitude:
                        widget.institutionDetailDomain.address.longitude,
                  );
                },
                child: Text("See it on map"),
              ),
            )
          ],
        ),
      ),
    );
  }
}
