
# Tensorflow-gpu install on Ubuntu 18.04 and python3

* This tutorial has been made from __markjay4k__'s one for Ubuntu 17.10: [markjay4k tutorial](https://github.com/markjay4k/Install-Tensorflow-on-Ubuntu-17.10-/blob/master/Tensorflow%20Install%20instructions.ipynb)

* The following commands work for my GTX 1080 GPU on a Desktop 18.04 version of Ubuntu. I install it for python3. ʕ•ᴥ•ʔ

## 1. Update GPU driver with `nvidia-390`

In a terminal run the following commands:
```
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt-get update
sudo apt-get install nvidia-390
```

Time to reboot the computer. If the driver installation has been done correctly, the following command should output both GPU and driver names:
```
nvidia-smi

>> Sat May 12 16:44:27 2018       
   +-----------------------------------------------------------------------------+
   | NVIDIA-SMI 390.48                 Driver Version: 390.48                    |
   |-------------------------------+----------------------+----------------------+
   | GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
   | Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
   |===============================+======================+======================|
   |   0  GeForce GTX 1080    Off  | 00000000:65:00.0  On |                  N/A |
   | 21%   49C    P0    48W / 200W |    492MiB /  8118MiB |      1%      Default |
   +-------------------------------+----------------------+----------------------+

   +-----------------------------------------------------------------------------+
   | Processes:                                                       GPU Memory |
   |  GPU       PID   Type   Process name                             Usage      |
   |=============================================================================|
   |    0      2373      G   /usr/lib/xorg/Xorg                            18MiB |
   |    0      2422      G   /usr/bin/gnome-shell                          49MiB |
   |    0      2608      G   /usr/lib/xorg/Xorg                           162MiB |
   |    0      2754      G   /usr/bin/gnome-shell                         215MiB |
   |    0      7691      G   ...-token=0AADF382A4354D48E741D4FCD27C5DC8    43MiB |
   +-----------------------------------------------------------------------------+

```

## 2. Install CUDA Toolkit 9.0

* From the official Nvidia website download the base installer and the two patches.
[https://developer.nvidia.com/cuda-90-download-archive](https://developer.nvidia.com/cuda-90-download-archive?target_os=Linux&target_arch=x86_64&target_distro=Ubuntu&target_version=1704&target_type=deblocal)
* Select the following option while browsing Nvidia website:

| Option | Select |
| --- | --- |
| Operating system | Linux |
| Architecture | x86_64 |
| Distribution | Ubuntu |
| Version | 17.04 (18.04 not available yet) |
| Installer Type | deb (local) |


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


## 3. Install CUDNN `7.0.5`

Browse [https://developer.nvidia.com/rdp/cudnn-download](https://developer.nvidia.com/rdp/cudnn-download):
 * Choose  `Download cuDNN v7.1.3 (April 17, 2018), for CUDA 9.0`
 * And then download `cuDNN v7.1.3 Library for Linux`
 * You should now have the `cudnn-9.0-linux-x64-v7.1.tgz` file.

Go to the location of `cudnn-9.0-linux-x64-v7.1.tgz` and run the following commands:
```
tar -zxvf cudnn-9.0-linux-x64-v7.1.tgz
```

Once extracted, run the following commands to cp the files to the right place (exact same commands than __markjay4k__):
```
sudo cp cuda/include/cudnn.h /usr/local/cuda/include
sudo cp cuda/lib64/libcudnn* /usr/local/cuda/lib64
sudo chmod a+r /usr/local/cuda/include/cudnn.h /usr/local/cuda/lib64/libcudnn*
```


## 4. Install `tensorflow-gpu` with pip

If you want to use Tensorflow within an environment it's time to active it (`source activate my_environment`).

To install Tensorflow run the following command.
```
python3 -m pip install tensorflow-gpu
```

## 5. Do try this at home !

Inside a terminal open a python environment:
```
python3
```

Insert the test code from __markjay4k__:

```
>>> import tensorflow as tf
>>> hello = tf.constant('hello tensorflow')
>>> with tf.Session() as sesh:
>>>     sesh.run(hello)
```

And you should see :

```
2018-05-12 16:46:12.403348: I tensorflow/core/platform/cpu_feature_guard.cc:140] Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX2 AVX512F FMA
2018-05-12 16:46:12.539701: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1356] Found device 0 with properties:
name: GeForce GTX 1080 major: 6 minor: 1 memoryClockRate(GHz): 1.7715
pciBusID: 0000:65:00.0
totalMemory: 7.93GiB freeMemory: 7.33GiB
2018-05-12 16:46:12.539727: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1435] Adding visible gpu devices: 0
2018-05-12 16:46:12.724514: I tensorflow/core/common_runtime/gpu/gpu_device.cc:923] Device interconnect StreamExecutor with strength 1 edge matrix:
2018-05-12 16:46:12.724547: I tensorflow/core/common_runtime/gpu/gpu_device.cc:929]      0
2018-05-12 16:46:12.724554: I tensorflow/core/common_runtime/gpu/gpu_device.cc:942] 0:   N
2018-05-12 16:46:12.724699: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1053] Created TensorFlow device (/job:localhost/replica:0/task:0/device:GPU:0 with 7073 MB memory) -> physical GPU (device: 0, name: GeForce GTX 1080, pci bus id: 0000:65:00.0, compute capability: 6.1)
b'hello tensorflow'
```

As you can see the last line correspond to the answer we wanted to. (•̀ᴗ•́)و

# ｡◕‿◕｡
### Hope this will help !   


PS: the first line `Your CPU supports [...] AVX2 AVX512F FMA` is just a warning. More details to be found on [this stackoverflow question](https://stackoverflow.com/questions/47068709/your-cpu-supports-instructions-that-this-tensorflow-binary-was-not-compiled-to-u).
