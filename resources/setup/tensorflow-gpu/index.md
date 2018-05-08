
# Tensorflow-gpu install on Ubuntu 18.04

* This tutorial has been made from __markjay4k__'s one for Ubuntu 17.10: [markjay4k tutorial](https://github.com/markjay4k/Install-Tensorflow-on-Ubuntu-17.10-/blob/master/Tensorflow%20Install%20instructions.ipynb)

* The following commands work for my GTX 1080 GPU on a Desktop 18.04 version of Ubuntu.

## Update GPU driver with `nvidia-390`

In a terminal run the following commands:
```
~$ sudo add-apt-repository ppa:graphics-drivers/ppa
~$ sudo apt-get update
~$ sudo apt-get install nvidia-390
```

Time to reboot the computer. If the driver installation has been done correctly, the following command should output both GPU and driver names:
```
~$ nvidia-smi

>> Tue May  8 16:52:31 2018       
   +-----------------------------------------------------------------------------+
   | NVIDIA-SMI 390.48                 Driver Version: 390.48                    |
   |-------------------------------+----------------------+----------------------+
   | GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
   | Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
   |===============================+======================+======================|
   |   0  GeForce GTX 1080    Off  | 00000000:65:00.0  On |                  N/A |
   |  0%   42C    P0    47W / 200W |    227MiB /  8118MiB |      0%      Default |
   +-------------------------------+----------------------+----------------------+

   +-----------------------------------------------------------------------------+
   | Processes:                                                       GPU Memory |
   |  GPU       PID   Type   Process name                             Usage      |
   |=============================================================================|
   |    0      1029      G   /usr/lib/xorg/Xorg                            18MiB |
   |    0      1078      G   /usr/bin/gnome-shell                          49MiB |
   |    0      1370      G   /usr/lib/xorg/Xorg                            86MiB |
   |    0      1514      G   /usr/bin/gnome-shell                          70MiB |
   +-----------------------------------------------------------------------------+

```

## Install CUDA Toolkit 9.0

From the official Nvidia website download the base installer and the two patches.
[https://developer.nvidia.com/cuda-90-download-archive](https://developer.nvidia.com/cuda-90-download-archive?target_os=Linux&target_arch=x86_64&target_distro=Ubuntu&target_version=1704&target_type=deblocal)



First install the base installer by running the following commands where you downloaded
the `.deb` files:
```
sudo dpkg -i cuda-repo-ubuntu1704-9-0-local_9.0.176-1_amd64.deb
sudo apt-key add /var/cuda-repo-9-0-local/7fa2af80.pub
sudo apt-get update
sudo apt-get install cuda
```

Then install patches 1 and 2:
```
sudo dpkg -i cuda-repo-ubuntu1704-9-0-local-cublas-performance-update_1.0-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu1704-9-0-local-cublas-performance-update-2_1.0-1_amd64.deb
```

Set your `PATH` variables by adding the new path to your `.bashrc` file.
To do so run the following command:

```
echo "export PATH=/usr/local/cuda-9.0/bin${PATH:+:$PATH}}" >> ~/.bashrc
echo "export LD_LIBRARY_PATH=/usr/local/cuda-9.0/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}" >> ~/.bashrc
```
