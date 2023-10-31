import 'package:flutter/material.dart';
import 'package:hakim_hub_mobile/core/utils/colors.dart';
import 'package:hakim_hub_mobile/core/utils/icons.dart';
import 'package:hakim_hub_mobile/core/utils/ui_converter.dart';
import 'package:hakim_hub_mobile/features/hospital/domain/entities/filter_doctor_domain.dart';

import '../../../../../core/shared_widgets/formfield.dart';
import '../../../domain/entities/filter_hospital_domain.dart';
import '../build_chips_widget.dart';

class DoctorFilterPage extends StatefulWidget {
  List<String> filterList;
  String institutionId;
  DoctorFilterPage(
      {super.key, required this.institutionId, required this.filterList});

  @override
  State<DoctorFilterPage> createState() => _DoctorFilterPageState();
}

class _DoctorFilterPageState extends State<DoctorFilterPage> {
  bool isSwitched = false;
  int sliderValue = 1;

  List<String> options = [""];

  List<String> selectedList = [];

  void delete(String serviceName) {
    setState(() {
      selectedList.remove(serviceName);
    });
  }

  void add(String serviceName) {
    setState(() {
      selectedList.add(serviceName);
    });
  }

  String selectedOption = "";
  bool showAllChips = false;

  @override
  Widget build(BuildContext context) {
    List<Widget> chips = widget.filterList
        .map((e) => BuildChip(
              label: e,
              onDeleted: (serviceName) => delete(serviceName),
              onAdd: (serviceName) => add(serviceName),
            ))
        .toList();

    if (!showAllChips && chips.length > 6) {
      chips = chips.sublist(0, 6);
    }

    return Container(
      padding: EdgeInsets.only(
        top: UIConverter.getComponentHeight(context, 35),
        left: UIConverter.getComponentWidth(context, 27),
        right: UIConverter.getComponentWidth(context, 27),
      ),
      decoration: const BoxDecoration(
        color: secondryTextColor,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
      ),
      height: UIConverter.getComponentHeight(context, 650),
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                GestureDetector(
                  child: cancel,
                  onTap: () {
                    Navigator.pop(context);
                  },
                ),
                const Text(
                  "Filter Doctors",
                  style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.normal,
                      color: titleTextColor),
                ),
                GestureDetector(
                  child: check,
                  onTap: () {
                    DoctorFilterDomain doctorFilterDomain = DoctorFilterDomain(
                        institutionId: widget.institutionId,
                        experienceYears: sliderValue.toString(),
                        educationalName: widget.institutionId,
                        specialities: selectedList);
                    Navigator.pop(context, doctorFilterDomain);
                  },
                )
              ],
            ),
            SizedBox(
              height: UIConverter.getComponentHeight(context, 40),
            ),
            const Text(
              "Education",
              style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.normal,
                  color: primaryColor),
            ),
            DropdownButton<String>(
              isExpanded: true,
              iconEnabledColor: Colors.blue,
              value: selectedOption,
              items: options.map((String option) {
                return DropdownMenuItem<String>(
                  value: option,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [const Icon(Icons.cast_for_education), Text(option)],
                  ),
                );
              }).toList(),
              onChanged: (value) {
                setState(() {
                  selectedOption = value!;
                });
              },
            ),
            SizedBox(
              height: UIConverter.getComponentHeight(context, 15),
            ),
            const Text(
              "Years of Experience",
              style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.normal,
                  color: primaryColor),
            ),
            SizedBox(
              height: UIConverter.getComponentHeight(context, 15),
            ),
            SliderTheme(
              data: const SliderThemeData(
                activeTrackColor: primaryColor,
                inactiveTrackColor: backgroundColor,
                trackShape: RoundedRectSliderTrackShape(),
                trackHeight: 4.0,
                thumbShape: RoundSliderThumbShape(
                    enabledThumbRadius: 12.0, elevation: 5),
                thumbColor: secondaryColor,
                overlayShape: RoundSliderOverlayShape(overlayRadius: 28.0),
                tickMarkShape: RoundSliderTickMarkShape(),
                activeTickMarkColor: primaryColor,
                inactiveTickMarkColor: greyColor,
                valueIndicatorShape: PaddleSliderValueIndicatorShape(),
                valueIndicatorColor: primaryColor,
                valueIndicatorTextStyle: TextStyle(
                  color: secondryTextColor,
                ),
              ),
              child: SizedBox(
                width: UIConverter.getComponentWidth(context, 376),
                child: Slider(
                  value: sliderValue.toDouble(),
                  min: 1,
                  max: 20,
                  divisions: 20,
                  label: '${sliderValue.round()} years',
                  onChanged: (double value) {
                    setState(() {
                      sliderValue = value.round();
                    });
                  },
                ),
              ),
            ),
            SizedBox(
              height: UIConverter.getComponentHeight(context, 20),
            ),
            const Text(
              "Specialities",
              style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.normal,
                  color: primaryColor),
            ),
            SizedBox(
              height: UIConverter.getComponentHeight(context, 20),
            ),
            Wrap(
              spacing: 6.0,
              runSpacing: 6.0,
              children: chips,
            ),
            if (!showAllChips && widget.filterList.length > 6)
              Padding(
                padding: EdgeInsets.only(
                    top: UIConverter.getComponentHeight(context, 10)),
                child: TextButton(
                  onPressed: () {
                    setState(() {
                      showAllChips = true;
                    });
                  },
                  child: Text(
                    "Show More",
                    style: TextStyle(
                        color: primaryColor,
                        fontWeight: FontWeight.normal,
                        fontSize: 13),
                  ),
                ),
              ),
            if (showAllChips)
              Padding(
                padding: EdgeInsets.only(
                    top: UIConverter.getComponentHeight(context, 10)),
                child: TextButton(
                  onPressed: () {
                    setState(() {
                      showAllChips = false;
                    });
                  },
                  child: Text(
                    "Show Less",
                    style: TextStyle(
                        color: primaryColor,
                        fontWeight: FontWeight.normal,
                        fontSize: 13),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}