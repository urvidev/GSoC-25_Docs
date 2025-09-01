# Project Details

---

- **Contributor:** [Urvashi](https://github.com/urvidev)
- **Organization:** [Stichting SU2](https://github.com/su2code)
- **Project:** [SU2 GUI: Python Wrapper Integration, Config Validation, and Simplified Installer](https://summerofcode.withgoogle.com/programs/2025/projects)
- **Mentors:** [Nijso Beishuizen](https://github.com/bigfooted), [Ujjawal Agrawal](https://github.com/Ujjawal179)
- **Project Repository:** [https://github.com/urvidev/su2gui_](https://github.com/urvidev/su2gui_)

---

## Abstract

During GSoC 2025, my goal was to make SU2GUI more **usable, reliable, and beginner-friendly**

The project brought together three pillars:
1. **Python wrapper integration** — to automate and customize simulation workflows from inside the GUI.
2. **JSON-based configuration validation** — to catch errors before runtime using schema logic.
3. **A simplified, cross-platform installer** — to reduce setup friction and save hours of environment debugging.

This work helps users focus on *simulation* instead of *setup*, and improves SU2’s accessibility for both new and experienced users.

---

## How this helps SU2 users

- **Lower entry barrier:** One-click installer or pip install — no manual compilation.
-  **Early error detection:** Real-time schema validation inside GUI.
-  **Reproducibility:** Export GUI setups as runnable Python scripts.
-  **Guided workflow:** From setup to solver execution, everything stays in the GUI.

These improvements make SU2GUI a more approachable, dependable, and productive interface for the entire SU2 ecosystem.

---

#  Achievements

---

###  1. Python Wrapper Integration ([Docs](Python-Wrapper.md))


Integrated automated SU2’s python wrapper generation functionality into SU2GUI.

Enabled exporting GUI setups as Python scripts (run_su2.py) to support:

serial or MPI execution,

 Added support for a user-defined wall temperature boundary condition in the Python wrapper, allowing custom temperature profiles via mathematical expressions over (x, y, z); e.g., 560.0 - 260.0*sin(x*pi/4)


GUI users can now generate and run wrappers with a single click.

 ---

###  2. JSON-based Configuration Validation ([Docs](Config-Validation.md))

This was one of the core parts of the project.  
The validation system is **layered in two phases**:

####  Phase 1: Basic Schema Validation

Each line of the SU2 config (`KEY = VALUE`) is parsed and checked:

- **KEY** must be present in the official SU2 key list (defined in `JsonSchema.json`).
- **VALUE** must match the expected data type (boolean, integer, float, string, array).
- Missing keys, extra keys, and wrong types are all reported in a clear, human-readable format.

Example errors caught:
- `MISSING: MARKER_OUTLET`
- `TYPE ERROR: CFL_NUMBER expected float, got string`

####  Phase 2: Cross-Parameter Logic Validation

Once basic validity is ensured, a second layer checks **logical consistency** between parameters. For example:

- If `KIND_TURB_MODEL = SA`, then `REYNOLDS_NUMBER` *must* be defined.
- If `KIND_TURB_MODEL = NONE`, then turbulence-related parameters *must not* be present.
- If `MARKER_ISOTHERMAL` is used, then `MARKER_PYTHON_CUSTOM` should not be defined on the same boundary.

This cross-validation ensures that even when individual keys are valid, the **overall configuration is also logically sound**.



####  Integration into GUI

- Added a “Validate Configuration” button inside SU2GUI.
- Displayed results inline with real-time feedback and guidance.
- Users can re-validate after fixing errors until status shows “Valid”.

 ---

###  3. Simplified Installer ([Docs](SU2-Installer.md))

- Developed an interactive Installation Wizard (GUI + CLI).
- Supported pre-compiled binaries for Windows, Linux, macOS.
- Automatic environment variable configuration (`SU2_HOME`, `SU2_RUN`, `PATH`, `PYTHONPATH`).
- Automated installation of required dependencies
- Reduced setup time by automating tedious steps like adding environment variables.

 ---

###  4. Other Enhancements

- Improved GUI error handling & backward compatibility.
- Implemented both GUI and command-line interfaces for the installer.
- Wrote user-facing documentation, troubleshooting guides, and code comments for maintainability.

---

#  Deliverables

---

- Documentation
  - [Python Wrapper Guide](_su2gui/Python-Wrapper.md)
  - [Config Validation Guide](_su2gui/Config-Validation.md)
  - [Installer Guide](_su2gui/SU2-Installer.md)
- Pull Requests
  - SU2GUI: https://github.com/su2code/su2gui/pull/2
    - Integrates Python wrapper export (`run_su2.py`) with position-based custom wall temperature.
    - Adds validation UX wiring in the GUI (schema + cross-parameter checks surfaced to users).
    - Improves installer flow with platform-aware extraction and environment setup.
  - SU2 core: [link pending]
    - Related work to enable/cleanly expose wrapper hooks for custom wall temperatures.
  - SU2 Docs: [link pending]
    - Documentation updates for the GUI wrapper, validation, and installer pages.

---

#  Future Work

---

- Expand cross-parameter validation logic to cover more solver types.
- Extend GUI scripting tab to allow custom Python scripts with CLI args.
- Improve visualization (multi-zone, 3D support).
- Add installer support for HPC modules and conda environments within SU2GUI.

---

#  Acknowledgements

---

I am deeply grateful to my mentors **Nijso Beishuizen** and **Ujjawal Agrawal** for their constant feedback, patience, and technical insight.  
Their guidance not only shaped the code, but also how I approached problems and structured solutions.

Thanks to the **SU2 community** for reviewing my PRs, testing features, and providing valuable feedback.  
Lastly, I am thankful to **Google Summer of Code** for giving me this opportunity to contribute to an open-source project that truly helps researchers, students, and engineers around the world.

This project has been both a technical challenge and a personal milestone. I am excited to continue contributing and growing with the SU2 ecosystem.

---
