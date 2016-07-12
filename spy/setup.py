from setuptools import find_packages, setup
setup(
    name='heraspy',
    version='0.0',
    description='Keras data extraction callbacks',
    author='Jake Bian',
    author_email='jake@getalkanet.com',
    platforms=['any'],
    license='wtfpl',
    packages=find_packages(),
    install_requires=[
        'requests',
        'socketIO-client',
        'keras'
    ],
)
