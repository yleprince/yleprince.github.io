
# Tensorflow-gpu install on Ubuntu 18.04

* This tutorial has been made from __markjay4k__'s one for Ubuntu 17.10: https://github.com/markjay4k/Install-Tensorflow-on-Ubuntu-17.10-/blob/master/Tensorflow%20Install%20instructions.ipynb

* The following commands work for my GTX 1080 GPU on a Desktop 18.04 version of Ubuntu.

## Update GPU driver with `nvidia-390`

In a terminal run the following commands:
```
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt-get update
sudo apt-get install nvidia-390
```

Time to reboot the computer. If the driver installation has been done correctly, the following command should output both GPU and driver names:
```
nvidia-smi
```

## Install CUDA Toolkit 9.0

From the official Nvidia website download the base installer and the two patches.

https://developer.nvidia.com/cuda-90-download-archive?target_os=Linux&target_arch=x86_64&target_distro=Ubuntu&target_version=1704&target_type=deblocal
