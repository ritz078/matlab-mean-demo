format shortg;
y=0;
while y >= 0
    c=clock;
    c=fix(c);
    x.clock=c;
    x.hours=c(:,4);
    x.minutes=c(:,5);
    x.seconds=c(:,6);
    savejson('',x,'data/matlabData.json');
end